# Seed Database Script

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Database Seed Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Ejecutando seed en el contenedor..." -ForegroundColor Yellow
docker exec inventory-backend npx prisma db seed

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Seed ejecutado correctamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usuarios creados:" -ForegroundColor Cyan
    Write-Host "  Admin: admin / admin123" -ForegroundColor White
    Write-Host "  Secretaria: secretaria / secret123" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "⚠ Seed falló. Intentando método alternativo..." -ForegroundColor Yellow
    Write-Host ""
    
    # Método alternativo: ejecutar directamente con node
    docker exec inventory-backend node -e "
        const { PrismaClient } = require('@prisma/client');
        const bcrypt = require('bcrypt');
        
        async function seed() {
            const prisma = new PrismaClient();
            
            console.log('Seeding database...');
            
            // Hash passwords
            const adminHash = await bcrypt.hash('admin123', 10);
            const secretariaHash = await bcrypt.hash('secret123', 10);
            
            // Create users
            await prisma.user.upsert({
                where: { username: 'admin' },
                update: {},
                create: {
                    username: 'admin',
                    passwordHash: adminHash,
                    role: 'ADMIN'
                }
            });
            
            await prisma.user.upsert({
                where: { username: 'secretaria' },
                update: {},
                create: {
                    username: 'secretaria',
                    passwordHash: secretariaHash,
                    role: 'SECRETARIA'
                }
            });
            
            console.log('Seed completed!');
            await prisma.\$disconnect();
        }
        
        seed().catch(e => {
            console.error(e);
            process.exit(1);
        });
    "
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Seed ejecutado correctamente (método alternativo)!" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "✗ Seed falló. Por favor, verifica los logs." -ForegroundColor Red
    }
}

Write-Host ""
