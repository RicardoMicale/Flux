<template>
  <div class="contenido">
    <div class="info-estudiante">
      <section class="info-contacto">
        <div class="identificacion">
          <img class="foto-perfil" :src="user.foto" alt="" />
          <div class="info-usuario">
            <h2 class="nombre">{{ user.nombre }}</h2>
            <h3 class="carrera">{{ user.carrera }}</h3>
          </div>
        </div>
        <h3 class="contacto subtitulo">Contacto:</h3>
        <!-- <div class="nombre-grande">
          <span>{{ user.nombre }}</span>
        </div> -->
        <ul class="lista-contacto">
          <li>
            <p>
              <a :href="'mailto:' + user.email">{{ user.email }}</a>
            </p>
          </li>
          <li>
            <p>
              Twitter: @<a
                :href="`https://www.twitter.com/${user.twitter}`"
                target="_blank"
                v-if="disabled"
              >
                {{ user.twitter ? user.twitter : "" }} </a
              ><input
                class="red-input twitter"
                type="text"
                v-if="!disabled"
                v-model="user.twitter"
                :placeholder="user.twitter"
              />
            </p>
          </li>
          <li>
            <p>
              Instagram: @<a
                :href="`https://www.instagram.com/${user.instagram}`"
                target="_blank"
                v-if="disabled"
              >
                {{ user.instagram ? user.instagram : "" }} </a
              ><input
                class="red-input instagram"
                type="text"
                v-if="!disabled"
                v-model="user.instagram"
                :placeholder="user.instagram"
              />
            </p>
          </li>
        </ul>
        <button
          class="btn-editar"
          @click="disabled = !disabled"
          v-if="disabled"
        >
          Editar Redes
        </button>
        <button
          class="btn-editar"
          @click="
            disabled = !disabled;
            guardar();
          "
          v-else
        >
          Guardar Cambios
        </button>
      </section>
      <section class="info-carrera">
        <h3 class="creditos subtitulo">Créditos:</h3>
        <p>
          Cantidad total de créditos acumulados:
          <span>{{ user.creditosTot }}</span>
        </p>
        <p>
          Cantidad de créditos en materias BP:
          <span>{{ user.creditosBP }}</span>
        </p>
        <p>
          Cantidad de créditos faltantes por cursar:
          <span>
            {{ user.creditosFaltantes }}
          </span>
        </p>
      </section>
    </div>
    <div class="separador"></div>
    <div class="trim-actual">
      <h2>Trimestre actual</h2>
      <Curso />
      <router-link to="/editar_trimestre">
        <button class="btn-trim">Editar trimestre</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";
import Curso from "../components/Curso.vue";

export default {
  name: "Perfil",
  components: {
    Curso,
  },
  data() {
    return {
      user: {},
      disabled: true,
    };
  },
  methods: {
    guardar() {
      //Se guardan los datos del usuario al presionar el boton

      const id = firebase.auth().currentUser.uid;
      fb.updateUser(id, this.user);
    },
  },
  created() {
    let user;
    /* 
    Se busca que haya un usuario con sesion activa
    Si existe, se define el usaurio actual como el que se encontro
    Sino, se devuelve al inicio de la pagina
    */
    const usuario = localStorage.getItem("user") || firebase.auth().currentUser;

    if (!usuario) {
      this.$router.push("/");
    } else {
      /*
      Si existe el usuario, se busca el objeto en la base de datos
      */

      if (typeof usuario === "string") {
        fb.getUsuario(usuario).then((res) => {
          this.user = res.data();
        });
      } else {
        fb.getUsuario(usuario.uid).then((res) => {
          this.user = res.data();
        });
      }
    }

    // firebase.auth().onAuthStateChanged(async (user) => {
    //   if (user) {
    //     await fb
    //       .getUsuario(user.uid)
    //       .then((response) => {
    //         this.user = response.data();
    //       })
    //       .catch((err) => console.log(err));
    //   } else {
    //     this.$router.push("/");
    //   }
    // });

    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fade-form {
  from {
    background-color: $bg-secundario;
    border: none;
  }
  to {
    background-color: $input-bg-alt;
  }
}

@keyframes fade-label {
  from {
    background-color: $input-bg-alt;
  }
  to {
    background-color: $bg-secundario;
    border: none;
  }
}

.contenido {
  animation: fade-in-down 1.5s;
  padding: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  h1 {
    color: $font;
  }

  .info-estudiante {
    color: $font;
    width: 50%;

    a {
      color: $font;
      text-decoration: none;
    }

    .info-contacto {
      h4,
      p {
        opacity: 0.8;
        margin-bottom: 0.4rem;
      }

      .identificacion {
        display: flex;
        align-items: flex-start;

        .nombre {
          font-size: 2rem;
        }

        .carrera {
          font-size: 1.4rem;
        }

        .info-usuario {
          margin: 0 0.8rem;
        }
      }
    }

    .info-carrera {
      margin: 2rem 0;

      p {
        margin: 0.4rem 0;

        span {
          font-weight: bold;
        }
      }
    }
  }

  .contacto {
    padding: 1rem 0;
  }

  .creditos {
    padding: 1rem 0;
    margin-top: -1rem;
  }

  .lista-contacto {
    list-style-type: none;

    .red-input {
      background-color: $input-bg-alt;
      color: $bg-dark;
      font-family: $fonts;
      animation: fade-form 0.5s;

      &:disabled {
        animation: fade-label 0.5s;
        background: transparent;
        border: none;
        outline: none;
        color: $font;
      }
    }
  }

  .btn-editar {
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
    margin: 0.8rem 0;

    &:hover {
      background-color: $button-press;
      color: $input-bg-alt;
    }

    &:active {
      background-color: $button-press;
      color: $input-bg-alt;
    }
  }

  .nombre-grande {
    position: relative;
    width: 65%;
    user-select: none;

    span {
      position: absolute;
      top: -4rem;
      left: 45rem;
      font-size: 8rem;
      line-height: 6.5rem;
      font-weight: bold;
      color: $bg-secundario;
      opacity: 0.6;
      z-index: -1;
    }
  }
}

.separador {
  width: 0.5rem;
  height: 30rem;
  background-color: $acento;
  margin-right: 1.5rem;
  border-radius: 50000px;
}

.trim-actual {
  color: $font;
  width: 40%;

  h2 {
    margin-bottom: 1.5rem;
  }

  .btn-trim {
    padding: 0.5rem 1rem;
    background-color: $acento;
    color: $font;
    font-family: $fonts;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    cursor: pointer;
    margin-top: 2rem;

    &:hover {
      background-color: $button-press;
      color: $input-bg-alt;
    }
  }
}
@media screen and (max-width: 858px){
  .contenido{
    display: flex;
    flex-direction: column;
    width: 100%;
    .info-estudiante{
      width: 100%;
      height: 100%;
      padding: 0;
        .info-contacto {
          width: 100%;
          display: flex;
          flex-direction: column;
          p{
            opacity: 1;
          }
          .identificacion{
            width: 100%;
              .nombre{
                 font-size: 1.2rem;
               }
               .carrera{
                 margin-top: 5%;
                 font-size: 1rem;
                 width: 100%;
               }
          }
        }
    }
    
    .separador {
  width: 18rem;
  height: 0.5rem;
  background-color: $acento;
  margin-right: 2.5rem;
  border-radius: 50000px;
}
  }
  .trim-actual{
    margin-top: 2%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>