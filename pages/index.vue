<template>
  <div class="container mx-auto px-4">
    <form @submit="postSample">
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
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-date"  type="date" v-model="sample.date" min="30" max="1000">
        </div>
        <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <input type="submit" class="shadow bg-grey-500 hover:bg-grey-400 focus:shadow-outline focus:outline-none text-black py-2 px-4 rounded">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        sample: {
          moment: 1,
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
