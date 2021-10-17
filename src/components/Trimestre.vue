<template>
  <div v-for="materia in trimestre" :key="materia.codigo">
    <Caja :codigo="materia.codigo" :nombre="materia.nombre" />
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
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";
</style>