<template>
  <div class="contenido">
    <div class="informacion">
      <h3>{{ nombre }}</h3>
      <p>{{ codigo }}</p>
    </div>
    <div class="acciones">
      <font-awesome-icon icon="eye" class="fas"></font-awesome-icon>
      <font-awesome-icon icon="check" class="fas"></font-awesome-icon>
      <font-awesome-icon icon="circle" class="fas"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Caja",
  props: {
    codigo: String,
    nombre: String,
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";
</style>