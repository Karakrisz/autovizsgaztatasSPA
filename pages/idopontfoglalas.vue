<script setup>
import { ref } from 'vue'

useHead({
  title: 'Időpontfoglalás - Autó Vizsgáztatás',
})

// Reactive variables
const isSubmitting = ref(false)
const submitMessage = ref('')
const formData = ref({
  licensePlate: '',
  brand: '',
  model: '',
  year: '',
  service: '',
  name: '',
  email: '',
  phone: '',
})

// Form submission handler
const submitForm = async (event) => {
  event.preventDefault()

  if (isSubmitting.value) return

  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const webhookUrl =
      'https://services.leadconnectorhq.com/hooks/65GU5RaMpJTj79t0Bf55/webhook-trigger/8e871def-fd10-48b4-9f5e-e1fda9af42ad'

    // Prepare data for GoHighLevel
    const payload = {
      // Contact information
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,

      // Vehicle information
      license_plate: formData.value.licensePlate,
      vehicle_brand: formData.value.brand,
      vehicle_model: formData.value.model,
      vehicle_year: formData.value.year,

      // Service information
      service_type: formData.value.service,

      // Additional metadata
      source: 'Időpontfoglalási űrlap',
      form_type: 'műszaki_vizsga_booking',
      submission_date: new Date().toISOString(),

      // Custom fields for GoHighLevel
      custom_field_1: `${formData.value.brand} ${formData.value.model} (${formData.value.year})`,
      custom_field_2: formData.value.licensePlate,
      custom_field_3: getServiceDisplayName(formData.value.service),
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      submitMessage.value =
        '✅ Sikeres időpontfoglalás! Munkanapokon 24 órán belül felvesszük Önnel a kapcsolatot.'
      // Reset form
      formData.value = {
        licensePlate: '',
        brand: '',
        model: '',
        year: '',
        service: '',
        name: '',
        email: '',
        phone: '',
      }
    } else {
      throw new Error('Hiba történt a küldés során')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    submitMessage.value =
      '❌ Hiba történt. Kérjük próbálja újra, vagy hívjon minket!'
  } finally {
    isSubmitting.value = false
  }
}

// Helper function to get service display name
const getServiceDisplayName = (serviceValue) => {
  const serviceMap = {
    'muszaki-vizsga': 'Műszaki vizsga',
    kornyezetvedelmi: 'Környezetvédelmi felülvizsgálat',
    'elozetes-atvizsgalas': 'Előzetes átvizsgálás',
    'eredetiseg-vizsgalat': 'Eredetiségvizsgálat',
    'teljes-koru': 'Teljes körű ügyintézés',
    szervizel: 'Szerviz + műszaki vizsga',
    olajcsere: 'Olajcsere',
  }
  return serviceMap[serviceValue] || serviceValue
}
</script>

<template>
  <section>
    <div
      class="about-content about-content--subpage-next-format position-relative"
    >
      <div class="subpage-content">
        <!-- Fő üzenet -->
        <div class="trust-banner">
          <h2 class="page-color main-title">
            GARANTÁLT ÁTMENET - ELSŐ ALKALOMMAL IS!
          </h2>
          <div class="trust-elements">
            <div class="trust-item">
              <span class="trust-icon">⚡</span>
              <strong>Azonnali visszajelzés</strong> - 24 órán belül válaszolunk
            </div>
            <div class="trust-item">
              <span class="trust-icon">🔧</span>
              <strong>Előzetes felkészítés</strong> - Garantáltan átmegy a
              vizsgán
            </div>
            <div class="trust-item">
              <span class="trust-icon">⭐</span>
              <strong>87% sikeres átmenet</strong> - Több mint 7000 elégedett
              Ügyfél
            </div>
          </div>
        </div>

        <div class="benefits-grid">
          <div class="benefit-card">
            <h3>Nincs bukás</h3>
            <p>
              <strong>Előzetesen átvizsgáljuk az autót</strong> és minden hibát
              kijavítunk a vizsga előtt
            </p>
          </div>
          <div class="benefit-card">
            <h3>Gyors ügyintézés</h3>
            <p>
              <strong>Minden papírmunkát mi intézünk</strong> - Önnek csak
              hoznia kell az autót
            </p>
          </div>
          <div class="benefit-card">
            <h3>Átlátható árazás</h3>
            <p>
              <strong>Nincs rejtett költség</strong> - Előre megmondjuk,
              mennyibe kerül
            </p>
          </div>
        </div>

        <h2 class="page-color">IDŐPONTFOGLALÁSI ŰRLAP:</h2>

        <form class="appointment-form" @submit="submitForm">
          <!-- Jármű adatok -->
          <div class="form-section">
            <h3 class="section-title">Jármű adatok</h3>

            <div class="form-group">
              <label class="supage-content__ul__li__strong">Rendszám *</label>
              <input
                type="text"
                v-model="formData.licensePlate"
                required
                class="form-input"
                placeholder="pl. ABC-123"
                style="text-transform: uppercase"
                :disabled="isSubmitting"
              />
            </div>

            <div class="form-group">
              <label class="supage-content__ul__li__strong">Márka *</label>
              <input
                type="text"
                v-model="formData.brand"
                required
                class="form-input"
                placeholder="pl. Volkswagen, BMW, Opel"
                :disabled="isSubmitting"
              />
            </div>

            <div class="form-group">
              <label class="supage-content__ul__li__strong">Modell *</label>
              <input
                type="text"
                v-model="formData.model"
                required
                class="form-input"
                placeholder="pl. Golf, 320d, Astra"
                :disabled="isSubmitting"
              />
            </div>

            <div class="form-group">
              <label class="supage-content__ul__li__strong">Évjárat *</label>
              <input
                type="number"
                v-model="formData.year"
                required
                class="form-input"
                min="1990"
                max="2025"
                placeholder="pl. 2018"
                :disabled="isSubmitting"
              />
            </div>
          </div>

          <!-- Szolgáltatás típusa -->
          <div class="form-section">
            <h3 class="section-title">Milyen szolgáltatásra van szüksége?</h3>

            <div class="form-group">
              <label class="supage-content__ul__li__strong"
                >Szolgáltatás *</label
              >
              <select
                v-model="formData.service"
                required
                class="form-select"
                :disabled="isSubmitting"
              >
                <option value="">Válasszon szolgáltatást...</option>
                <option value="muszaki-vizsga">Műszaki vizsga</option>
                <option value="kornyezetvedelmi">
                  Környezetvédelmi felülvizsgálat
                </option>
                <option value="elozetes-atvizsgalas">
                  Előzetes átvizsgálás
                </option>
                <option value="eredetiseg-vizsgalat">
                  Eredetiségvizsgálat
                </option>
                <option value="teljes-koru">Teljes körű ügyintézés</option>
                <option value="szervizel">Szerviz + műszaki vizsga</option>
                <option value="olajcsere">Olajcsere</option>
              </select>
            </div>
          </div>

          <!-- Személyes adatok -->
          <div class="form-section">
            <h3 class="section-title">Személyes adatok</h3>

            <div class="form-group">
              <label class="supage-content__ul__li__strong">Név *</label>
              <input
                type="text"
                v-model="formData.name"
                required
                class="form-input"
                placeholder="Teljes név"
                :disabled="isSubmitting"
              />
            </div>

            <div class="form-group">
              <label class="supage-content__ul__li__strong">Email cím *</label>
              <input
                type="email"
                v-model="formData.email"
                required
                class="form-input"
                placeholder="A megerősítést ide küldjük"
                :disabled="isSubmitting"
              />
            </div>

            <div class="form-group">
              <label class="supage-content__ul__li__strong"
                >Telefonszám *</label
              >
              <input
                type="tel"
                v-model="formData.phone"
                required
                class="form-input"
                placeholder="Gyors egyeztetéshez"
                :disabled="isSubmitting"
              />
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span class="btn-text" v-if="!isSubmitting">Időpont foglalása</span>
            <span class="btn-text" v-else>Küldés...</span>
          </button>
          <p class="page-color">
            <i class="supage-content__p__i">
              Az Időpont foglalása gombra kattintva automatikusan elfogadja az
              <NuxtLink
                class="supage-content__nlink"
                to="/adatvedelmi-tajekoztato"
                >Adatvédelmi Szabályzatot.</NuxtLink
              >
            </i>
          </p>
          <!-- Success/Error Message -->
          <div
            v-if="submitMessage"
            class="submit-message"
            :class="{
              success: submitMessage.includes('✅'),
              error: submitMessage.includes('❌'),
            }"
          >
            {{ submitMessage }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.trust-banner {
  background: #202020;
  color: white;
  padding: 3em;
  border-radius: 15px;
  margin-bottom: 30px;
}

.trust-elements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
}

.trust-icon {
  font-size: 1.5rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
  padding: 1em 0;
}

.benefit-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #15a81f;
}

.supage-content__nlink {
  color: #15a81f;
}

.benefit-card h3 {
  color: #202020;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.appointment-form {
  max-width: 800px;
  margin: 0 auto;
}

.submit-message {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.submit-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-section {
  background: #fff;
  padding: 25px;
  margin: 2.5em 0 2em 0;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #202020;
  font-size: 1.3rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #15a81f;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;

  /* Custom arrow eltávolítása és saját hozzáadása */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Saját nyíl hozzáadása */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 45px;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #15a81f;
  outline: none;
}

.form-select:focus {
  border-color: #15a81f;
  outline: none;
  box-shadow: 0 0 0 3px rgba(251, 157, 47, 0.1);

  /* Focus esetén narancssárga nyíl */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fb9d2f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.form-select:hover:not(:disabled) {
  border-color: #15a81f;
  background-color: #fefefe;
}

.form-input:disabled,
.form-select:disabled {
  background-color: #f8f9fa;
  opacity: 0.6;
}

.form-select:disabled {
  cursor: not-allowed;

  /* Disabled állapotban szürke nyíl */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-text {
  font-weight: normal;
}

.submit-btn {
  background: linear-gradient(135deg, #15a81f 0%, #202020 100%);
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #202020 0%, #15a81f 100%);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-text {
  font-size: 1.1rem;
}

.btn-guarantee {
  font-size: 0.9rem;
  font-weight: normal;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .trust-elements {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .radio-group {
    flex-direction: column;
  }
}

/* Safari specifikus javítások */
@supports (-webkit-appearance: none) {
  .form-select {
    /* Safari-ban a padding finomhangolása */
    padding-right: 40px;
  }
}

/* Firefox specifikus javítások */
@-moz-document url-prefix() {
  .form-select {
    /* Firefox-ban más padding kell */
    padding-right: 42px;
  }
}
</style>
