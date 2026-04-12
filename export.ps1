# 1. Danh sách các cổng
$gates = "AND", "OR", "NOT", "NAND", "NOR", "XOR"

foreach ($name in $gates) {
    # Chuyển AND -> And, NAND -> Nand để làm tên Component
    $titleName = (Get-Culture).TextInfo.ToTitleCase($name.ToLower())
    $componentName = $titleName + "Gate"
    
    $inputPath  = "./models/$name.glb"
    $outputPath = "./public/$componentName.jsx"

    Write-Host "--- Processing: $name ---" -ForegroundColor Cyan

    # Kiểm tra file đầu vào trước khi chạy npx
    if (Test-Path $inputPath) {
        # 2. Chạy npx gltfjsx
        npx gltfjsx $inputPath -o $outputPath -T -E

        # 3. Thay thế 'Model' bằng tên Component (ví dụ: AndGate)
        if (Test-Path $outputPath) {
            (Get-Content $outputPath).Replace('Model', $componentName) | Set-Content $outputPath

            Write-Host "Success: Created $componentName" -ForegroundColor Green
        }
    } else {
        Write-Warning "Skip: File $inputPath not found."
    }
}
Remove-Item -Path "./public/*.jsx"