<template>
  <div class="informacion">
    <div class="link-materia">
      <h4>{{ materia.nombre }}</h4>
      <p>{{ materia.codigo }}</p>
    </div>
    <div class="agg-materia">
      <font-awesome-icon icon="plus" class="fas plus"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Materia",
  props: {
    materia: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.fas {
  color: $fas-color;
  cursor: pointer;
}

.link-materia {
  color: $font;
}

.informacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  background-color: $bg-secundario;
  padding: 1rem 2rem;
  margin: 1rem 0;
  border-radius: 0.5rem;

  p {
    opacity: 0.7;
    font-size: 0.8rem;
  }
}

.agg-materia {
  cursor: pointer;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;

  &:hover {
    background-color: $bg-dark;
    transform: scale(1.2);
  }
}
</style>