<template>
  <div class="card-container">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <div class="row">
            <div class="col-9 m-auto">
              <div class="title"><b>ESPAÑA</b></div>
            </div>
            <div class="col-3 m-auto">
              <img src="../../../assets/images/flag-spain.jpg" width="60" height="40" alt="" />
            </div>
          </div>
        </div>
        <div class="col-9 m-auto">
          <div class="sub-title sub-title-spacing"><b>DOCUMENTO NACIONAL DE IDENTIDAD</b></div>
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <img class="image" src="../../../assets/images/flag-spain.jpg" alt="" />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-2">
              <b class="font-small">APELLIDOS</b>
            </div>
          </div>

          <div class="row">
            <div class="col-2 mt--5">
              <b>ESPAÑOLA</b>
            </div>
          </div>

          <div class="row">
            <div class="col-2 mt--5">
              <b>ESPAÑOLA</b>
            </div>
          </div>

          <div class="row">
            <div class="col-2 mt--5">
              <b class="font-small">NOMBRE</b>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mt--5">
              <b>{{ cardInfo.name }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--5">
              <b class="font-small">SEXO</b>
            </div>
            <div class="col-4 mt--5">
              <b class="font-small">NACIONALIDAD</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--5">
              <b>{{ cardInfo.sex }}</b>
            </div>
            <div class="col-4 mt--5">
              <b>{{ cardInfo.nationality }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--5">
              <b class="font-small">FECHA DE NACIMIENTO</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--5">
              <b>{{ cardInfo.birthDate }}</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--5">
              <b class="font-small mt--5">NUM SOPORT</b>
            </div>
            <div class="col-4 mt--5">
              <b class="font-small mt--5">VALIDEZ</b>
            </div>
          </div>

          <div class="row">
            <div class="col-4 mt--5">
              <b class="mt--5">{{ cardInfo.cardNumber }}</b>
            </div>
            <div class="col-4 mt--5">
              <b class="mt--5">{{ cardInfo.validUntil }}</b>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-4 mt-5">
          <div class="row">
            <div class="col-2">
              <b class="font-small">DNI</b>
            </div>
            <div class="col-10">
              <b>{{ cardInfo.dni }}</b>
            </div>
          </div>
        </div>
        <div class="col-4 text-center">
          <img src="../../../assets/images/signature.png" alt="" style="width: 100%; height: 80px" />
        </div>
        <div class="col-4 m-auto text-center">
          <b>{{ cardInfo.secret }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpanishDNIe',
  props: ['cardInfo'],
};
</script>

<style scoped>
p {
  margin-bottom: unset;
}

.card-container {
  /*Ratio is 8/5*/
  width: 624px;
  height: 390px;
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
  font-size: 24px;
}

.sub-title {
  font-size: 18px;
}

.image {
  position: absolute;
  left: 10px;
  top: 70px;
  margin-bottom: 20px;
  width: 200px;
  height: 270px;
  border-radius: 10px;
}

.font-small {
  font-size: 10px;
}

.mt--5 {
  margin-top: -5px !important;
}
</style>
