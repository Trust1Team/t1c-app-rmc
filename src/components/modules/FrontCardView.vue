<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-3">
          <div class="title"><b>BELGIE</b></div>
          <div class="sub-title">IDENTITEITSKAART</div>
        </div>
        <div class="col-3">
          <div class="title"><b>BELGIQUE</b></div>
          <div class="sub-title">CARD D'IDENTITE</div>
        </div>
        <div class="col-3">
          <div class="title"><b>BELGIEN</b></div>
          <div class="sub-title">PERSONALAUSWEIS</div>
        </div>
        <div class="col-3">
          <div class="title"><b>BELGIUM</b></div>
          <div class="sub-title">IDENTITY CARD</div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="tag col-4">Naam/Name</div>
        <div class="data col-8">
          <b>{{ biometric.name }}</b>
        </div>
      </div>

      <div class="row">
        <div class="tag col-4" >Voornamen/Given names</div>
        <div class="data col-8">
          <b>{{ biometric.firstNames + " " + biometric.thirdName }}</b>
        </div>
      </div>

      <div class="row">
        <div class="tag col-4"></div>
        <div class="tag col-6" >
          Geboorteplaats en -datum/Place and date of birth
        </div>
        <div class="data float-right col-2 small-font">Geslacht/Sex</div>
      </div>

      <div class="row">
        <div class="tag col-4"></div>
        <div class="data col-6">
          <b>{{ biometric.birthLocation + " " + biometric.birthDate }}</b>
        </div>
        <div class="data float-right col-2">
          <b>{{ biometric.sex }}</b>
        </div>
      </div>

      <div class="row">
        <div class="tag col-4"></div>
        <div class="tag col-8">Nationaliteit</div>
      </div>
      <div class="row">
        <div class="tag col-4"></div>
        <div class="data col-8">
          Nationality <b>{{ biometric.nationalNumber }}</b>
        </div>
      </div>
      <div class="row">
        <div class="tag col-4"></div>
        <div class="tag col-8">Kaartner./Card NO</div>
      </div>
      <div class="row">
        <div class="tag col-4"></div>
        <div class="data col-8">
          <b>{{ biometric.cardNumber }}</b>
        </div>
      </div>
      <div class="row">
        <div class="tag col-6">
          Geldig van - tot/Valid from - until
        </div>
      </div>
      <div class="row">
        <div class="data col-6">
          <b>{{
            biometric.cardValidityDateBegin +
            " - " +
            biometric.cardValidityDateEnd
          }}</b>
        </div>
      </div>
      <div class="row">
        <div class="tag col-12">&nbsp;</div>
      </div>
      <div class="row">
        <div class="tag col-12">&nbsp;</div>
      </div>
      <div class="row">
        <div class="tag col-12">&nbsp;</div>
      </div>
      <div class="row">
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
  name: "FrontCardView",
  props: ["biometric", "picture"],
};
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

.small-font {
  font-size: 8px !important;
}
</style>
