<template>
  <div class="container mx-auto px-4">
    <!--form >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-amout">
            Montant
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-amout"  type="number" v-model="sample.amount" min="30" max="1000">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-moment">
            Matin/Après-midi
          </label>
          <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-moment" v-model="sample.moment">
            <option value="0">Matin</option>
            <option value="1">Après-midi</option>
          </select>
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-date">
            Date
          </label>
            <v-text-field
              v-model="sample.date"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          <v-date-picker v-model="sample.date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <input type="submit" class="shadow bg-grey-500 hover:bg-grey-400 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">
        </div>
      </div>
    </form-->
    <v-form @submit="postSample">
      <v-container>
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
              <v-radio :label="radio.name" :value="radio.value" v-for="radio in items"></v-radio>
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
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="sample.date"
                  label="Picker in menu"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="sample.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(sample.date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        items: [{value: 0, name: 'Matin'}, {value: 1, name:'Aprèm'}],
        menu: false,
        sample: {
          moment: 0,
          amount: 100,
          date: new Date().toISOString().substr(0, 10)
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
        this.$axios.$post('/api/sample', data).then((response) => {
          console.log(response);
        })
      }
    }
  }
</script>
