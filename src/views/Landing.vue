<template>
  <div class="landing">
    <p>Flujograma Interactivo</p>
    <div class="linea"></div>
    <h1 class="titulo">Organiza tu trimestre de la mejor forma</h1>
    <router-link to="flujograma" class="call-to-action">
      Ver flujograma
      <font-awesome-icon icon="angle-right" class="fas"></font-awesome-icon>
    </router-link>
    <h2>Unimet</h2>
  </div>
</template>

<script>
export default {
  name: "Inicio",
};
</script>

<style scoped lang='scss'>
@import "../variabes.scss";

.landing {
  padding: 0 3rem;
  color: $font;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
  p {
    font-size: 1rem;
    margin: 5rem 0 0.5rem;
    letter-spacing: 0.3rem;
  }

  .linea {
    background-color: $acento;
    height: 5px;
    width: 10%;
    border-radius: 5000px;
  }

  .titulo {
    font-size: 5em;
    width: 80%;
    margin-top: 1.5rem;
  }

  .call-to-action {
    background-color: $acento;
    text-decoration: none;
    color: $font;
    padding: 0.8rem 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .fas {
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }
  }

  h2 {
    position: absolute;
    font-size: 20rem;
    color: $bg-secundario;
    opacity: 0.4;
    z-index: -1;
    bottom: 0;
    left: 18rem;
    letter-spacing: -1rem;
  }
@media screen and (max-width: 858px) {
  .titulo{
    font-size: 2rem;
    width: 100%;
  }
  h2{
    position: absolute;
    font-size: 6rem;
    color: $bg-secundario;
    opacity: 0.4;
    z-index: -1;
    margin-bottom: 10rem;
    left: 5.5rem;
    letter-spacing: -0.4rem;
    text-align: center;
  }
    .call-to-action {
    background-color: $acento;
    text-decoration: none;
    color: $font;
    padding: 0.5rem 1.4rem;
    border-radius: 0.5rem;
    margin-top: 3.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .fas {
      font-size: 1rem;
      margin-left: 0.5rem;
    }
  }
}
  


</style>