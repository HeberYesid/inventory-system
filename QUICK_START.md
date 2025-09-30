# ⚡ Quick Start Guide

## 🚀 Inicio Rápido en 3 Pasos

### 1️⃣ Ejecutar Setup
```powershell
cd inventory-system
.\setup.ps1
```

### 2️⃣ Abrir Aplicación
Navega a: **http://localhost:5173**

### 3️⃣ Login
- **Usuario**: `admin`
- **Password**: `admin123`
- **CAPTCHA**: Resuelve la suma

---

## 📁 Estructura del Proyecto

```
inventory-system/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── auth/        # Autenticación JWT
│   │   ├── products/    # CRUD Productos
│   │   ├── suppliers/   # CRUD Proveedores
│   │   ├── purchases/   # Compras + Stock IN
│   │   ├── sales/       # Ventas + Stock OUT
│   │   └── kardex/      # Historial movimientos
│   └── prisma/          # Database schema
│
├── frontend/            # React + Tailwind
│   └── src/
│       ├── pages/       # Páginas principales
│       ├── components/  # Componentes UI
│       └── services/    # API calls
│
└── docker-compose.yml   # Orquestación Docker
```

---

## 🎯 Flujo de Trabajo Típico

### Día 1: Configuración Inicial
1. ✅ Login como admin
2. ✅ Crear productos (ej: Arroz, Azúcar, Frijol)
3. ✅ Crear proveedores (ej: Distribuidora Central)

### Día 2+: Operación Diaria
1. 📦 Registrar compras → Stock aumenta → Kardex IN
2. 💰 Registrar ventas → Stock disminuye → Kardex OUT
3. 📊 Consultar kardex para auditoría
4. ⚠️ Monitorear productos con stock bajo

---

## 🔑 Endpoints API Principales

```
POST   /api/auth/login              # Login
GET    /api/products                # Listar productos
POST   /api/products                # Crear producto (Admin)
GET    /api/suppliers               # Listar proveedores
POST   /api/purchases               # Registrar compra
POST   /api/sales                   # Registrar venta
GET    /api/kardex?product_id=1    # Consultar kardex
```

---

## 🛠️ Comandos Útiles

```powershell
# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar servicios
docker-compose restart

# Detener todo
docker-compose down

# Reconstruir
docker-compose up -d --build

# Abrir Prisma Studio (ver BD)
cd backend
npx prisma studio
```

---

## ✅ Caso de Prueba Completo

### 1. Crear Producto
- Dashboard → Productos → Nuevo Producto
- Nombre: "Arroz Premium"
- Stock inicial: 0 kg

### 2. Crear Proveedor
- Dashboard → Proveedores → Nuevo Proveedor
- Nombre: "Distribuidora ABC"

### 3. Registrar Compra
- Dashboard → Compras → Nueva Compra
- Proveedor: Distribuidora ABC
- Producto: Arroz Premium
- Kilos: 100
- Precio: $3,000/kg
- **Resultado**: Stock pasa a 100 kg

### 4. Registrar Venta
- Dashboard → Ventas → Nueva Venta
- Producto: Arroz Premium
- Kilos: 20
- Precio: $4,500/kg
- **Resultado**: Stock pasa a 80 kg

### 5. Verificar Kardex
- Dashboard → Kardex
- Ver 2 movimientos:
  - ↑ Entrada: +100 kg (Balance: 100)
  - ↓ Salida: -20 kg (Balance: 80)

---

## 🎨 Características Destacadas

### ✨ UX/UI
- 🎨 Diseño moderno con Tailwind CSS
- 📱 Responsive (mobile-friendly)
- 🌈 Código de colores para stock
- 🔔 Notificaciones toast
- 🔒 CAPTCHA en login

### 🔐 Seguridad
- JWT con expiración 24h
- bcrypt para passwords (10 rounds)
- Validación de inputs
- Roles (Admin/Secretaria)
- CORS configurado

### 📊 Funcionalidad
- Stock en tiempo real
- Kardex con trazabilidad completa
- Transacciones atómicas (PostgreSQL)
- Validación de stock en ventas
- Cálculos automáticos de totales

---

## 📖 Documentación Completa

- **GUIA_INSTALACION.md**: Instalación detallada y troubleshooting
- **MANUAL_USUARIO.md**: Guía completa de uso del sistema
- **README.md**: Información general del proyecto

---

## 🎯 URLs Importantes

| Servicio | URL | Credenciales |
|----------|-----|--------------|
| Frontend | http://localhost:5173 | admin / admin123 |
| Backend API | http://localhost:3000 | - |
| PostgreSQL | localhost:5432 | postgres / postgres |
| Prisma Studio | http://localhost:5555 | `npx prisma studio` |

---

## 🐛 Solución Rápida de Problemas

**Puerto ocupado?**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**DB no conecta?**
```powershell
docker-compose restart postgres
```

**Prisma error?**
```powershell
cd backend
npx prisma generate
```

**Empezar de cero?**
```powershell
docker-compose down -v
.\setup.ps1
```

---

## 🚀 ¡Listo para Producción!

Para desplegar en producción, cambia:
1. JWT_SECRET en backend/.env
2. Credenciales de usuarios
3. Contraseña de PostgreSQL
4. Configura HTTPS/SSL
5. Habilita backups automáticos

---

**🎉 ¡Disfruta gestionando tu inventario!**
