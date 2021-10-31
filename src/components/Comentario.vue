<template>
  <div>{{ comment.nombre }}</div>
  <div>{{ comment.comentario }}</div>
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