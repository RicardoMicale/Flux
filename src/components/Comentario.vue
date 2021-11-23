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
    <font-awesome-icon
      icon="trash"
      class="fas trash"
      :class="userId === comment.id ? '' : 'disabled'"
      @click="borrarComentario()"
    ></font-awesome-icon>
  </div>
  <div v-else>
    Aun no se ha empezado la discusion! Se el primero en comentar esta materia
  </div>
</template>

<script>
import * as fb from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  name: "Comentario",
  props: {
    comment: Object,
  },
  data() {
    return {
      usuario: {},
      userId: "",
    };
  },
  methods: {
    borrarComentario() {
      if (this.userId !== this.comment.id) {
        alert(
          "Este comentario no fue hecho por ti! Debes ser el autor del comentario para poder eliminarlo"
        );
        return;
      }

      if (confirm("Estas seguro que quieres borrar el comentario?")) {
        const idDiscusion = this.$route.params.id;
        let discusion;

        fb.getDiscusion(idDiscusion).then((res) => {
          discusion = res.data();

          discusion.comentarios.splice(this.comment.indice, 1);

          let counter = 0;

          discusion.comentarios.forEach((comentario) => {
            if (comentario.indice !== counter) {
              comentario.indice -= 1;
            }
            counter += 1;
          });
          fb.updateDiscusion(idDiscusion, discusion);
          console.log(discusion);
        });
      }
    },
  },
  mounted() {
    const user = firebase.auth().currentUser || localStorage.getItem("user");

    if (user) {
      if (typeof user === "string") {
        this.userId = user;
      } else {
        this.userId = user.uid;
      }
    }
    fb.getUsuario(this.comment.id).then((res) => {
      this.usuario = res.data();
    });
  },
  //  created() {
  //   this.loggeado = localStorage.getItem("user") ? true : false;
  // },
};
</script>
<style lang='scss' scoped>
@import "../variabes.scss";

div {
  color: $font;
}

.esconder {
  display: none;
}

.comment-container {
  width: 90%;
  background-color: $bg-secundario;
  padding: 1.2rem 2rem 2.5rem;
  margin: 0.4rem 0 2rem;
  border-radius: 0.7rem;
  position: relative;

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
        transition: all 0.3s ease;
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
@media screen and (max-width: 858px) {
  .header {
    p {
      opacity: 1;
    }
  }
  .comment-container {
    width: 100%;
    padding: 0;
    height: 100%;
    .header {
      width: 100%;
      height: 40%;
      .usuario {
        margin-left: 1%;
      }
      .info {
        margin-left: 6%;
        text-align: center;
      }
      img {
        justify-content: center;
      }
    }
  }
}

.trash {
  position: absolute;
  bottom: 1rem;
  right: 2.2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: $borrar-comment;
  }
}

.disabled {
  opacity: 0.3;

  &:hover {
    transform: none;
    color: unset;
    cursor: unset;
  }
}
</style>