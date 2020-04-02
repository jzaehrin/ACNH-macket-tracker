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
      async samples() {
        let user = await this.user
        await Sample.api().get('/api/users/'+ user.fake_uuid +'/samples');
        return await Sample.all();
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
