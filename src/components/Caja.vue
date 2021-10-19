<template>
  <div class="contenido">
    <router-link :to="'/materia/' + codigo" class="link-materia">
      <div class="informacion">
        <h3>{{ nombre }}</h3>
        <p>{{ codigo }}</p>
      </div>
    </router-link>
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

.link-materia {
  text-decoration: none;
  color: $font;
}

.contenido {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 13rem;
  height: 7rem;
  border: solid 0.5rem $font;
  border-radius: 0.3rem;
  padding: 0.5rem;
  box-shadow: 0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.5);
}

.acciones {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  color: $font;

  .fas:not(:last-child) {
    cursor: pointer;
  }
}

.informacion {
  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.8rem;
    opacity: 0.7;
  }
}
</style>