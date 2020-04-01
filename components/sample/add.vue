<template>
  <v-container>
    <v-form v-model="valid" @submit="postSample">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="sample.amount"
            type="number"
            label="Montant"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-radio-group v-model="sample.moment" row>
            <v-radio :label="radio.name" :value="radio.value" v-for="radio in items" :key="`radio-button-${radio.name}`"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="sample.date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="sample.date"
                label="Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="sample.date"
              no-title
              :max="new Date().toISOString().substr(0, 10)"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(sample.date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="postSample"
          >
            Envoyer
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar
      v-model="snackbar.on"
      :color="snackbar.color"
      multi-line
      :timeout="snackbar.timeout"
      top
    >
      {{ snackbar.text }}
      <v-btn
        dark
        text
        @click="snackbar.on = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    name: "sampleAdd",
    data: function() {
      return {
        valid: false,
        items: [{value: 0, name: 'Matin'}, {value: 1, name:'Aprèm'}],
        menu: false,
        sample: {
          moment: 0,
          amount: 100,
          date: new Date().toISOString().substr(0, 10)
        },
        snackbar: {
          on: false,
          color: 'error',
          text: '',
          timeout: 2000
        }
      }
    },
    methods: {
      postSample: function(e) {
        e.preventDefault();
        let data = {
          moment: this.sample.moment,
          amount: this.sample.amount,
          date: this.sample.date,
          uuid: this.$cookies.get('acnh-uuid')
        };
        this.$axios.$post('/api/sample', data)
          .then((response) => {
            this.snackbar.text = response.message
            this.snackbar.color = 'success'
            this.snackbar.on = true
        })
          .catch((error) => {
            this.snackbar.text = error.response.data.message
            this.snackbar.color = 'error'
            this.snackbar.on = true
        })
      }
    }
  }
</script>
