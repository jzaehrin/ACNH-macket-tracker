<script>
  import { Line, mixins } from 'vue-chartjs';
  export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      this.addPlugin({
        beforeUpdate: function(chart){
          var offset = chart.options.customOffset;

          if(!offset || offset < 0) return;
          var yAxes = chart.options.scales.yAxes;
          for(var i=0; i<yAxes.length; i++){
            var axis = yAxes[i];
            var datasets = chart.data.datasets;
            var max = Number.MIN_VALUE;
            var datasetsOnAxis = [];

            for(var j=0; j<datasets.length; j++){
              var dataset = datasets[j];
              var meta = chart.getDatasetMeta(j);
              if  (meta.yAxisID === axis.id) datasetsOnAxis.push(dataset);
            }

            for(var k=0; k<datasetsOnAxis.length; k++){
              var dataset = datasetsOnAxis[k]
              var newMax = Math.max.apply(null, dataset.data);
              max = newMax > max ? newMax : max;
            }
            axis.ticks.max = max + offset;
          }
        }
      });
      this.renderChart(this.chartData, this.options)
    },
    watch: {
      chartData: function (newChart, oldChart) {
        this.$data._chart.update()
      },
    },
  }
</script>
