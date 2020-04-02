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

        <v-spacer></v-spacer>

        <v-menu
          v-model="profile"
          :close-on-content-click="false"
          :nudge-width="300"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-avatar
              v-on="on"
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-text-field
                  :value="user.suuid"
                  label="suuid"
                  readonly
                  error
                  error-messages="It's your secret identity, never share it !"
                  background-color="#401010"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                  :value="user.uuid"
                  label="uuid"
                  readonly
                ></v-text-field>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-content>
        <v-container fluid>
          <nuxt v-if="initialized"/>
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
  import User from "~/models/User";
  export default {
    data: () => ({
      initialized: false,
      logo: logo,
      profile: false,
      primaryDrawer: {
        model: null,
        clipped: false,
        floating: false,
        mini: false,
      },
      footer: {
        inset: false,
      },
      user: {
        suuid: 'uninitialized',
        uuid: 'initialized'
      }
    }),
    methods: {
      init() {
        let suuid = this.$cookies.get('acnh-suuid');

        if(suuid === undefined || suuid === '') {
          this.$axios.$get('/api/user/signup').then((response) => {
            this.user = response.user
            User.insertOrUpdate({data: response.user}).then(() => {
              this.initialized = true;
            });
            this.$cookies.setAll([
              {name: 'acnh-uuid', value: response.user.uuid, opts: {maxAge: process.env.COOKIE_LIFE}},
              {name: 'acnh-suuid', value: response.user.suuid, opts: {maxAge: process.env.COOKIE_LIFE}},
            ])
          });
        } else {
          this.$axios.$post('/api/user/signin', { suuid: suuid }).then((response) => {
            this.user = response.user
            User.insertOrUpdate({data: response.user}).then(() => {
              this.initialized = true;
            });
          });
        }
      },
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
