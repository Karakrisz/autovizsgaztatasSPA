// server/api/variations.ts
import { defineSitemapEventHandler } from '#imports'

const fixedLastMod = new Date('2025-09-21').toISOString()

// Sitemap típusok a nuxt-sitemap modulból
type Changefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

interface Variation {
  id: string
  varos: string
  kerulet: string
  kulcsszo: string
  szolgaltatas: string
  extra: string
  ev: number
  title: string
  meta_description: string
  body: string
  image_url: string
  video_url?: string // Opcionális videó URL
}

import variaciok from '../data/muszakivizsga_budapest.json'

// Nuxt 3 Sitemap modul által elvárt formátum
export default defineSitemapEventHandler(async () => {
  try {
    const variations: Variation[] = variaciok as Variation[]
    const baseUrl = process.env.BASE_URL || 'http://auto-vizsgaztatas.hu/'

    // A sitemap modulnak megfelelő formátum
    return variations.map((variation: Variation) => {
      // ID alapú URL generálás
      const slugUrl = `/muszakivizsgaztatas/${variation.id}`
      
      // Teljes kép URL (dinamikus, az adatból)
      const fullImageUrl = variation.image_url?.startsWith('http')
        ? variation.image_url
        : `${baseUrl}${variation.image_url}`

      return {
        loc: slugUrl,
        lastmod: fixedLastMod,
        changefreq: 'monthly' as Changefreq,
        priority: 0.8,
        // A _images mező a nuxt-sitemap modulban használatos a képekhez
        _images: [
          {
            url: fullImageUrl,
            title: variation.title || `${variation.szolgaltatas} ${variation.kerulet}`,
            caption: variation.meta_description || `${variation.szolgaltatas} ${variation.kerulet}`,
            // Opcionális mezők
            license: 'http://auto-vizsgaztatas.hu/license',
            geoLocation: 'Budapest, Hungary',
          }
        ],
        // Alternatív módszer, ha a fenti nem működik
        images: [
          {
            loc: fullImageUrl,
            title: variation.title || `${variation.szolgaltatas} ${variation.kerulet}`,
            caption: variation.meta_description || `${variation.szolgaltatas} ${variation.kerulet}`,
          }
        ]
      }
    })
  } catch (error) {
    console.error('Error generating sitemap for variations:', error)
    return []
  }
})