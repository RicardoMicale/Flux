<template>
  <div v-if="comment" class="comment-container">
    <div class="header">
      <img :src="usuario.foto" alt="foto usuario" />
      <div class="info">
        <h3>{{ usuario.nombre }}</h3>
        <h4>{{ usuario.carrera }}</h4>
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
    id: String,
  },
  data() {
    return {
      usuario: {},
    };
  },
  mounted() {
    fb.getUsuario(this.id).then((res) => {
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
  margin: 0.4rem 0;
  border-radius: 0.7rem;

  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;

    img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      margin-right: 0.5rem;
    }
  }

  h3 {
    margin-bottom: 0.2rem;
    font-size: 1rem;
  }

  h4 {
    opacity: 0.7;
    font-size: 0.8rem;
  }
}
</style>