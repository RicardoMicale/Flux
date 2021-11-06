<template>
  <div class="discusion">
    <div class="informacion">
      <h2>{{ materia.nombre }}</h2>
      <h4>{{ materia.codigo }}</h4>
      <h3>Descripcion</h3>
      <p>
        {{
          materia.descripcion !== "Por definir tambien"
            ? materia.descripcion
            : "Aun no se ha agregado una descripcion"
        }}
      </p>
    </div>
    <section class="comment-section">
      <button class="add-comment" @click="aggComment()">
        Agregar comentario<font-awesome-icon
          icon="plus"
          class="fas"
        ></font-awesome-icon>
      </button>
      <section class="comentarios">
        <div class="comentario" v-for="comment in comments" :key="comment.id">
          <Comentario :comment="comment" :id="comment[0].id" class="comenta" />
        </div>
      </section>
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

.discusion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
  height: 100%;
}

.informacion {
  width: 30%;
  color: $font;

  h4 {
    opacity: 0.7;
    margin: 1rem 0 3rem;
  }

  h3 {
    margin: 0 0 0.6rem;
  }

  p {
    opacity: 0.8;
  }
}

.comment-section {
  width: 70%;
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