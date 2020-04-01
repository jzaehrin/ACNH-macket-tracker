<template>
  <div>
    {{user}}
    <div>coucou {{samples}}</div>
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
        /*let fake_uuid = this.user.fake_uuid
        Sample.api().get('/api/users/'+fake_uuid+'/samples');
        return Sample.all();*/
        return "cc";
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
