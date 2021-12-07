<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.Remote loading Modules") }}</div>
    <div class="col-span-12 text-center my-2 text-lg">{{ $t("modules.Supported Ids/Tokens") }}</div>
    <div class="col-span-12 text-center mt-10"><button class="btn bg-gray-400 text-white px-10">{{ $t("modules.Card not found") }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'RemoteLoadingModules'
}
</script>

<style scoped>
.logo {
  width: 300px;
}
</style>
