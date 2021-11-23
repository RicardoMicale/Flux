<template>
  <header :class="{'scrolled-nav': scrolledNav}">
    <nav class="navbar">
    <router-link to="/" class="logo">
      <h3>FLUX</h3>
      <img src="../assets/Logo-flux.svg" alt="Logo flux" />
    </router-link>
    <ul v-show="!mobile" class="navbar-links">
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
    <div class="btn-menu">
      <i @click="toggleMobileNav" v-show="mobile" class="fas fa-bars" :class="{'icon-active': mobileNav}"></i>
    </div>
    <transition name="mobile-nav">
      
    <ul v-show="mobileNav" class="dropdown-nav">
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
          class="btn_responsive"
          @click="login()"
          :class="loggeado ? 'esconder' : ''"
        >
          Iniciar sesión
        </button>
      </li>
      <li>
        <!-- TODO: Hacer que el boton refresque la página y vaya a inicio -->
        <button
          class="btn_responsive"
          @click="logout()"
          :class="!loggeado ? 'esconder' : ''"
        >
          Cerrar sesión
        </button>
      </li>
    </ul>
    </transition>
    </nav>
  </header>

</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";
import "../main";


export default {
  name: "Navbar",
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWith: null,
      loggeado: false,
    };
  },
  created() {
    this.loggeado = localStorage.getItem("user") ? true : false;
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },
  mounted(){
    window.addEventListener("scroll", this.updateScroll);
  },

  methods: {
    /* 
    Se hace el inicio de sesion usando google
    Si no existe el usuario, se crea el objeto y se guarda en la base de datos
    Si ya existe solo inicia sesion
    Se guarda el usuario en local storage para mantener la sesion iniciada
    Se cambia a la vista de perfil
    */
    updateScroll(){
      const scrollPosition = window.scrollY;
      if(scrollPosition > 50){
        this.scrolledNav = true;
        return;
      }
      this.scrolledNav = false;
      return;

    },
    toggleMobileNav(){
      this.mobileNav = !this.mobileNav;
    },
    checkScreen(){
      this.windowWith = window.innerWidth;
      if(this.windowWith <= 758){
        this.mobile= true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
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
    },
    nuevoUsuario(nombre, email, foto) {
      //Crea cada usuario como objeto
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
      //Se cierra la sesion y manda al usuario al inicio
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggeado = !this.loggeado;
          this.$router.push("/");
        });
      localStorage.removeItem("user");
    },
  },
  
  /* addEventListener('DOMContentLoaded', () =>{
    var btn_menu = Document.querySelector('.btn_menu')
    if(btn_menu){
      btn_menu.addEventListener('click', () =>{
        navbar-links.classList.toggle('show')

      })

    }
  })*/
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  height: 10vh;
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
  .btn-menu{
    display: flex;
    position: absolute;
    align-items: center;   
    right: 24px;
    height: 100%;
    i{
      cursor: pointer;
      font-size: 24px;
      transition: .8s ease all;
      color: white;
    }
  }
  .icon-active{
    transform: rotate(180deg);
  }
  .dropdown-nav{
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 385px;
    max-height: 50%;
    height: 400px;
    top: 0;
    left: 0;
    background-color: $bg-secundario;
    margin-top: 10vh;
    align-items: center;
    border-bottom: $acento 2px solid;
    opacity: 1;
    

    li{
      margin-top: 4%;
      font-size: 15px;
      list-style-type: none;

      .link{
        color: white;
        font-size: 20px;
      }

    }
    .btn_responsive{
    background-color: $acento;
    padding: 0.5rem 1.5rem;
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
  .mobile-nav-enter-active,
  .mobile-nav-leave-active{
    transition: 1s ease all;
  }
  .mobile-nav-enter-from,
  .mobile-nav-leave-to{
    transform: translateX(-250px);

  }
  .mobile-nav-enter-to{
    transform: translateX(0);
  }
  .scrolled-nav{
    background-color: black;
    box-shadow: black;
    .navbar{
      padding: 8px 0;


      .logo{
        img{
          width: 40px;
          box-shadow: black;
        }
      }
    }
  }
 /* ul.show{
    top: 65px;
  }*/
  /*
  @media screen and (max-width: 952px){
   
  }
  @media screen and (max-width: 858px){
  .logo {
    
    margin-left: -15%;

  img {
    width: 2rem;
    margin-left: 0;
    padding-left: 0;

  }
  }
  
    .navbar{
      height: 65px;
    }
    .btn-menu{
      display: inline-flex;
    }
    .navbar-links{
      position: fixed;
      width: 100vw;
      height: calc(100%-65px);
      background-color: $font;
      top: -100vh;
      text-align: center;
      transition: all .4s;
      flex-direction: column;
    }
    .navbar-links  li{
      margin: 30px 0 0 0;
      line-height: 30px;

    }
    .navbar-links li:hover{
      background: none;
    }
    .navbar-links li a{
      font-size: 20px;
      color: white;
      font-weight: bold;

    }
    .navbar-links li a:hover{
      color: $acento
    }
    .logo{
      font-size: 25px;
      padding-left: 35px;
    }
  }
  @media screen and (max-width: 858px) and (orientation: landscape){
    .navbar-links{
      overflow: scroll;
      height: calc(100%-65px);
    }
    .navbar-links  li{
      margin: 5px 0 0 0;
      line-height: 30px;
    }
    
  }*/
</style>