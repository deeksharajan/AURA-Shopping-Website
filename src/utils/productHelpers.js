// Categories that require a size selection
export const SIZED_CATEGORIES = ['shoes', 'clothes']

export function needsSize(category) {
  return SIZED_CATEGORIES.includes(category)
}

// Maps an internal size key (S/M/L/XL) to a display label.
// Shoes use US sizing labels; everything else uses the raw key.
export function getSizeLabel(category, sizeKey) {
  if (category === 'shoes') {
    const shoeMap = { S: 'US 8', M: 'US 9', L: 'US 10', XL: 'US 11' }
    return shoeMap[sizeKey] || sizeKey
  }
  return sizeKey
}

// Default size to use for a product depending on whether it needs sizing.
// 'OS' = One Size, used for sizeless categories (bags, accessories).
export function getDefaultSize(category) {
  return needsSize(category) ? 'M' : 'OS'
}
