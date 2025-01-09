<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script setup lang="ts">
import { ref, toRaw } from 'vue';
import Editor from 'primevue/editor';
import ScrollTop from 'primevue/scrolltop';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';

import useCategories from '@/shared/composables/useCategories';
import type { Proposal } from '../interfaces/proposal';

const { categories } = useCategories();

interface Emits {
    (e: 'onSend', v: any): any
    (e: 'onDraft', v: any): any
    (e: 'onUpdate', v: any): any
}

interface Props {
   isSavingDraft: boolean
   isSending: boolean
   proposal?: Proposal
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const initialValues = {...props.proposal};


const linkSchema = z.string()
  .min(1, 'El enlace no puede estar vacío')
  .url('Debe ser una URL válida');

const fileSchema = z.custom<File>((file) => file instanceof File).optional();

const resolver = zodResolver(
    z.object({
        id: z.number().optional(),
        candidate: z.string({ message: 'Debe especificar un candidato' }),
        category_id: z.number({ message: 'Debe seleccionar una categoría' }),
        development: z.string({ message: 'Debe especificar el desarrollo' }),
        email: z.string({message: 'El email es obligatorio'}).email(),
        entity: z.string({ message: 'Debe especificar una entidad' }),
        location: z.string({ message: 'Es necesario la localiación' }),
        phone_contact: z.string({ message: 'Se necesita un número de teléfono' }),
        project_title: z.string({ message: 'Debe completar este campo' }),
        proponent: z.string({ message: 'Debe indicar quien propone' }),
        results: z.string({ message: 'Debe especificar los resultados' }),
        resumen: z.string({ message: 'Debe especificar el resumn' }),
        scope: z.string({ message: 'Debe especificar el alcance' }),
        testimonial_2: z.string().optional().nullable(),
        testimonial_3: z.string().optional().nullable(),
        testimonial: z.string().optional().nullable(),
        testimony_name_2: z.string().optional().nullable(),
        testimony_name_3: z.string().optional().nullable(),
        testimony_name: z.string().optional().nullable(),
        title: z.string(),
        url_doc_1: fileSchema,
        url_doc_2: fileSchema,
        url_doc_3: fileSchema,
        url_doc_4: fileSchema,
        url_image: fileSchema,
        links: z.array(linkSchema).optional(),
        status: z.string().optional(),

    })
  );

const formRef = ref();


// Estado reactivo para los enlaces
const links = ref<string[]>((props.proposal?.links.length) ? [...props.proposal.links] : []);
const errors = ref<string[]>([]);


// Añadir un nuevo enlace vacío
const addLink = () => {
  const valid_links = links.value.filter((link) => link !== '');
  formRef.value.fields.links.states.value = valid_links;
  links.value.push('');
  errors.value.push('');
};

// Eliminar un enlace
const removeLink = (index: number) => {
  links.value.splice(index, 1);
  errors.value.splice(index, 1);
  formRef.value.fields.links.states.value = links.value;
};


const onSelectImage = (event: any) => {
  const file = event.files[0];
  formRef.value.fields.url_image.states.value = file;  // Asocia el archivo con url_image
};


const onFileUploadDoc1 = (event:any) => formRef.value.fields.url_doc_1.states.value = event.files[0];

const onFileUploadDoc2 = (event:any) => formRef.value.fields.url_doc_2.states.value = event.files[0];

const onFileUploadDoc3 = (event:any) => formRef.value.fields.url_doc_3.states.value = event.files[0];

const onFileUploadDoc4 = (event:any) => formRef.value.fields.url_doc_4.states.value = event.files[0];


const onFormSubmit = (e: any) => {
    const valid_links = links.value.filter((link) => link !== '');
    formRef.value.fields.links.states.value = valid_links;
    if (e.valid) emits('onSend', e.values);
};

const onDraft = () => {
    const valid_links = links.value.filter((link) => link !== '');
    formRef.value.fields.links.states.value = valid_links;
    emits('onDraft', toRaw(formRef.value.fields));
};

</script>

<template>

    <Form v-slot="$form" ref="formRef" :initialValues :resolver @submit="onFormSubmit">
    <div class="space-y-8">
      <div class="border-b border-gray-900/10 pb-12">

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="title" class="block text-sm/6 font-medium text-gray-900">Título de la Buena Práctica o de Proyecto</label>
            <div class="mt-2">
                <InputText name="id" type="text" class="hidden" />
                <InputText name="status" type="text" class="hidden" />

                <InputText name="title" id="title" type="text" fluid />
                <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error?.message }}</Message>
            </div>
          </div>

          <div class="col-span-full">
            <label for="resumen" class="block text-sm/6 font-medium text-gray-900">Resumen</label>
            <div class="mt-2">
                <Editor name="resumen" id="resumen" editorStyle="height: 250px" />
                <Message v-if="$form.resumen?.invalid" severity="error" size="small" variant="simple">{{ $form.resumen.error?.message }}</Message>
            </div>
          </div>

          <div class="col-span-full">
            <label for="category_id" class="block text-sm/6 font-medium text-gray-900">Categoría</label>
            <div class="mt-2">
                <Select name="category_id" id="category_id" :options="categories" optionLabel="name" option-value="id" placeholder="Selecciona Categoría" class="w-full" />
                <Message v-if="$form.category_id?.invalid" severity="error" size="small" variant="simple">{{ $form.category_id.error?.message }}</Message>
            </div>
          </div>

        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/9 font-semibold   text-gray-900">Datos Proponente</h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="md:col-span-2">
            <label for="proponent" class="block text-sm/6 font-medium text-gray-900">Proponente</label>
            <div class="mt-2">
                <InputText name="proponent" id="proponent" type="text" fluid />
                <Message v-if="$form.proponent?.invalid" severity="error" size="small" variant="simple">{{ $form.proponent.error?.message }}</Message>
            </div>
          </div>

          <div class="md:col-span-2">
            <label for="entity" class="block text-sm/6 font-medium text-gray-900">Entidad</label>
            <div class="mt-2">
                <InputText name="entity" id="entity" type="text" fluid />
                <Message v-if="$form.entity?.invalid" severity="error" size="small" variant="simple">{{ $form.entity.error?.message }}</Message>
            </div>
          </div>

          <div class="md:col-span-2">
            <label for="location" class="block text-sm/6 font-medium text-gray-900">Localidad</label>
            <div class="mt-2">
                <InputText name="location" id="location" type="text" fluid />
                <Message v-if="$form.location?.invalid" severity="error" size="small" variant="simple">{{ $form.location.error?.message }}</Message>
            </div>
          </div>

          <div class="md:col-span-2">
            <label for="phone_contact" class="block text-sm/6 font-medium text-gray-900">Teléfono de contacto</label>
            <div class="mt-2">
                <InputText name="phone_contact" id="phone_contact" type="text" fluid />
                <Message v-if="$form.phone_contact?.invalid" severity="error" size="small" variant="simple">{{ $form.phone_contact.error?.message }}</Message>
            </div>
          </div>

          <div class="md:col-span-2">
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
            <div class="mt-2">
                <InputText name="email" id="email" type="text" fluid />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
            </div>
          </div>


        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">Candidatura</h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div class="md:col-span-3">
            <label for="project_title" class="block text-sm/6 font-medium text-gray-900">Título</label>
            <div class="mt-2">
                <InputText name="project_title" id="project_title" type="text" fluid />
                <Message v-if="$form.project_title?.invalid" severity="error" size="small" variant="simple">{{ $form.project_title.error?.message }}</Message>
            </div>
          </div>

          <div class="md:col-span-3">
            <label for="candidate" class="block text-sm/6 font-medium text-gray-900">Candidato</label>
            <div class="mt-2">
                <InputText name="candidate" id="candidate" type="text" fluid />
                <Message v-if="$form.candidate?.invalid" severity="error" size="small" variant="simple">{{ $form.candidate.error?.message }}</Message>
            </div>
          </div>


          <div class="md:col-span-3">
          <label for="doc-1" class="block text-sm/6 font-medium text-gray-900">Documentación Aportada 1</label>
            <div class="card mt-2 flex flex-col gap-6 items-start justify-start">
              <InputText name="url_doc_1" class="hidden" />
              <FileUpload
                id="doc-1"
                class="rounded bg-gray-950 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
                ref="fileupload"
                mode="basic"
                :customUpload="true"
                @select="onFileUploadDoc1"
                choose-label="Buscar fichero"
                :maxFileSize="10000000"
              />
              <small
              v-if="props.proposal?.doc_1"
              class="p-2 bg-slate-200 rounded-sm">{{ props.proposal?.doc_1 }}</small>
          </div>
          </div>

          <div class="md:col-span-3">
            <label for="doc-2" class="block text-sm/6 font-medium text-gray-900">Documentación Aportada 2</label>
            <div class="card mt-2 flex flex-col gap-6 items-start justify-start">
              <InputText name="url_doc_2" class="hidden" />
              <FileUpload
                id="doc-2"
                class="rounded bg-gray-950 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
                ref="fileupload"
                mode="basic"
                :customUpload="true"
                @select="onFileUploadDoc2"
                choose-label="Buscar fichero"
                :maxFileSize="10000000"
              />
              <small
              v-if="props.proposal?.doc_2"
              class="p-2 bg-slate-200 rounded-sm">{{ props.proposal?.doc_2 }}</small>

            </div>
          </div>

          <div class="md:col-span-3">
          <label for="doc-3" class="block text-sm/6 font-medium text-gray-900">Documentación Aportada 3</label>
            <div class="card mt-2 flex flex-col gap-6 items-start justify-start">
              <InputText name="url_doc_3" class="hidden" />
              <FileUpload
                id="doc-3"
                class="rounded bg-gray-950 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
                ref="fileupload"
                mode="basic"
                :customUpload="true"
                @select="onFileUploadDoc3"
                choose-label="Buscar fichero"
                :maxFileSize="10000000"
              />
              <small
              v-if="props.proposal?.doc_3"
              class="p-2 bg-slate-200 rounded-sm">{{ props.proposal?.doc_3 }}</small>
          </div>
          </div>

          <div class="md:col-span-3">
          <label for="doc-4" class="block text-sm/6 font-medium text-gray-900">Documentación Aportada 4</label>
            <div class="card mt-2 flex flex-col gap-6 items-start justify-start">
              <InputText name="url_doc_4" class="hidden" />
              <FileUpload
                id="doc-4"
                class="rounded bg-gray-950 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
                ref="fileupload"
                mode="basic"
                :customUpload="true"
                @select="onFileUploadDoc4"
                choose-label="Buscar fichero"
                :maxFileSize="10000000"
              />
              <small
              v-if="props.proposal?.doc_4"
              class="p-2 bg-slate-200 rounded-sm">{{ props.proposal?.doc_4 }}</small>

          </div>
          </div>



          <div class="col-span-full">
            <label for="development" class="block text-sm/6 font-medium text-gray-900">Desarrollo</label>
            <div class="mt-2">
                <Editor name="development" id="development" placeholder="Aquí se escribe el desarrollo del proyecto, cómo se ha tenido la idea, por qué se ha puesto en marcha, con quién se trabaja, el ámbito del proyecto/buena práctica, tanto interno como externo, en caso de tener repercusión en la sociedad. Aportad evidencias y la razón por la cual se merece ganar el premio (no más de 2.000 palabras)." editorStyle="height: 250px" />
                <Message v-if="$form.development?.invalid" severity="error" size="small" variant="simple">{{ $form.development.error?.message }}</Message>
            </div>
          </div>

          <div class="col-span-full">
            <label for="scope" class="block text-sm/6 font-medium text-gray-900">Alcance</label>
            <div class="mt-2">
                <Editor name="scope" id="scope" placeholder="Una breve descripción (4 o 5 frases), que es lo que se diría del proyecto/buena práctica en la entrega de premios." editorStyle="height: 150px" />
                <Message v-if="$form.scope?.invalid" severity="error" size="small" variant="simple">{{ $form.scope.error?.message }}</Message>
            </div>
          </div>

          <div class="col-span-full">
            <label for="results" class="block text-sm/6 font-medium text-gray-900">Resultados</label>
            <div class="mt-2">
                <Editor name="results" id="results" placeholder="Aportar evidencias de los resultados, tanto internos como externos, en caso de que el proyecto/buena práctica tenga repercusión en la sociedad." editorStyle="height: 150px" />
                <Message v-if="$form.results?.invalid" severity="error" size="small" variant="simple">{{ $form.results.error?.message }}</Message>
            </div>
          </div>


          <div class="col-span-full">
            <div class="col-span-full">
            <label for="url_image" class="block text-sm/6 font-medium text-gray-900">Imagen para la presentación</label>
            <div class="card flex flex-col mt-2 gap-6 items-start justify-start">
              <InputText name="url_image" class="hidden" />
              <FileUpload
                accept="image/*"
                :customUpload="true"
                @select="onSelectImage"
                id="url_image"
                class="rounded bg-gray-950 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-600"
                mode="basic"
                choose-label="Buscar fichero"
                :maxFileSize="10000000"
              />
              <small
              v-if="props.proposal?.image"
              class="p-2 bg-slate-200 rounded-sm">{{ props.proposal?.image }}</small>
            </div>
          </div>
          </div>



        </div>

      </div>


      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">Testimonios</h2>

        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

          <div class="md:col-span-3">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 ">
              Testimonio 1
              <div class="col-span-full">
                <label for="testimony_name" class="block text-sm/6 font-medium text-gray-900">Nombre</label>
                <div class="mt-2">
                  <InputText name="testimony_name" id="testimony_name" type="text" fluid />
                  <Message v-if="$form.testimony_name?.invalid" severity="error" size="small" variant="simple">{{ $form.testimony_name.error?.message }}</Message>
                </div>
              </div>

              <div class="col-span-full">
                <label for="testimonial" class="block text-sm/6 font-medium text-gray-900">Testimonio</label>
                <div class="flex flex-col gap-1">
                  <Textarea name="testimonial" id="testimonial" rows="5" cols="30" style="resize: none" />
                  <Message v-if="$form.testimonial?.invalid" severity="error" size="small" variant="simple">{{ $form.testimonial.error?.message }}</Message>
              </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-3">
            <div class=" grid grid-cols-1 gap-x-6 gap-y-8 ">
              Testimonio 2
              <div class="col-span-full">
                <label for="testimony_name_2" class="block text-sm/6 font-medium text-gray-900">Nombre</label>
                <div class="mt-2">
                  <InputText name="testimony_name_2" id="testimony_name_2" type="text" fluid />
                  <Message v-if="$form.testimony_name_2?.invalid" severity="error" size="small" variant="simple">{{ $form.testimony_name_2.error?.message }}</Message>
                </div>
              </div>

              <div class="col-span-full">
                <label for="testimonial_2" class="block text-sm/6 font-medium text-gray-900">Testimonio</label>
                <div class="flex flex-col gap-1">
                  <Textarea name="testimonial_2" id="testimonial_2" rows="5" cols="30" style="resize: none" />
                  <Message v-if="$form.testimonial_2?.invalid" severity="error" size="small" variant="simple">{{ $form.testimonial_2.error?.message }}</Message>
              </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-3">
            <div class=" grid grid-cols-1 gap-x-6 gap-y-8 ">
              Testimonio 3
              <div class="col-span-full">
                <label for="testimony_name_3" class="block text-sm/6 font-medium text-gray-900">Nombre</label>
                <div class="mt-2">
                  <InputText name="testimony_name_3" id="testimony_name_3" type="text" fluid />
                  <Message v-if="$form.testimony_name_3?.invalid" severity="error" size="small" variant="simple">{{ $form.testimony_name_3.error?.message }}</Message>
                </div>
              </div>

              <div class="col-span-full">
                <label for="testimonial_3" class="block text-sm/6 font-medium text-gray-900">Testimonio</label>
                <div class="flex flex-col gap-1">
                  <Textarea name="testimonial_3" id="testimonial_3" rows="5" cols="30" style="resize: none" />
                  <Message v-if="$form.testimonial_3?.invalid" severity="error" size="small" variant="simple">{{ $form.testimonial_3.error?.message }}</Message>
              </div>
              </div>
            </div>
          </div>

          <div class="col-span-full">

          <div class="flex justify-between my-3">
          <h2 class="font-semibold">
            Otros enlaces a testimonios
            <p class="text-sm text-gray-400">Puedes añadir tantos enlaces a vídeos testimoniales como quieras</p>
            </h2>
          <Button
            label="Añadir Enlace"
            class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            icon="pi pi-plus"
            @click="addLink"
          />
          </div>
          <InputText name="links" class="hidden" />

          <div class="flex flex-col gap-y-4 mt-4">

            <div v-for="(link, index) in links" :key="index" class="grid grid-cols-6 gap-x-6 gap-y-8 bg-surface-50 rounded-md p-3">
              <div class="md:col-span-5">
              <InputText
                v-model="links[index]"
                type="url"
                placeholder="Introduce un enlace"
                :class="{'p-invalid': errors[index]}"
              />
              <span v-if="errors[index]" class="p-error">{{ errors[index] }}</span>
              </div>
              <div class="md:col-span-1 items-center justify-center flex">
              <Button
                label="Eliminar"
                icon="pi pi-trash"
                class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-600"
                @click="removeLink(index)"
              />
              </div>
            </div>
          </div>

          </div>

        </div>

      </div>

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <RouterLink :to="{name:'home'}"  class="text-sm/6 font-semibold text-gray-900">Salir sin guardar</RouterLink>

      <Button
        type="button"
        v-if="props.proposal?.status !== 'SENT'"
        :label="(!props.proposal) ? 'Guardar Borrador' : 'Actualizar Borrador'"
        :icon="(!props.isSavingDraft) ? 'pi pi-save' : 'pi pi-refresh'"
        :loading="props.isSavingDraft"
        :disabled="props.isSavingDraft"
        @click="onDraft()"
        class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      ></Button>

      <Button
        v-if="props.proposal?.status !== 'SENT'"
        label="Enviar Candidatura"
        :disabled="$form.$invalid"
        :loading="props.isSending"
        :icon="(!props.isSending) ? 'pi pi-send' : 'pi pi-refresh'"
        type="submit" class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">

      </Button>
    </div>
  </form>

  <ScrollTop />
</template>


<style scoped>

</style>
