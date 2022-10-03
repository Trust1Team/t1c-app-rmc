<template>
  <div class="card-container">
    <div class="card-body">
      <div class="row">
        <div class="col-2">
          <div class="title"><img src="../../../assets/images/Belgium-flag.jpg" alt="" width="70" height="50" /></div>
        </div>

        <div class="col-10 text-center">
          <div class="title"><b>ADVOCAAT - AVOCAT - RECHTSANWALT - LAWYER</b></div>
        </div>
      </div>

      <div class="row">
        <div class="col-5"><b>Naam / Name</b></div>
        <div class="col-7">
          <b>{{ cardInfo.name }}</b>
        </div>
      </div>

      <div class="row">
        <div class="col-5"><b>Voornaam / Given Name</b></div>
        <div class="col-7">
          <b>{{ cardInfo.givenName }}</b>
        </div>
      </div>

      <div class="row">
        <div class="col-1"><i class="fa fa-caret-left fa-5x text-primary"></i></div>
        <div class="col-5"><img src="/img/credit-card.e9422b4b.svg" alt="" width="75" height="75" /></div>
      </div>

      <div class="row">
        <div class="col-6"><b>Geldig tot / Valid Until</b></div>
      </div>

      <div class="row">
        <div class="col-6">
          <b>{{ cardInfo.validUntil }}</b>
        </div>
      </div>

      <div class="row">
        <div class="col-3">
          <img src="../../../assets/images/Belgium-layer-logo.png" width="70" height="70" />
        </div>
        <div class="col-5">
          <div class="row" style="margin-left: -60px; margin-top: 30px">
            <div class="col-12 sub-title bold">Orde van Vlaamse Balies</div>
            <div class="col-12 sub-title bold">Staatsbladsstraat 8</div>
            <div class="col-12 sub-title bold">B- 1000 Brussel</div>
          </div>
        </div>
      </div>

      <div>
        <img class="image" src="../../../assets/images/Belgium-flag.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BelgiumLawyer',
  props: ['cardInfo'],
};
</script>

<style scoped>
p {
  margin-bottom: unset;
}

.card-container {
  /*Ratio is 8/5*/
  width: 512px;
  height: 320px;
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
