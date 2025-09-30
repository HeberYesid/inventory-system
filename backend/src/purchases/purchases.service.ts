import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { supplierId, items, notes } = createPurchaseDto;

    // Validate supplier exists
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      throw new NotFoundException(`Proveedor con ID ${supplierId} no encontrado`);
    }

    // Validate all products exist
    for (const item of items) {
      await this.productsService.findOne(item.productId);
    }

    // Calculate total
    let total = new Decimal(0);
    const itemsWithSubtotal = items.map((item) => {
      const subtotal = new Decimal(item.kilos).mul(new Decimal(item.unitPrice));
      total = total.add(subtotal);
      return {
        ...item,
        subtotal: subtotal.toNumber(),
      };
    });

    // Create purchase with transaction
    return this.prisma.$transaction(async (tx) => {
      // Create purchase
      const purchase = await tx.purchase.create({
        data: {
          supplierId,
          total: total.toNumber(),
          notes,
          items: {
            create: itemsWithSubtotal,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          supplier: true,
        },
      });

      // Update stock and create kardex entries
      for (const item of items) {
        // Update product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockKilos: {
              increment: item.kilos,
            },
          },
        });

        // Get updated stock
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        // Create kardex entry
        await tx.kardex.create({
          data: {
            productId: item.productId,
            type: 'IN',
            kilos: item.kilos,
            balanceAfter: product.stockKilos,
            reference: `PURCHASE-${purchase.id}`,
            notes: `Compra de ${item.kilos} kg`,
          },
        });
      }

      return purchase;
    });
  }

  async findOne(id: number) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id },
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!purchase) {
      throw new NotFoundException(`Compra con ID ${id} no encontrada`);
    }

    return purchase;
  }

  async findAll() {
    return this.prisma.purchase.findMany({
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }
}
