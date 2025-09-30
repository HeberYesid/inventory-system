# Script para probar el endpoint de Kardex

Write-Host ""
Write-Host "TEST KARDEX ENDPOINT" -ForegroundColor Cyan

# 1. Login
Write-Host "1. Obteniendo token..." -ForegroundColor Yellow
$loginBody = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    $token = $loginResponse.access_token
    Write-Host "Token obtenido correctamente" -ForegroundColor Green
} catch {
    Write-Host "Error en login" -ForegroundColor Red
    Write-Host $_.Exception.Message
    exit 1
}

# 2. Kardex
Write-Host "2. Consultando Kardex..." -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    $kardexResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/kardex" -Method GET -Headers $headers
    Write-Host "Kardex obtenido exitosamente" -ForegroundColor Green
    Write-Host "Total de movimientos: $($kardexResponse.Count)" -ForegroundColor Cyan
    
    if ($kardexResponse.Count -gt 0) {
        Write-Host "Primeros movimientos:" -ForegroundColor Yellow
        $kardexResponse | Select-Object -First 5 | ForEach-Object {
            Write-Host "  - $($_.type) | Producto ID: $($_.productId) | Cantidad: $($_.kilos) kg"
        }
    }
} catch {
    Write-Host "Error al consultar Kardex" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# 3. Otros datos
Write-Host "3. Verificando otros datos..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method GET -Headers $headers
    Write-Host "Productos: $($products.Count)" -ForegroundColor Green
    
    $purchases = Invoke-RestMethod -Uri "http://localhost:3000/api/purchases" -Method GET -Headers $headers
    Write-Host "Compras: $($purchases.Count)" -ForegroundColor Green
    
    $sales = Invoke-RestMethod -Uri "http://localhost:3000/api/sales" -Method GET -Headers $headers
    Write-Host "Ventas: $($sales.Count)" -ForegroundColor Green
} catch {
    Write-Host "Error al verificar otros datos" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "FIN DEL TEST" -ForegroundColor Cyan
