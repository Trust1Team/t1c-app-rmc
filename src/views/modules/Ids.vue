<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-12 flex justify-end m-4"><img src="@/assets/images/t1c-logo-full.png" alt="" class="logo" /></div>
    <div class="col-span-12 text-center font-medium text-3xl text-gray-500 my-2 px-2">{{ $t("modules.ID and Token Modules") }}</div>
    <div class="col-span-12 text-center mt-2 mb-10 text-lg">{{ $t("modules.Supported Ids/Tokens") }}</div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <router-link :to="{ name: 'side-menu-modules-beid'}" class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Belgium eID 1,7") }}</router-link>
        <div class="rounded flex justify-center"><img src="@/assets/images/belgian-eid.png" alt="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Belgian_ID_%282021%29_%28front%29.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <router-link :to="{ name: 'side-menu-modules-beid'}" class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Belgium eID 1,8") }}</router-link>
        <div class="rounded flex justify-center"><img src="@/assets/images/belgian-eid.png" alt="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Belgian_ID_%282021%29_%28front%29.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Belgium Lawyer") }}</button>
        <div class="rounded flex justify-center"><img src="@/assets/images/belgian-lawyer.jpg" alt="https://confidens.zetes.com/sites/default/files/inline-images/HR_2016_DPA_wenskaart_NL01_Windows_Photo_Viewer_0.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Luxembourg ID") }}</button>
        <div class="rounded flex justify-center"><img src="@/assets/images/luxembourg-id.jpg" alt="https://upload.wikimedia.org/wikipedia/en/a/ab/Luxembourgish_identity_card.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Spanish DNIe") }}</button>
        <div class="rounded flex justify-center"><img src="@/assets/images/spanish-id.png" alt="https://driverlicensecenter.com/wp-content/uploads/2021/04/Spain-ID-card.png" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Netherlands") }}</button>
        <div class="rounded flex justify-center"><img src="@/assets/images/netherlands-id.jpg" alt="https://upload.wikimedia.org/wikipedia/commons/3/3a/Dutch_identity_card_front_specimen_issued_9_March_2014.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-4 my-3 mx-5 card-container">
      <div class="intro-y box flex flex-col justify-center align-items-center p-4">
        <button class=" flex btn btn-primary mt-2 self-center card-title mb-4 font-medium text-lg">{{ $t("modules.Estonian ID") }}</button>
        <div class="rounded flex justify-center"><img src="@/assets/images/estonian-id.jpg" alt="https://www.id.ee/wp-content/uploads/2019/12/id-kaart-1024x646.jpg" class="card-picture" /></div>
      </div>
    </div>
    <div class="col-span-12 text-center mt-10"><button class="btn bg-gray-400 text-white px-10">{{ $t("modules.Card not found") }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'IdModules'
}
</script>

<style scoped>
.logo {
  width: 300px;
}

.card-container {
 height: 300px;
}

.card-title {
  width: 90%;
  line-height: 1;
}

.card-picture {
  width: 90%;
  height: 200px;
  border-radius: 5px
}
</style>
