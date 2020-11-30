export function getSiteMeta() {
  return {
    title: process.env.NEXT_PUBLIC_PB_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_PB_SITE_DESCRIPTION,
    domain: process.env.PB_DOMAIN,
  }
}