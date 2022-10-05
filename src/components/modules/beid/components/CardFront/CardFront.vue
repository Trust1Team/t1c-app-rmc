<template>
  <div class="card-container bg-gray-300 dark:bg-gray-500 dark:text-black p-4">
    <div class="card-header">
      <div>
        <div class="title"><b>BELGIE</b></div>
        <div class="sub-title">IDENTITEITSKAART</div>
      </div>

      <div class="">
        <div class="title"><b>BELGIQUE</b></div>
        <div class="sub-title">CARD D'IDENTITE</div>
      </div>

      <div>
        <div class="title"><b>BELGIEN</b></div>
        <div class="sub-title">PERSONALAUSWEIS</div>
      </div>

      <div>
        <div class="title"><b>BELGIUM</b></div>
        <div class="sub-title">IDENTITY CARD</div>
      </div>
    </div>

    <div class="card-content">
      <div class="chip">
        <img src="/assets/images/credit-card.svg" alt="Credit card chip" />
      </div>
      <div class="card-row">
        <div>
          <p><i>Naam/Name</i></p>
          <p><i>Voornamen/Given names</i></p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ biometric.name }}</p>
          <p class="bold">{{ biometric.firstNames }} {{ biometric.thirdName }}</p>
        </div>
      </div>
      <div class="card-row-2 chip-spacing">
        <div>
          <p><i>Geboorteplaats en -datum/Place and date of birth</i></p>
          <p class="bold">{{ biometric.birthLocation }} {{ biometric.birthDate }}</p>
        </div>
        <div>
          <p><i>Geslacht/Sex</i></p>
          <p class="bold">{{ biometric.sex }}</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p><i>Nationaliteit/Nationality</i></p>
          <p class="bold">{{ biometric.nationality }}</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p><i>Kaartnr/Card no</i></p>
          <p class="bold">
            {{
              `${biometric.cardNumber.substr(0, 3)}-${biometric.cardNumber.substr(3, 7)}-${biometric.cardNumber.substr(
                10,
                2,
              )}`
            }}
          </p>
        </div>
      </div>

      <div class="card-row">
        <div>
          <p><i>Geldig van- tot/Valid from- until</i></p>
          <p class="bold">
            {{ `${biometric.cardValidityDateBegin} - ${biometric.cardValidityDateEnd}` }}
          </p>
        </div>
      </div>

      <div>
        <img class="image" :src="'data:image/png;base64,' + picture.picture" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeidCardFront',
  props: ['biometric', 'picture'],
};
</script>

<style src="./CardFront.style.css" scoped />
