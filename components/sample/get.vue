<template>
  <div>
    <div>coucou {{user}} {{samples}}</div>
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
        let user = this.user
        Sample.api().get('/api/users/'+ user.fake_uuid +'/samples');
        return Sample.all();
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
