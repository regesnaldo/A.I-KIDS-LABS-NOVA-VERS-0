# A.I. KIDS LABS - PROFESSIONAL DEPLOYMENT WORKFLOW
# 
# REGRA DE OURO: Todo desenvolvimento deve ser validado no localhost primeiro
# O GitHub Pages deve ser apenas o espelho do ambiente local

Write-Host "===========================================" -ForegroundColor Green
Write-Host "A.I. KIDS LABS - Professional Deployment" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green

# Validate localhost functionality
Write-Host "`r`n[1/4] Validating localhost functionality..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5175/A.I-KIDS-LABS-NOVA-VERS-0/" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "[SUCCESS] Localhost is accessible and running" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Localhost returned status: $($response.StatusCode)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "[ERROR] Localhost is not accessible. Please start the dev server first." -ForegroundColor Red
    Write-Host "Run: npm run dev" -ForegroundColor Cyan
    exit 1
}

# Build for production
Write-Host "`r`n[2/4] Building for production..." -ForegroundColor Yellow
try {
    Write-Host "Running: npm run build" -ForegroundColor Cyan
    $buildResult = npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Build failed!" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "[SUCCESS] Build completed successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] Build process failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Deploy to GitHub Pages
Write-Host "`r`n[3/4] Deploying to GitHub Pages..." -ForegroundColor Yellow

# Install gh-pages if not already installed
Write-Host "Installing gh-pages if needed..." -ForegroundColor Cyan
npm install --save-dev gh-pages

# Deploy using npm script
Write-Host "Running deployment..." -ForegroundColor Cyan
npm run deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Deployment to GitHub Pages completed successfully!" -ForegroundColor Green
    Write-Host "Your site should be available at: https://regesnaldo.github.io/A.I-KIDS-LABS-NOVA-VERS-0/" -ForegroundColor Cyan
} else {
    Write-Host "[ERROR] Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`r`n[4/4] PROFESSIONAL WORKFLOW COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "Remember: Localhost is the source of truth. GitHub Pages is just the mirror." -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Green