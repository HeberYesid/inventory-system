# 📚 API Documentation - Sistema de Inventario

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints (except `/auth/login`) require JWT authentication.

**Header:**
```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication

### Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:** `201 Created`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
}
```

**Errors:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Missing fields

---

## 📦 Products

### Get All Products
**Endpoint:** `GET /products`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Arroz Blanco Premium",
    "description": "Arroz blanco de primera calidad",
    "stockKilos": "100.000",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

### Get Product by ID
**Endpoint:** `GET /products/:id`

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Arroz Blanco Premium",
  "description": "Arroz blanco de primera calidad",
  "stockKilos": "100.000",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Errors:**
- `404 Not Found`: Product not found

### Create Product
**Endpoint:** `POST /products` (Admin only)

**Body:**
```json
{
  "name": "Azúcar Refinada",
  "description": "Azúcar refinada para consumo",
  "stockKilos": 0
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "name": "Azúcar Refinada",
  "description": "Azúcar refinada para consumo",
  "stockKilos": "0.000",
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Errors:**
- `403 Forbidden`: Not admin
- `400 Bad Request`: Invalid data

### Update Product
**Endpoint:** `PUT /products/:id` (Admin only)

**Body:**
```json
{
  "name": "Azúcar Refinada Premium",
  "description": "Nueva descripción"
}
```

**Response:** `200 OK`

**Errors:**
- `403 Forbidden`: Not admin
- `404 Not Found`: Product not found

---

## 🚚 Suppliers

### Get All Suppliers
**Endpoint:** `GET /suppliers`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Proveedor Central S.A.",
    "balance": "0.00",
    "phone": "3001234567",
    "email": "contacto@proveedorcentral.com",
    "address": "Calle 100 #50-25, Bogotá",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

### Get Supplier by ID
**Endpoint:** `GET /suppliers/:id`

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Proveedor Central S.A.",
  "balance": "0.00",
  "phone": "3001234567",
  "email": "contacto@proveedorcentral.com",
  "address": "Calle 100 #50-25, Bogotá",
  "purchases": [
    {
      "id": 1,
      "total": "500000.00",
      "date": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### Create Supplier
**Endpoint:** `POST /suppliers` (Admin only)

**Body:**
```json
{
  "name": "Distribuidora El Norte",
  "phone": "3109876543",
  "email": "ventas@elnorte.com",
  "address": "Carrera 15 #80-30, Medellín"
}
```

**Response:** `201 Created`

### Update Supplier
**Endpoint:** `PUT /suppliers/:id` (Admin only)

**Body:**
```json
{
  "phone": "3001234567"
}
```

**Response:** `200 OK`

---

## 🛒 Purchases

### Get All Purchases
**Endpoint:** `GET /purchases`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "supplierId": 1,
    "total": "500000.00",
    "date": "2024-01-01T10:00:00.000Z",
    "notes": "Compra inicial de inventario",
    "supplier": {
      "id": 1,
      "name": "Proveedor Central S.A."
    },
    "items": [
      {
        "id": 1,
        "productId": 1,
        "kilos": "100.000",
        "unitPrice": "3000.00",
        "subtotal": "300000.00",
        "product": {
          "id": 1,
          "name": "Arroz Blanco Premium"
        }
      }
    ]
  }
]
```

### Get Purchase by ID
**Endpoint:** `GET /purchases/:id`

**Response:** `200 OK`

### Create Purchase
**Endpoint:** `POST /purchases`

**Body:**
```json
{
  "supplierId": 1,
  "items": [
    {
      "productId": 1,
      "kilos": 100,
      "unitPrice": 3000
    },
    {
      "productId": 2,
      "kilos": 50,
      "unitPrice": 4000
    }
  ],
  "notes": "Compra semanal"
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "supplierId": 1,
  "total": "500000.00",
  "date": "2024-01-01T10:00:00.000Z",
  "notes": "Compra semanal",
  "supplier": {...},
  "items": [...]
}
```

**Effects:**
1. Creates purchase record
2. Increases product stock
3. Creates kardex entries (IN)

**Errors:**
- `404 Not Found`: Supplier or product not found
- `400 Bad Request`: Invalid data

---

## 💰 Sales

### Get All Sales
**Endpoint:** `GET /sales`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "total": "90000.00",
    "date": "2024-01-01T11:00:00.000Z",
    "notes": "Venta al por mayor",
    "items": [
      {
        "id": 1,
        "productId": 1,
        "kilos": "20.000",
        "unitPrice": "4500.00",
        "subtotal": "90000.00",
        "product": {
          "id": 1,
          "name": "Arroz Blanco Premium"
        }
      }
    ]
  }
]
```

### Get Sale by ID
**Endpoint:** `GET /sales/:id`

**Response:** `200 OK`

### Create Sale
**Endpoint:** `POST /sales`

**Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "kilos": 20,
      "unitPrice": 4500
    }
  ],
  "notes": "Venta cliente Juan Pérez"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "total": "90000.00",
  "date": "2024-01-01T11:00:00.000Z",
  "notes": "Venta cliente Juan Pérez",
  "items": [...]
}
```

**Effects:**
1. Creates sale record
2. Decreases product stock
3. Creates kardex entries (OUT)

**Errors:**
- `400 Bad Request`: Insufficient stock
- `404 Not Found`: Product not found

---

## 📊 Kardex

### Get Kardex Movements
**Endpoint:** `GET /kardex`

**Query Parameters:**
- `product_id` (optional): Filter by product ID
- `from` (optional): Start date (ISO 8601)
- `to` (optional): End date (ISO 8601)

**Examples:**
```
GET /kardex
GET /kardex?product_id=1
GET /kardex?from=2024-01-01&to=2024-01-31
GET /kardex?product_id=1&from=2024-01-01&to=2024-01-31
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "productId": 1,
    "type": "IN",
    "kilos": "100.000",
    "balanceAfter": "100.000",
    "date": "2024-01-01T10:00:00.000Z",
    "reference": "PURCHASE-1",
    "notes": "Compra inicial",
    "product": {
      "id": 1,
      "name": "Arroz Blanco Premium"
    }
  },
  {
    "id": 2,
    "productId": 1,
    "type": "OUT",
    "kilos": "20.000",
    "balanceAfter": "80.000",
    "date": "2024-01-01T11:00:00.000Z",
    "reference": "SALE-1",
    "notes": "Venta de 20 kg",
    "product": {
      "id": 1,
      "name": "Arroz Blanco Premium"
    }
  }
]
```

---

## 🔒 Authorization Matrix

| Endpoint | Admin | Secretaria |
|----------|-------|------------|
| POST /auth/login | ✅ | ✅ |
| GET /products | ✅ | ✅ |
| POST /products | ✅ | ❌ |
| PUT /products/:id | ✅ | ❌ |
| GET /suppliers | ✅ | ✅ |
| POST /suppliers | ✅ | ❌ |
| PUT /suppliers/:id | ✅ | ❌ |
| GET /purchases | ✅ | ✅ |
| POST /purchases | ✅ | ✅ |
| GET /sales | ✅ | ✅ |
| POST /sales | ✅ | ✅ |
| GET /kardex | ✅ | ✅ |

---

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "kilos must be a positive number"
  ],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Producto con ID 999 no encontrado",
  "error": "Not Found"
}
```

---

## 📝 Validation Rules

### Products
- `name`: Required, string
- `description`: Optional, string
- `stockKilos`: Optional, number >= 0

### Suppliers
- `name`: Required, string
- `phone`: Optional, string
- `email`: Optional, valid email
- `address`: Optional, string

### Purchases
- `supplierId`: Required, integer
- `items`: Required, array (min 1)
  - `productId`: Required, integer
  - `kilos`: Required, number > 0
  - `unitPrice`: Required, number >= 0
- `notes`: Optional, string

### Sales
- `items`: Required, array (min 1)
  - `productId`: Required, integer
  - `kilos`: Required, number > 0
  - `unitPrice`: Required, number >= 0
- `notes`: Optional, string

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Products (with auth)
```bash
curl http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Purchase
```bash
curl -X POST http://localhost:3000/api/purchases \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "supplierId": 1,
    "items": [
      {"productId": 1, "kilos": 50, "unitPrice": 3000}
    ],
    "notes": "Test purchase"
  }'
```

---

## 📊 Data Types

- **Decimal fields** (prices, quantities): Up to 3 decimal places for kilos, 2 for currency
- **Dates**: ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- **IDs**: Positive integers

---

## 🔄 Transaction Behavior

### Purchase Flow
1. Validate supplier exists
2. Validate all products exist
3. Calculate total
4. Begin transaction:
   - Create purchase record
   - Create purchase items
   - Update product stocks (+)
   - Create kardex entries (IN)
5. Commit or rollback

### Sale Flow
1. Validate products exist
2. Validate sufficient stock
3. Calculate total
4. Begin transaction:
   - Create sale record
   - Create sale items
   - Update product stocks (-)
   - Create kardex entries (OUT)
5. Commit or rollback

**All operations are atomic** - either all succeed or all fail.
