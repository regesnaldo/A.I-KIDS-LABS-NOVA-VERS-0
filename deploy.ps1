# A.I. KIDS LABS - PROFESSIONAL DEPLOYMENT WORKFLOW
# 
# REGRA DE OURO: Todo desenvolvimento deve ser validado no localhost primeiro
# O GitHub Pages deve ser apenas o espelho do ambiente local

Write-Host "🚀 A.I. KIDS LABS - Professional Deployment Workflow" -ForegroundColor Green
Write-Host "" 

# Step 1: Validate localhost functionality
Write-Host "🔍 Step 1: Validating localhost functionality..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5175/A.I-KIDS-LABS-NOVA-VERS-0/" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Localhost is accessible and running" -ForegroundColor Green
    } else {
        Write-Host "❌ Localhost returned status: $($response.StatusCode)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Localhost is not accessible. Please start the dev server first." -ForegroundColor Red
    Write-Host "Run: npm run dev" -ForegroundColor Cyan
    exit 1
}

# Step 2: Build for production
Write-Host "`n🏗️  Step 2: Building for production..." -ForegroundColor Yellow
try {
    Write-Host "Running: npm run build" -ForegroundColor Cyan
    $buildResult = npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "✅ Build completed successfully" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Build process failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 3: Deploy to GitHub Pages
Write-Host "`n📤 Step 3: Deploying to GitHub Pages..." -ForegroundColor Yellow

# Configure git for gh-pages
git config --global init.defaultBranch main

# Check if gh-pages branch exists, create if it doesn't
$branchExists = git branch --list gh-pages
if (-not $branchExists) {
    Write-Host "Creating gh-pages branch..." -ForegroundColor Cyan
    git checkout --orphan gh-pages
    git reset --hard
    git commit --allow-empty -m "Initialize gh-pages branch"
    git checkout main
} else {
    Write-Host "gh-pages branch already exists" -ForegroundColor Green
}

# Build and deploy using gh-pages
Write-Host "Installing gh-pages..." -ForegroundColor Cyan
npm install --save-dev gh-pages

# Add deploy script to package.json if not exists
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
if (-not $packageJson.scripts.deploy) {
    $packageJson.scripts | Add-Member -NotePropertyName "deploy" -NotePropertyValue "gh-pages -d dist -u 'github-actions-bot <support+actions@github.com>'"
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
}

# Build the project
Write-Host "Building production version..." -ForegroundColor Cyan
npm run build

# Deploy to gh-pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Cyan
npm run deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment to GitHub Pages completed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your site should be available at: https://regesnaldo.github.io/A.I-KIDS-LABS-NOVA-VERS-0/" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ PROFESSIONAL WORKFLOW COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "📝 Remember: Localhost is the source of truth. GitHub Pages is just the mirror." -ForegroundColor Cyan