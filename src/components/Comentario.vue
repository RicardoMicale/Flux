<template>
  <div v-if="comment">
    <div>{{ comment.nombre }}</div>
    <div>{{ comment.comentario }}</div>
  </div>
  <div v-else>
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

<style>
</style>