<template>
  <div><button @click="googleSignIn">Sign In with Google</button></div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "Login",
  methods: {
    googleSignIn() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token);
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    },

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