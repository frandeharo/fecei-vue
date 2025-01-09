<script setup lang="ts">
import useAuth from '@/auth/composables/useAuth';
// import useChangePass from '@/auth/composables/useChangePass';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router';

const { name, logout } = useAuth();
// const { changePassDialog } =  useChangePass();

const navigation = [
  { name: 'Inicio', href: 'home' },
]
const userNavigation = [
  // { name: 'Cambiar Contraseña', function: changePassDialog  },
  { name: 'Salir', function: logout },
]

</script>

<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <div class="bg-sky-900 pb-32">
      <Disclosure as="nav" class="border-b border-sky-300/25 bg-sky-900 lg:border-none" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-400/25">
            <div class="flex items-center px-2 lg:px-0">
              <div class="shrink-0">
                <img class="block h-8" src="/logo.png" alt="FECEI" />
              </div>
              <div class="hidden lg:ml-10 lg:block">
                <div class="flex space-x-4">

                  <router-link
                    v-for="item in navigation" :key="item.name"
                    :to="{name: item.href}"
                    class="text-white hover:bg-sky-500/75 rounded-md px-3 py-2 text-sm font-medium"
                    exact-active-class="bg-sky-700 text-white"
                  >
                    {{ item.name }}
                  </router-link>

                </div>
              </div>
            </div>

            <div class="flex lg:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-sky-600 p-2 text-sky-200 hover:bg-sky-500/75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
            <div class="hidden lg:ml-4 lg:block">
              <div class="flex items-center">


                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3 shrink-0">
                  <div>
                    <MenuButton class="relative flex rounded-full bg-sky-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600">
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <span class="inline-flex size-8 items-center justify-center rounded-full bg-gray-500">
                        <span class="text-sm font-medium text-white">{{name[0]}}</span>
                      </span>
                    </MenuButton>
                  </div>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem v-for="item in userNavigation" :key="item.name">
                        <Button @click="item.function" variant="text" :label="item.name" fluid class="hover:bg-gray-100 text-left hover:text-gray-900 text-gray-900 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold" />
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>



        <DisclosurePanel class="lg:hidden">
          <div class="border-t border-sky-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="shrink-0">
                <span class="inline-flex size-8 items-center justify-center rounded-full bg-gray-500">
                  <span class="text-sm font-medium text-white">{{name[0]}}</span>
                </span>
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-white">{{ name }}</div>
              </div>

            </div>

            <div class="mt-3 space-y-1 px-2">
            <DisclosureButton v-for="item in navigation" :key="item.name" :as="RouterLink" :to="{name:item.href}" :class="[ 'text-white hover:bg-sky-500/75 block rounded-md px-3 py-2 text-base font-medium']">{{ item.name }}</DisclosureButton>
            <DisclosureButton v-for="item in userNavigation" :key="item.name"  @click="item.function" :class="[ 'text-white hover:bg-sky-500/75 block rounded-md px-3 py-2 text-base font-medium w-full text-start']">{{ item.name }}</DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
  <Toast />
</template>

