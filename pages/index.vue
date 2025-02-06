<script setup lang="ts"></script>
<template>
  <section>
    <div class="hero-content position-relative">
      <NuxtImg
        src="/img/body/hero.webp"
        alt="Műszaki vizsgáztatás"
        class="hero-content__img"
        height="100%"
      />

      <div class="hero-content__tBox position-absolute bg-color-w">
        <h1 class="hero-content__tBox__h1 text-transform-uppercase f-700">
          Profi csapat, gördülékeny ügyintézés, garantált nyugalom.
        </h1>
        <p class="hero-content__tBox__p">
          Legyen szó előzetes átvizsgálásról, felkészítésről vagy ügyintézésről,
          mi leveszünk minden terhet a válladról. Te hozd az autót, mi hozzuk a
          megoldást!
        </p>
        <NuxtLink to="/" class="hero-content__tBox__link d-flex page-link text-color-w"
          >Ajánlatkérés</NuxtLink
        >
      </div>
    </div>
  </section>
  <section>
    <div class="services-content">
      <h2 class="services-content__h2 text-transform-uppercase text-color-w f-700">
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
          src="/img/body/services/biztositas.svg"
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
      <div class="services-content__iTbox d-flex">
        <NuxtImg
          src="/img/body/services/biztositas.svg"
          alt="Műszaki vizsgáztatás"
          class="services-content__iTbox__img bg-color-w"
          height="100%"
        />

        <div class="services-content__iTbox__iBox">
          <h3 class="services-content__iTbox__iBox__h3 text-color-w f-600">
            Biztosításkötés
          </h3>
          <p class="services-content__iTbox__iBox__p text-color-w m-0">
            Segítünk a biztosításkötésben is, hogy mindent egy helyen
            elintézhess, és időt spórolhass.
          </p>
        </div>
      </div>
      <div class="services-content__linkBox">
        <NuxtLink
          to="/"
          class="services-content__linkBox__link page-next-link bg-color-w text-color d-flex"
          >Összes szolgáltatás megtekintése
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
  <section>
    <div class="about-content position-relative d-flex">
      <div class="about-content__box"></div>
      <div class="about-content__iBox">
        <NuxtImg
          src="/img/body/about.webp"
          alt="Műszaki vizsgáztatás"
          class="about-content__iBox__img"
          height="100%"
        />
      </div>
      <div class="about-content__tBox position-absolute bg-color-w">
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
            to="/"
            class="about-content__tBox__link d-flex page-link text-color-w"
            >Tudjon meg többet rólunk</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="sales-content bg-color-w">
      <div class="sales-content__elem text-center position-relative bg-color-w">
        <h5 class="sales-content__elem__h5 f-700">BLOG</h5>
        <div class="sales-content__elem__linkBox bg-color-w">
          <p class="sales-content__elem__linkBox__p">
            Feltöltés folyamatban...
          </p>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="time-content d-flex">
      <div class="time-content__box">
        <h6 class="time-content__h6 text-color-w text-transform-uppercase f-700">
          Hozd az autód, mi a megoldást hozzuk!
        </h6>
        <NuxtLink
          to="/"
          class="time-content__link page-next-link bg-color-w text-color"
          >Időpontot kérek</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
