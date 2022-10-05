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
        <div class="title"><b>Digitaalne ISIKUTUNNISTUS</b></div>
        <div class="sub-title">Digital Identity Card</div>
      </div>
    </div>
    <div class="card-content">
      <div class="chip">
        <div>
          <img src="../../../../assets/credit-card.svg" alt="Credit card chip" />
        </div>
      </div>
      <div class="upper-infos">
        <div class="card-row chip-spacing">
          <div class="bold">{{ biometric.name }}</div>
        </div>
        <div class="card-row chip-spacing">
          <div>
            {{ biometric.firstNames }} {{ biometric.thirdName }}
          </div>
        </div>  
      </div>
      <div class="infos-container">
        <div class="card-row">
          <p>Isikukood<br>Personal code</p>
          <div class="bold text-black info">38025457264</div>
        </div>
        <div class="card-row">
          <p>Dokumendi number<br>Document number</p>
          <div class="bold info">{{ biometric.cardNumber.substr(0,3) }}-{{ biometric.cardNumber.substr(3,7) }}-{{ biometric.cardNumber.substr(10,2) }}</div>
        </div>
        <div class="card-row">
          <p class="text-blue">Välja antud <br>Date of Issue</p>
          <div class="bold info">{{ biometric.cardValidityDateBegin }}</div>
        </div>
        <div class="card-row">
          <p>Kehtiv kuni <br> Date of expiry</p>
          <div class="bold text-black info">
            {{ biometric.cardValidityDateEnd }}
          </div>
        </div>
        <div class="card-row">
          <div>
            <p>Ainult elektrooniliseks kasutamiseks</p>
            <p>Electronic use only</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EstonianDigitalFrontCardView",
  props: ["biometric", "picture"],
};
</script>

<style scoped>

p {
  margin-bottom: unset;
  font-size: 0.55rem
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
  font-size: 12px;
  margin-top: 10px;
}

.card-header {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: left;
  background-color: unset !important;
}

.chip-spacing {
  margin-left: 130px;
}

.card-row {
  display: flex;
  line-height: 10px;
  margin-bottom: 6px;
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

.chip {
  top: 70px;
  left: 25px;
  position: absolute;
  width: 100px;
}

.chip img {
  width: 80%;
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

.info {
  margin-left: 10px;
  align-self: center;
}

.upper-infos {
  position: absolute;
  top: 60px
}

.upper-infos .card-row {
  margin-top: 25px;
}

.infos-container {
  position: absolute;
  bottom: 10px;
  left: 20px;
}
</style>
