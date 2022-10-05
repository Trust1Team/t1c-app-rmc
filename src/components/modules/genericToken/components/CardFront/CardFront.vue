<template>
  <div class="card-container bg-gray-300 dark:bg-gray-500 dark:text-black">
    <div class="card-header">
      <div>
        <div class="title"><b>IDENTITEITSKAART</b></div>
      </div>

      <div class="">
        <div class="title"><b>CARD D'IDENTITE</b></div>
      </div>

      <div>
        <div class="title"><b>PERSONALAUSWEIS</b></div>
      </div>

      <div>
        <div class="title"><b>IDENTITY CARD</b></div>
      </div>
    </div>
    <div class="card-content">
      <div class="chip">
        <img src="/assets/images/credit-card.svg" alt="Credit card chip" />
      </div>
      <div class="card-row">
        <div>
          <p><i>Name</i></p>
          <p><i>Given names</i></p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ biometric.name }}</p>
          <p class="bold">{{ biometric.firstNames }} {{ biometric.thirdName }}</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p><i>Place and date of birth</i></p>
          <p class="bold">{{ biometric.birthLocation }} {{ biometric.birthDate }}</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p><i>Sex</i></p>
          <p class="bold">{{ biometric.sex }}</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p><i>Nationality</i></p>
          <p class="bold">{{ biometric.nationality }}</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p><i>Card no</i></p>
          <p v-if="biometric.cardNumber" class="bold">{{ biometric.cardNumber }}</p>
          <p v-else class="bold">-</p>
        </div>
      </div>

      <div class="card-row">
        <div>
          <p><i>Valid from- until</i></p>
          <p class="bold">
            {{ biometric.cardValidityDateBegin }} -
            {{ biometric.cardValidityDateEnd }}
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
  name: 'GenericTokenFrontCardView',
  props: ['biometric', 'picture'],
};
</script>

<style src="./CardFront.style.css" scoped />
