<template>
  <div class="container mx-auto px-4">
    <v-container>
      <sample-get></sample-get>
      <sample-add></sample-add>
    </v-container>
  </div>
</template>

<script>
  const sampleAdd = () => import('~/components/sample/add.vue');
  const sampleGet = () => import('~/components/sample/get.vue');
  export default {
    components: {
      sampleAdd,

      sampleGet
    }
  }
</script>
