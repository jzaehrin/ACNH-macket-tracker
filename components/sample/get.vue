<template>

</template>

<script>
    export default {
      name: "sampleGet",
      data: function() {
        return {
          valid: false,
          items: [{value: 0, name: 'Matin'}, {value: 1, name:'Aprèm'}],
          menu: false,
          samples: [],
        }
      },
      methods: {
      },
      async asyncData () {
        this.$axios.$post('/users/'+this.$cookies.get("fuuid")+'/samples', data).then((response) => {
          this.samples = response;
        })
      },
      mounted() {

      }
    }
</script>

<style scoped>

</style>
