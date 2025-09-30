# Sistema de Compras, Ventas e Inventario - MVP

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Sistema web para la gestión de compras, ventas, proveedores e inventario con control de stock en kilos.

## 🚀 Características

- ✅ Gestión de productos e inventario (stock en kilos)
- ✅ Registro de compras con proveedores
- ✅ Registro de ventas
- ✅ Kardex de movimientos por producto
- ✅ Autenticación JWT con roles (Admin/Secretaria)
- ✅ CAPTCHA en login
- ✅ Panel administrativo moderno

## 🏗️ Arquitectura

- **Frontend**: React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: NestJS + TypeScript
- **Base de Datos**: PostgreSQL 15
- **Autenticación**: JWT + bcrypt
- **Containerización**: Docker + Docker Compose

## 📋 Requisitos Previos

- Docker & Docker Compose
- Node.js 18+ (para desarrollo local)
- npm o yarn

## 🛠️ Instalación y Configuración

### Opción 1: Setup Automático (Recomendado)

```powershell
# Ejecutar script de instalación
.\scripts\setup.ps1
```

Este script automáticamente:
- Verifica requisitos (Docker, Node.js)
- Crea archivos `.env`
- Inicia servicios con Docker Compose
- Ejecuta migraciones y seed de datos

### Opción 2: Setup Manual

```bash
# 1. Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Iniciar con Docker Compose
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en puerto 5432
- Backend API en http://localhost:3000
- Frontend en http://localhost:5173

### 3. Acceso inicial

- **URL Frontend**: http://localhost:5173
- **Credenciales por defecto**:
  - Admin: `admin` / `admin123`
  - Secretaria: `secretaria` / `secret123`

## 📁 Estructura del Proyecto

```
inventory-system/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── auth/      # Módulo de autenticación
│   │   ├── users/     # Gestión de usuarios
│   │   ├── products/  # Gestión de productos
│   │   ├── suppliers/ # Gestión de proveedores
│   │   ├── purchases/ # Registro de compras
│   │   ├── sales/     # Registro de ventas
│   │   └── kardex/    # Consulta de kardex
│   ├── prisma/        # Schema y migraciones
│   ├── test/          # Tests E2E
│   └── package.json
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/     # Zustand state management
│   │   ├── test/      # Test setup
│   │   └── App.tsx
│   ├── vitest.config.ts
│   └── package.json
├── docs/              # 📚 Documentación completa
│   ├── README.md      # Índice de documentación
│   ├── QUICK_START.md
│   ├── API_DOCUMENTATION.md
│   └── ...
├── scripts/           # Scripts de utilidad
├── backups/           # Backups de base de datos
├── docker-compose.yml
└── README.md          # Este archivo
```

## 🔌 API Endpoints

### Autenticación
- `POST /auth/login` - Login con username/password

### Productos
- `GET /products` - Listar todos los productos
- `POST /products` - Crear producto (Admin)
- `PUT /products/:id` - Actualizar producto (Admin)

### Proveedores
- `GET /suppliers` - Listar proveedores
- `POST /suppliers` - Crear proveedor (Admin)

### Compras
- `POST /purchases` - Registrar compra
- `GET /purchases/:id` - Ver detalle de compra

### Ventas
- `POST /sales` - Registrar venta
- `GET /sales/:id` - Ver detalle de venta

### Kardex
- `GET /kardex?product_id=X&from=DATE&to=DATE` - Consultar movimientos

## 🗄️ Modelo de Datos

### Tablas principales:
- `users` - Usuarios del sistema
- `suppliers` - Proveedores
- `products` - Productos con stock
- `purchases` - Cabecera de compras
- `purchase_items` - Detalle de compras
- `sales` - Cabecera de ventas
- `sale_items` - Detalle de ventas
- `kardex` - Registro de movimientos

## 🛠️ Scripts de Utilidad

La carpeta [`scripts/`](./scripts/) contiene scripts de PowerShell para automatizar tareas:

- **[setup.ps1](./scripts/setup.ps1)** - Instalación automática del proyecto
- **[backup-database.ps1](./scripts/backup-database.ps1)** - Crear backup de la BD
- **[restore-database.ps1](./scripts/restore-database.ps1)** - Restaurar backup
- **[seed-database.ps1](./scripts/seed-database.ps1)** - Ejecutar seed de datos
- **[test-kardex.ps1](./scripts/test-kardex.ps1)** - Diagnosticar endpoint Kardex

Ver [scripts/README.md](./scripts/README.md) para más detalles.

## 📚 Documentación

Toda la documentación del proyecto está organizada en la carpeta [`docs/`](./docs/):

- **[📖 Guía de Instalación](./docs/GUIA_INSTALACION.md)** - Instalación paso a paso detallada
- **[⚡ Inicio Rápido](./docs/QUICK_START.md)** - Setup en 3 pasos
- **[📖 Manual de Usuario](./docs/MANUAL_USUARIO.md)** - Guía completa de uso
- **[🔌 API Documentation](./docs/API_DOCUMENTATION.md)** - Referencia completa de la API REST
- **[🏗️ Arquitectura](./docs/ARCHITECTURE.md)** - Diseño y estructura del sistema
- **[🧪 Testing](./docs/TESTING.md)** - Guía de pruebas y testing
- **[🤝 Contribuir](./docs/CONTRIBUTING.md)** - Guía para contribuidores
- **[📋 Resumen del Proyecto](./docs/PROJECT_SUMMARY.md)** - Documento ejecutivo
- **[🎯 GitHub Setup](./docs/GITHUB_SETUP.md)** - Instrucciones para subir a GitHub
- **[📝 Changelog](./docs/CHANGELOG.md)** - Historial de versiones

## 🧪 Pruebas

Ver la [**Guía de Testing**](./docs/TESTING.md) para más detalles.

### Backend
```bash
cd backend
npm run test        # Pruebas unitarias
npm run test:e2e    # Pruebas E2E
```

### Frontend
```bash
cd frontend
npm run test
```

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- JWT con expiración de 24h
- CAPTCHA en formulario de login
- Validación de inputs en backend
- CORS configurado
- Headers de seguridad con Helmet

## 📦 Desarrollo Local (sin Docker)

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Base de Datos
```bash
# Iniciar PostgreSQL localmente
# Configurar DATABASE_URL en backend/.env
cd backend
npx prisma migrate dev
npx prisma db seed
```

## 🚀 Despliegue en Producción

1. Configurar variables de entorno en `.env`
2. Cambiar JWT_SECRET y credenciales de BD
3. Configurar dominio y certificado SSL
4. Ejecutar: `docker-compose -f docker-compose.prod.yml up -d`

## 📝 Roadmap (Post-MVP)

- [ ] Pagos parciales y cuentas por cobrar
- [ ] Exportar reportes PDF/Excel
- [ ] Clientes con crédito/fiado
- [ ] Múltiples unidades de medida
- [ ] Historial de precios
- [ ] Dashboard con gráficos
- [ ] Notificaciones de stock bajo
- [ ] Auditoría de cambios

## 📄 Licencia

MIT

## 👥 Contribuidores

Desarrollado para gestión de inventario empresarial.
