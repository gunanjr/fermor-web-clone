export function slugifyCountry(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents (Curaçao -> curacao)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
