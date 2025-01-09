<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { inject } from 'vue';
import { z } from 'zod';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dialogRef: any = inject('dialogRef');


const initialValues = {
  password: null,
  confirmPass: null
}


// Definir el esquema de validación usando Zod
const schema = z.object({
  password: z.string({ message: 'La contraseña es obligatoria' }).min(8, { message: 'Debe tener al menos 8 caracteres' }),
  confirmPass: z.string({ message: 'La contraseña es obligatoria' }).min(8, { message: 'Debe tener al menos 8 caracteres' }),
}).superRefine( (data, ctx) => {
      if (data.password != data.confirmPass) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPass'],
          message: 'Las contraseñas tienen que coincidir'
        })
      }
    });

// Configurar el resolver de validación usando zodResolver
const resolver = zodResolver(schema);

// Definir el tipo de los valores del formulario


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFormSubmit = (form: any) => {
  if (form.valid) dialogRef.value.close(form.values);
};

const close = () => {
  dialogRef.value.close();
}

</script>

<template>
  <div class="w-full">
      <div class="bg-white px-4 sm:rounded-lg sm:px-8">
        <Form v-slot="$form" :resolver="resolver" :validateOnValueUpdate="false" :validateOnBlur="true" :validateOnSubmit="true" :initialValues="initialValues" @submit="onFormSubmit" class="space-y-6">
          <div>
                <label> Nueva contraseña </label>
                <Password name="password" size="small" toggleMask fluid promptLabel="Escriba su contraseña" weakLabel="Insegura" mediumLabel="Complejidad media" strongLabel="Contraseña fuerte" />
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password?.error.message }}</Message>
          </div>
          <div class="my-8">
                <label> Confirmar contraseña </label>
                <Password name="confirmPass" size="small" toggleMask fluid promptLabel="Escriba su contraseña" weakLabel="Insegura" mediumLabel="Complejidad media" strongLabel="Contraseña fuerte" />
                <Message v-if="$form.confirmPass?.invalid" severity="error" size="small" variant="simple">{{ $form.confirmPass?.error.message }}</Message>
          </div>


          <div class="flex flex-row gap-x-4">
            <button type="submit" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors duration-300"> Cambiar contraseña </button>
            <button type="button" @click="close" class="flex w-full justify-center rounded-md bg-neutral-100 px-3 py-1.5 text-sm/6 font-semibold text-neutral-900 shadow-sm hover:bg-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 transition-colors duration-300"> Cancelar </button>
          </div>
        </form>

      </div>

    </div>
</template>



<style scoped>

</style>
