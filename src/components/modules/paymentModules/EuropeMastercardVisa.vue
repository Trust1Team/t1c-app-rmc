<template>
  <div class="card">
    <div class="card-body bg-light text-center">
      <div class="row">
        <div class="alert alert-primary col-10 m-auto">
          <b>Europay Mastercard Visa</b>
        </div>
      </div>
      <div class="row">
        <div class="col-1"></div>
        <div class="card bg-visa col-10 mt-4">
          <div class="row">
            <div class="col-12">
              <b class="bank-name">
                {{ cardInfo.bankName }}
              </b>
            </div>
          </div>
          <div class="row mt--4">
            <div class="float-left px-4">
              <img src="/img/credit-card.e9422b4b.svg" alt="" width="50" height="50" />
            </div>
          </div>

          <div class="row mt--4">
            <div class="float-left px-4">
              <div class="card-number">
                {{ cardInfo.cardNumber }}
              </div>
            </div>
          </div>
          <div class="row mt--4">
            <div class="col-4 float-left px-4">
              <div class="cvv mt--4">
                {{ cardInfo.cvv }}
              </div>
            </div>
            <div class="col-5 text-center small-font">MONTH/YEAR</div>
          </div>

          <div class="row mt--4">
            <div class="col-4 float-right small-font mx-5">
              <div class="row">
                <div class="col-9 valid-thru">VALID<br />THRU</div>
                <div class="col-3 small-font m-auto">
                  <i class="fa fa-2x fa-caret-right"></i>
                </div>
              </div>
            </div>
            <div class="col-4 text-center card-number valid-date mt--4">
              {{ cardInfo.validThru }}
            </div>
          </div>

          <div class="row mt--4">
            <div class="float-left px-4 card-holder mt--4">
              {{ cardInfo.cardHolder }}
            </div>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EuropeMastercardVisa',
  props: ['cardInfo'],
};
</script>

<style scoped>
.card {
  border-radius: 15px;
}
.card-body {
  border-radius: 15px;
}

.bg-visa {
  background-color: #1a1f71;
}

.bank-name {
  color: white;
  font-size: 30px !important;
  font-weight: bolder;
  float: right !important;
  padding: 10px 12px 10px 12px;
}

.card-holder {
  color: white;
  font-size: 26px !important;
  float: right !important;
  padding: 10px 15px 10px 15px;
}

.float-left {
  text-align: left;
}

.float-right {
  text-align: right;
}

.card-number {
  color: white;
  font-size: 32px !important;
  font-family: Andalus;
}
.cvv {
  margin-left: 4px;
  color: white;
  font-size: 13px !important;
  font-family: Andalus;
}

.small-font {
  font-size: 13px !important;
  color: white;
}

.valid-thru {
  white-space: break-spaces !important;
  margin-right: -40px;
}

.valid-date {
  margin-left: -75px;
  margin-top: auto;
}

.mt--4 {
  margin-top: -4px;
}
</style>
