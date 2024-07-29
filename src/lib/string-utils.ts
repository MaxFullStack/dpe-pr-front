export const formatTitle = (title: string): string => {
  return title.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}
