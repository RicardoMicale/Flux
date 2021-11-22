<template>
  <div v-if="comment" class="comment-container">
    <div class="header">
      <div class="usuario">
        <img :src="usuario.foto" alt="foto usuario" />
        <div class="info">
          <h3>{{ usuario.nombre }}</h3>
          <p>{{ usuario.carrera }}</p>
        </div>
      </div>
      <div class="redes">
        <a :href="'mailto:' + usuario.email" target="_blank">
          <font-awesome-icon
            icon="envelope"
            class="fas mail"
          ></font-awesome-icon>
        </a>
        <a
          :href="`https://www.twitter.com/${
            usuario.twitter ? usuario.twitter : ''
          }`"
          target="_blank"
          v-if="usuario.twitter"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="fas twitter"
          ></font-awesome-icon>
        </a>
        <a
          :href="`https://www.instagram.com/${
            usuario.instagram ? usuario.instagram : ''
          }`"
          target="_blank"
          v-if="usuario.instagram"
        >
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            class="fas instagram"
          ></font-awesome-icon>
        </a>
      </div>
    </div>
    <p>{{ comment.comentario }}</p>
    <button class="btn-borrar" @click="borrar()" 
    :class="loggeado ? 'esconder' : ''">Borrar</button>
  </div>
  <div v-else>
    Aun no se ha empezado la discusion! Se el primero en comentar esta materia
  </div>
</template>

<script>
import * as fb from "../firebase";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

export default {
  name: "Comentario",
  props: {
    comment: Object,
  },
  data() {
    return {
      usuario: {},
      loggeado: false,
    };
  },
  mounted() {
    fb.getUsuario(this.comment.id).then((res) => {
      this.usuario = res.data();
    });
  },
  //  created() {
  //   this.loggeado = localStorage.getItem("user") ? true : false;
  // },
  methods: {

  }
};
</script>
<style lang='scss' scoped>
@import "../variabes.scss";

div {
  color: $font;
}

.esconder{
  display: none;
}

.comment-container {
  width: 90%;
  background-color: $bg-secundario;
  padding: 1.2rem 2rem 2.5rem;
  margin: 0.4rem 0 2rem;
  border-radius: 0.7rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .usuario {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .redes {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        text-decoration: none;
        color: $font;
        margin: 0 0.3rem;
        font-size: 1.3rem;
      }

      .fas {
        font-size: 1.5rem;
      }

      .twitter:hover {
        color: $twitter;
      }

      .instagram:hover {
        color: $instagram;
      }

      .mail:hover {
        color: $mail;
      }
    }

    img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      margin-right: 0.5rem;
    }

    p {
      opacity: 0.7;
      font-size: 0.8rem;
    }
  }

  h3 {
    margin-bottom: 0.2rem;
    font-size: 1rem;
  }

  .btn-borrar{
    float: right;
    background-color: $acento;
    padding: 0.3rem .5rem;
    border-radius: 0.4rem;
    border: none;
    outline: none;
    font-family: $fonts;
    color: $font;
    font-size: .8rem;
    cursor: pointer;
    transition: all 0.2s;
    // margin: 0.8rem 0;

    &:hover {
      background-color: $cerrar-popup;
      color: $input-bg-alt;
      padding: 0.5rem .5rem;
      font-size: 1rem;
    }

    &:active {
      background-color: $button-press;
      color: $input-bg-alt;
    }
  }

}
</style>