<template>
  <div>
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
        return Sample.all();
      }
    },
    mounted() {
      let user = this.user
      Sample.api().get('/api/users/'+ user.uuid +'/samples');
    }
  }
</script>

<style scoped>

</style>
