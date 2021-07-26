<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div style="width: 25%">
          <div class="title"><b>BELGIE</b></div>
          <div class="sub-title">IDENTITEITSKAART</div>
        </div>
        <div style="width: 25%">
          <div class="title"><b>BELGIQUE</b></div>
          <div class="sub-title">CARD D'IDENTITE</div>
        </div>
        <div style="width: 25%">
          <div class="title"><b>BELGIEN</b></div>
          <div class="sub-title">PERSONALAUSWEIS</div>
        </div>
        <div style="width: 25%">
          <div class="title"><b>BELGIUM</b></div>
          <div class="sub-title">IDENTITY CARD</div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="tag" style="width: 30%">Naam/Name</div>
        <div class="data" style="width: 50%"><b>{{ biometric.name }}</b></div>
      </div>

      <div class="row">
        <div class="tag" style="width: 30%">Voornamen/Given names</div>
        <div class="data" style="width: 50%"><b>{{ biometric.firstNames + " " + biometric.thirdName }}</b></div>
      </div>

      <div class="row">
        <div class="tag" style="width: 30%"></div>
        <div class="tag" style="width: 50%">Geboorteplaats en -datum/Place and date of birth</div>
        <div class="data float-right" style="width: 20%">Geslacht/Sex</div>
      </div>

      <div class="row">
        <div class="tag" style="width: 30%"></div>
        <div class="data" style="width: 50%"><b>{{ biometric.birthLocation + " " + biometric.birthDate}}</b></div>
        <div class="data float-right" style="width: 20%"><b>{{ biometric.sex }}</b></div>
      </div>

      <div class="row">
        <div class="tag" style="width: 30%"></div>
        <div class="tag" style="width: 50%">Nationaliteit</div>
      </div>
      <div class="row">
        <div class="tag" style="width: 30%"></div>
        <div class="data" style="width: 50%">Nationality <b>{{ biometric.nationalNumber }}</b></div>
      </div>
      <div class="row">
        <div class="tag" style="width: 30%"></div>
        <div class="tag" style="width: 50%">Kaartner./Card NO</div>
      </div>
      <div class="row">
        <div class="tag" style="width: 30%"></div>
        <div class="data" style="width: 50%"><b>{{ biometric.cardNumber }}</b></div>
      </div>
      <div class="row">
        <div class="tag" style="width: 50%">Geldig van - tot/Valid from - until</div>
      </div>
      <div class="row">
        <div class="data" style="width: 50%"><b>{{ biometric.cardValidityDateBegin + " - " + biometric.cardValidityDateEnd }}</b></div>
      </div>
      <div class="row">
        <div class="tag" style="width: 100%">&nbsp;</div>
      </div>
      <div class="row">
        <div class="tag" style="width: 100%">&nbsp;</div>
      </div>
      <div class="row">
        <div class="tag" style="width: 100%">&nbsp;</div>
      </div>
      <div class="row">
        <img class="image" src="../../assets/be_id_card_45x35mm.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FrontCardView",
  props:["biometric", "picture"]
}
</script>

<style scoped>
.card {
  width: 80%;
  margin: auto;
}

.tag {
  font-size: 9px !important;
}

.data {
  font-size: 9px !important;
}

.title {
  font-size: 14px;
}

.sub-title {
  font-size: 9px;
}

.float-right {
  text-align: right;
}

.image {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 5px;
  width: 100px;
}
</style>