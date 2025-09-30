# 📘 Guía de Instalación - Sistema de Inventario

## Requisitos del Sistema

### Software Necesario
- **Docker Desktop** (versión 4.0 o superior)
- **Node.js** 18+ (solo para desarrollo local sin Docker)
- **Git** (opcional, para clonar el proyecto)

### Hardware Mínimo
- 4 GB RAM
- 2 GB espacio en disco
- Procesador dual-core

---

## 🚀 Instalación Rápida con Docker (Recomendado)

### Paso 1: Verificar Docker
```powershell
docker --version
docker-compose --version
```

Si Docker no está instalado, descárgalo desde: https://www.docker.com/products/docker-desktop

### Paso 2: Configurar Variables de Entorno

El script de setup creará automáticamente los archivos `.env`, pero puedes personalizarlos:

**Backend (`backend/.env`):**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/inventory_db?schema=public"
JWT_SECRET="change-this-to-a-secure-random-string-in-production"
JWT_EXPIRES_IN="24h"
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:3000/api
```

### Paso 3: Ejecutar Script de Setup

```powershell
cd inventory-system
.\setup.ps1
```

El script automáticamente:
1. ✅ Verifica Docker
2. ✅ Crea archivos .env
3. ✅ Construye las imágenes
4. ✅ Inicia los contenedores
5. ✅ Ejecuta migraciones de BD
6. ✅ Carga datos iniciales

### Paso 4: Acceder a la Aplicación

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:3000/api

**Credenciales de prueba:**
- **Administrador**: `admin` / `admin123`
- **Secretaria**: `secretaria` / `secret123`

---

## 🛠️ Instalación Manual (Desarrollo Local)

### 1. Base de Datos PostgreSQL

#### Opción A: PostgreSQL con Docker
```powershell
docker run --name inventory-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=inventory_db -p 5432:5432 -d postgres:15
```

#### Opción B: PostgreSQL Local
- Descargar e instalar PostgreSQL 15
- Crear base de datos: `inventory_db`

### 2. Backend (NestJS)

```powershell
cd backend

# Instalar dependencias
npm install

# Configurar .env
copy .env.example .env
# Editar backend/.env con la configuración de tu BD

# Generar Prisma Client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Cargar datos iniciales
npx prisma db seed

# Iniciar en modo desarrollo
npm run start:dev
```

El backend estará disponible en: http://localhost:3000

### 3. Frontend (React)

```powershell
cd frontend

# Instalar dependencias
npm install

# Configurar .env
copy .env.example .env
# Editar frontend/.env con la URL del backend

# Iniciar en modo desarrollo
npm run dev
```

El frontend estará disponible en: http://localhost:5173

---

## 🧪 Verificación de Instalación

### 1. Verificar Backend
```powershell
# Verificar que el servidor responde
curl http://localhost:3000/api/products
# Debería retornar 401 (no autenticado) - esto es correcto
```

### 2. Verificar Base de Datos
```powershell
cd backend
npx prisma studio
```
Abre Prisma Studio en http://localhost:5555 para ver los datos.

### 3. Verificar Frontend
Abre http://localhost:5173 en tu navegador. Deberías ver la página de login.

---

## 📊 Comandos Útiles

### Docker
```powershell
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Reiniciar servicios
docker-compose restart

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO! Borra la BD)
docker-compose down -v

# Reconstruir imágenes
docker-compose up -d --build
```

### Base de Datos
```powershell
cd backend

# Ver estado de migraciones
npx prisma migrate status

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Abrir Prisma Studio
npx prisma studio

# Resetear base de datos (¡CUIDADO! Borra todos los datos)
npx prisma migrate reset
```

### Backend
```powershell
cd backend

# Modo desarrollo (hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod

# Pruebas unitarias
npm run test

# Pruebas E2E
npm run test:e2e

# Linting
npm run lint
```

### Frontend
```powershell
cd frontend

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🔧 Solución de Problemas

### Error: Puerto ya en uso

**Síntoma**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solución**:
```powershell
# Windows - Encontrar proceso usando el puerto
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID con el número del proceso)
taskkill /PID <PID> /F
```

### Error: No se puede conectar a PostgreSQL

**Síntoma**: `Error: Can't reach database server`

**Soluciones**:
1. Verificar que PostgreSQL está corriendo:
   ```powershell
   docker ps
   ```

2. Verificar la cadena de conexión en `backend/.env`

3. Reiniciar contenedor de PostgreSQL:
   ```powershell
   docker-compose restart postgres
   ```

### Error: Prisma Client no generado

**Síntoma**: `Cannot find module '@prisma/client'`

**Solución**:
```powershell
cd backend
npx prisma generate
```

### Error: CORS en el frontend

**Síntoma**: `Access to XMLHttpRequest blocked by CORS policy`

**Solución**:
1. Verificar que el backend tiene configurado CORS correctamente
2. Verificar `FRONTEND_URL` en `backend/.env`
3. Verificar `VITE_API_URL` en `frontend/.env`

### Limpiar instalación y empezar de nuevo

```powershell
# Detener y eliminar todo
docker-compose down -v

# Limpiar node_modules (opcional)
Remove-Item -Recurse -Force backend/node_modules
Remove-Item -Recurse -Force frontend/node_modules

# Volver a ejecutar setup
.\setup.ps1
```

---

## 🔒 Seguridad en Producción

Antes de desplegar en producción, asegúrate de:

1. **Cambiar JWT_SECRET** a un valor aleatorio seguro
2. **Cambiar contraseñas** de usuarios por defecto
3. **Cambiar credenciales** de PostgreSQL
4. **Habilitar HTTPS** (usar nginx o traefik)
5. **Configurar rate limiting**
6. **Configurar backups** automáticos de la BD
7. **Actualizar CORS** para permitir solo dominios específicos

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker-compose logs -f`
2. Verifica la sección de Solución de Problemas
3. Revisa que todos los puertos estén disponibles
4. Asegúrate de tener las últimas versiones de Docker y Node.js

---

## 📝 Próximos Pasos

Una vez instalado:
1. 🔐 Login con credenciales de admin
2. 📦 Crear productos
3. 🚚 Agregar proveedores
4. 🛒 Registrar tu primera compra
5. 💰 Registrar tu primera venta
6. 📊 Revisar el kardex de movimientos

¡El sistema está listo para usar! 🎉
