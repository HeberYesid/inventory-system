import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const secretariaPassword = await bcrypt.hash('secret123', 10);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });

  const secretaria = await prisma.user.upsert({
    where: { username: 'secretaria' },
    update: {},
    create: {
      username: 'secretaria',
      passwordHash: secretariaPassword,
      role: 'SECRETARIA',
    },
  });

  console.log('✅ Users created:', { admin, secretaria });

  // Create suppliers
  const suppliers = await Promise.all([
    prisma.supplier.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Proveedor Central S.A.',
        phone: '3001234567',
        email: 'contacto@proveedorcentral.com',
        address: 'Calle 100 #50-25, Bogotá',
        balance: 0,
      },
    }),
    prisma.supplier.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Distribuidora El Norte',
        phone: '3109876543',
        email: 'ventas@elnorte.com',
        address: 'Carrera 15 #80-30, Medellín',
        balance: 0,
      },
    }),
  ]);

  console.log('✅ Suppliers created:', suppliers.length);

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Arroz Blanco Premium',
        description: 'Arroz blanco de primera calidad',
        stockKilos: 0,
      },
    }),
    prisma.product.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Azúcar Refinada',
        description: 'Azúcar refinada para consumo',
        stockKilos: 0,
      },
    }),
    prisma.product.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Frijol Rojo',
        description: 'Frijol rojo de primera',
        stockKilos: 0,
      },
    }),
    prisma.product.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Aceite Vegetal',
        description: 'Aceite vegetal comestible',
        stockKilos: 0,
      },
    }),
  ]);

  console.log('✅ Products created:', products.length);

  // Create sample purchase
  const purchase = await prisma.purchase.create({
    data: {
      supplierId: 1,
      total: 500000,
      date: new Date(),
      notes: 'Compra inicial de inventario',
      items: {
        create: [
          {
            productId: 1,
            kilos: 100,
            unitPrice: 3000,
            subtotal: 300000,
          },
          {
            productId: 2,
            kilos: 50,
            unitPrice: 4000,
            subtotal: 200000,
          },
        ],
      },
    },
  });

  // Update product stock
  await prisma.product.update({
    where: { id: 1 },
    data: { stockKilos: 100 },
  });

  await prisma.product.update({
    where: { id: 2 },
    data: { stockKilos: 50 },
  });

  // Create kardex entries
  await prisma.kardex.createMany({
    data: [
      {
        productId: 1,
        type: 'IN',
        kilos: 100,
        balanceAfter: 100,
        reference: `PURCHASE-${purchase.id}`,
        notes: 'Compra inicial',
      },
      {
        productId: 2,
        type: 'IN',
        kilos: 50,
        balanceAfter: 50,
        reference: `PURCHASE-${purchase.id}`,
        notes: 'Compra inicial',
      },
    ],
  });

  console.log('✅ Sample purchase and kardex created');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
