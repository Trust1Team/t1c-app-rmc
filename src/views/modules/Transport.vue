<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.Transport Modules") }}</div>
    <div class="col-span-12 text-center mt-2 mb-10 text-lg">{{ $t("modules.Supported transport modules") }}</div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Calypso</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/calypso-cards.png" alt="https://spirtech.com/img/ps_sam_solutions1.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Mobib</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/mobib.jpg" alt="https://docplayer.fr/docs-images/99/140203580/images/11-3.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 text-center mt-10"><button class="btn bg-gray-400 text-white px-10">{{ $t("modules.Card not found") }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'TransportModules'
}
</script>

<style scoped>
.logo {
  width: 300px;
}

.card-container {
 height: 300px !important;
}

.card-title {
  width: 90%;
  line-height: 1;
}

.card-picture {
  width: 90%;
  height: 180px;
  border-radius: 5px
}
</style>
