<template>
  <div v-for="materia in trimestre" :key="materia.codigo">
    <router-link :to="'/materia/' + materia.codigo" class="link-materia">
      <Caja :codigo="materia.codigo" :nombre="materia.nombre" />
    </router-link>
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

.link-materia {
  text-decoration: none;
  color: $font;
}
</style>