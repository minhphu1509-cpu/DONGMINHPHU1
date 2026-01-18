# Script để push toàn bộ source code lên GitHub
# Chạy script này trong PowerShell tại thư mục dự án

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Push Source Code lên GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra xem Git đã được cài đặt chưa
try {
    $gitVersion = git --version
    Write-Host "✅ Git đã được cài đặt: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git chưa được cài đặt!" -ForegroundColor Red
    Write-Host "Vui lòng tải và cài đặt Git từ: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Sau khi cài đặt, khởi động lại PowerShell và chạy lại script này." -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""

# Di chuyển đến thư mục dự án
$projectPath = "c:\Users\DMP LAMSON\OneDrive\Máy tính\website-dongminhphu"
Set-Location $projectPath
Write-Host "📁 Đang ở thư mục: $projectPath" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra các thư mục quan trọng
Write-Host "🔍 Kiểm tra các thư mục cần thiết..." -ForegroundColor Cyan
$requiredFolders = @("app", "components", "public", "lib")
$allFoldersExist = $true

foreach ($folder in $requiredFolders) {
    if (Test-Path $folder) {
        Write-Host "  ✅ $folder/" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $folder/ - KHÔNG TÌM THẤY!" -ForegroundColor Red
        $allFoldersExist = $false
    }
}

if (-not $allFoldersExist) {
    Write-Host ""
    Write-Host "❌ Thiếu một số thư mục quan trọng!" -ForegroundColor Red
    Write-Host "Không thể tiếp tục push." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Bắt đầu Git Operations" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Git status
Write-Host "📊 Git Status:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Add tất cả files
Write-Host "➕ Adding tất cả files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Hoàn tất git add" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = "Add all source code folders (app, components, public, lib)"
git commit -m $commitMessage
Write-Host "✅ Hoàn tất git commit" -ForegroundColor Green
Write-Host ""

# Push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "Repository: github.com/dongminhphuveo3-sudo/dongminhphu" -ForegroundColor Cyan
Write-Host "Branch: main" -ForegroundColor Cyan
Write-Host ""

try {
    git push origin main
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✅ PUSH THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tiếp theo:" -ForegroundColor Cyan
    Write-Host "1. Truy cập Vercel Dashboard" -ForegroundColor White
    Write-Host "2. Click 'Redeploy' để deploy lại" -ForegroundColor White
    Write-Host "3. Hoặc đợi auto-deploy kích hoạt" -ForegroundColor White
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "❌ PUSH THẤT BẠI!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Lỗi: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Có thể bạn cần:" -ForegroundColor Yellow
    Write-Host "1. Đăng nhập GitHub: git config --global user.name 'Your Name'" -ForegroundColor White
    Write-Host "2. Cấu hình email: git config --global user.email 'your@email.com'" -ForegroundColor White
    Write-Host "3. Hoặc push với force: git push -f origin main" -ForegroundColor White
}

Write-Host ""
pause
