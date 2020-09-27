export function isElement(value: any): value is Element {
  if (!value) return false
  return value instanceof Element
}