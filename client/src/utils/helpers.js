export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

export const getRatingLabel = (r) =>
  ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent'][r] ?? ''

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
