<script setup>
useHead({
  title: 'Rólunk',
})
</script>

<template>
  <section>
    <div
      class="about-content about-content--subpage-format position-relative d-flex"
    >
      <div class="about-content__box"></div>
      <div class="about-content__iBox">
        <NuxtImg
          src="/img/body/about.webp"
          alt="Műszaki vizsgáztatás"
          class="about-content__iBox__img"
          height="100%"
        />
      </div>
      <div
        class="about-content__tBox about-content__tBox--subape-format position-absolute bg-color-w"
      >
        <h4 class="about-content__tBox__h4 text-transform-uppercase m-0 f-700">
          Rólunk
        </h4>
        <p class="about-content__tBox__p">
          Több mint 66 éve segítjük az autósokat megbízható és professzionális
          szolgáltatásokkal. Szervizünk minden járműtípust fogad, legyen szó
          műszaki vizsgáztatásról, eredetiségvizsgálatról, kisebb javításokról
          vagy komolyabb szerelésekről. 15 fős szakértői csapatunk elkötelezett
          abban, hogy gyorsan és a lehető legjobb megoldásokkal szolgáljuk ki
          ügyfeleinket, márkafüggetlen szemlélettel.
        </p>
        <p class="about-content__tBox__p">
          Célunk, hogy az autójával kapcsolatos teendők nálunk egyszerűvé és
          gördülékennyé váljanak. Modern környezetben, kényelmes várakozási
          lehetőséggel, barátságos kiszolgálással és ügyfélközpontú
          hozzáállással várjuk Önt, mert számunkra az elégedettsége a
          legfontosabb. Bízunk benne, hogy hamarosan Önt is ügyfeleink között
          köszönthetjük!
        </p>
        <div class="about-content__tBox__linkBox">
          <NuxtLink
            to="/ajanlatkeres"
            class="about-content__tBox__link d-flex page-link text-color-w"
            >Kapcsolatfelvétel</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
