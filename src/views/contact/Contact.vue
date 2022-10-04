<template>
  <div>
    <h1 class="title text-4xl my-5 font-medium">{{ $t('contact.Contact us') }}</h1>
    <p class="subtitle">{{ $t('contact.contactUsSubtitle') }}</p>
    <br />

    <div class="form pt-10">
      <form @submit.prevent>
        <div class="grid grid-cols-12">
          <div class="col-span-6 mr-3">
            <input v-model="name" class="form-control" type="text" :placeholder="$t('contact.Name')" />
          </div>
          <div class="col-span-6 ml-3">
            <input v-model="company" class="form-control" type="text" :placeholder="$t('contact.Company')" />
          </div>
        </div>
        <br />

        <div class="grid grid-cols-12">
          <div class="col-span-6 mr-3">
            <input v-model="email" class="form-control" type="text" :placeholder="$t('contact.Email Address')" />
          </div>
          <div class="col-span-6 ml-3">
            <input v-model="phoneNumber" class="form-control" type="text" :placeholder="$t('contact.Phone Number')" />
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-12">
            <textarea v-model="message" rows="5" class="form-control" :placeholder="$t('contact.Your message')" />
          </div>
        </div>
        <br />

        <div class="grid grid-cols-12">
          <div class="col-span-12 float-left check-text">
            <input
              id="informationCheck"
              v-model="informationCheck"
              type="checkbox"
              :disabled="technicalCheck"
              name="informationCheck"
              class="form-check-input contact-checkbox"
            />
            &nbsp;
            <label class="form-check-label text-gray-600" for="informationCheck">
              {{ $t('contact.I want more information') }}
            </label>
          </div>
          <div class="col-span-12 float-left check-text mt-1">
            <input
              id="technicalCheck"
              v-model="technicalCheck"
              type="checkbox"
              :disabled="informationCheck"
              name="technicalCheck"
              class="form-check-input contact-checkbox"
            />
            &nbsp;
            <label class="form-check-label text-gray-600" for="technicalCheck">
              {{ $t('contact.I have technical issue') }}
            </label>
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
              {{ $t('contact.Validation') }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div>
      <div
        id="validateModal"
        ref="validateModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="validateModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h5 id="validateModalLabel" class="modal-title m-lg-auto">
                {{ $t('contact.Get in Touch') }}
              </h5>
              <button type="button" class="btn close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div v-if="technicalCheck" class="row float-left check-text">
                <div class="col-1">
                  <i class="fa fa-download fa-2x text-primary" />
                </div>
                <div class="col-11">{{ $t('contact.exportMessage') }}</div>
              </div>
              <div :class="technicalCheck ? 'col-11 m-auto' : ''">
                <div class="row float-left check-text">
                  <div class="col-1">
                    <input
                      id="privacyPolicy"
                      v-model="privacyPolicy"
                      type="checkbox"
                      name="privacyPolicy"
                      class="form-check-input"
                    />&nbsp;
                  </div>
                  <div class="col-10">
                    <label class="form-check-label" for="privacyPolicy">
                      {{ $t('contact.I have read the') }}
                      <a href="https://www.trust1team.com/privacy-policy" target="_blank">
                        {{ $t('contact.Privacy Policy') }}
                      </a>
                    </label>
                  </div>
                </div>
                <div class="row float-left check-text">
                  <div class="col-1">
                    <input
                      id="termsCondition"
                      v-model="termsCondition"
                      type="checkbox"
                      name="termsCondition"
                      class="form-check-input"
                    />&nbsp;
                  </div>
                  <div class="col-10">
                    <label class="form-check-label" for="termsCondition">
                      {{ $t('contact.I agree to the') }}
                      <a href="https://www.trust1team.com/terms-conditions" target="_blank">
                        {{ $t('contact.termsCondition') }}
                      </a>
                    </label>
                  </div>
                </div>
                <div class="row float-left check-text">
                  <div class="col-1">
                    <input
                      id="t1tAgreement"
                      v-model="t1tAgreement"
                      type="checkbox"
                      name="t1tAgreement"
                      class="form-check-input"
                    />&nbsp;
                  </div>
                  <div class="col-10">
                    <label class="form-check-label" for="t1tAgreement">{{ $t('contact.t1tAgreement') }}</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-secondary m-auto"
                :disabled="!(privacyPolicy && termsCondition && t1tAgreement)"
                @click.prevent="submitForm"
              >
                {{ $t('contact.Submit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Contact',
  setup() {
    const name = ref('');
    const company = ref('');
    const email = ref('');
    const phoneNumber = ref('');
    const message = ref('');
    const informationCheck = ref(false);
    const technicalCheck = ref(false);
    const privacyPolicy = ref(false);
    const termsCondition = ref(false);
    const t1tAgreement = ref(false);

    const clearForm = () => {
      name.value = '';
      company.value = '';
      email.value = '';
      phoneNumber.value = '';
      message.value = '';
      informationCheck.value = false;
      technicalCheck.value = false;
      privacyPolicy.value = false;
      termsCondition.value = false;
      t1tAgreement.value = false;
    };

    const submitForm = () => {
      const formData = {
        name: name.value,
        company: company.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        message: message.value,
        informationCheck: informationCheck.value,
        technicalCheck: technicalCheck.value,
        privacyPolicy: privacyPolicy.value,
        termsCondition: termsCondition.value,
        t1tAgreement: t1tAgreement.value,
      };

      console.log(formData);
      clearForm();
    };

    return {
      name,
      company,
      email,
      phoneNumber,
      message,
      informationCheck,
      technicalCheck,
      privacyPolicy,
      termsCondition,
      t1tAgreement,
      submitForm,
      clearForm,
    };
  },
};
</script>

<style src="./Contact.style.css" scoped />
