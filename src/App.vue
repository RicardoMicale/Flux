<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
/*Fuente*/
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&display=swap");
$fonts: "Lexend", Helvetica;

//Paleta
$acento: #f44b12;
$bg-dark: #2b282a;
$bg-secundario: #403b3e;
$bg-light: #f2f2f2;
$bg-light-secundario: #ffffff;

#app {
  font-family: $fonts;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
