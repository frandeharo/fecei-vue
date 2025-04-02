<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const actions = [
  {
    path: 'https://congreso.fecei.org/premios-fecei-top/bases-del-concurso/',
    name: 'Bases del concurso',
  },
  {
    path: 'https://congreso.fecei.org/premios-fecei-top/terminos-y-condiciones/',
    name: 'Términos y condiciones',
  },
  {
    path: 'https://congreso.fecei.org/premios-fecei-top/jurado/',
    name: 'Jurado',
  },
  {
    path: 'https://congreso.fecei.org/premios-fecei-top/asistencia-a-la-entrega-de-premios/',
    name: 'Entrega de premios',
  },
  {
    path: 'https://congreso.fecei.org/premios-fecei-top/',
    name: 'Presentación',
  },
]



</script>


<template>

    <p class="text-sm text-gray-700 my-4">
      Con el objetivo de seguir fomentando las buenas prácticas entre sus miembros, la Federación Española de Centros de Enseñanza de Idiomas (FECEI) celebra los Premios FECEI TOP desde el año 2015.
      En la X edición de los Premios, se otorgarán premios en siete categorías:
      <a class="text-sky-700 hover:text-black font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/innovacion/" target="_blank">Innovación</a>, <a class="text-sky-700 hover:text-sky-900 font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/responsabilidad-social-corporativa/" target="_blank">Responsabilidad Corporativa</a>, <a class="text-sky-700 hover:text-sky-900 font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/buena-metodologia-satisfaccion-de-clientes/" target="_blank">Buena Metodología/Satisfacción de Clientes</a>, <a class="text-sky-700 hover:text-sky-900 font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/bien-del-sector/" target="_blank">Bien del Sector</a>, <a class="text-sky-700 hover:text-sky-900 font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/trayectoria-profesional/" target="_blank">Trayectoria Profesional</a>, <a class="text-sky-700 hover:text-sky-900 font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/gestion-de-personas/" target="_blank">Gestión de Personas</a>  y <a class="text-sky-700 hover:text-sky-900 font-semibold transition-color duration-500" href="https://congreso.fecei.org/premios-fecei-top/politica-de-sostenibilidad-greenpositive/" target="_blank">Política de Sostenibilidad</a>.
    </p>

    <div class="flex flex-wrap space-y-2 md:space-x-2 space-x-0 my-3 md:justify-center items-end justify-normal">

      <a v-for="action in actions" target="_blank" :key="action.name" :href="action.path" class="inline-flex items-center rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 transition-colors duration-500 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        {{ action.name }}
      </a>

    </div>

</template>


<style scoped>

</style>
