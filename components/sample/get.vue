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
        return User.query().where('uuid', this.$cookies.get('acnh-uuid')).withAllRecursive().first();
      },
      samples() {
        //return Sample.all();
      }
    },
    mounted() {
      this.$axios.$get('/api/users/'+this.$cookies.get('acnh-uuid')+'/samples').then((response) => {
        User.insertOrUpdate({data: response.user});
      });
    }
  }
</script>

<style scoped>

</style>
