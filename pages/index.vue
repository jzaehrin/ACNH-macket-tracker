<template>
  <div class="container mx-auto px-4">
    <v-container>
      <sample-add></sample-add>
      <sample-get></sample-get>
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
