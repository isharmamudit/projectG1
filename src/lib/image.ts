/**
 * Client-side resize/compress before an attachment ever leaves the browser —
 * keeps requests well under Vercel's serverless body-size cap and the
 * backend's per-request payload small. Draws the source image onto a canvas
 * capped at maxEdge on its longest side, then re-encodes as JPEG at the
 * given quality.
 */
export async function compressImageFile(
  file: File,
  { maxEdge = 1280, quality = 0.8 }: { maxEdge?: number; quality?: number } = {},
): Promise<{ dataUrl: string; mimeType: string }> {
  const sourceUrl = URL.createObjectURL(file)
  try {
    const img = await loadImage(sourceUrl)
    const scale = Math.min(1, maxEdge / Math.max(img.width, img.height))
    const width = Math.round(img.width * scale)
    const height = Math.round(img.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas context unavailable')
    ctx.drawImage(img, 0, 0, width, height)

    const dataUrl = canvas.toDataURL('image/jpeg', quality)
    return { dataUrl, mimeType: 'image/jpeg' }
  } finally {
    URL.revokeObjectURL(sourceUrl)
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}
