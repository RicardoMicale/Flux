<template>
  <div>{{ user.nombre }}</div>
  <p>{{ user.creditosTot }}</p>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Perfil",
  data() {
    return {
      user: {},
    };
  },
  created() {
    let user;

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await fb
          .getUsuario(user.uid)
          .then((response) => {
            this.user = response.data();
          })
          .catch((err) => console.log(err));
      } else {
        this.$router.push("/");
      }
    });
    console.log(this.user);
    return {
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>