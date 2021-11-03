<template>
  <div>
    <section class="mensaje">
      <h2 class="error-msg">Error 404</h2>
      <h4>Pisaste el samán!</h4>
      <p>No se encontro lo que buscabas</p>
      <router-link to="/" class="volver"
        ><font-awesome-icon icon="angle-left" class="fas"></font-awesome-icon>
        Volver al inicio</router-link
      >
    </section>
    <img src="../assets/Logo-flux.svg" alt="Flux logo" />
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang='scss' scoped>
@import "../variabes.scss";

div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 3rem;
  width: 80%;

  .mensaje {
    color: $font;

    h2 {
      font-size: 8rem;
      margin: 1rem 0 2rem;
    }

    h4 {
      font-size: 2rem;
      margin: 1rem 0;
    }

    p {
      margin-bottom: 3rem;
    }

    .volver {
      text-decoration: none;
      color: $font;
      background-color: $acento;
      padding: 0.7rem 2rem;
      border-radius: 0.6rem;
    }
  }
}
</style>