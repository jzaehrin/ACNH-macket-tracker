<template>
  <div>
    {{user}}
    <div v-for="sample in samples">

    </div>
  </div>
</template>

<script>
  import User from "~/models/User";
  import Sample from '~/models/Sample';
  export default {
    name: "sampleGet",
    data: function() {
      return {

      }
    },
    computed: {
      user() {
        return User.find(this.$cookies.get('acnh-uuid'));
      },
      samples() {
        //return Sample.all();
      }
    },
    mounted() {
      this.$axios.$post('/api/users/'+this.$cookies.get('acnh-uuid')+'/samples').then((response) => {
        console.log(response);
      });
    }
  }
</script>

<style scoped>

</style>
