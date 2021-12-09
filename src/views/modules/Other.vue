<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.Other Modules") }}</div>
    <div class="col-span-12 text-center mt-2 mb-10 text-lg">{{ $t("modules.Supported other modules") }}</div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Wacom Signature Tablet") }}</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/wacom-tablet.png" alt="https://wcm-cdn.wacom.com/for-business/-/media/project/wacom/sites/bsu/products/images/hardware/signature-pads/stu-430/header/wacom-for-business-signature-pad-stu-430-top.png?h=418&la=fr&w=700&hash=5CA1E2CF2E9553185AA36A69A508F62F" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Printing") }}</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/printer.jpg" alt="https://www.techdim.com/wp-content/uploads/2019/08/Virtual-Printer-for-Your-Business.jpg.webp" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 text-center mt-10"><button class="btn bg-gray-400 text-white px-10">{{ $t("modules.Card not found") }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'OtherModules'
}
</script>
