# 🚀 Instrucciones para Subir a GitHub

## Pasos para crear el repositorio en GitHub

### 1. Crear repositorio en GitHub
1. Ve a https://github.com/new
2. **Repository name**: `inventory-system` (o el nombre que prefieras)
3. **Description**: Sistema de Compras, Ventas e Inventario - MVP con NestJS y React
4. **Visibility**: 
   - ✅ **Public** (recomendado para portfolio)
   - Private (si prefieres mantenerlo privado)
5. **NO marques**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   
   (Ya tenemos estos archivos)

6. Click en **"Create repository"**

### 2. Conectar y subir el código

Una vez creado el repositorio, GitHub te mostrará instrucciones. Ejecuta estos comandos:

```powershell
# Asegúrate de estar en el directorio del proyecto
cd C:\Users\HeberYesid\CascadeProjects\inventory-system

# Agregar el remote (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/inventory-system.git

# Renombrar la rama a main (estándar actual de GitHub)
git branch -M main

# Subir el código
git push -u origin main
```

**Ejemplo con usuario real:**
```powershell
git remote add origin https://github.com/heberyesid/inventory-system.git
git branch -M main
git push -u origin main
```

### 3. Verificar que se subió correctamente

1. Refresca la página de tu repositorio en GitHub
2. Deberías ver:
   - ✅ README.md como página principal
   - ✅ Todos los archivos y carpetas
   - ✅ Tu commit inicial

---

## 📝 Configurar Secrets para CI/CD (Opcional)

Si más adelante quieres configurar GitHub Actions para deployment automático:

1. Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**
2. Agrega estos secrets:
   - `JWT_SECRET`: Tu clave secreta JWT
   - `DATABASE_URL`: URL de tu base de datos en producción
   - Otros secrets según necesites

---

## 🏷️ Agregar Topics al Repositorio

Para mejor visibilidad, agrega estos topics en GitHub:

1. Ve a tu repositorio en GitHub
2. Click en el ⚙️ (settings) al lado derecho, debajo de "About"
3. Agrega estos topics:
   - `nestjs`
   - `react`
   - `typescript`
   - `prisma`
   - `postgresql`
   - `docker`
   - `tailwindcss`
   - `inventory-management`
   - `mvp`
   - `api-rest`

---

## 📸 Agregar Screenshots (Recomendado)

Para hacer tu repositorio más atractivo:

1. Crea una carpeta `screenshots/` en el proyecto
2. Toma capturas de pantalla de:
   - Dashboard
   - Login
   - Gestión de productos
   - Registro de compras/ventas
   - Kardex
3. Agrégalas a Git:
   ```powershell
   git add screenshots/
   git commit -m "docs: add screenshots"
   git push
   ```
4. Actualiza el README.md para incluir las imágenes

---

## 🔒 Seguridad - ¡IMPORTANTE!

### ✅ Lo que YA está protegido:
- ✅ Archivos `.env` están en `.gitignore`
- ✅ `node_modules/` no se suben
- ✅ Logs y archivos temporales excluidos
- ✅ `.env.example` está incluido (sin datos sensibles)

### ⚠️ VERIFICA antes de hacer push:
```powershell
# Ver qué archivos se subirán
git status

# Verificar que NO haya archivos sensibles
git ls-files | Select-String ".env" | Where-Object { $_ -notmatch ".env.example" }
```

Si aparece algún archivo `.env` sin `.example`, **NO HAGAS PUSH**. Elimínalo primero:
```powershell
git rm --cached backend/.env
git rm --cached frontend/.env
git commit -m "fix: remove sensitive env files"
```

---

## 🎯 Comandos Git Útiles

### Ver estado
```powershell
git status
```

### Agregar cambios
```powershell
# Agregar todos los archivos modificados
git add .

# Agregar archivo específico
git add archivo.txt
```

### Hacer commit
```powershell
git commit -m "tipo: descripción breve"
```

**Tipos de commit comunes:**
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Subir cambios
```powershell
git push
```

### Ver historial
```powershell
git log --oneline
```

### Crear nueva rama
```powershell
git checkout -b feature/nueva-funcionalidad
```

---

## 📋 Checklist Final

Antes de compartir tu repositorio:

- [ ] ✅ Commit inicial hecho
- [ ] ✅ Remote configurado
- [ ] ✅ Push a GitHub completado
- [ ] ✅ README.md se ve bien en GitHub
- [ ] ✅ No hay archivos sensibles (.env) en el repo
- [ ] ✅ Topics agregados al repositorio
- [ ] ✅ Description agregada al repositorio
- [ ] ✅ License visible (MIT)
- [ ] 📸 Screenshots agregadas (opcional pero recomendado)
- [ ] 🔗 URL del repo agregada a tu portfolio

---

## 🌟 Promocionar tu Proyecto

Una vez en GitHub:

1. **LinkedIn**: Comparte el proyecto
2. **Portfolio**: Agrega el link
3. **README Badge**: Agrega badges al README:
   ```markdown
   ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
   ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
   ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
   ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
   ```

---

## 🆘 Problemas Comunes

### "Authentication failed"
```powershell
# Necesitas configurar tu token de GitHub
# Ve a: GitHub → Settings → Developer settings → Personal access tokens
# Crea un token y úsalo como contraseña al hacer push
```

### "Remote origin already exists"
```powershell
# Eliminar el remote anterior y agregar el nuevo
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/inventory-system.git
```

### "Branch 'main' doesn't exist"
```powershell
git branch -M main
git push -u origin main
```

---

¡Tu proyecto está listo para GitHub! 🎉
