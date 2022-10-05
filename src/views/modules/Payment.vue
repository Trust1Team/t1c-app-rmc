<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.Payment Modules") }}</div>
    <div class="col-span-12 text-center mt-2 mb-10 text-lg">{{ $t("modules.Supported payment modules") }}</div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 ">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 card-container">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.EMV") }}</button>
        <div class="rounded flex justify-center"><img src="@/assets/images/emv.jpg" alt="https://i.stack.imgur.com/6OEzp.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Crelan") }}</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/crelan-visa.png" alt="https://www.comparatif-carte-de-credit.be/img/crelan-visa.png" class="crelan-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 text-center mt-10"><button class="btn bg-gray-400 text-white px-10">{{ $t("modules.Card not found") }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'PaymentModules'
}
</script>
