param(
  [string]$Root = "public\videos",
  [long]$MaxBytes = 24000000
)

$ErrorActionPreference = 'Stop'
$tmpDir = Join-Path $env:TEMP 'videos-compress'
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

$files = Get-ChildItem -Path $Root -Recurse -File -Filter *.mp4 | Where-Object { $_.Length -gt 25MB } | Sort-Object Length -Descending

if (-not $files) {
  Write-Host 'No videos over 25 MB found.'
  exit 0
}

foreach ($f in $files) {
  $dur = [double](ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $f.FullName)
  $totalKbps = ($MaxBytes * 8) / ($dur * 1000)
  $videoKbps = [math]::Max(350, [math]::Round($totalKbps - 96))
  $vf = @()

  if ($videoKbps -ge 2200) {
    $videoKbps = [math]::Min($videoKbps, 5200)
  } else {
    $vf += 'scale=-2:720:flags=lanczos'
  }

  $passlog = Join-Path $tmpDir ([IO.Path]::GetFileNameWithoutExtension($f.Name) -replace '[^A-Za-z0-9_-]', '_')
  $out = "$($f.FullName).new.mp4"

  Write-Host ("Encoding {0} ({1:N1} MB, {2:N1}s) -> {3} kbps {4}" -f $f.Name, ($f.Length/1MB), $dur, $videoKbps, ($vf -join ','))

  $vfArg = @()
  if ($vf.Count -gt 0) { $vfArg = @('-vf', ($vf -join ',')) }

  & ffmpeg -hide_banner -loglevel error -y -i $f.FullName @vfArg `
    -c:v libx264 -preset medium -b:v "${videoKbps}k" -pass 1 -passlogfile $passlog `
    -an -f null NUL
  if ($LASTEXITCODE -ne 0) { throw "pass 1 failed: $($f.Name)" }

  & ffmpeg -hide_banner -loglevel error -y -i $f.FullName @vfArg `
    -c:v libx264 -preset medium -b:v "${videoKbps}k" -pass 2 -passlogfile $passlog `
    -c:a aac -b:a 96k -ac 2 -movflags +faststart -pix_fmt yuv420p $out
  if ($LASTEXITCODE -ne 0) { throw "pass 2 failed: $($f.Name)" }

  if ((Get-Item $out).Length -gt 25MB) {
    throw "Output still too large for $($f.Name): $((Get-Item $out).Length / 1MB) MB"
  }

  $moved = $false
  for ($i = 0; $i -lt 10 -and -not $moved; $i++) {
    try {
      if (Test-Path $f.FullName) { Remove-Item -Force $f.FullName -ErrorAction Stop }
      Move-Item -Force $out $f.FullName -ErrorAction Stop
      $moved = $true
    } catch {
      if ($i -eq 9) { throw }
      Start-Sleep -Seconds 3
    }
  }
  Write-Host ("  ok: {0:N1} MB" -f ((Get-Item $f.FullName).Length / 1MB))
}

Write-Host 'Done.'
