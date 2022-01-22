<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <router-link to="/" class="navbar-brand">
      <img src="logo.png" alt="logo">
      Mediscreen</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/patients" class="nav-link">Patients</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/patient/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: "app",
};
</script>

<style>
.navbar{
  color: #D4F1F4;
  background-color: #189AB4;
}
.navbar-brand{
  margin-left: 5rem;
  color: #05445E;
  font-weight: 700;
}
.nav-link{
  color: #FFFFFF;
}
a.nav-link:hover{
  color: #D4F1F4;
}
a.navbar-brand{
  padding: 0 0;
}
img {
width: 46px;
height: auto;
}
</style>
