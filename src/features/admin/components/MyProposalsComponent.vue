<script setup lang="ts">
import { PencilSquareIcon, EyeIcon, LockClosedIcon, TrashIcon, StarIcon } from '@heroicons/vue/24/outline'
import useDrafts from '../composables/useDrafts';
import { useRouter } from 'vue-router';
import useAuth from '@/auth/composables/useAuth';
import useDownload from '@/shared/composables/useDownload';
import useDraftMutation from '../composables/useDraftMutation';


const {isLoading, data} = useDrafts();
const router = useRouter();


const { role } = useAuth();

const { isLoadingExport,downloadProposal } = useDownload();

const { openProposal, deleteProposal, visibleDialog, openDialog, finalist } = useDraftMutation();


</script>

<template>
    <div>
        <DataTable
            :value="data"
            dataKey="id"
            :totalRecords="data?.length"
            filterDisplay="row"
            stripedRows
            :loading="isLoading"
            paginator
            selectionMode="single"
            :rows="10" tableStyle="min-width: 50rem" tableClass="w-full" >

            <template #header v-if="role === 'ADMIN'">
                <div class="flex justify-end items-center">
                    <Button
                      label="Descargar"
                      @click="downloadProposal()"
                      :loading="isLoadingExport"
                      icon="pi pi-download"
                      iconPos="left"
                      class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    />
                </div>
            </template>

            <template #empty> No ha realizado ninguna propuesta. </template>
            <template #loading> Buscando propuestas. Por favor espere. </template>

            <Column field="id" header="Referencia" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                      #{{ data.id }}
                    </div>
                </template>
            </Column>

            <Column field="category_name" header="Categoría" class="text-xs overflow-hidden text-ellipsis w-56" :showFilterMenu="false">
                <template #body="{ data }">
                <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                    {{ data.category_name }}
                </div>
                </template>
            </Column>

            <Column field="user_name" header="Proponente" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                    {{ data.user_name }}
                </div>
                </template>
            </Column>

            <Column field="status" header="Estado" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                  <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                      <span
                          :class="{'!text-blue-700 !bg-blue-50 ring-blue-600/20': data.status === 'DRAFT', '!text-green-700 !bg-green-50 ring-green-600/20': data.status === 'SENT'}"
                          class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {{ (data.status === 'DRAFT') ? 'Borrador' : 'Enviada' }}
                      </span>
                  </div>
                </template>
            </Column>

            <Column field="title" header="Título" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                  <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                      {{ (data.title) ? data.title!.slice(0,25) + ((data.title!.length > 25) ? '...' :'')  : 'Sin título' }}
                  </div>
                </template>
            </Column>

            <Column field="candidate" header="Candidato" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                  <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                      {{ (data.candidate) ? data.candidate!.slice(0,45) + ((data.candidate!.length > 45) ? '...' :'')  : 'No completado' }}
                  </div>
                </template>
            </Column>
            <Column field="created_at" header="Creada" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                    {{ data.created_at }}
                </div>
                </template>
            </Column>
            <Column field="updated_at" header="Última Mod." class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                    {{ data.updated_at }}
                </div>
                </template>
            </Column>
            <Column field="id" header="" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    <div v-if="role === 'ADMIN'" class="flex space-x-2">
                        <div @click="router.push({name:'edit-proposal', params:{id:data.id}})">
                        <EyeIcon class="h-5 w-5 text-blue-500 cursor-pointer" />
                        </div>
                        <LockClosedIcon class="h-5 w-5 text-orange-500 cursor-pointer" v-if="data.status === 'SENT'" @click="openProposal(data.id)" />
                        <TrashIcon class="h-5 w-5 text-red-500 cursor-pointer" @click="openDialog(data.id)" />

                        <StarIcon
                          class="h-5 w-5 cursor-pointer"
                          :class="{'text-yellow-500 fill-yellow-500': data.isFinalist === 1}"
                          @click="finalist(data.id, (data.isFinalist === 1) ? 0 : 1)" />


                    </div>
                    <div v-if="role === 'USER'" class="flex space-x-2">
                        <PencilSquareIcon class="h-5 w-5 text-blue-500 cursor-pointer" v-if="data.status === 'DRAFT'" @click="router.push({name:'edit-proposal', params:{id:data.id}})" />
                        <EyeIcon class="h-5 w-5 text-blue-500 cursor-pointer" @click="router.push({name:'edit-proposal', params:{id:data.id}})" v-else />
                        <TrashIcon class="h-5 w-5 text-red-500 cursor-pointer" @click="openDialog(data.id)" />
                    </div>

                    <div v-if="role === 'REV'" class="flex space-x-2">
                      <EyeIcon class="h-5 w-5 text-blue-500 cursor-pointer" @click="router.push({name:'edit-proposal', params:{id:data.id}})" />
                    </div>

                </template>
            </Column>

    </DataTable>
  </div>

  <Dialog v-model:visible="visibleDialog" modal header="Borrar Propuesta" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">¿Está seguro de eliminar la propuesta?.</span>

    <div class="flex justify-end gap-2">
        <Button type="button" label="Cerrar sin borrar" @click="visibleDialog = false" class="p-2 bg-slate-200 hover:bg-slate-400 transition-colors duration-500"></Button>
        <Button type="button" label="Si, Borrar" @click="deleteProposal()" class="bg-red-400 p-2 text-white hover:bg-red-700 transition-colors duration-500"></Button>
    </div>
</Dialog>

</template>


<style scoped>

</style>
