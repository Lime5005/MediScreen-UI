<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <router-link to="/" class="navbar-brand">
      <img src="../public/logo.png" alt="logo">
      Mediscreen</router-link>
      <div class="navbar-nav mx-auto">
        <div class="dropdown show">
          <router-link to="/patients" class="nav-link dropdown-toggle mr-5" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Patients</router-link>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <router-link to="/patient/add" class="dropdown-item">Add</router-link>
          </div>
      </div>
        <li class="nav-item">
          <router-link to="/records" class="nav-link">Records</router-link>
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
  background-color: rgb(0 50 98);
}
.navbar-brand{
  margin-left: 5rem;
  color: white;
  font-weight: 700;
}
.navbar-brand:hover, a.nav-link:hover{
  color: #68BBE3;
}
.nav-link{
  color: #FFFFFF;
}
a.navbar-brand{
  padding: 0 0;
}
img {
width: 46px;
height: auto;
}
</style>
