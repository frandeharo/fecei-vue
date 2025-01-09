<script setup lang="ts">
import HeaderProposalComponent from '../components/HeaderProposalComponent.vue';
import ProposalFormComponent from '../components/ProposalFormComponent.vue';
import useDraftMutation from '../composables/useDraftMutation';


const { isPending, saveDraft, sendProposal } = useDraftMutation();


</script>


<template>

  <div class="relative isolate overflow-hidden bg-gray-900  py-24 sm:py-16 ">
    <img src="/Congreso-FECEI-Premios-Presentar-Candidatura.jpg" alt="" class="absolute inset-0 -z-10 size-full object-cover" />
    <div class="hidden sm:absolute sm:-top-1 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
      <div class="aspect-[1097/845] w-[68.5625rem] bg-black opacity-40"/>
    </div>

    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-white sm:text-4xl">Presentar una Candidatura Premios FCEI TOP</h2>
    </div>
  </div>

  <div class="h-full">

    <HeaderProposalComponent />

    <ProposalFormComponent
      @on-draft="saveDraft"
      @on-send="sendProposal"
      :is-saving-draft="isPending"
      :is-sending="isPending"
    />

  </div>

</template>


<style scoped>

</style>
