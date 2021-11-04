<template>
  <div v-if="comment" class="comenta">
    <div class="coments">{{ comment.nombre }}</div>
    <div class="coments">{{ comment.comentario }}</div>
  </div>
  <div v-else class="sin-coment">
    Aun no se ha empezado la discusion! Se el primero en comentar esta materia
  </div>
</template>

<script>
export default {
  name: "Comentario",
  props: {
    comment: Object,
  },
};
</script>
<style lang='scss' scoped>
@import "../variabes.scss";
 
  .comenta{
    width: 30%;
    height: 15%;
    background-color: $bg-secundario;
    display: flex;
    justify-content: last baseline;
    align-items: flex-end;
  }
  .coments{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    color: $font;
  }
  .sin-coment{
    
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    color: $font;
  
  }
</style>