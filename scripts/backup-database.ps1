# Database Backup Script for Inventory System
# Creates a timestamped backup of the PostgreSQL database

param(
    [string]$BackupDir = ".\backups",
    [string]$Container = "inventory-db",
    [string]$Database = "inventory_db",
    [string]$User = "postgres"
)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Database Backup Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Create backup directory if it doesn't exist
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
    Write-Host "✓ Created backup directory: $BackupDir" -ForegroundColor Green
}

# Generate timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupFile = "inventory_backup_$timestamp.sql"
$backupPath = Join-Path $BackupDir $backupFile

Write-Host "Backup details:" -ForegroundColor Yellow
Write-Host "  Container: $Container" -ForegroundColor White
Write-Host "  Database: $Database" -ForegroundColor White
Write-Host "  File: $backupFile" -ForegroundColor White
Write-Host ""

# Check if container is running
Write-Host "Checking if container is running..." -ForegroundColor Yellow
$containerRunning = docker ps --filter "name=$Container" --format "{{.Names}}"

if (-not $containerRunning) {
    Write-Host "✗ Container '$Container' is not running!" -ForegroundColor Red
    Write-Host "  Start it with: docker-compose up -d" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Container is running" -ForegroundColor Green
Write-Host ""

# Perform backup
Write-Host "Creating backup..." -ForegroundColor Yellow

try {
    docker exec $Container pg_dump -U $User $Database > $backupPath
    
    if ($LASTEXITCODE -eq 0) {
        $fileSize = (Get-Item $backupPath).Length / 1KB
        Write-Host ""
        Write-Host "======================================" -ForegroundColor Green
        Write-Host "✓ Backup completed successfully!" -ForegroundColor Green
        Write-Host "======================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Backup file: $backupPath" -ForegroundColor White
        Write-Host "File size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor White
        Write-Host ""
        
        # List recent backups
        Write-Host "Recent backups:" -ForegroundColor Cyan
        Get-ChildItem $BackupDir -Filter "*.sql" | 
            Sort-Object LastWriteTime -Descending | 
            Select-Object -First 5 | 
            ForEach-Object {
                $size = [math]::Round($_.Length / 1KB, 2)
                Write-Host "  $($_.Name) - $size KB - $($_.LastWriteTime)" -ForegroundColor Gray
            }
    } else {
        throw "pg_dump command failed"
    }
} catch {
    Write-Host ""
    Write-Host "✗ Backup failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "To restore this backup, run:" -ForegroundColor Yellow
Write-Host "  .\scripts\restore-database.ps1 -BackupFile `"$backupPath`"" -ForegroundColor White
Write-Host ""
