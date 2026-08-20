param(
  [string]$Channel = "https://www.youtube.com/@PolarComponentesBrasil/playlists",
  [string]$OutRoot = "public\videos\playlists"
)

# Downloads all public playlists of the Polar Group YouTube channel so the
# offline kiosk mirrors the channel structure. After running, ALWAYS run
# scripts/compress-videos.ps1 (Cloudflare Pages caps files at 25 MiB) and
# regenerate src/data/playlists/pt-BR.json from the downloaded folders.
#
# Requirements: Python 3 with yt-dlp (`pip install yt-dlp`), ffmpeg on PATH.

$ErrorActionPreference = 'Stop'

if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
  throw 'Python not found. Install Python 3 and run: pip install yt-dlp'
}
python -m yt_dlp --version 2>$null
if ($LASTEXITCODE -ne 0) {
  throw 'yt-dlp not installed. Run: pip install yt-dlp'
}

$playlists = python -m yt_dlp --flat-playlist -J $Channel | ConvertFrom-Json
if (-not $playlists.entries) {
  throw "No playlists found for channel: $Channel"
}

foreach ($pl in $playlists.entries) {
  if (-not $pl.id) { continue }
  $slug = ($pl.title -replace '[^A-Za-z0-9]+', '-').Trim('-').ToLower()
  $dest = Join-Path $OutRoot $slug
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Write-Host "Downloading playlist '$($pl.title)' -> $dest"

  python -m yt_dlp `
    -f "bv*[height<=720]+ba/b[height<=720]/b" `
    --merge-output-format mp4 `
    --restrict-filenames `
    --write-thumbnail --convert-thumbnails jpg `
    -o "$dest\%(playlist_index)02d - %(title).110s.%(ext)s" `
    "https://www.youtube.com/playlist?list=$($pl.id)"

  if ($LASTEXITCODE -ne 0) {
    Write-Warning "Playlist '$($pl.title)' finished with errors (some videos may be unavailable)."
  }
}

Write-Host "Done. Next steps:"
Write-Host "  1. pwsh -File scripts\compress-videos.ps1"
Write-Host "  2. Regenerate src\data\playlists\pt-BR.json from the downloaded folders"
