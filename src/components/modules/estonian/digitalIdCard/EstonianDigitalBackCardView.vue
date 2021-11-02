<template>
  <div class="card-container" v-if="biometric">
    <div class="card-content">
      <div class="description first">
        selle kaardiga saad <br> kasutada tuhandeid <br> e-teenuseid
      </div>
      <div class="card-row first-barcode">
        <div>
          <div class="barcode text-center">
            38025457264
          </div>
          <div class="personal-code text-center">
            38025457264
          </div>
        </div>
      </div>
      <div class="description last">
        this card provides<br>access to thousands<br>of e-services
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EstonianDigitalBackCardView",
  props: ["biometric", "picture"],
};
</script>

<style scoped>
@font-face {
  font-family: "Libre Barcode 39";
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/librebarcode39/v14/-nFnOHM08vwC6h8Li1eQnP_AHzI2G_Bx0vrx52g.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

p {
  margin-bottom: unset;
  text-transform: uppercase;  
}

.text-blue {
  color: #483D8B;
  font-size: 0.5rem;
}
.card-container {
  /*Ratio is 8/5*/
  width: 480px;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 15px;
  position: relative;
  background-color: #d9d9d9;
  background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.card-content {
  padding: 15px;
  font-size: 10px;
}


.barcode {
  font-family: "Libre Barcode 39", cursive;
  transform: scale(2.1, 5.3);
  margin-top: 30px;
  margin-right: 25px;
}

.personal-code {
  position: absolute;
  bottom: 40%;
  right: 44%
}

.card-row {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  line-height: 15px;
}

.first-barcode {
  margin-left: 25px;
}

.bold {
  font-weight: bold;
}
.description {
  line-height: 35px;
  font-size: 1.5rem;
}

.last {
  margin-top: 15px;
}
</style>
