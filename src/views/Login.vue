<template>
  <div>Login</div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    nuevoUsuario(
      nombre,
      carrera,
      creditosTot,
      creditosBP,
      creditosFaltantes,
      trimestreActual,
      materiasCursadas,
      materiasDisponibles
    ) {
      const user = {
        nombre: nombre,
        carrera: carrera,
        creditosTot: creditosTot,
        creditosBP: creditosBP,
        creditosFaltantes: creditosFaltantes,
        trimestreActual: trimestreActual,
        materiasCursadas: materiasCursadas,
        materiasDisponibles: materiasDisponibles,
      };

      return user;
    },
  },
};
</script>

<style>
</style>