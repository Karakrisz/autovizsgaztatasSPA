<script setup>
import { useNuxtApp } from '#app'
const nuxtApp = useNuxtApp()

const form = ref({
  name: '',
  email: '',
  phonenumber: '',
})

const isSent = ref(false)

const sendEmail = async () => {
  try {
    await nuxtApp.$mail.send({
      from: 'szerviz@auto-vizsgaztatas.hu',
      subject: `Új üzenetet küldött - ${form.value.name}`,
      html: `
        <p><strong>Name:</strong> ${form.value.name}</p>
        <p><strong>Email:</strong> ${form.value.email}</p>
        <p><strong>Phone Number:</strong> ${form.value.phonenumber}</p>
      `,
    })
    isSent.value = true
  } catch (error) {
    console.error('Error sending email:', error)
    alert('Failed to send email.')
  }
}
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
          KAPCSOLAT
        </h6>
        <form @submit.prevent="sendEmail" class="footer-content__form__elem">
          <div class="footer-content__form__elem__div">
            <input
              type="text"
              placeholder="NÉV"
              id="name"
              v-model="form.name"
              required
              class="footer-content__form__elem__div__input f-300"
            />
          </div>
          <div class="footer-content__form__elem__div">
            <input
              type="email"
              placeholder="E-MAIL CÍM"
              id="email"
              v-model="form.email"
              required
              class="footer-content__form__elem__div__input f-300"
            />
          </div>
          <div class="footer-content__form__elem__div">
            <input
              type="tel"
              id="phonenumber"
              v-model="form.phonenumber"
              required
              placeholder="TELEFONSZÁM"
              class="footer-content__form__elem__div__input f-300"
            />
          </div>
          <div
            v-if="!isSent"
            class="contact-form__link-box__text-box text-center d-flex"
          >
            <p class="contact-form__link-box__text-box__p">
              A küldés gombra kattintva elfogadja az
              <NuxtLink
                class="contact-form__link-box__text-box__p__link"
                to="/adatvedelmi-tajekoztato"
                >Adatkezelési Tájékoztatót</NuxtLink
              >
            </p>
            <button
              type="submit"
              aria-label="submit"
              class="contact-form__link-box__text-box__btn d-flex page-link text-color-w cursor"
            >
              Küldés
              <NuxtImg
                src="/img/footer/right.svg"
                alt="Műszaki vizsgáztatás"
                class="contact-form__link-box__text-box__btn__img position-relative"
                height="100%"
              />
            </button>
            <!-- <p class="mt-4 text-xs text-right text-gray-400">
              A JELENTKEZEM GOMBRA KATTINTVA ELFOGADOM AZ ADATVÉDELMI
              NYILATKOZATOT.
            </p> -->
          </div>
          <div v-if="isSent" class="confirmation-message bg-color-w">
            <p class="confirmation-message__p text-white f-600">
              Köszönjük az üzenetét, hamarosan felvesszük Önnel a kapcsolatot.
            </p>
          </div>
        </form>
      </div>
    </div>
    <div class="footer-brand-content text-center">
      <NuxtImg
        src="/img/footer/brand.svg"
        alt="Műszaki vizsgáztatás"
        class="footer-brand-content__img"
        height="100%"
      />
    </div>
  </footer>
</template>
