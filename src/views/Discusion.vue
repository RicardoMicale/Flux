<template>

   <h1>Discusion</h1>
    <h3>Agregar comentario +</h3> 
<div class="cont">
    <section class="comentarios">
      <div class="comentario" v-for="(comment, index) in comments" :key="index">
        <Comentario  :comment="comment" class="comenta"/>
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
</script>-->

<style lang="scss" scoped>
@import "../variabes.scss";
  h1{
    color: $font;
    padding: 2%;
  }
  
  .cont{
  width: 80%;
  height:  80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

}
.comentarios{
  width: 50%;
  height: 100%;
  
}
.comentario{
  width: 100%;
  height: 30vh;
  margin-top: 2%;
}
.comenta{
  width: 100%;
  height: 100%;
  background-color: $bg-secundario;
}

h3{
  color: white;
  margin-right: 0;
  padding-right: 2%;
  padding-left: 2%;
  text-align: right;
}
</style>