<template>
  <div class="card-container">
    <div class="card-header">
      <div>
        <div class="title"><b>EESTI VABARIIK</b></div>
        <div class="sub-title">Respublic of Estonia</div>
      </div>

      <div class="estonian-flag">
        <img src="../../../../assets/estonian-flag.png" alt="Estonian Flag" class="estonian-flag-img"/>
      </div>

      <div class="id-card">
        <div class="title"><b>ISIKUTUNNISTUS</b></div>
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
          <p class="info-title">Eesnimi/Given name</p>
          <div class="bold">
            {{ biometric.firstNames }} {{ biometric.thirdName }}
          </div>
        </div>
      </div>

      <div class="card-row-3 chip-spacing">
        <div>
          <p>Sugu/Sex</p>
          <div class="bold">{{ biometric.sex }}</div>
        </div>
        <div class="citizenship">
          <p>Kodakondsus/Citizenship</p>
          <div class="bold">{{ biometric.nationality }}</div>
        </div>
      </div>

      <div class="card-row-4 chip-spacing">
        <div>
          <p>Sünniaeg/Date of birth</p>
          <div class="bold">{{ biometric.birthDate }}</div>
        </div>
      </div>

      <div class="card-row-2 chip-spacing">
        <div>
          <p>Kehtiv kuni/Date of expiry</p>
          <p class="bold text-black">
            {{ biometric.cardValidityDateEnd }}
          </p>
        </div>
        <div>
          <p>Isikukood/Personal code</p>
          <p class="bold text-black">38025457264</p>
        </div>
      </div>
      <div class="card-row chip-spacing">
        <div>
          <p>Dokumendi number/Document number</p>
          <div class="bold">{{ biometric.cardNumber.substr(0,3) }}-{{ biometric.cardNumber.substr(3,7) }}-{{ biometric.cardNumber.substr(10,2) }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "EstonianFrontCardView2019",
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
  margin-top: 30px;
  text-transform: uppercase;
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
.text-spacing {
  margin-left: 10px;
}

.card-row {
  display: flex;
  line-height: 12px;
}

.card-row-2 {
  display: flex;
  line-height: 15px;
  justify-content: space-between;
}

.card-row-2 div:last-of-type {
  margin-left: 30px;
}

.card-row-3 {
  display: flex;
  justify-content: right;
  line-height: 15px;
}

.card-row-4 {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 2.5%;
  margin-top: 5px;
  margin-bottom: 5px;
}

.citizenship {
  margin-left: 20px
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

.id-card {
  margin-left: 10px;
}
</style>
