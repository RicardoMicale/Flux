<template>
  <div class="trimestre">
    <p>{{ index + 1 }}</p>
    <div v-for="materia in trimestre" :key="materia.codigo">
      <Caja
        :codigo="materia.codigo"
        :nombre="materia.nombre"
        :pasada="materia.pasada"
        :enCurso="materia.enCurso"
      />
    </div>
  </div>
</template>

<script>
import Caja from "./Caja.vue";

export default {
  name: "Trimestre",
  components: {
    Caja,
  },
  props: {
    trimestre: Array,
    index: Number,
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.trimestre {
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem;

  &:hover {
    p {
      font-weight: bold;
      color: $acento;
    }
  }
}

p {
  color: $font;
  width: 1rem;
}
</style>