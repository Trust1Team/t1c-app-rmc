<template>
  <div class="card-container">
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
      <div class="card-row">
        <div>
          <p><i>Naam/Name</i></p>
          <p><i>Voornamen/Given names</i></p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ biometric.name }}</p>
          <p class="bold">
            {{ biometric.firstNames }} {{ biometric.thirdName }}
          </p>
        </div>
      </div>
      <div class="card-row-2 chip-spacing">
        <div>
          <p><i>Geboorteplaats en -datum/Place and date of birth</i></p>
          <p class="bold">
            {{ biometric.birthLocation }} {{ biometric.birthDate }}
          </p>
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
          <p class="bold">{{ biometric.cardNumber }}</p>
        </div>
      </div>

      <div class="card-row">
        <div>
          <p><i>Geldig van- tot/Valid from- until</i></p>
          <p class="bold">
            {{ biometric.cardValidityDateBegin }} -
            {{ biometric.cardValidityDateEnd }}
          </p>
        </div>
      </div>

      <div>
        <img
          class="image"
          :src="'data:image/png;base64,' + picture.picture"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeidFrontCardView",
  props: ["biometric", "picture"],
};
</script>

<style scoped>
p {
  margin-bottom: unset;
}

.card-container {
  /*Ratio is 8/5*/
  width: 480px;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 15px;
  position: relative;
  background-color: #d9d9d9;
  background-image: linear-gradient(135deg, #d9d9d9 0%, #f6f2f2 74%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.card-content {
  padding: 5px;
  font-size: 10px;
  margin-top: 15px;
}

.card-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  background-color: unset !important;
}

.chip-spacing {
  margin-left: 130px;
}
.text-spacing {
  margin-left: 10px;
}

.card-row-2 {
  display: flex;
  line-height: 15px;
  margin-top: 5px;
}

.card-row-2 div:last-of-type {
  text-align: right;
  margin-left: 30px;
}

.card-row {
  margin-top: 5px;
  display: flex;
  line-height: 15px;
}

.bold {
  font-weight: bold;
}

.title {
  font-size: 14px;
}

.sub-title {
  font-size: 9px;
}

.image {
  position: absolute;
  right: 5px;
  bottom: 0;
  margin-bottom: 5px;
  width: 100px;
  border-radius: 10px;
}
</style>
