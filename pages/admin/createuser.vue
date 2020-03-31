<template>
  <div class="container-fluid bg-3 text-center">
    <h1>create user</h1>
    <form method="POST" action="/createUser">
        <label for="admin">Admin id</label>
        <input name="admin" type="text" value="<%= uuid %>" />

        <input type="submit" value="Send"/>
    </form>
  </div>
</template>