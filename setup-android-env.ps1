# Android Environment Setup Script for React Native
# Run this in PowerShell as Administrator

Write-Host "Setting up Android environment variables..." -ForegroundColor Green

# Find Android SDK location (common paths)
$androidHome = $null
$possiblePaths = @(
    "$env:LOCALAPPDATA\Android\Sdk",
    "$env:USERPROFILE\AppData\Local\Android\Sdk",
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk",
    "$env:PROGRAMFILES\Android\Android Studio\sdk",
    "${env:PROGRAMFILES(X86)}\Android\android-sdk"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $androidHome = $path
        Write-Host "Found Android SDK at: $androidHome" -ForegroundColor Yellow
        break
    }
}

if (-not $androidHome) {
    Write-Host "Android SDK not found in common locations." -ForegroundColor Red
    Write-Host "Please locate your Android SDK manually and update this script." -ForegroundColor Red
    $androidHome = Read-Host "Enter the full path to your Android SDK"
}

# Set ANDROID_HOME environment variable
Write-Host "Setting ANDROID_HOME to: $androidHome" -ForegroundColor Green
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "User")

# Update PATH with Android tools
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$platformTools = "$androidHome\platform-tools"
$cmdLineTools = "$androidHome\cmdline-tools\latest\bin"

if ($currentPath -notlike "*$platformTools*") {
    Write-Host "Adding platform-tools to PATH..." -ForegroundColor Green
    $newPath = "$currentPath;$platformTools"
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
}

if (Test-Path $cmdLineTools) {
    if ($currentPath -notlike "*$cmdLineTools*") {
        Write-Host "Adding cmdline-tools to PATH..." -ForegroundColor Green
        $newPath = [Environment]::GetEnvironmentVariable("PATH", "User") + ";$cmdLineTools"
        [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    }
}

Write-Host "`nEnvironment setup complete!" -ForegroundColor Green
Write-Host "Please restart your terminal/IDE for changes to take effect." -ForegroundColor Yellow

# Verify installation
Write-Host "`nVerifying installation..." -ForegroundColor Green
Write-Host "ANDROID_HOME: $([Environment]::GetEnvironmentVariable('ANDROID_HOME', 'User'))"
Write-Host "To verify, run these commands in a new terminal:"
Write-Host "  adb --version"
Write-Host "  gradle --version"
