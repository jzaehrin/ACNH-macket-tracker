<template>
  <div>
    <week-chart :chartData="data"></week-chart>
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
  export default {
    name: "sampleGet",
    data: function() {
      return {
        toto: false
      }
    },
    computed: {
      user() {
        return User.query().where('uuid', this.$cookies.get('acnh-uuid')).withAllRecursive().first();
      },
      samples: {
        set(val) {
          Sample.insertOrUpdate({data: val});
        },
        get(){
          return Sample.query().where('user_id', this.user.id).orderBy('date', 'desc').get();
        }
      },
      data() {
        let result = {
          labels: ['Monday am','Monday pm', 'Tuesday am', 'Tuesday pm', 'Wednesday am', 'Wednesday pm', 'Thursday am', 'Thursday pm', 'Friday am', 'Friday pm', 'Saturday am', 'Saturday pm'],
            datasets: [
          {
            label: 'Market price of the week',
            backgroundColor: '#f87979',
            data: Array(null, 12)
          }
        ]
        }
        let data = [];
        for (let element of this.samples) {
          data.push(element.amount)
        }
        for(let index; data.length < 12; index++) {
          data.push(null)
        }
        result.datasets[0].data = data
        console.log(result);
        return result;
      }
    },
    mounted() {
      this.$axios.$get('/api/users/'+this.$cookies.get('acnh-uuid')+'/samples').then((response) => {
        User.insertOrUpdate({data: response.user});
        this.samples = response.samples;
      });
    },
    components: {
      weekChart
    }
  }
</script>

<style scoped>

</style>
