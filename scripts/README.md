# 🛠️ Scripts de Utilidad

Esta carpeta contiene scripts de PowerShell para automatizar tareas comunes del proyecto.

## 📋 Scripts Disponibles

### 🚀 Setup y Configuración

#### `setup.ps1`
**Descripción**: Script de instalación inicial del proyecto.

**Uso**:
```powershell
.\scripts\setup.ps1
```

**Acciones**:
- Verifica requisitos (Docker, Node.js, npm)
- Crea archivos `.env` desde `.env.example`
- Inicia servicios con Docker Compose
- Ejecuta migraciones de base de datos
- Ejecuta seed de datos iniciales

---

### 🗄️ Base de Datos

#### `backup-database.ps1`
**Descripción**: Crea un backup de la base de datos PostgreSQL.

**Uso**:
```powershell
.\scripts\backup-database.ps1
```

**Salida**:
- Archivo: `backups/backup_YYYYMMDD_HHMMSS.sql`
- Formato: SQL dump completo

**Requiere**: Docker y contenedor `inventory-db` corriendo

---

#### `restore-database.ps1`
**Descripción**: Restaura la base de datos desde un backup.

**Uso**:
```powershell
.\scripts\restore-database.ps1
```

**Interactivo**: El script te mostrará los backups disponibles y te pedirá seleccionar uno.

**⚠️ Advertencia**: Esto eliminará todos los datos actuales en la base de datos.

---

#### `seed-database.ps1`
**Descripción**: Ejecuta el seed de datos iniciales en la base de datos.

**Uso**:
```powershell
.\scripts\seed-database.ps1
```

**Crea**:
- Usuario Admin: `admin` / `admin123`
- Usuario Secretaria: `secretaria` / `secret123`

**Nota**: Si los usuarios ya existen, se actualizarán (upsert).

---

### 🧪 Testing

#### `test-kardex.ps1`
**Descripción**: Script de diagnóstico para probar el endpoint del Kardex.

**Uso**:
```powershell
.\scripts\test-kardex.ps1
```

**Verifica**:
- Login de usuario admin
- Endpoint de Kardex
- Productos, compras y ventas
- Conexión con la API

**Útil para**: Debugging y verificación de que la API funciona correctamente.

---

## 🔧 Requisitos

Todos los scripts requieren:
- ✅ **PowerShell 5.1+** (incluido en Windows 10/11)
- ✅ **Docker Desktop** corriendo
- ✅ **Contenedores iniciados** con `docker-compose up -d`

## 📝 Ejemplos de Uso

### Setup Completo del Proyecto
```powershell
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/inventory-system.git
cd inventory-system

# 2. Ejecutar setup
.\scripts\setup.ps1

# 3. Acceder al sistema
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

### Backup y Restore
```powershell
# Crear backup
.\scripts\backup-database.ps1

# Ver backups disponibles
Get-ChildItem backups\

# Restaurar desde backup
.\scripts\restore-database.ps1
# (Selecciona el backup que quieres restaurar)
```

### Troubleshooting
```powershell
# Si el Kardex no funciona
.\scripts\test-kardex.ps1

# Re-ejecutar seed si perdiste los usuarios
.\scripts\seed-database.ps1
```

---

## 🚨 Solución de Problemas

### Error: "Docker no está corriendo"
**Solución**: Inicia Docker Desktop y espera a que esté completamente iniciado (ícono verde).

### Error: "Contenedor no encontrado"
**Solución**: 
```powershell
cd ..  # Volver a la raíz del proyecto
docker-compose up -d
```

### Error: "Acceso denegado" al ejecutar scripts
**Solución**: Ejecuta PowerShell como Administrador:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "No se puede conectar a la base de datos"
**Solución**: Verifica que PostgreSQL esté corriendo:
```powershell
docker-compose ps
# El contenedor inventory-db debe estar "Up" y "healthy"
```

---

## 🔐 Seguridad

- ⚠️ Los scripts **NO deben ejecutarse en producción** sin revisión
- ⚠️ Los backups pueden contener datos sensibles
- ⚠️ Mantén la carpeta `backups/` fuera del control de versiones (ya está en `.gitignore`)

---

## 🤝 Contribuir

¿Tienes ideas para nuevos scripts? Ver [CONTRIBUTING.md](../docs/CONTRIBUTING.md)

Sugerencias de scripts útiles:
- `check-health.ps1` - Verificar salud de todos los servicios
- `logs.ps1` - Ver logs de todos los contenedores
- `reset-dev.ps1` - Resetear entorno de desarrollo
- `deploy.ps1` - Deployment automatizado

---

**[← Volver al README principal](../README.md)**
