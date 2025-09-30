# 📖 Manual de Usuario - Sistema de Inventario

## Índice
1. [Inicio de Sesión](#inicio-de-sesión)
2. [Dashboard](#dashboard)
3. [Gestión de Productos](#gestión-de-productos)
4. [Gestión de Proveedores](#gestión-de-proveedores)
5. [Registro de Compras](#registro-de-compras)
6. [Registro de Ventas](#registro-de-ventas)
7. [Consulta de Kardex](#consulta-de-kardex)
8. [Roles y Permisos](#roles-y-permisos)

---

## Inicio de Sesión

### Acceso al Sistema
1. Abre tu navegador web
2. Navega a: `http://localhost:5173`
3. Ingresa tus credenciales:
   - **Usuario**: tu nombre de usuario
   - **Contraseña**: tu contraseña
   - **CAPTCHA**: resuelve la operación matemática simple

### Roles Disponibles
- **Administrador**: Acceso completo (crear, editar, eliminar)
- **Secretaria**: Acceso de consulta y registro de operaciones

---

## Dashboard

### Vista General
El dashboard muestra un resumen del estado actual del inventario:

#### Estadísticas Principales
- 📦 **Total Productos**: Número de productos registrados
- ⚖️ **Stock Total**: Suma total de kilos en inventario
- ⚠️ **Stock Bajo**: Productos con menos de 10 kg
- 🛒 **Compras**: Total de compras registradas
- 💰 **Ventas**: Total de ventas realizadas

#### Tabla de Productos Recientes
Muestra los 5 productos más recientes con:
- Nombre y descripción
- Stock actual en kilogramos
- Estado visual (Bajo/Medio/Alto)

---

## Gestión de Productos

### Ver Productos
1. Click en **"Productos"** en el menú lateral
2. Verás la lista completa con:
   - Nombre y descripción
   - Stock actual en kg
   - Estado del inventario (color coded)

### Crear Producto (Solo Admin)
1. Click en **"Nuevo Producto"**
2. Completa el formulario:
   - **Nombre**: Nombre del producto (requerido)
   - **Descripción**: Descripción detallada (opcional)
   - **Stock Inicial**: Cantidad inicial en kg (solo al crear)
3. Click en **"Guardar"**

### Editar Producto (Solo Admin)
1. Click en el ícono de lápiz ✏️ junto al producto
2. Modifica los campos necesarios
3. Click en **"Guardar"**

**Nota**: El stock NO se edita directamente, solo mediante compras y ventas.

---

## Gestión de Proveedores

### Ver Proveedores
1. Click en **"Proveedores"** en el menú lateral
2. Verás tarjetas con información de cada proveedor:
   - Nombre y ID
   - Teléfono, email, dirección
   - Balance actual

### Crear Proveedor (Solo Admin)
1. Click en **"Nuevo Proveedor"**
2. Completa el formulario:
   - **Nombre**: Nombre del proveedor (requerido)
   - **Teléfono**: Número de contacto (opcional)
   - **Email**: Correo electrónico (opcional)
   - **Dirección**: Dirección física (opcional)
3. Click en **"Guardar"**

### Editar Proveedor (Solo Admin)
1. Click en el ícono de lápiz ✏️ en la tarjeta del proveedor
2. Modifica los campos necesarios
3. Click en **"Guardar"**

---

## Registro de Compras

### Ver Compras
1. Click en **"Compras"** en el menú lateral
2. Verás una tabla con:
   - ID de compra
   - Proveedor
   - Total en pesos
   - Fecha y hora
   - Número de items

### Registrar Nueva Compra
1. Click en **"Nueva Compra"**
2. **Selecciona Proveedor**: Elige de la lista desplegable
3. **Agrega Productos**:
   - Selecciona el producto
   - Ingresa cantidad en kilos
   - Ingresa precio unitario
   - Click en **"+ Agregar Producto"** para más items
4. **Notas** (opcional): Agrega observaciones
5. Revisa el **Total** calculado automáticamente
6. Click en **"Registrar Compra"**

**Efectos**:
- ✅ Stock del producto aumenta
- ✅ Se registra en el kardex como "Entrada"
- ✅ Se asocia al proveedor

### Ejemplo
```
Proveedor: Distribuidora Central
Producto: Arroz Premium
Kilos: 100
Precio: $3,000/kg
Total: $300,000
```

---

## Registro de Ventas

### Ver Ventas
1. Click en **"Ventas"** en el menú lateral
2. Verás una tabla con:
   - ID de venta
   - Total en pesos (verde)
   - Fecha y hora
   - Número de items
   - Notas

### Registrar Nueva Venta
1. Click en **"Nueva Venta"**
2. **Agrega Productos**:
   - Selecciona producto (muestra stock disponible)
   - Ingresa cantidad en kilos
   - Ingresa precio de venta unitario
   - Click en **"+ Agregar Producto"** para más items
3. **Notas** (opcional): Agrega información del cliente
4. Revisa el **Total Venta** en verde
5. Click en **"Registrar Venta"**

**Efectos**:
- ✅ Stock del producto disminuye
- ✅ Se registra en el kardex como "Salida"
- ⚠️ Valida que haya stock suficiente

### Validaciones
- ❌ No permite vender más kilos de los disponibles
- ❌ Cantidad mínima: 0.001 kg
- ❌ Precio mínimo: $0

### Ejemplo
```
Producto: Azúcar (Stock: 50 kg)
Kilos vendidos: 10
Precio venta: $4,500/kg
Total: $45,000
Stock restante: 40 kg
```

---

## Consulta de Kardex

### ¿Qué es el Kardex?
El kardex es el registro histórico de todos los movimientos de inventario (entradas y salidas).

### Acceder al Kardex
1. Click en **"Kardex"** en el menú lateral

### Filtros Disponibles
- **Producto**: Filtra por producto específico o "Todos"
- **Desde**: Fecha inicial del rango
- **Hasta**: Fecha final del rango
- Click en **"Filtrar"** para aplicar
- Click en **"Limpiar"** para resetear

### Información Mostrada
Para cada movimiento:
- 📅 **Fecha y hora**: Cuándo ocurrió
- 📦 **Producto**: Qué producto se movió
- 🔄 **Tipo**: 
  - 🟢 **Entrada** (↑): Compra
  - 🔴 **Salida** (↓): Venta
- ⚖️ **Cantidad**: Kilos movidos
- 📊 **Balance**: Stock después del movimiento
- 🔗 **Referencia**: ID de compra/venta asociada

### Casos de Uso
1. **Auditoría**: Ver historial completo de un producto
2. **Verificación**: Confirmar movimientos por fechas
3. **Análisis**: Estudiar patrones de entrada/salida

---

## Roles y Permisos

### Administrador (ADMIN)
**Puede hacer TODO**:
- ✅ Ver dashboard y reportes
- ✅ Crear, editar productos
- ✅ Crear, editar proveedores
- ✅ Registrar compras
- ✅ Registrar ventas
- ✅ Consultar kardex

### Secretaria (SECRETARIA)
**Operaciones del día a día**:
- ✅ Ver dashboard y reportes
- ✅ Ver lista de productos (no editar)
- ✅ Ver lista de proveedores (no editar)
- ✅ Registrar compras
- ✅ Registrar ventas
- ✅ Consultar kardex

**NO puede**:
- ❌ Crear o editar productos
- ❌ Crear o editar proveedores

---

## Consejos de Uso

### ✨ Mejores Prácticas
1. **Registra inmediatamente**: Ingresa compras y ventas en el momento
2. **Usa notas**: Agrega información útil en cada transacción
3. **Verifica stock**: Antes de registrar ventas, confirma disponibilidad
4. **Revisa kardex**: Periódicamente para detectar inconsistencias
5. **Stock bajo**: Atiende los productos marcados en rojo

### ⚠️ Precauciones
- El stock NO se edita manualmente
- Las transacciones NO se pueden eliminar (por integridad)
- Verifica bien antes de confirmar compras/ventas
- Los cálculos de kilos soportan hasta 3 decimales

### 🎨 Código de Colores
- 🔴 **Rojo**: Stock bajo (<10 kg) - ¡Requiere atención!
- 🟡 **Amarillo**: Stock medio (10-50 kg) - Monitorear
- 🟢 **Verde**: Stock alto (>50 kg) - OK

---

## Atajos de Teclado

- **Esc**: Cerrar modales/formularios
- **Enter**: Confirmar formularios (cuando está en el último campo)

---

## Preguntas Frecuentes (FAQ)

### ❓ ¿Puedo eliminar una compra o venta?
No. Por integridad del kardex, las transacciones no se eliminan. Si cometiste un error, registra una transacción correctiva.

### ❓ ¿Por qué no puedo editar el stock directamente?
Para mantener trazabilidad completa. Todo cambio de stock debe venir de una compra o venta registrada.

### ❓ ¿Qué pasa si intento vender más de lo disponible?
El sistema mostrará un error y no permitirá completar la venta.

### ❓ ¿Puedo usar decimales en los kilos?
Sí, hasta 3 decimales (ej: 10.500 kg).

### ❓ ¿Cómo sé qué productos necesitan reabastecimiento?
En el dashboard, revisa la métrica "Stock Bajo" y la tabla muestra productos en rojo.

### ❓ ¿Se guardan mis sesiones?
Sí, la sesión dura 24 horas. Después debes volver a iniciar sesión.

---

## Soporte

Si tienes problemas o dudas:
1. Revisa este manual
2. Consulta la **Guía de Instalación** para problemas técnicos
3. Contacta al administrador del sistema

---

**¡Sistema listo para gestionar tu inventario eficientemente!** 🎉📦
