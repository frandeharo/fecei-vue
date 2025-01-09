<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import useAuth from '../composables/useAuth';
import { RouterLink } from 'vue-router';

const { initialValues, login } = useAuth()



// Definir el esquema de validación usando Zod
const schema = z.object({
  email: z.string().email({ message: 'El email es obligatorio' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

// Configurar el resolver de validación usando zodResolver
const resolver = zodResolver(schema);

// Definir el tipo de los valores del formulario


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFormSubmit = (form: any) => {
  if (form.valid){
    login(form.values)
  }
};

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-20 w-auto" src="/logo_dark.png" alt="Workflow" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Acceda para presentar candidaturas FECEI</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <Form v-slot="$form" :resolver="resolver" :validateOnValueUpdate="false" :validateOnBlur="true" :validateOnSubmit="true" :initialValues="initialValues" @submit="onFormSubmit" class="space-y-6">
          <div>
                <InputText name="email" size="small" type="email" placeholder="Escribe tu email" fluid  />
                <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email?.error.message }}</Message>
          </div>

          <div>
                <Password type="text" size="small" name="password" placeholder="Password" :feedback="false" toggleMask fluid />
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password?.error.message }}</Message>
          </div>


          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Acceder</button>
          </div>
        </form>

      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        No tengo una cuenta
        {{ ' ' }}
        <RouterLink :to="{name: 'signup'}" class="font-semibold text-blue-600 hover:text-blue-500">Registrarme</RouterLink>
      </p>
    </div>
  </div>
</template>
