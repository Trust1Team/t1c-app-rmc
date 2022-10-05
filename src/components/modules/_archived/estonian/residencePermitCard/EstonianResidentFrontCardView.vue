<template>
  <div class="card-container">
    <div class="card-header">
      <div class="title-flag">
        <div class="title text-blue"><b>EST</b></div>
        <div class="logo">
          <img src="../../../../assets/estonian-residence-logo.png" alt="Estonian Flag" class="logo-img"/>
        </div>
      </div>

      <div class="id-card">
        <div class="sub-title">ELAMISLUBA</div>
      </div>
      <div class="bold">{{ biometric.cardNumber.substr(0,3) }}-{{ biometric.cardNumber.substr(3,7) }}-{{ biometric.cardNumber.substr(10,2) }}</div>
    </div>

    <div class="card-content">
      <div class="photo">
        <img
          class="image"
          :src="'data:image/png;base64,' + picture.picture"
          alt=""
        />
      </div>
      <div class="card-row photo-spacing">
        <div>
          <p class="bold"><span class="uppercase">Perekonnanimi</span> Eesnimi/<i><span class="uppercase">Surname</span>  Forename</i></p>
          <div class="uppercase">{{ biometric.name }}</div>
          <div>
            {{ biometric.firstNames }} {{ biometric.thirdName }}
          </div>
        </div>
      </div>

      <div class="card-row-2 photo-spacing">
        <div>
          <p class="bold uppercase">Sugu/<i>Sex</i></p>
          <div>{{ biometric.sex }}</div>
        </div>
        <div class="citizenship uppercase">
          <p class="bold">Kodakondsus/<i>Citizenship</i></p>
          <div>{{ biometric.nationality }}</div>
        </div>
        <div>
          <p class="bold uppercase birth-date">Sünniaeg/<i>Date of birth</i></p>
          <div>{{ biometric.birthDate }}</div>
        </div>
      </div>

      <div class="card-row-2 photo-spacing">
        <div>
          <p class="uppercase bold">Loa liik/<i>type of permit</i></p>
          <p class="uppercase">Pikaajaline elanik eu</p>
        </div>
        <div>
          <p class="bold uppercase">Kehtiv kuni/<i>Card expiry</i></p>
          <p class="bold">
            {{ biometric.cardValidityDateEnd }}
          </p>
        </div>
      </div>

      <div class="card-row photo-spacing">
        <div>
          <p class="uppercase bold">Markused/<i>Remarks</i></p>
          <div class="uppercase">Long term resident ec <br> Lubatud tootada</div>
        </div>
      </div>

      <div class="card-row photo-spacing residence-permit">
        <div>
          <p class="uppercase">Residence Permit</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EstonianResidentFrontCardView",
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
  margin-top: 10px;
}

.card-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  background-color: unset !important;
  align-items: center;
}

.text-blue {
  color: #483D8B
}

.photo-spacing {
  margin-left: 120px;
}
.text-spacing {
  margin-left: 10px;
}

.card-row {
  display: flex;
  line-height: 15px;
  margin-bottom: 5px;
}

.card-row-2 {
  display: flex;
  line-height: 15px;
  justify-content: space-between;
  margin-bottom: 5px;
}

.citizenship {
  margin-left: 5px;
  margin-right: 5px;
}

.birth-date {
  margin-right: 8px
}

.bold {
  font-weight: bold;
}

.uppercase {
  text-transform: uppercase;
}

.title {
  font-size: 30px;
  align-self: center;
}

.title-flag {
  display: flex;
}

.sub-title {
  font-size: 15px;
  align-self: center;
}

.photo {
  top: 115px;
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

.logo {
  margin-left: 10px;
  margin-top: 5px;
}

.logo-img {
  max-width: 60px;
  max-height: 60px;
}

.id-card {
  margin-left: 10px;
}

.residence-permit {
  margin-top: 15px;
}
</style>
