import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateStock', () => {
    it('should increase stock when adding positive kilos', async () => {
      const mockProduct = { id: 1, stockKilos: 150 };
      jest.spyOn(prisma.product, 'update').mockResolvedValue(mockProduct as any);

      const result = await service.updateStock(1, 50);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          stockKilos: {
            increment: 50,
          },
        },
      });
    });

    it('should decrease stock when subtracting (negative kilos)', async () => {
      const mockProduct = { id: 1, stockKilos: 50 };
      jest.spyOn(prisma.product, 'update').mockResolvedValue(mockProduct as any);

      const result = await service.updateStock(1, -50);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          stockKilos: {
            increment: -50,
          },
        },
      });
    });
  });
});
