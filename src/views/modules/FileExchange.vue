<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.File-exchange Module") }}</div>
    <div class="col-span-12 grid grid-cols-12" v-if="fileExchangeActive">
      <div class="col-span-12 text-center my-2 text-lg">{{ $t("modules.File-exchange use") }} <b class="text-gray-600">{{ $t("modules.Entity") }}*</b>{{ $t("modules.And a") }} <b class="text-gray-600">{{ $t("modules.Type") }}*</b></div>
      <div class="col-span-12 flex justify-center mt-8">
        <div class="intro-y box flex flex-col justify-center align-items-center py-4 configuration-card border-4 border-gray-400">
          <div class=" text-center text-gray-700 font-bold mb-4 font-medium text-lg border-b border-gray-300 pb-4">{{ $t("modules.File-exchange Data") }}</div>
          <div class="rounded flex justify-center px-10">
            <input
              class="form-control bg-gray-200 border-0 my-4"
              type="text"
              v-model="entityName"
              :placeholder="$t('modules.Entity name')"
            />
          </div>
          <div class="rounded flex justify-center px-10">
            <input
              class="form-control bg-gray-200 border-0 my-4"
              type="text"
              v-model="typeName"
              :placeholder="$t('modules.Type name')"
            />
          </div>
          <div class="text-center my-4">
            <button class="btn bg-gray-400 text-white px-20" @click="fileExchangeActive = true">{{ $t("modules.Create") }}</button>
          </div>
        </div>
      </div>
      <div class="col-span-12 mt-20 border-t border-gray-300 flex flex-col">
        <div class="flex pt-10 pl-4">
          <span class="question-icon"><i class="far fa-question-circle fa-5x"></i></span>
          <div class="pl-8">
            <p class="text-gray-500"><b class="text-gray-600">{{ $t("modules.Entity") }}</b>: {{ $t("modules.Entity description") }}</p>
            <p class="mt-4 text-gray-500"><b class="text-gray-600">{{ $t("modules.Type") }}</b>: {{ $t("modules.Type description") }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 grid grid-cols-12" v-if="!fileExchangeActive">
      <div class="col-span-12 my-4 text-center">
        <p class="text-gray-600">{{ $t("modules.Entity") }}: &ensp; {{ entityName }}</p>
        <p class="text-gray-600">{{ $t("modules.Type") }}: &ensp; {{ typeName }}</p>
      </div>
      <div class="col-span-12 flex justify-center mt-10">
        <div class="intro-y box file-exchange-container bg-gray-300 p-2">
          <div class="flex bg-white rounded pl-2 pt-2">
            <button class="btn border-0 mx-3 file-exchange-tab" :class="activeTab === 'Open Folder' ? 'bg-gray-300' : ''"><i class="fas fa-folder-open"></i>&ensp; Open folder</button>
            <button class="btn border-0 mx-3 file-exchange-tab"><i class="fas fa-upload"></i>&ensp;Upload</button>
            <button class="btn border-0 mx-3 file-exchange-tab"><i class="fas fa-download"></i>&ensp;Download</button>
            <button class="btn border-0 mx-3 file-exchange-tab"><i class="far fa-copy"></i>&ensp;Copy</button>
            <button class="btn border-0 mx-3 file-exchange-tab"><i class="fas fa-arrows-alt"></i>&ensp;Move</button>
            <button class="btn border-0 mx-3 file-exchange-tab"><i class="far fa-trash-alt"></i>&ensp;Delete</button>
            <div class="ml-auto self-center text-gray-500 pr-4"><i class="fas fa-sync-alt"></i></div>
          </div>
          <div class="flex">
            <div class="intro-y box mt-2 first-block">
              <div class="text-center my-3 px-2"><button class="btn btn-primary w-full"><i class="far fa-plus-square"></i>&ensp;Create Folder</button></div>
            </div>
            <div class="intro-y box mt-2 second-block ml-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileExchangeModules',
  data() {
    return {
      entityName: '',
      typeName: '',
      fileExchangeActive: false,
      activeTab: 'Open Folder'
    }
  }
}
</script>

<style scoped>
.logo {
  width: 300px;
}

.configuration-card {
  width: 40%;
}

.question-icon {
  color: lightgray
}

.file-exchange-container {
  width: 80%
}

.file-exchange-tab {
  color: gray;
  height: 50px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 0 0;
}

.first-block {
  width: 35%;
}
.second-block {
  width: 65%;
}
</style>
