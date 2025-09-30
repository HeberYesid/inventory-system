import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Authentication', () => {
    it('/api/auth/login (POST) - should login successfully', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'admin123',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('access_token');
          expect(response.body).toHaveProperty('user');
          authToken = response.body.access_token;
        });
    });

    it('/api/auth/login (POST) - should fail with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('Products', () => {
    it('/api/products (GET) - should return products list', () => {
      return request(app.getHttpServer())
        .get('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
        });
    });

    it('/api/products (GET) - should fail without authentication', () => {
      return request(app.getHttpServer())
        .get('/api/products')
        .expect(401);
    });
  });

  describe('Purchase Flow', () => {
    it('should create a purchase and update stock', async () => {
      // Get initial product
      const productsResponse = await request(app.getHttpServer())
        .get('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const product = productsResponse.body[0];
      const initialStock = parseFloat(product.stockKilos);

      // Create purchase
      const purchaseResponse = await request(app.getHttpServer())
        .post('/api/purchases')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          supplierId: 1,
          items: [
            {
              productId: product.id,
              kilos: 10,
              unitPrice: 3000,
            },
          ],
          notes: 'Test purchase',
        })
        .expect(201);

      expect(purchaseResponse.body).toHaveProperty('id');

      // Verify stock increased
      const updatedProductResponse = await request(app.getHttpServer())
        .get(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const newStock = parseFloat(updatedProductResponse.body.stockKilos);
      expect(newStock).toBeGreaterThan(initialStock);
    });
  });
});
