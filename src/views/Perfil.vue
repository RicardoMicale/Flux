<template>
  <div class="contenido">
    <h1 class="titulo">Perfil</h1>
    <div class="info-estudiante">
      <section class="info-contacto">
        <div class="identificacion">
          <h2 class="nombre">{{ user.nombre }}</h2>
          <img class="foto-perfil" :src="user.foto" alt="">
        </div>
        <h3 class="carrera">{{ user.carrera }}</h3>
        <h3 class="contacto subtitulo">Contacto:</h3>
        <div class="nombre-grande">
          <span>{{ user.nombre }}</span>
        </div>
        <ul class="lista-contacto">
          <li>
            <p>
              <a :href="'mailto:' + user.email">{{ user.email }}</a>
            </p>
          </li>
          <li>
            <p>
              Twitter: @<a :href="`https://www.twitter.com/${userTwitter}`" target="_blank" v-if="disabled"> {{userTwitter}} </a><input
                class="red-input twitter"
                type="text"
                v-if="!disabled"
                v-model="userTwitter"
                :placeholder="userTwitter"/>
            </p>
          </li>
          <li>
            <p>
              Instagram: @<a :href="`https://www.instagram.com/${userInstagram}`" target="_blank" v-if="disabled"> {{userInstagram}} </a><input
                class="red-input instagram"
                type="text"
                v-if="!disabled"
                v-model="userInstagram"
                :placeholder="userInstagram"/>
            </p>
          </li>
        </ul>
        <button class="btn-editar" @click="disabled = !disabled" v-if="disabled">
        Editar Redes
      </button>
      <button class="btn-editar" @click="disabled = !disabled" v-else>
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
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Perfil",
  data() {
    return {
      user: {},
      disabled: true,
      userTwitter: "",
      userInstagram: "",
    };
  },
  foto() {
    const user = getAuth().currentUser;
    const photoURL = user.photoURL;
    return photoURL;
  },
  created() {
    let user;

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await fb
          .getUsuario(user.uid)
          .then((response) => {
            this.user = response.data();
          })
          .catch((err) => console.log(err));
      } else {
        this.$router.push("/");
      }
    });
    return {
      user,
    };
  },
  editar() {
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.user.uid, this.user);
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

@keyframes fade-in-down{
  from{
    opacity: 0;
    transform: translateY(30px);
  }
  to{
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fade-form{
  from{
    background-color: $bg-secundario;
    border: none;
  }
  to{
    background-color: $input-bg-alt;
  }
}

@keyframes fade-label{
  from{
    background-color: $input-bg-alt;
  }
  to{
    background-color: $bg-secundario;
    border: none;
  }
}

.contenido {
  animation: fade-in-down 1.5s;

  padding: 1.5rem 3rem;

  h1 {
    color: $font;
  }

  .info-estudiante {
    color: $font;
    a {
      color: $font;
      text-decoration: none;
    }

    .info-contacto {
      margin: 2rem 2rem 1rem;

      .nombre {
        margin-bottom: 0.6rem;
        font-size: 2rem;
      }

      .carrera{
        font-size: 1.3rem;
      }

      h4,
      p {
        opacity: 0.8;
        margin-bottom: 0.2rem;
      }
      .identificacion{
        display: flex;
        .nombre{
          padding: 1rem;
        }
        .foto-perfil{
          padding-left: 1rem;
        }
      }
    }

    .info-carrera {
      margin: 2rem 2rem 1rem;
      p {
        margin: 0.3rem 0;

        span {
          font-weight: bold;
        }
      }
    }
  }
  .contacto {
    padding: 1rem;
  }
  .creditos{
    padding: 1rem;
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
</style>