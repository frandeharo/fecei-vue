<script setup lang="ts">
import { PencilSquareIcon, EyeIcon } from '@heroicons/vue/24/outline'
import useDrafts from '../composables/useDrafts';
import { useRouter } from 'vue-router';
import useAuth from '@/auth/composables/useAuth';
import useDownload from '@/shared/composables/useDownload';


const {isLoading, data} = useDrafts();
const router = useRouter();


const { role } = useAuth();

const { isLoadingExport,downloadProposal } = useDownload();

// :rowsPerPageOptions="[30, 50, 100, 200]"
</script>

<template>

    <div>
        <DataTable
            :value="data"
            dataKey="id"
            :totalRecords="data?.length"
            filterDisplay="row"
            @rowSelect="router.push({name:'edit-proposal', params:{id:$event.data.id}})"
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
                    #{{ data.id }}
                </template>
            </Column>
            <Column field="user_name" header="Proponente" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.user_name }}
                </template>
            </Column>

            <Column field="status" header="Estado" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    <span
                        :class="{'!text-blue-700 !bg-blue-50 ring-blue-600/20': data.status === 'DRAFT', '!text-green-700 !bg-green-50 ring-green-600/20': data.status === 'SENT'}"
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {{ (data.status === 'DRAFT') ? 'Borrador' : 'Enviada' }}
                    </span>
                </template>
            </Column>

            <Column field="title" header="Título" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ (data.title) ? data.title!.slice(0,25) + ((data.title!.length > 25) ? '...' :'')  : 'Sin título' }}
                </template>
            </Column>

            <Column field="candidate" header="Candidato" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ (data.candidate) ? data.candidate!.slice(0,45) + ((data.candidate!.length > 45) ? '...' :'')  : 'No completado' }}
                </template>
            </Column>
            <Column field="created_at" header="Creada" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.created_at }}
                </template>
            </Column>
            <Column field="updated_at" header="Última Mod." class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    {{ data.updated_at }}
                </template>
            </Column>
            <Column field="id" header="" class="text-xs" :showFilterMenu="false">
                <template #body="{ data }">
                    <template v-if="role === 'ADMIN'">
                        <EyeIcon class="h-5 w-5 text-blue-500 cursor-pointer" />
                    </template>
                    <template v-else>
                        <PencilSquareIcon class="h-5 w-5 text-blue-500 cursor-pointer" v-if="data.status === 'DRAFT'" />
                        <EyeIcon class="h-5 w-5 text-blue-500 cursor-pointer" v-else />
                    </template>

                </template>
            </Column>

    </DataTable>


    </div>
</template>


<style scoped>

</style>
