export function getUniqueId() {
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

export function getUniqueName(name: string) {
  const id = getUniqueId();
  return `${id}-${name.replace(/\s/g, '-').toLowerCase()}`
}
