<template>
  <div class="container mx-auto px-4">
    <form @submit="postSample">
      <input type="number" v-model="sample.amount" min="30" max="1000">
      <input type="submit">
    </form>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        sample: {
          moment: 0,
          amount: 100,
        }
      }
    },
    methods: {
      postSample: function(e) {
        let time = Date.now()
        e.preventDefault();
        let data = {
          moment: this.sample.moment,
          amount: this.sample.amount,
          date: time,
          uuid: this.$cookies.get('acnh-uuid')
        };
        this.$axios.$post('/api/sample', data).then((response) => {
          console.log(response);
        })
      }
    }
  }
</script>
