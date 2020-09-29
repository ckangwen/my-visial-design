export function isElement(value: any): value is Element {
  if (!value) return false
  return value instanceof Element
}


export function deepset(target: Record<string, any>, key: string, value: any) {
  const segments = key.split('.')
  if (segments.length === 1) {
    target[key] = value
    return
  }
  for (let i = 0; i < segments.length - 1; i++) {
    if (!target) return
    target = target[segments[i]]
  }
  target && (target[segments[segments.length - 1]] = value)
}

export const swip = (arr, fromIndex, toIndex) => {
  arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0];
  return arr;
}
