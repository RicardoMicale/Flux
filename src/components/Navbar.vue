<template>
  <header class="navbar">
    <router-link to="/" class="logo">
      <h3>FLUX</h3>
      <img src="../assets/Logo-flux.svg" alt="Logo flux" />
    </router-link>
    <ul class="navbar-links">
      <li><router-link to="/" class="link">Inicio</router-link></li>
      <li>
        <router-link to="/acerca" class="link">Acerca de</router-link>
      </li>
      <li>
        <router-link to="/flujograma" class="link"> Flujograma </router-link>
      </li>
      <li>
        <router-link
          to="/perfil"
          class="link logged_in"
          :class="!loggeado ? 'esconder' : ''"
        >
          Perfil
        </router-link>
      </li>
      <li>
        <button
          class="btn_main"
          @click="login()"
          :class="loggeado ? 'esconder' : ''"
        >
          Iniciar sesión
        </button>
      </li>
      <li>
        <!-- TODO: Hacer que el boton refresque la página y vaya a inicio -->
        <button
          class="btn_main"
          @click="logout()"
          :class="!loggeado ? 'esconder' : ''"
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
  </header>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Navbar",
  data() {
    return {
      loggeado: false,
    };
  },
  created() {
    this.loggeado = localStorage.getItem("user") ? true : false;
  },
  methods: {
    //TODO: mover metodos login a pagina login y dejar router push en metodo login del navbar
    login() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          const id = user.uid;
          localStorage.setItem("user", id);
          fb.getUsuario(id).then((res) => {
            if (!res.exists) {
              const usuario = this.nuevoUsuario(
                user.displayName,
                user.email,
                user.photoURL
              );
              fb.crearUsuario(id, usuario);
            }
          });
          this.loggeado = !this.loggeado;
          this.$router.push("/perfil");
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$router.push("/login");
    },
    nuevoUsuario(nombre, email, foto) {
      const user = {
        nombre: nombre,
        carrera: "Ingenieria de sistemas",
        email: email,
        creditosTot: 0,
        creditosBP: 0,
        creditosFaltantes: 180,
        trimestreActual: [],
        materiasCursadas: [],
        materiasDisponibles: [],
        foto: foto,
      };

      return user;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Sesión cerrada.");
          console.log(firebase.auth().currentUser);
          this.loggeado = !this.loggeado;
          this.$router.push("/");
        });
      localStorage.removeItem("user");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  height: 8vh;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    width: 95%;
    height: 3px;
    position: absolute;
    bottom: -2px;
    background-color: $acento;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

.esconder {
  display: none;
}

.link,
.logo {
  text-decoration: none;
  color: $font-secundario;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 2rem;
  }

  h3 {
    font-size: 2rem;
  }

  img,
  h3 {
    margin: 0 0.3rem;
  }
}

.navbar-links {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  li {
    list-style-type: none;
    height: 100%;
    position: relative;
    margin: 0 1rem;

    .link {
      &::before {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: $font;
        transition: width 0.4s;
      }

      &:hover::before {
        width: 100%;
      }
    }

    .router-link-active::before {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $font;
    }
  }

  .btn_main {
    background-color: $acento;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    border: none;
    outline: none;
    font-family: $fonts;
    color: $font;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
      background-color: #b63a11;
      color: #e2e2e2;
    }
  }
}
</style>