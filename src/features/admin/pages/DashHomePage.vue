<template>
<div class="h-screen">
  <div class="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
    <h3 class="text-base font-semibold text-gray-900">Propuestas creadas para los Premios FCEI TOP</h3>
    <div class="mt-3 sm:ml-4 sm:mt-0">
      <router-link :to="{name:'new-proposal'}" class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
      Nueva Propuesta
      </router-link>
    </div>
  </div>

  <MyProposalsComponent />

</div>
</template>

<script setup lang="ts">
import MyProposalsComponent from '../components/MyProposalsComponent.vue';


</script>

<style scoped>

</style>
