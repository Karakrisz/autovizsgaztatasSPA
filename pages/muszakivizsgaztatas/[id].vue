<script setup lang="ts">
import { useRoute, useSeoMeta, useFetch, useHead } from '#imports'
import { computed, ref } from 'vue'

const route = useRoute()

// Lekérjük az összes műszaki vizsgáztatási variációt
const {
  data: variaciok,
  pending,
  error,
} = await useFetch<any[]>('/api/technical_exam_variations')

// Az aktuális rekord megtalálása ID alapján
const foundData = computed(() => {
  const list = variaciok.value || []
  const id = route.params.id as string
  return list.find((item) => item.id === id) || null
})

// Kapcsolódó bejegyzések kiszámítása (a következő 6 rekord)
const relatedPosts = computed(() => {
  if (!foundData.value || !variaciok.value) return []

  const allItems = variaciok.value || []
  // Megkeressük az aktuális rekord indexét
  const currentIndex = allItems.findIndex(
    (item) => item.id === foundData.value?.id
  )

  if (currentIndex === -1) return []

  // Kiválasztjuk a következő 6 rekordot (körkörös indexeléssel)
  const nextItems = []
  for (let i = 1; i <= 6; i++) {
    // Körkörös indexelés: ha túlmegyünk a tömb végén, elölről kezdjük
    const nextIndex = (currentIndex + i) % allItems.length
    nextItems.push(allItems[nextIndex])
  }

  return nextItems
})

// URL generálás a kapcsolódó bejegyzésekhez (ID alapú)
function getRecordUrl(item: any) {
  return `/muszakivizsgaztatas/${item.id}`
}

// SEO meta beállítások
useSeoMeta({
  title: foundData.value?.title || 'Műszaki vizsgáztatás',
  description: foundData.value?.meta_description
    ? foundData.value.meta_description +
      ' Szakértő csapatunk segít a sikeres műszaki vizsgában. 4,4/5 csillag, 433 vélemény alapján. Kérjen ajánlatot!'
    : 'Műszaki vizsgáztatás szolgáltatások',
  ogTitle: foundData.value?.title || 'Műszaki vizsgáztatás',
  ogDescription: foundData.value?.meta_description
    ? foundData.value.meta_description +
      ' Szakértő csapatunk segít a sikeres műszaki vizsgában. 4,4/5 csillag, 433 vélemény alapján.'
    : 'Műszaki vizsgáztatás szolgáltatások',
  ogImage:
    foundData.value?.image_url ||
    'https://www.auto-vizsgaztatas.hu/img/default.jpg',
  ogUrl: `https://www.auto-vizsgaztatas.hu${route.fullPath}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: foundData.value?.title || 'Műszaki vizsgáztatás',
  twitterDescription: foundData.value?.meta_description
    ? foundData.value.meta_description + ' 4,4/5 csillag, 433 vélemény alapján.'
    : 'Műszaki vizsgáztatás szolgáltatások',
  twitterImage:
    foundData.value?.image_url ||
    'https://www.auto-vizsgaztatas.hu/img/default.jpg',
})

// Canonical URL külön beállítása
useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://www.auto-vizsgaztatas.hu${route.fullPath}`,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: foundData.value?.title || 'Műszaki vizsgáztatás',
        description:
          foundData.value?.meta_description ||
          'Műszaki vizsgáztatás szolgáltatások',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Budapest',
          addressRegion: foundData.value?.kerulet || 'Budapest',
          addressCountry: 'HU',
        },
        serviceType: foundData.value?.szolgaltatas || 'Műszaki vizsgáztatás',
        areaServed: foundData.value?.kerulet || 'Budapest',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.4',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '433',
        },
        priceRange: '$',
        url: `https://www.auto-vizsgaztatas.hu${route.fullPath}`,
        image:
          foundData.value?.image_url ||
          'https://www.auto-vizsgaztatas.hu/img/default.jpg',
        telephone: '+36703302184',
        openingHours: ['H-P 07:00-16:00'],
      }),
    },
  ],

})
</script>
<template>
  <div class="technical-exam-page SEO">
    <!-- Loading/Error states -->
    <div v-if="pending" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Információk betöltése...</p>
    </div>

    <div v-else-if="!foundData" class="error-state">
      <div class="error-container">
        <h2>Az oldal nem található</h2>
        <p>Sajnáljuk, de a keresett információ nem érhető el.</p>
        <NuxtLink to="/" class="btn btn-primary">Vissza a főoldalra</NuxtLink>
      </div>
    </div>

    <template v-else>
      <!-- Hero section -->
      <section
        class="hero"
        :style="{ backgroundImage: `url(${foundData.image_url})` }"
      >
        <div class="hero__overlay"></div>
        <div class="container">
          <div class="hero__content">
            <h1 class="hero__title">{{ foundData.title }}</h1>
            <p class="hero__subtitle">{{ foundData.meta_description }}</p>
            <NuxtLink to="/idopontfoglalas" class="btn btn-primary hero__cta"
              >Időpont foglalás</NuxtLink
            >
          </div>
        </div>
      </section>

      <!-- Breadcrumbs -->
      <div class="container">
        <nav class="breadcrumbs">
          <ul class="breadcrumbs__list">
            <li><NuxtLink to="/">Főoldal</NuxtLink></li>
            <li><span class="separator">/</span></li>
            <li>
              <span class="current">{{ foundData.title }}</span>
            </li>
          </ul>
        </nav>

        <!-- Main content area -->
        <div class="content-grid">
          <!-- Main column -->
          <main class="content-main">
            <!-- Quick info cards -->
            <div class="info-cards">
              <div class="info-card">
                <div class="info-card__icon">
                  <i class="fas fa-tools"></i>
                </div>
                <div class="info-card__content">
                  <h3>Professzionális Szolgáltatás</h3>
                  <p>Hivatalos vizsgaállomás, teljes körű ügyintézés</p>
                </div>
              </div>
              <div class="info-card">
                <div class="info-card__icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="info-card__content">
                  <h4>Gyors Kiszolgálás</h4>
                  <p>Gyors időpontfoglalás, átlátható folyamat</p>
                </div>
              </div>
              <div class="info-card">
                <div class="info-card__icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div class="info-card__content">
                  <h5>Megbízhatóság</h5>
                  <p>Előzetes átvizsgálás, sikeres vizsgáztatás</p>
                </div>
              </div>
            </div>

            <!-- Expert introduction section -->
            <section class="content-section">
              <h2 class="section-title">Mitől függ a műszaki vizsga ára?</h2>

              <div class="content-block">
                <div class="content-block__header">
                  <div class="content-block__icon">
                    <i class="fas fa-car"></i>
                  </div>
                  <h3 class="content-block__title">
                    1. Milyen típusú az autó?
                  </h3>
                </div>
                <div class="content-block__body">
                  <p>
                    Különböző járműkategóriákra különböző vizsgálati díjak
                    vonatkoznak. A személyautók, teherautók és motorkerékpárok
                    eltérő díjszabással rendelkeznek.
                  </p>
                </div>
              </div>

              <div class="content-block">
                <div class="content-block__header">
                  <div class="content-block__icon">
                    <i class="fas fa-clipboard-check"></i>
                  </div>
                  <h3 class="content-block__title">
                    2. Milyen vizsgálati típus szükséges?
                  </h3>
                </div>
                <div class="content-block__body">
                  <p>
                    Rendszeres műszaki vizsga, eredetiségvizsgálat, vagy soron
                    kívüli vizsga? Mindegyiknek más a díja és a vizsgálati
                    folyamata.
                  </p>
                </div>
              </div>

              <div class="content-block">
                <div class="content-block__header">
                  <div class="content-block__icon">
                    <i class="fas fa-wrench"></i>
                  </div>
                  <h3 class="content-block__title">
                    3. Szükséges-e előzetes felkészítés?
                  </h3>
                </div>
                <div class="content-block__body">
                  <p>
                    Előzetes átvizsgálás, javítások, beállítások? Ezek
                    biztosítják a sikeres vizsgáztatást és elkerülik a bukást.
                  </p>
                </div>
              </div>

              <blockquote class="content-quote">
                <p>
                  Tudjuk, hogy a műszaki vizsga stresszes lehet.<br />
                  De a valóság az, hogy megfelelő felkészítéssel minden autó
                  átmegy.<br />
                  Mi nem csak vizsgáztatunk – hanem fel is készítjük a járművet
                  a sikeres vizsgára.
                </p>
              </blockquote>

              <p class="content-highlight">
                Csapatunk műszaki szakértői mindig naprakészek a legújabb
                vizsgálati előírásokkal, így bármilyen kérdésed van, segítünk.
                <strong>Természetesen, egész Budapesten és környékén.</strong>
              </p>
            </section>

            <!-- Video section -->
            <section
              class="content-section video-section"
              v-if="foundData.video_url"
            >
              <h2 class="section-title">
                Így dolgozunk: precizitás, szakértelem, megbízhatóság – nézd
                meg!
              </h2>
              <div class="video-container">
                <iframe
                  :src="foundData.video_url.replace('watch?v=', 'embed/')"
                  allowfullscreen
                ></iframe>
              </div>
            </section>

            <!-- Main content from API -->
            <section class="content-section">
              <div class="content-body" v-html="foundData.body"></div>
            </section>

            <!-- CTA section -->
            <section class="cta-section">
              <div class="cta-card">
                <div class="cta-card__icon">
                  <i class="fas fa-comments"></i>
                </div>
                <div class="cta-card__content">
                  <h3>Személyre szabott megoldás</h3>
                  <p>
                    Nálunk nem kell azonnal időpontot foglalnod, nem nyomunk rád
                    semmit.<br />
                    Beszélünk pár percet, megnézzük, mi kell az autódnak,
                    mondunk egy korrekt ajánlatot, és csak akkor folytatjuk, ha
                    tényleg úgy érzed, mi vagyunk a megoldás.
                  </p>
                  <NuxtLink
                    to="/idopontfoglalas"
                    class="btn btn-primary btn-pulse"
                    >Időpontfoglalás</NuxtLink
                  >
                </div>
              </div>
            </section>

            <!-- FAQ Section -->
            <section class="content-section faq-section">
              <h2 class="section-title">Gyakori kérdések</h2>

              <div class="accordion">
                <div class="accordion-item">
                  <h3 class="accordion-header">
                    Milyen gyakran kell műszaki vizsgára menni?
                  </h3>
                  <div class="accordion-content">
                    <p>
                      Új autók esetében az első vizsga 4 év után esedékes, majd
                      2 évente kell megismételni. 10 év feletti járműveknél
                      évente szükséges a műszaki vizsga.
                    </p>
                  </div>
                </div>

                <div class="accordion-item">
                  <h3 class="accordion-header">
                    Mennyi ideig tart egy műszaki vizsga?
                  </h3>
                  <div class="accordion-content">
                    <p>
                      Egy átlagos műszaki vizsga 30-60 percet vesz igénybe, de
                      ez az autó állapotától és a szükséges ellenőrzések
                      számától függően változhat.
                    </p>
                  </div>
                </div>

                <div class="accordion-item">
                  <h3 class="accordion-header">
                    Mit ellenőriznek műszaki vizsgán?
                  </h3>
                  <div class="accordion-content">
                    <p>
                      A vizsgálat során ellenőrzik a fékrendszert, kormányművet,
                      világítást, kipufogógáz-kibocsátást, futóművet és az
                      általános műszaki állapotot. Személyautóknál kötelező a
                      kipufogógáz-mérés is.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Testimonials -->
            <section class="content-section testimonials-section">
              <h2 class="section-title">Ügyfeleink mondták</h2>

              <div class="testimonials">
                <div class="testimonial">
                  <div class="testimonial__quote">
                    <p>
                      "Profi munka, gyors kiszolgálás. Nagyon elégedett vagyok a
                      műszaki vizsgával, a következő alkalommal is hozzájuk
                      jövök."
                    </p>
                  </div>
                  <div class="testimonial__author">
                    <div class="testimonial__avatar">K</div>
                    <div class="testimonial__name">Kiss Péter</div>
                  </div>
                </div>

                <div class="testimonial">
                  <div class="testimonial__quote">
                    <p>
                      "Átlátható árak, segítőkész szakemberek. Ajánlom
                      mindenkinek, aki megbízható műszaki vizsgáztatást keres."
                    </p>
                  </div>
                  <div class="testimonial__author">
                    <div class="testimonial__avatar">N</div>
                    <div class="testimonial__name">Nagy Zoltán</div>
                  </div>
                </div>

                <div class="testimonial">
                  <div class="testimonial__quote">
                    <p>
                      "Korrekt áron, precíz munka. Pontosan elmagyarázták, mi
                      miért szükséges, és segítettek a sikeres vizsgáztatásban."
                    </p>
                  </div>
                  <div class="testimonial__author">
                    <div class="testimonial__avatar">T</div>
                    <div class="testimonial__name">Tóth Andrea</div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <!-- Sidebar -->
          <aside class="content-sidebar">
            <!-- Service details -->
            <div class="sidebar-widget service-details">
              <h3 class="sidebar-widget__title">Szolgáltatás részletei</h3>
              <ul class="service-details__list">
                <li>
                  <div class="service-details__icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="service-details__content">
                    <span class="service-details__label">Kerület:</span>
                    <span class="service-details__value">{{
                      foundData.kerulet
                    }}</span>
                  </div>
                </li>
                <li>
                  <div class="service-details__icon">
                    <i class="fas fa-cogs"></i>
                  </div>
                  <div class="service-details__content">
                    <span class="service-details__label">Szolgáltatás:</span>
                    <span class="service-details__value">{{
                      foundData.szolgaltatas
                    }}</span>
                  </div>
                </li>
                <li>
                  <div class="service-details__icon">
                    <i class="fas fa-plus-circle"></i>
                  </div>
                  <div class="service-details__content">
                    <span class="service-details__label">Extra:</span>
                    <span class="service-details__value">{{
                      foundData.extra
                    }}</span>
                  </div>
                </li>
                <li>
                  <div class="service-details__icon">
                    <i class="fas fa-calendar"></i>
                  </div>
                  <div class="service-details__content">
                    <span class="service-details__label">Év:</span>
                    <span class="service-details__value">{{
                      foundData.ev
                    }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Related services -->
            <div class="sidebar-widget related-widget">
              <h3 class="sidebar-widget__title">Kapcsolódó szolgáltatások</h3>
              <ul class="related-services">
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-clipboard-check"></i> Műszaki vizsgáztatás
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-search"></i> Előzetes átvizsgálás és
                    felkészítés
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-certificate"></i> Eredetiségvizsgálat
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-file-signature"></i> Teljes körű ügyintézés
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-tools"></i> Márkafüggetlen szervizelés
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-wrench"></i> Futómű beállítás
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-snowflake"></i> Klímatisztítás
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-tachometer-alt"></i> Fékcsere
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/szolgaltatasok">
                    <i class="fas fa-laptop-code"></i> Számítógépes diagnosztika
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <!-- Related posts section -->
      <section class="related-posts">
        <div class="container">
          <h2 class="section-title">
            További műszaki vizsgáztatási lehetőségek
          </h2>
          <div class="post-grid">
            <article
              class="post-card"
              v-for="(item, index) in relatedPosts"
              :key="index"
            >
              <div class="post-card__content">
                <h3>{{ item.szolgaltatas }} {{ item.kerulet }}</h3>
                <p>
                  {{ item.extra }}
                </p>
                <NuxtLink :to="getRecordUrl(item)" class="post-card__link"
                  >Tovább olvasom</NuxtLink
                >
              </div>
            </article>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap');

/* Base styles */
:root {
  --primary-color: #15a81f;
  --primary-dark: #15a81f;
  --secondary-color: #2c3e50;
  --text-color: #333;
  --text-light: #666;
  --light-bg: #f8f9fa;
  --border-color: #e1e1e1;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  --radius: 8px;
  --transition: all 0.3s ease;
}

.SEO * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5em;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary-dark);
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  border: none;
  font-family: 'Montserrat', sans-serif;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(251, 157, 47, 0.4);
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(251, 157, 47, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(251, 157, 47, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(251, 157, 47, 0);
  }
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Loading & Error States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(251, 157, 47, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-container {
  background-color: #fff;
  padding: 2rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  max-width: 500px;
}

.error-container h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

/* Hero Section */
.hero {
  position: relative;
  height: 80vh;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 2rem;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero__title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero__subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero__cta {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

/* Breadcrumbs */
.breadcrumbs {
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.breadcrumbs__list li {
  display: flex;
  align-items: center;
}

.separator {
  margin: 0 0.5rem;
  color: var(--text-light);
}

.current {
  color: var(--text-light);
  font-weight: 600;
}

/* Content Layout */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 991px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Info Cards */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.info-card__icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-right: 1rem;
}

.info-card__content h3,
h4,
h5,
h6 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.info-card__content p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
}

/* Content Sections */
.content-section {
  margin-bottom: 3rem;
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;
}

.section-title {
  position: relative;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  color: var(--secondary-color);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 4px;
  background-color: var(--primary-color);
  border-radius: 2px;
}

/* Content Blocks */
.content-block {
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--primary-color);
  padding-left: 1.5rem;
}

.content-block__header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.content-block__icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 1rem;
}

.content-block__title {
  font-size: 1.3rem;
  margin: 0;
}

.content-block__body p {
  margin: 0;
}

/* Quotes */
.content-quote {
  background-color: var(--light-bg);
  border-left: 4px solid var(--primary-color);
  padding: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  position: relative;
}

.content-quote::before {
  content: '\201C';
  font-size: 4rem;
  position: absolute;
  left: 0.5rem;
  top: -0.5rem;
  opacity: 0.2;
  color: var(--primary-color);
  font-family: Georgia, serif;
}

.content-quote p {
  position: relative;
  z-index: 1;
  margin: 0;
}

/* Highlights */
.content-highlight {
  background-color: rgba(251, 157, 47, 0.1);
  border-radius: var(--radius);
  padding: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0;
}

/* Video Section */
.video-section {
  margin-bottom: 3rem;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* CTA Section */
.cta-section {
  margin-bottom: 3rem;
}

.cta-card {
  display: flex;
  align-items: center;
  background-color: var(--secondary-color);
  color: white;
  padding: 2rem;
  border-radius: var(--radius);
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  z-index: 1;
}

.cta-card__icon {
  font-size: 3rem;
  margin-right: 2rem;
  color: var(--primary-color);
  z-index: 2;
}

.cta-card__content {
  flex: 1;
  z-index: 2;
}

.cta-card__content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: white;
}

.cta-card__content p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

/* FAQ Section */
.faq-section {
  margin-bottom: 3rem;
}

.accordion {
  border-radius: var(--radius);
  overflow: hidden;
}

.accordion-item {
  background-color: white;
  border-bottom: 1px solid var(--border-color);
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  position: relative;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  margin: 0;
  transition: var(--transition);
}

.accordion-header:hover {
  background-color: rgba(251, 157, 47, 0.05);
}

.accordion-header::after {
  content: '\f107';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary-color);
}

.accordion-content {
  padding: 0 1.5rem 1.25rem;
}

/* Testimonials */
.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.testimonial {
  background-color: white;
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.testimonial:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.testimonial__quote {
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.5rem;
}

.testimonial__quote::before {
  content: '\201C';
  font-size: 3rem;
  font-family: Georgia, serif;
  position: absolute;
  left: -0.5rem;
  top: -1rem;
  opacity: 0.2;
  color: var(--primary-color);
}

.testimonial__quote p {
  margin: 0;
  font-style: italic;
}

.testimonial__author {
  display: flex;
  align-items: center;
}

.testimonial__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 1rem;
}

.testimonial__name {
  font-weight: 600;
}

/* Sidebar Widgets */
.content-sidebar {
  align-self: start;
}

.sidebar-widget {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.sidebar-widget__title {
  font-size: 1.3rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color);
  color: var(--secondary-color);
}

/* Service Details */
.service-details__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-details__list li {
  display: flex;
  align-items: center;
}

.service-details__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(251, 157, 47, 0.1);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-right: 1rem;
}

.service-details__content {
  flex: 1;
}

.service-details__label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 0.25rem;
}

.service-details__value {
  font-weight: 600;
}

/* Related Services */
.related-services {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.related-services li a {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: var(--light-bg);
  border-radius: var(--radius);
  transition: var(--transition);
}

.related-services li a:hover {
  background-color: rgba(251, 157, 47, 0.1);
}

.related-services li a i {
  margin-right: 0.75rem;
  color: var(--primary-color);
}

/* Related Posts */
.related-posts {
  background-color: var(--light-bg);
  padding: 4rem 0;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.post-card {
  background-color: white;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.post-card__content {
  padding: 1.5rem;
}

.post-card__content h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.post-card__content p {
  color: var(--text-light);
  margin-bottom: 1rem;
}

.post-card__link {
  display: inline-block;
  font-weight: 600;
  color: var(--primary-color);
  position: relative;
}

.post-card__link::after {
  content: '\f105';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-left: 0.5rem;
  transition: var(--transition);
}

.post-card__link:hover::after {
  margin-left: 0.75rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero__title {
    font-size: 2.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .info-cards,
  .testimonials,
  .post-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .cta-card__icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
