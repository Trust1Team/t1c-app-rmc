<template>
  <div class="card-container">
    <div class="card-header">
      <div class="estonian-flag">
        <img src="../../../../assets/estonian-flag.png" alt="Estonian Flag" class="estonian-flag-img"/>
      </div>
      <div class="id-country">
        <div class="title"><b>EESTI VABARIIK</b></div>
        <div class="sub-title">Respublic of Estonia</div>
      </div>
      <div class="id-card">
        <div class="sub-title">ISIKUTUNNISTUS</div>
        <div class="sub-title">Identity Card</div>
      </div>
    </div>

    <div class="card-content">
      <div class="photo">
        <img
          class="image"
          :src="'data:image/png;base64,' + picture.picture"
          alt=""
        />
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p>Perekonnanimi/Surname</p>
          <div class="bold">{{ biometric.name }}</div>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p class="info-title">Eesnimed/Given names</p>
          <div class="bold">
            {{ biometric.firstNames }} {{ biometric.thirdName }}
          </div>
        </div>
      </div>
      <div class="card-row chip-spacing gender">
        <p>Sugu/<br>Sex</p>
        <div class="bold inline info">{{ biometric.sex }}</div>
      </div>
      <div class="card-row chip-spacing">
        <p>Kodakondsus/<br>Citizenship</p>
        <div class="bold info">{{ biometric.nationality }}</div>
      </div>

      <div class="card-row chip-spacing">
        <p>Sünniaeg/<br>Date of birth</p>
        <div class="bold info">{{ biometric.birthDate }}</div>
      </div>

      <div class="card-row chip-spacing">
        <p>Isikukood/<br>Personal code</p>
        <div class="bold text-black info">38025457264</div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p>Dokumendi number/<br>Document number</p>
          <div class="bold bottom-info">{{ biometric.cardNumber.substr(0,3) }}-{{ biometric.cardNumber.substr(3,7) }}-{{ biometric.cardNumber.substr(10,2) }}</div>
        </div>
      </div>
      
      <div class="card-row chip-spacing">
        <div>
          <p>Kehtiv kuni/Date of expiry</p>
          <div class="bold text-black bottom-info">
            {{ biometric.cardValidityDateEnd }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "EstonianFrontCardView",
  props: ["biometric", "picture"],
};
</script>

<style scoped>

p {
  margin-bottom: unset;
  font-size: 0.45rem
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
  text-transform: uppercase;
}

.card-content {
  padding: 5px;
  font-size: 10px;
  margin-top: 10px;
}

.card-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: left;
  background-color: unset !important;
  color: #483D8B
}

.card-content p {
  color: #483D8B;
}

.chip-spacing {
  margin-left: 130px;
}

.card-row {
  display: flex;
  line-height: 10px;
  margin-bottom: 5px;
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

.photo {
  top: 100px;
  left: 10px;
  position: absolute;
  width: 100px;
}

.photo img {
  width: 100%;
}

.image {
  margin-bottom: 5px;
  width: 100px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 3px 10px 0px;

}

.estonian-flag {
  margin-left: 10px;
}

.estonian-flag-img {
  max-width: 60px;
  max-height: 60px;
  border: solid 0.5px gray;
}

.gender {
  margin-top: 10px;
}

.id-country .title {
  margin-left: 10px;
}

.id-country .sub-title {
  margin-left: 18px;
}

.id-card {
  margin-left: 10px;
  margin-top: 8px;
}

.info {
  margin-left: 10px;
  align-self: center;
}

.bottom-info {
  margin-top: 3px;
}
</style>
