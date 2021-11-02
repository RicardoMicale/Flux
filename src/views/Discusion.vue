<template>
  <div>
    Discusion
    <section class="comentarios">
      <div class="comentario" v-for="(comment, index) in comments" :key="index">
        <Comentario :comment="comment" />
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
};
</script>

<style lang="scss" scoped>
</style>