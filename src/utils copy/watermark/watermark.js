export function generateWatermark(title) {
  const cvs = document.createElement('canvas')
  cvs.width = 300
  cvs.height = 80
  const ctx = cvs.getContext('2d')
  ctx.fillStyle = 'rgba(255, 0, 0, 0.01)'
  ctx.font = '14px Arial'
  ctx.textBaseline = 'middle'
  ctx.fillText(title, 0, 40)
  const base64 = cvs.toDataURL()
  return `url(${base64})`
}
