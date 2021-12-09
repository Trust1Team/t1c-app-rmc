<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.PKI Modules") }}</div>
    <div class="col-span-12 text-center my-2 text-lg">{{ $t("modules.Supported PKI modules") }}</div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">LuxTrust</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/luxtrust.png" alt="https://www.luxtrust.com/sites/default/files/2020-11/products_device_token_1.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Oberthur Cosmo-One (7.3)</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/oberthur.png" alt="https://upload.wikimedia.org/wikipedia/fr/thumb/f/f4/Logo_Oberthur_Techologies.svg/1200px-Logo_Oberthur_Techologies.svg.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Aventra MyID</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/aventra.png" alt="http://www.aventrasystems.co.uk/resources/0f1c0f62-0ab5-438f-b1c1-350fd5dba1ed.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Camerfirma</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/camerfirma.png" alt="https://www.camerfirma.com/wp-content/uploads/2020/07/camerfirma-e1596098680163.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <router-link :to="{ name: 'side-menu-modules-certigna'}" class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Certigna</router-link>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/certigna.jpg" alt="https://www.infoprotection.fr/wp-content/uploads/2019/07/F_cfd29128448bf993de3f683df74d3e66530c9c7f6492c.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <router-link :to="{ name: 'side-menu-modules-certinomis'}" class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Certinomis</router-link>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/certinomis.png" alt="https://www.certinomis.fr/wp-content/uploads/2017/12/logo-certinomis-1.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Chambersign</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/chambersign.png" alt="https://www.numerian.fr/wp-content/uploads/2020/09/cle-ias-oberthur-pc.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Idemia Cosmo-one 8.2</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/idemia.jpg" alt="https://cards.comitex.net/wp-content/uploads/2016/11/ID-One-Cosmo-v7IASECC.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">PKCS11 Generic</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/shield-key.png" alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Fshield-key-outline%2F139203&psig=AOvVaw3PNSAf9Rs0FXKL2FEARp64&ust=1639143702937000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjhmKbs1vQCFQAAAAAdAAAAABAP" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4 pb-10 card-container">
        <button class=" flex btn btn-primary mt-5 self-center card-title mb-4 font-medium text-lg">Safenet</button>
        <div class="rounded flex justify-center mt-6"><img src="@/assets/images/safenet.jpg" alt="https://m.media-amazon.com/images/I/61pPHSSf3BL._AC_SY450_.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 text-center mt-10"><button class="btn bg-gray-400 text-white px-10">{{ $t("modules.Card not found") }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'PkiModules'
}
</script>
