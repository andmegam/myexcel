// Pure functions
export function capitalize(methodName) {
  if (typeof methodName !== 'string') {
    return
  }
  return methodName.charAt(0).toUpperCase() + methodName.slice(1)
}
