# Database Restore Script for Inventory System
# Restores database from a backup file

param(
    [Parameter(Mandatory=$true)]
    [string]$BackupFile,
    [string]$Container = "inventory-db",
    [string]$Database = "inventory_db",
    [string]$User = "postgres"
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Database Restore Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if backup file exists
if (-not (Test-Path $BackupFile)) {
    Write-Host "✗ Backup file not found: $BackupFile" -ForegroundColor Red
    exit 1
}

$fileSize = (Get-Item $BackupFile).Length / 1KB
Write-Host "Restore details:" -ForegroundColor Yellow
Write-Host "  Container: $Container" -ForegroundColor White
Write-Host "  Database: $Database" -ForegroundColor White
Write-Host "  Backup file: $BackupFile" -ForegroundColor White
Write-Host "  File size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor White
Write-Host ""

# Warning
Write-Host "⚠️  WARNING: This will overwrite the current database!" -ForegroundColor Red
Write-Host ""
$confirmation = Read-Host "Type 'YES' to continue"

if ($confirmation -ne 'YES') {
    Write-Host "Restore cancelled." -ForegroundColor Yellow
    exit 0
}

# Check if container is running
Write-Host ""
Write-Host "Checking if container is running..." -ForegroundColor Yellow
$containerRunning = docker ps --filter "name=$Container" --format "{{.Names}}"

if (-not $containerRunning) {
    Write-Host "✗ Container '$Container' is not running!" -ForegroundColor Red
    Write-Host "  Start it with: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Container is running" -ForegroundColor Green
Write-Host ""

# Perform restore
Write-Host "Restoring database..." -ForegroundColor Yellow
Write-Host "  This may take a few moments..." -ForegroundColor Gray
Write-Host ""

try {
    # Drop existing connections
    docker exec $Container psql -U $User -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$Database' AND pid <> pg_backend_pid();" | Out-Null
    
    # Drop and recreate database
    docker exec $Container psql -U $User -d postgres -c "DROP DATABASE IF EXISTS $Database;" | Out-Null
    docker exec $Container psql -U $User -d postgres -c "CREATE DATABASE $Database;" | Out-Null
    
    # Restore backup
    Get-Content $BackupFile | docker exec -i $Container psql -U $User -d $Database
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "======================================" -ForegroundColor Green
        Write-Host "✓ Database restored successfully!" -ForegroundColor Green
        Write-Host "======================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "The application is ready to use." -ForegroundColor White
    } else {
        throw "Restore command failed"
    }
} catch {
    Write-Host ""
    Write-Host "✗ Restore failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "The database may be in an inconsistent state." -ForegroundColor Yellow
    Write-Host "You may need to restart the backend service:" -ForegroundColor Yellow
    Write-Host "  docker-compose restart backend" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "⚠️  Remember to restart the backend service:" -ForegroundColor Yellow
Write-Host "  docker-compose restart backend" -ForegroundColor White
Write-Host ""
