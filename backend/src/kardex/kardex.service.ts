import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KardexService {
  constructor(private prisma: PrismaService) {}

  async findByProduct(
    productId?: number,
    from?: Date,
    to?: Date,
  ) {
    const where: any = {};

    if (productId) {
      where.productId = productId;
    }

    if (from || to) {
      where.date = {};
      if (from) {
        where.date.gte = from;
      }
      if (to) {
        where.date.lte = to;
      }
    }

    return this.prisma.kardex.findMany({
      where,
      include: {
        product: true,
      },
      orderBy: { date: 'desc' },
    });
  }
}
