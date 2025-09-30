import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { items, notes } = createSaleDto;

    // Validate all products exist and have enough stock
    for (const item of items) {
      const product = await this.productsService.findOne(item.productId);
      
      if (new Decimal(product.stockKilos).lessThan(new Decimal(item.kilos))) {
        throw new BadRequestException(
          `Stock insuficiente para ${product.name}. Disponible: ${product.stockKilos} kg, Solicitado: ${item.kilos} kg`,
        );
      }
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

    // Create sale with transaction
    return this.prisma.$transaction(async (tx) => {
      // Create sale
      const sale = await tx.sale.create({
        data: {
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
        },
      });

      // Update stock and create kardex entries
      for (const item of items) {
        // Update product stock (decrease)
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockKilos: {
              decrement: item.kilos,
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
            type: 'OUT',
            kilos: item.kilos,
            balanceAfter: product.stockKilos,
            reference: `SALE-${sale.id}`,
            notes: `Venta de ${item.kilos} kg`,
          },
        });
      }

      return sale;
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!sale) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    return sale;
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
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
