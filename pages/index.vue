<template>
  <div class="container mx-auto px-4">

  </div>
</template>

<script>
export default {
  methods: {
    init() {
      console.log(this.$cookies.get('acnh-uuid'));
      if(this.$cookies.get('acnh-uuid')) {
        let uuid = this.$cookies.get('acnh-uuid');
        let data = { uuid: uuid };
        this.$axios.$post('/api/valid', data).then((response) => {
          console.log("Connected");
        });
      } else {
        this.$axios.$get('/api/identity').then((response) => {
          this.$cookies.setAll([
            {name: 'acnh-uuid', value: response.uuid, opts: {maxAge: 360}},
            {name: 'acnh-fuuid', value: response.fake_uuid, opts: {maxAge: 360}},
          ])
          //this.$cookies.set('acnh-user', JSON.parse(response))
        })
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
  .container {
    background-color: red;
  }
</style>
