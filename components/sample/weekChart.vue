<script>
  import { Line, mixins } from 'vue-chartjs';
  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['data'],
    mounted () {
      this.renderChart({
        labels: ['Monday am','Monday pm', 'Tuesday am', 'Tuesday pm', 'Wednesday am', 'Wednesday pm', 'Thursday am', 'Thursday pm', 'Friday am', 'Friday pm', 'Saturday am', 'Saturday pm'],
        datasets: [
          {
            label: 'Market price of the week',
            backgroundColor: '#f87979',
            data: this.data
          }
        ]
      })
    }
  }
</script>
