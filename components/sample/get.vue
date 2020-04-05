<template>
  <div>
    <h1>Liste</h1>
    <v-container>
    <v-col
      cols="12"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Date"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          :max="new Date().toISOString().substr(0, 10)"
          :allowed-dates="allowedDates"
          :first-day-of-week="1"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    </v-container>
    <week-chart :chartData="data" :options="chartOptions"></week-chart>
    <!--div v-for="sample in user.samples">
      {{sample.date}}
    </div>
    {{data}}
    {{user}}-->
  </div>
</template>

<script>
  import User from "~/models/User";
  import Sample from "~/models/Sample";
  import weekChart from "~/components/sample/weekChart";

  const flattenDeep = require('lodash.flattendeep');
  //import moment from 'moment';

  export default {
    name: "sampleGet",
    data: function() {
      return {
        menu: false,
        date: new Date().toISOString().substr(0, 10),
        chartOptions : {
          customOffset: 20,
          scales: {
            yAxes: [{
              ticks: {
                Min: 0,
                suggestedMin: 0,
                precision: 0
              }
            }]
          }
        }
      }
    },
    computed: {
      user() {
        return User.query().where('uuid', this.$cookies.get('acnh-uuid')).withAllRecursive().first();
      },
      samples: {
        set(val) {
          console.log(val);
          Sample.insertOrUpdate({data: val});
        },
        get() {
          return Sample.getWeek(this.user.id, this.$moment(this.date).isoWeek());
        }
      },
      data() {
        let result = {
          labels: ['Monday am','Monday pm', 'Tuesday am', 'Tuesday pm', 'Wednesday am', 'Wednesday pm', 'Thursday am', 'Thursday pm', 'Friday am', 'Friday pm', 'Saturday am', 'Saturday pm'],
            datasets: [
          {
            label: 'Market price of the week',
            backgroundColor: '#2ecc71',
            data: Array(null, 12)
          }
        ]
        }
        let data = [[null,null],[null,null],[null,null],[null,null],[null,null],[null,null],[null,null]];
        for (let sample of this.samples) {
          let day = this.$moment(sample.date).day();
          let moment = (this.$moment(sample.date).hours() < 12) ? 0 : 1;
          data[day - 1][moment] = sample.amount;
        }
        result.datasets[0].data = flattenDeep(data);
        return result;
      }
    },
    mounted() {
      this.getSamples()
    },
    watch: {
      date: function(oldValue, newValue) {
        this.getSamples();
      }
    },
    methods: {
      allowedDates: val =>  0 !== (new Date(val).getDay()),
      getSamples() {
        this.$axios.$get('/api/users/'+this.$cookies.get('acnh-uuid')+'/samples', {
          params: {
            week: this.$moment(this.date).isoWeek()
          }
        }).then((response) => {
          User.insertOrUpdate({data: response.user});
          this.samples = response.samples;
        });
      }
    },
    components: {
      weekChart
    }
  }
</script>

<style scoped>

</style>
