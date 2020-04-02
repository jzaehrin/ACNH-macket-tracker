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

      }
    },
    computed: {
      user() {
        return User.query().where('uuid', this.$cookies.get('acnh-uuid')).withAllRecursive().first();
      },
      data() {
        let result = [];
        let data = Sample.query().where('user_id', this.user.id).orderBy('date', 'desc').get();
        for (let element of data) {
          result.push(element.amount)
        }
        for(let index; result.length < 12; index++) {
          result.push(null)
        }
        console.log(result);
        return result;
      }
    },
    mounted() {
      this.$axios.$get('/api/users/'+this.$cookies.get('acnh-uuid')+'/samples').then((response) => {
        User.insertOrUpdate({data: response.user});
      });
    },
    components: {
      weekChart
    }
  }
</script>

<style scoped>

</style>
