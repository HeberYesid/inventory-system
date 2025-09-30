import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      status: 'ok',
      message: 'Sistema de Inventario API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: '/api/auth/login',
        products: '/api/products',
        suppliers: '/api/suppliers',
        purchases: '/api/purchases',
        sales: '/api/sales',
        kardex: '/api/kardex',
      },
      documentation: 'Los endpoints requieren autenticación JWT (excepto /api/auth/login)',
    };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
