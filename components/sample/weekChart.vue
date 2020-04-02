<script>
  import { Line, mixins } from 'vue-chartjs';
  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      this.renderChart({
        labels: ['Monday am','Monday pm', 'Tuesday am', 'Tuesday pm', 'Wednesday am', 'Wednesday pm', 'Thursday am', 'Thursday pm', 'Friday am', 'Friday pm', 'Saturday am', 'Saturday pm'],
        datasets: [
          {
            label: 'Market price of the week',
            backgroundColor: '#f87979',
            data: this.chartData
          }
        ]
      }, this.options)
    },
    watch: {
      chartData: function (newChart, oldChart) {
        this.$data._chart.update()
      },
    },
  }
</script>
