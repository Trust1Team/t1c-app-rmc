<template>
  <div>
    <h1 class="title text-4xl my-5 font-medium">{{ $t("contact.Contact us") }}</h1>
    <p class="subtitle">{{ $t("contact.contactUsSubtitle") }}</p>
    <br />
    <div class="form">
      <form @submit.prevent>
        <div class="grid grid-cols-12">
          <div class="col-span-6 mr-3">
            <input
              class="form-control"
              type="text"
              v-model="name"
              :placeholder="$t('contact.Name')"
            />
          </div>
          <div class="col-span-6 ml-3">
            <input
              class="form-control"
              type="text"
              v-model="company"
              :placeholder="$t('contact.Company')"
            />
          </div>
        </div>
        <br />
        <div class="grid grid-cols-12">
          <div class="col-span-6 mr-3">
            <input
              class="form-control"
              type="text"
              v-model="email"
              :placeholder="$t('contact.Email Address')"
            />
          </div>
          <div class="col-span-6 ml-3">
            <input
              class="form-control"
              type="text"
              v-model="phoneNumber"
              :placeholder="$t('contact.Phone Number')"
            />
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-12">
            <textarea
              rows="5"
              class="form-control"
              v-model="message"
              :placeholder="$t('contact.Your message')"
            ></textarea>
          </div>
        </div>
        <br />
        <div class="grid grid-cols-12">
          <div class="col-span-12 float-left check-text">
            <input
              type="checkbox"
              :disabled="technicalCheck"
              id="informationCheck"
              name="informationCheck"
              v-model="informationCheck"
              class="form-check-input"
            />&nbsp;
            <label class="form-check-label text-gray-500" for="informationCheck">{{
              $t("contact.I want more information")
            }}</label>
          </div>
          <div class="col-span-12 float-left check-text">
            <input
              type="checkbox"
              :disabled="informationCheck"
              id="technicalCheck"
              name="technicalCheck"
              v-model="technicalCheck"
              class="form-check-input"
            />&nbsp;
            <label class="form-check-label text-gray-500" for="technicalCheck">{{
              $t("contact.I have technical issue")
            }}</label>
          </div>
        </div>
        <div class="row">
          <div class="col-12 float-right check-text">
            <button
              type="button"
              class="btn bg-gray-600 text-white"
              data-bs-toggle="modal"
              data-bs-target="#validateModal"
            >
              {{ $t("contact.Validation") }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div>
      <!--Validate Modal -->
      <div
        class="modal fade"
        id="validateModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="validateModalLabel"
        aria-hidden="true"
        ref="validateModal"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h5 class="modal-title m-lg-auto" id="validateModalLabel">
                {{ $t("contact.Get in Touch") }}
              </h5>
              <button
                type="button"
                class="btn close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row float-left check-text" v-if="technicalCheck">
                <div class="col-1">
                  <i class="fa fa-download fa-2x text-primary"></i>
                </div>
                <div class="col-11">{{ $t("contact.exportMessage") }}</div>
              </div>
              <div :class="technicalCheck ? 'col-11 m-auto' : ''">
                <div class="row float-left check-text">
                  <div class="col-1">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      name="privacyPolicy"
                      v-model="privacyPolicy"
                      class="form-check-input"
                    />&nbsp;
                  </div>
                  <div class="col-10">
                    <label class="form-check-label" for="privacyPolicy">
                      {{ $t("contact.I have read the") }}
                      <a
                        href="https://www.trust1team.com/privacy-policy"
                        target="_blank"
                        >{{ $t("contact.Privacy Policy") }}</a
                      >
                    </label>
                  </div>
                </div>
                <div class="row float-left check-text">
                  <div class="col-1">
                    <input
                      type="checkbox"
                      id="termsCondition"
                      name="termsCondition"
                      v-model="termsCondition"
                      class="form-check-input"
                    />&nbsp;
                  </div>
                  <div class="col-10">
                    <label class="form-check-label" for="termsCondition">
                      {{ $t("contact.I agree to the") }}
                      <a
                        href="https://www.trust1team.com/terms-conditions"
                        target="_blank"
                        >{{ $t("contact.termsCondition") }}</a
                      >
                    </label>
                  </div>
                </div>
                <div class="row float-left check-text">
                  <div class="col-1">
                    <input
                      type="checkbox"
                      id="t1tAgreement"
                      name="t1tAgreement"
                      v-model="t1tAgreement"
                      class="form-check-input"
                    />&nbsp;
                  </div>
                  <div class="col-10">
                    <label class="form-check-label" for="t1tAgreement">{{
                      $t("contact.t1tAgreement")
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                @click.prevent="submitForm"
                class="btn btn-secondary m-auto"
                :disabled="!(privacyPolicy && termsCondition && t1tAgreement)"
              >
                {{ $t("contact.Submit") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      name: "",
      company: "",
      email: "",
      phoneNumber: "",
      message: "",
      informationCheck: false,
      technicalCheck: false,
      privacyPolicy: false,
      termsCondition: false,
      t1tAgreement: false,
    };
  },
  methods: {
    submitForm() {
      //TODO save submitted data
      let formData = {
        name: this.name,
        company: this.company,
        email: this.email,
        phoneNumber: this.phoneNumber,
        message: this.message,
        informationCheck: this.informationCheck,
        technicalCheck: this.technicalCheck,
        privacyPolicy: this.privacyPolicy,
        termsCondition: this.termsCondition,
        t1tAgreement: this.t1tAgreement,
      };
      console.log(formData);
      this.clearForm();
    },
    clearForm() {
      this.name = "";
      this.company = "";
      this.email = "";
      this.phoneNumber = "";
      this.message = "";
      this.informationCheck = false;
      this.technicalCheck = false;
      this.privacyPolicy = false;
      this.termsCondition = false;
      this.t1tAgreement = false;
    },
  },
};
</script>

<style scoped>
.title {
  color: #e05512;
  text-align: center;
}
.subtitle {
  color: #97a0af;
  text-align: center;
  font-size: 18px;
  width: 60%;
  margin: auto;
}
.form {
  text-align: center;
  width: 60%;
  margin: auto;
}
.float-left {
  text-align: left;
}
.float-right {
  text-align: right;
}
.check-text {
  font-style: italic;
  color: #97a0af;
}
.modal-title {
  color: #97a0af;
}
</style>