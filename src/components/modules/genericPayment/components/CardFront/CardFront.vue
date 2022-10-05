<template>
  <div class="card-container bg-gray-300 dark:bg-gray-500 dark:text-black">
    <div class="card-content">
      <div class="chip">
        <img src="/assets/images/credit-card.svg" alt="Credit card chip" />
      </div>
      <div class="card-row">
        <div class="text-title">
          <p>
            <i>{{ $t('genericCardView.Card number') }}</i>
          </p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ constructCardNumber }}</p>
        </div>
      </div>
      <div v-if="applicationData.name" class="card-row">
        <div class="text-title">
          <p>
            <i>{{ $t('genericCardView.Card number') }}</i>
          </p>
        </div>
        <div class="text-spacing">
          <p class="bold">{{ applicationData.name }}</p>
        </div>
      </div>
      <div class="card-row">
        <div class="text-title">
          <p>
            <i>{{ $t('genericCardView.Expires') }}</i>
          </p>
        </div>
        <div class="text-spacing">
          <p class="bold">
            {{ constructExpirationDate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { computed } from 'vue';
import { forEach } from 'lodash';

export default {
  name: 'CardFront',
  props: ['applicationData'],
  setup(props, context) {
    const constructCardNumber = computed(() => {
      let cardNumber = '';
      forEach(this.applicationData.pan, (comp, idx) => {
        idx % 4 === 0 ? (cardNumber += ' ' + comp) : (cardNumber += comp);
      });
      return cardNumber;
    });

    const constructExpirationDate = computed(() =>
      moment(props.applicationData.expirationDate, 'YYMMDD').format('DD/MM/YY'),
    );

    return {
      constructCardNumber,
      constructExpirationDate,
    };
  },
};
</script>

<style src="./CardFront.style.css" scoped />
