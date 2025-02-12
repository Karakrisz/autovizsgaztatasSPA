<script setup>
const links = [
  { name: 'Főoldal', path: '/' },
  { name: 'Rólunk', path: '/rolunk' },
  { name: 'Szolgáltatások', path: '/szolgaltatasok' },
  { name: 'Ajánlatkérés', path: '/ajanlatkeres' },
  { name: 'Kapcsolat', path: '/kapcsolat' },
  { name: 'Facebook', path: '/', imagePath: '/img/header/facebook.svg' },
]

const isMenuOpen = ref(false)
</script>

<template>
  <header class="header">
    <div class="header__head d-flex flex-wrap">
      <a class="header__head-item header__head-item--phone text-color-w d-flex">
        <NuxtImg
          src="/img/header/mobile.svg"
          alt="Műszaki vizsgáztatás"
          class="header__head-item__img"
          height="100%"
        />
        +36 (70) 363 3217
      </a>
      <a class="header__head-item header__head-item--phone text-color-w d-flex">
        <NuxtImg
          src="/img/header/phone.svg"
          alt="Műszaki vizsgáztatás"
          class="header__head-item__img"
          height="100%"
        />
        +36 (1) 349 6679
      </a>
      <a class="header__head-item header__head-item--email text-color-w d-flex">
        <NuxtImg
          src="/img/header/mail.svg"
          alt="Műszaki vizsgáztatás"
          class="header__head-item__img"
          height="100%"
        />
        szerviz@auto-vizsgaztatas.hu
      </a>
      <a class="header__head-item header__head-item--hours text-color-w d-flex">
        <NuxtImg
          src="/img/header/time.svg"
          alt="Műszaki vizsgáztatás"
          class="header__head-item__img"
          height="100%"
        />
        H-Cs: 7:00 - 17:00 | P: 7:00 - 15:00
      </a>
    </div>
    <div class="header-content d-flex">
      <div class="logo-box header-content__logo-box">
        <a href="/" class="header-content__logo-box__link">
          <NuxtImg
            src="/img/header/logo.png"
            alt="Műszaki vizsgáztatás"
            class="header-content__logo-box__link__img"
            height="100%"
          />
        </a>
      </div>
      <div class="nav-box header-content__nav-box d-flex">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="hamburger"
          :class="{ open: isMenuOpen }"
        >
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
        <nav :class="{ 'menu--open': isMenuOpen, menu: true }" id="menu">
          <ul id="menu__list" class="menu__list d-flex">
            <li v-for="link in links" :key="link.path" class="menu__list__li">
              <NuxtLink :to="link.path" :class="['menu__item text-color']">
                <template v-if="link.imagePath">
                  <NuxtImg
                    class="menu__list__li__img"
                    height="100%"
                    :src="link.imagePath"
                    :alt="link.name"
                  />
                </template>
                <template v-else>
                  {{ link.name }}
                </template>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
