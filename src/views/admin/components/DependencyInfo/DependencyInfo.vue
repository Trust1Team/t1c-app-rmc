<template>
  <div class="refresh">
    <button class="btn btn-primary" @click="fetchDependencies()">
      <i class="fas fa-sync-alt refresh-icon" />
    </button>
  </div>

  <div class="status-container">
    <div class="status-item intro-x box">
      <div class="status-item-service">
        {{ $t('admin.dependencyInfo.t1cApi') }}
      </div>
      <div class="status-item-icon">
        <div v-if="!t1c" class="loading">
          <LoadingIcon :size="30" icon="puff" />
        </div>
        <div v-if="t1c">
          <i v-if="t1c.error" class="fas fa-exclamation-circle fa-2x red" />
          <i v-if="t1c.warning" class="fas fa-exclamation-triangle fa-2x yellow" />
          <i v-if="t1c.success" class="fas fa-check-circle fa-2x green" />
        </div>
      </div>
    </div>

    <div class="status-item intro-x box">
      <div class="status-item-service">
        {{ $t('admin.dependencyInfo.validationService') }}
      </div>
      <div class="status-item-icon">
        <div v-if="!validation" class="loading">
          <LoadingIcon :size="30" icon="puff" />
        </div>
        <div v-if="validation">
          <i v-if="validation.error" class="fas fa-exclamation-circle fa-2x red" />
          <i v-if="validation.warning" class="fas fa-exclamation-triangle fa-2x yellow" />
          <i v-if="validation.success" class="fas fa-check-circle fa-2x green" />
        </div>
      </div>
    </div>

    <div class="status-item intro-x box">
      <div class="status-item-service">
        {{ $t('admin.dependencyInfo.distributionServer') }}
      </div>
      <div class="status-item-icon">
        <div v-if="!ds" class="loading">
          <LoadingIcon :size="30" :show="ds" />
        </div>
        <div v-if="ds">
          <i v-if="ds.error" class="fas fa-exclamation-circle fa-2x red" />
          <i v-if="ds.warning" class="fas fa-exclamation-triangle fa-2x yellow" />
          <i v-if="ds.success" class="fas fa-check-circle fa-2x green" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { LoadingIcon } from '@/components/UIComponents';
import ValidationService from '@/infrastructure/services/Validation';
import DistributionService from '@/infrastructure/services/Distribution';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';

export default {
  name: 'DependencyInfo',
  components: { LoadingIcon },
  setup() {
    const ds = ref();
    const validation = ref();
    const t1c = ref();

    const fetchDependencies = () => {
      ds.value = null;
      t1c.value = null;
      validation.value = null;

      const client = Trust1ConnectorService.getClient();

      if (!client) {
        t1c.value = {
          error: true,
          success: false,
          warning: false,
        };
      }

      client
        .core()
        .info()
        .then(
          (res) => {
            t1c.value = {
              error: false,
              success: res.t1CInfoAPI.status === 'ACTIVATED',
              warning: res.t1CInfoAPI.status !== 'ACTIVATED',
            };
          },
          (err) => {
            t1c.value = {
              error: false,
              success: false,
              warning: true,
            };
            console.log(err);
          },
        );

      ValidationService.getStatus().then(
        () => {
          validation.value = {
            error: false,
            success: true,
            warning: false,
          };
        },
        (err) => {
          validation.value = {
            error: true,
            success: false,
            warning: false,
          };
          console.error(err);
        },
      );

      DistributionService.getSystemInfo().then(
        (res) => {
          ds.value = {
            error: false,
            success: !!res.data.data.isAlive,
            warning: !res.data.data.isAlive,
          };
        },
        (err) => {
          ds.value = {
            error: true,
            success: false,
            warning: false,
          };
          console.error(err);
        },
      );
    };

    onMounted(() => {
      fetchDependencies();
    });

    return {
      ds,
      validation,
      t1c,
    };
  },
};
</script>

<style src="./DependencyInfo.style.css" scoped />
