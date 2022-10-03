<template>
  <div class="card-container">
    <div class="card-body">
      <div class="row text-center">
        <div class="col-1 m-auto">
          <div class="sub-title">
            <img src="../../../assets/images/Luxembourg-flag.png" style="width: 50px; height: 40px" alt="" />
          </div>
        </div>

        <div class="col-2 m-auto">
          <div class="sub-title">Grand-Duché de</div>
          <div class="title"><b>LUXEMBOURG</b></div>
          <div class="sub-title">Carte d'identité</div>
        </div>

        <div class="col-2 m-auto">
          <div class="sub-title">Grand Duchy of</div>
          <div class="title"><b>LUXEMBOURG</b></div>
          <div class="sub-title">Identity Card</div>
        </div>

        <div class="col-2 m-auto">
          <div class="sub-title">Grossherzogutm</div>
          <div class="title"><b>LUXEMBURG</b></div>
          <div class="sub-title">Personalausweis</div>
        </div>

        <div class="col-2 m-auto">
          <div class="title"><b>LETZEBUERG</b></div>
        </div>
      </div>

      <div class="row">
        <div class="col-4 text-center">
          <b class="font-xl">{{ cardInfo.name.toUpperCase() }}</b>
        </div>
      </div>

      <div class="row">
        <div class="col-4 text-center">
          <img src="../../../assets/images/Luxembourg-flag.png" alt="" class="image" />
        </div>
        <div class="col-8 mt--1">
          <div class="row">
            <div class="col-4 mt--1">
              <b class="font-small mt--1">NOM / NAME</b>
            </div>
          </div>
          <div class="row mt--1">
            <div class="col-4 mt--1">
              <b class="font-large mt--1">{{ cardInfo.name }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--1">
              <b class="font-small mt--1">Prénoms / Given Names</b>
            </div>
          </div>
          <div class="row mt--1">
            <div class="col-4 mt--1">
              <b class="font-large mt--1">{{ cardInfo.name }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-3 mt--1">
              <b class="font-small mt--1">SEXE / SEX</b>
            </div>
            <div class="col-6 mt--1">
              <b class="font-small mt--1">NATIONALITÉ / NATIONALITY</b>
            </div>
          </div>
          <div class="row mt--1">
            <div class="col-3 mt--1">
              <b class="font-large mt--1">{{ cardInfo.sex }}</b>
            </div>
            <div class="col-6 mt--1">
              <b class="font-large mt--1">{{ cardInfo.nationality }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-6 mt--1">
              <b class="font-small mt--1">DATE DE NAISSANCE / DATE OF BIRTH</b>
            </div>

            <div class="col-6 mt--1">
              <img class="image-small mt--1" src="../../../assets/images/Luxembourg-flag.png" alt="" />
            </div>
          </div>
          <div class="row mt--1">
            <div class="col-6 mt--1">
              <b class="font-large mt--1">{{ cardInfo.birthDate }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-8 mt--1">
              <b class="font-small mt--1">N◦ CARTE D'IDENTITÉ / IDENTITY CARD NB</b>
            </div>
          </div>
          <div class="row mt--1">
            <div class="col-8 mt--1">
              <b class="font-large mt--1">{{ cardInfo.cardNumber }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-8 mt--1">
              <b class="font-small mt--1">VALIDE JUSQU`AU / VALID UNTIL</b>
            </div>
          </div>
          <div class="row mt--1">
            <div class="col-8 mt--1">
              <b class="font-large mt--1">{{ cardInfo.validUntil }}</b>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top: -55px">
        <div class="col-4">
          <img src="../../../assets/images/signature.png" alt="" style="width: 100%; height: 40px" />
        </div>
      </div>

      <div class="row" style="margin-left: -20px">
        <div class="col-7">
          <b class="font-very-small">SIGNATURE DU TITULAIRE / HOLDER'S SIGNATURE</b>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <img class="image-logo" src="../../../assets/images/Luxembourg-flag.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuxembourgID',
  props: ['cardInfo'],
};
</script>

<style scoped>
p {
  margin-bottom: unset;
}

.card-container {
  /*Ratio is 8/5*/
  width: 640px;
  height: 400px;
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
.sub-title-spacing {
  margin-left: 35px;
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
  font-size: 15px;
}

.sub-title {
  font-size: 10px;
}

.image {
  position: absolute;
  left: 10px;
  top: 100px;
  margin-bottom: 20px;
  width: 200px;
  height: 230px;
  border-radius: 10px;
}

.image-small {
  position: absolute;
  right: 110px;
  top: 250px;
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 15px;
}

.image-logo {
  position: absolute;
  right: 10px;
  bottom: 0;
  margin-bottom: 10px;
  width: 70px;
}

.font-very-small {
  font-size: 9px !important;
}

.font-small {
  font-size: 10px !important;
}

.font-medium {
  font-size: 14px !important;
}

.font-large {
  font-size: 18px !important;
}

.font-xl {
  font-size: 22px !important;
}

.mt--1 {
  margin-top: -1px !important;
}

.mt--2 {
  margin-top: -2px !important;
}

.mt--3 {
  margin-top: -3px !important;
}

.mt--4 {
  margin-top: -4px !important;
}

.mt--5 {
  margin-top: -5px !important;
}
</style>
