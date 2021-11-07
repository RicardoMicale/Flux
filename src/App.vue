<template>
  <Navbar />
  <router-view />
</template>
<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "./variabes.scss";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: $bg-dark;
  height: 100vh;
}

#app {
  font-family: $fonts;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

@keyframes moverIzq {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-0.5rem);
  }
}

@keyframes moverDer {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(0.5rem);
  }
}
</style>
