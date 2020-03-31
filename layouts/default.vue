<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-black p-6 mb-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <nuxt-link to="/">
          <img src="~/assets/images/logo.png" alt="" width="250">
        </nuxt-link>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="lg:flex-grow">
        </div>
      </div>
    </nav>
    <v-app>
      <nuxt />
    </v-app>
  </div>
</template>

<script>
  export default {
    methods: {
      init() {
        if(this.$cookies.get('acnh-uuid')) {
          let uuid = this.$cookies.get('acnh-uuid');
          let data = { uuid: uuid };
          this.$axios.$post('/api/valid', data).then((response) => {
            console.log("Connected");
          })
        } else {
          this.$axios.$get('/api/identity').then((response) => {
            this.$cookies.setAll([
              {name: 'acnh-uuid', value: response.uuid, opts: {maxAge: process.env.COOKIE_LIFE}},
              {name: 'acnh-fuuid', value: response.fake_uuid, opts: {maxAge: process.env.COOKIE_LIFE}},
            ])
          })
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>


<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
