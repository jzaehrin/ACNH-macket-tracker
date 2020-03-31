<template>
  <div>
    <v-app id="sandbox">
      <v-navigation-drawer
        v-model="primaryDrawer.model"
        clipped
        temporary
        app
        overflow
      >
        <v-img :src="logo" aspect-ratio="1.2" contain></v-img>
      </v-navigation-drawer>

      <v-app-bar
        :clipped-left="primaryDrawer.clipped"
        app
      >
        <v-app-bar-nav-icon
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
        />
        <v-toolbar-title>Animal Crossing New Stonks</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-content>

      <v-footer
        :inset="footer.inset"
        app
      >
        <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  const logo = require('~/assets/images/logo.png');
  export default {
    data: () => ({
      logo: logo,
      primaryDrawer: {
        model: null,
        clipped: false,
        floating: false,
        mini: false,
      },
      footer: {
        inset: false,
      },
    }),
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
    },
    created () {
      this.$vuetify.theme.dark = true
    }
  }
</script>


<style>
</style>
