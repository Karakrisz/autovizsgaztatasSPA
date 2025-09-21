<script setup>
useHead({
  title: 'Szolgáltatások',
})
</script>

<template>
  <section>
    <div class="services-content services-content--subpage-format">
      <h2
        class="services-content__h2 text-transform-uppercase text-color-w f-700"
      >
        Szolgáltatásaink
      </h2>
      <div class="services-content__iTbox d-flex">
        <NuxtImg
          src="/img/body/services/muszaki.svg"
          alt="Műszaki vizsgáztatás"
          class="services-content__iTbox__img bg-color-w"
          height="100%"
        />

        <div class="services-content__iTbox__iBox">
          <h3 class="services-content__iTbox__iBox__h3 text-color-w f-600">
            Műszaki vizsgáztatás
          </h3>
          <p class="services-content__iTbox__iBox__p text-color-w m-0">
            Minden típusú gépjármű időszakos műszaki vizsgáztatását és
            környezetvédelmi felülvizsgálatát elvégezzük, hogy járműved mindig
            megfeleljen a törvényi előírásoknak.
          </p>
        </div>
      </div>
      <div class="services-content__iTbox d-flex">
        <NuxtImg
          src="/img/body/services/elozetes.svg"
          alt="Műszaki vizsgáztatás"
          class="services-content__iTbox__img bg-color-w"
          height="100%"
        />

        <div class="services-content__iTbox__iBox">
          <h3 class="services-content__iTbox__iBox__h3 text-color-w f-600">
            Előzetes átvizsgálás és felkészítés
          </h3>
          <p class="services-content__iTbox__iBox__p text-color-w m-0">
            A vizsgáztatás előtt alaposan átvizsgáljuk az autódat, és szükség
            esetén felkészítjük a műszaki vizsgára, hogy garantáltan megfeleljen
            az elvárásoknak.
          </p>
        </div>
      </div>
      <div class="services-content__iTbox d-flex">
        <NuxtImg
          src="/img/body/services/elozetes.svg"
          alt="Műszaki vizsgáztatás"
          class="services-content__iTbox__img bg-color-w"
          height="100%"
        />

        <div class="services-content__iTbox__iBox">
          <h3 class="services-content__iTbox__iBox__h3 text-color-w f-600">
            Eredetiségvizsgálat
          </h3>
          <p class="services-content__iTbox__iBox__p text-color-w m-0">
            Az eredetiségvizsgálatot is biztosítjuk, így az autó új tulajdonos
            általi nyilvántartásba vétele gyors és problémamentes lesz.
          </p>
        </div>
      </div>
      <div class="services-content__iTbox d-flex">
        <NuxtImg
          src="/img/body/services/teljes.svg"
          alt="Műszaki vizsgáztatás"
          class="services-content__iTbox__img bg-color-w"
          height="100%"
        />

        <div class="services-content__iTbox__iBox">
          <h3 class="services-content__iTbox__iBox__h3 text-color-w f-600">
            Teljes körű ügyintézés
          </h3>
          <p class="services-content__iTbox__iBox__p text-color-w m-0">
            Az összes műszaki vizsgáztatással kapcsolatos ügyet helyben
            intézzük, beleértve az okmányokkal kapcsolatos teendőket is.
          </p>
        </div>
      </div>
      <div class="services-content__iTbox d-flex">
        <NuxtImg
          src="/img/body/services/marka.svg"
          alt="Műszaki vizsgáztatás"
          class="services-content__iTbox__img bg-color-w"
          height="100%"
        />

        <div class="services-content__iTbox__iBox">
          <h3 class="services-content__iTbox__iBox__h3 text-color-w f-600">
            Márkafüggetlen szervizelés
          </h3>
          <p class="services-content__iTbox__iBox__p text-color-w m-0">
            Bármilyen márkájú és típusú gépjármű teljes átvizsgálását és
            felkészítését vállaljuk, mert nálunk minden autó egyformán fontos.
          </p>
        </div>
      </div>
      <div class="services-content__linkBox">
        <NuxtLink
          to="/idopontfoglalas"
          class="services-content__linkBox__link page-next-link bg-color-w text-color d-flex"
          >Időpontfoglalás
          <NuxtImg
            src="/img/body/services/right.svg"
            alt="Műszaki vizsgáztatás"
            class="services-content__linkBox__link__img"
            height="100%"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
