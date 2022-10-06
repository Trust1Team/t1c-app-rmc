<template>
  <div>
    <SimpleDialog v-if="show" :show="show" title="version.new" :max-width="1024" @closeModal="closeModal(false)">
      <div>
        <div v-if="newVersion">
          <div
            v-if="newVersionType === 'mandatory'"
            class="alert alert-danger-soft show mb-2 flex items-center justify-center"
            role="alert"
          >
            New version available {{ newVersion }}, you have {{ oldVersion }}, this version is mandatory
          </div>
          <div
            v-if="newVersionType === 'recommended'"
            class="alert alert-warning-soft show mb-2 flex items-center justify-center"
            role="alert"
          >
            New version available {{ newVersion }}, you have {{ oldVersion }}, this version is recommended
          </div>
          <div
            v-if="newVersionType === 'allowed'"
            class="alert alert-primary-soft show mb-2 flex items-center justify-center"
            role="alert"
          >
            New version available {{ newVersion }}, you have {{ oldVersion }}
          </div>
        </div>

        <VersionDownload />
      </div>

      <div v-if="newVersionType !== 'mandatory'" class="px-5 pt-5 text-center col-span-12">
        <button class="btn btn-primary btn-lg ml-6" @click="closeModal(true)">{{ $t('version.ok') }}</button>
      </div>
    </SimpleDialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Trust1ConnectorService from '@/infrastructure/services/Trust1Connector';
import DistributionService from '@/infrastructure/services/Distribution';
import { SimpleDialog } from '@/components/UIComponents';
import { VersionDownload } from '@/components/core';

export default {
  name: 'VersionCheck',
  components: {
    VersionDownload,
    SimpleDialog,
  },
  setup() {
    const show = ref(false);
    const title = ref('');
    const oldVersion = ref();
    const newVersion = ref();
    const newVersionType = ref();

    const closeModal = () => {
      if (newVersionType.value !== 'mandatory') {
        show.value = false;
      }
    };

    const checkVersion = (client) => {
      client
        .core()
        .info()
        .then((info) => {
          DistributionService.getLatestVersion().then((dsRes) => {
            if (info.t1CInfoAPI.version < dsRes.data.data.id) {
              oldVersion.value = info.t1CInfoAPI.version;
              if (dsRes.data.data.mandatory) {
                show.value = true;
                newVersion.value = dsRes.data.data.id;
                newVersionType.value = 'mandatory';
              } else if (dsRes.data.data.recommended) {
                show.value = true;
                newVersion.value = dsRes.data.data.id;
                newVersionType.value = 'recommended';
              } else if (dsRes.data.data.allowed) {
                show.value = true;
                newVersion.value = dsRes.data.data.id;
                newVersionType.value = 'allowed';
              }
            }
          });
        });
    };

    onMounted(() => {
      if (!Trust1ConnectorService.getErrorClient() || !Trust1ConnectorService.getClient()) {
        Trust1ConnectorService.init().then(
          (res) => {
            checkVersion(res);
          },
          (err) => {
            checkVersion(err.client);
          },
        );
      }

      if (Trust1ConnectorService.getClient()) {
        checkVersion(Trust1ConnectorService.getClient());
      }
    });

    return {
      show,
      title,
      oldVersion,
      newVersion,
      newVersionType,
      closeModal,
    };
  },
};
</script>

<style src="./VersionCheck.style.css" scoped />
