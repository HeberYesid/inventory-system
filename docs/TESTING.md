# 🧪 Guía de Testing

Este documento describe cómo ejecutar las pruebas del proyecto.

---

## 📋 Tabla de Contenidos

- [Backend Tests (NestJS)](#backend-tests-nestjs)
- [Frontend Tests (React + Vitest)](#frontend-tests-react--vitest)
- [Coverage Reports](#coverage-reports)
- [CI/CD](#cicd)

---

## 🔧 Backend Tests (NestJS)

### Tecnologías
- **Jest**: Testing framework
- **Supertest**: HTTP assertions
- **@nestjs/testing**: Testing utilities

### Comandos Disponibles

```powershell
cd backend

# Ejecutar todos los tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests E2E
npm run test:e2e

# Generar reporte de coverage
npm run test:cov

# Debug tests
npm run test:debug
```

### Estructura de Tests

```
backend/
├── src/
│   └── products/
│       └── products.service.spec.ts  # Tests unitarios
└── test/
    └── app.e2e-spec.ts               # Tests E2E
```

### Tests Disponibles

#### ✅ Tests Unitarios
- `products.service.spec.ts` - Pruebas del servicio de productos

#### ✅ Tests E2E (End-to-End)
- **Authentication**: Login exitoso y fallido
- **Products**: Listar productos con/sin autenticación
- **Purchase Flow**: Crear compra y verificar actualización de stock

### Ejemplo de Ejecución

```powershell
PS C:\...\backend> npm run test:e2e

> inventory-backend@1.0.0 test:e2e
> jest --config ./test/jest-e2e.json

PASS  test/app.e2e-spec.ts
  AppController (e2e)
    Authentication
      ✓ /api/auth/login (POST) - should login successfully (156 ms)
      ✓ /api/auth/login (POST) - should fail with invalid credentials (45 ms)
    Products
      ✓ /api/products (GET) - should return products list (34 ms)
      ✓ /api/products (GET) - should fail without authentication (12 ms)
    Purchase Flow
      ✓ should create a purchase and update stock (89 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.456 s
```

---

## ⚛️ Frontend Tests (React + Vitest)

### Tecnologías
- **Vitest**: Testing framework (similar a Jest, optimizado para Vite)
- **React Testing Library**: Testing de componentes React
- **jsdom**: Simulación de DOM

### Comandos Disponibles

```powershell
cd frontend

# Instalar dependencias de testing (primera vez)
npm install

# Ejecutar tests
npm run test

# Ejecutar tests con UI interactiva
npm run test:ui

# Generar reporte de coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test -- --watch
```

### Estructura de Tests

```
frontend/
├── src/
│   ├── pages/
│   │   └── LoginPage.test.tsx       # Tests de página de login
│   ├── store/
│   │   └── authStore.test.ts        # Tests del store Zustand
│   ├── services/
│   │   └── api.test.ts              # Tests de servicios API
│   └── test/
│       └── setup.ts                 # Configuración de tests
├── vitest.config.ts                  # Configuración Vitest
└── package.json
```

### Tests Disponibles

#### ✅ LoginPage Tests
- Renderiza formulario de login
- Muestra error con campos vacíos
- Maneja login exitoso
- Maneja login fallido

#### ✅ AuthStore Tests
- Inicialización sin usuario
- Set user y token
- Guarda en localStorage
- Logout limpia datos
- Restaura desde localStorage

#### ✅ API Service Tests
- Configuración correcta de base URL
- Agrega header Authorization con token
- Métodos CRUD disponibles

### Ejemplo de Ejecución

```powershell
PS C:\...\frontend> npm run test

> inventory-frontend@1.0.0 test
> vitest

✓ src/store/authStore.test.ts (6 tests) 234ms
✓ src/services/api.test.ts (7 tests) 156ms
✓ src/pages/LoginPage.test.tsx (4 tests) 445ms

Test Files  3 passed (3)
     Tests  17 passed (17)
  Start at  11:30:00
  Duration  1.2s
```

---

## 📊 Coverage Reports

### Backend Coverage

```powershell
cd backend
npm run test:cov
```

Genera reporte en: `backend/coverage/lcov-report/index.html`

### Frontend Coverage

```powershell
cd frontend
npm run test:coverage
```

Genera reporte en: `frontend/coverage/index.html`

### Ver Reportes

```powershell
# Backend
start backend/coverage/lcov-report/index.html

# Frontend
start frontend/coverage/index.html
```

---

## 🚀 CI/CD

### GitHub Actions (Ejemplo)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd backend && npm ci
      - name: Run tests
        run: cd backend && npm run test:e2e

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Run tests
        run: cd frontend && npm run test
```

---

## 🛠️ Agregar Nuevos Tests

### Backend (Jest)

```typescript
// backend/src/module/service.spec.ts
import { Test } from '@nestjs/testing';
import { MyService } from './service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MyService],
    }).compile();

    service = module.get<MyService>(MyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### Frontend (Vitest)

```typescript
// frontend/src/components/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 📚 Recursos

### Backend
- [Jest Documentation](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)

### Frontend
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ Checklist de Tests

### Antes de hacer commit:

- [ ] Todos los tests pasan: `npm run test`
- [ ] Tests E2E pasan: `npm run test:e2e` (backend)
- [ ] Coverage > 70%: `npm run test:coverage`
- [ ] No hay tests skip/only: `it.skip()` o `it.only()`
- [ ] Tests son legibles y descriptivos

---

## 🐛 Troubleshooting

### "Cannot find module"
```powershell
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### "Tests timeout"
```typescript
// Aumentar timeout en el test
it('slow test', async () => {
  // ...
}, 10000); // 10 segundos
```

### "Database connection error" (E2E)
- Asegúrate de tener PostgreSQL corriendo
- Verifica las variables de entorno
- Usa base de datos de test separada

---

¡Happy Testing! 🎉
