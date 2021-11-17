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
    };
  },
  mounted() {
    fb.getUsuario(this.comment.id).then((res) => {
      this.usuario = res.data();
    });
  },
};
</script>
<style lang='scss' scoped>
@import "../variabes.scss";

div {
  color: $font;
}

.comment-container {
  width: 90%;
  background-color: $bg-secundario;
  padding: 1.2rem 2rem 2rem;
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
}
</style>