<template>
  <div class="comment-section">
    <h1>Discusion</h1>
    <button class="add-comment" @click="aggComment()">
      Agregar comentario<font-awesome-icon
        icon="plus"
        class="fas"
      ></font-awesome-icon>
    </button>
    <section class="comentarios">
      <div class="comentario" v-for="(comment, index) in comments" :key="index">
        <Comentario :comment="comment" class="comenta" />
      </div>
    </section>
  </div>
</template>

<script>
import Comentario from "../components/Comentario.vue";
import * as fb from "../firebase";
import { useRoute } from "vue-router";

export default {
  name: "Discusion",
  components: {
    Comentario,
  },
  data() {
    return {
      comments: [],
      materia: {},
      agregar: false,
    };
  },
  created() {
    const route = useRoute();
    const idDiscusion = route.params.id;
    const idMateria = idDiscusion.slice(0, -1);
    const discusion = {
      comentarios: [],
    };

    fb.getMateria(idMateria).then((res) => {
      this.materia = res.data();
      if (this.materia.discusion === "Por definir") {
        fb.crearDiscusion(idDiscusion, discusion);
        this.materia.discusion = idDiscusion;
        fb.updateMateria(idMateria, this.materia);
      } else {
        fb.getDiscusion(idDiscusion).then((response) => {
          this.comments = response.data();
        });
      }
    });
  },
  methods: {
    aggComment() {
      this.false = !this.false;
    },
  },
};
</script>-->

<style lang="scss" scoped>
@import "../variabes.scss";

.comment-section {
  padding: 0 3rem;
}

h1 {
  color: $font;
  margin-top: 2rem;
}

.add-comment {
  padding: 0.6rem 1.4rem;
  background-color: $acento;
  font-family: $fonts;
  outline: none;
  border: none;
  color: $font;
  margin: 1rem 0;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.3s;

  .fas {
    margin-left: 0.5rem;
  }

  &:active {
    background-color: $button-press;
    color: $input-bg-alt;
  }
}
</style>