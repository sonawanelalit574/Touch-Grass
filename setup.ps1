$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$bin = Join-Path $root "bin"
$llamaDir = Join-Path $bin "llama"
$modelDir = Join-Path $root "models"
New-Item -ItemType Directory -Force -Path $bin, $modelDir | Out-Null

$server = Join-Path $llamaDir "llama-server.exe"
if (-not (Test-Path $server)) {
  $zip = Join-Path $bin "llama.zip"
  Write-Host "Downloading llama.cpp..."
  curl.exe -L --fail -o $zip "https://github.com/ggml-org/llama.cpp/releases/download/b11580/llama-b11580-bin-win-cpu-x64.zip"
  Expand-Archive -Path $zip -DestinationPath $llamaDir -Force
}

$model = Join-Path $modelDir "qwen2.5-1.5b-instruct-q4_k_m.gguf"
if (-not (Test-Path $model) -or (Get-Item $model).Length -lt 1000000000) {
  Write-Host "Downloading Qwen2.5 1.5B Instruct (about 1 GB)..."
  curl.exe -L --fail -o $model "https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf"
}

Write-Host "Ready. Start the field station with:  node server.mjs"
Write-Host "Then open http://127.0.0.1:8787"
