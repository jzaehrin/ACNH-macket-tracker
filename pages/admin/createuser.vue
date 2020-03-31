<template>
  <div class="container-fluid bg-3 text-centers">
    <h1>create user</h1>
    <form method="POST" @submit="postForm" action="">
      <label for="admin">Admin id</label>
      <input name="admin" type="text" v-model="id" value="test" />

      <input type="submit" value="Send"/>
    </form>
  </div>
</template>

<script>
  const axios = require('axios');

  export default {
    data() {
      return {
        id: ''
      };
    },
    methods: {
      postForm: function(e) {
        e.preventDefault();
        this.$axios.$post("/admin/createUser").then((data) => {
          console.log(data);
        });

      }
    }
  }
</script>
