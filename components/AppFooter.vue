<script setup>
// Egyszerűsített script, nincs szükség az email küldésre
</script>

<template>
  <footer>
    <div class="footer-content d-flex">
      <div class="footer-content__map">
        <iframe
          class="footer-content__map__iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.6591298521457!2d19.088576276429006!3d47.53549897118344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dbbcd6ed9dcb%3A0x7ce99223f051c6e0!2zTcWxc3pha2kgdml6c2fDoXp0YXTDoXMgfCA0IFTDtmxneWVzaSBBdXTDs2phdsOtdMOzIEtmdC4!5e0!3m2!1shu!2shu!4v1737049538093!5m2!1shu!2shu"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="footer-content__form bg-color-w">
        <h6
          class="footer-content__form__h6 text-transform-uppercase text-center f-700 text-color"
        >
          IDŐPONTFOGLALÁS
        </h6>
        
        <div class="footer-cta-content">
          <h3 class="footer-cta-title">Kérjen ingyenes ajánlatot!</h3>
          <p class="footer-cta-text">
            Precíz munka, gyári minőségű műszaki vizsgáztatás korrekt áron. 
            Gyors és megbízható szolgáltatás!
          </p>
          
          <div class="footer-cta-benefits">
            <div class="benefit-item">✓ Ingyenes árajánlat</div>
            <div class="benefit-item">✓ Gyors szolgáltatás</div>
            <div class="benefit-item">✓ Megbízható partnereink</div>
          </div>
          
          <div class="footer-cta-button-wrapper">
            <NuxtLink
              to="/idopontfoglalas"
              class="contact-form__link-box__text-box__btn d-flex page-link text-color-w cursor"
            >
              IDŐPONTFOGLALÁS
              <NuxtImg
                src="/img/footer/right.svg"
                alt="Műszaki vizsgáztatás"
                class="contact-form__link-box__text-box__btn__img position-relative"
                height="100%"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-brand-content text-center">
      <NuxtImg
        src="/img/logo.png"
        alt="Műszaki vizsgáztatás"
        class="footer-brand-content__img"
        height="100%"
      />
    </div>
  </footer>
</template>