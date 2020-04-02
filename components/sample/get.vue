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
      async user() {
        return await User.find(this.$cookies.get('acnh-uuid'));
      },
      async samples() {
        let fake_uuid = this.user.fake_uuid
        await Sample.api().get('/api/users/'+fake_uuid+'/samples');
        return await Sample.all();
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
