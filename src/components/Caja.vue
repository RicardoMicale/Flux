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
      <font-awesome-icon
        icon="check"
        class="fas"
        @click="materiaPasada()"
        :class="pasada ? 'pasada' : ''"
      ></font-awesome-icon>
      <font-awesome-icon icon="circle" class="fas"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase.js";

export default {
  name: "Caja",
  props: {
    codigo: String,
    nombre: String,
    pasada: Boolean,
  },
  data() {
    return {
      usuarioActual: {},
    };
  },
  methods: {
    async materiaPasada() {
      let usuario;
      await fb.getUsuario(firebase.auth().currentUser.uid).then((res) => {
        usuario = res.data();
      });
      if (usuario.materiasCursadas.includes(this.codigo)) {
        return;
      }
      usuario.materiasCursadas.push(this.codigo);
      usuario.creditosTot = usuario.creditosTot + 3;
      usuario.creditosFaltantes = usuario.creditosFaltantes - 3;
      if (this.codigo.includes("BP")) {
        usuario.creditosBP = usuario.creditosBP + 3;
      }
      fb.updateUser(firebase.auth().currentUser.uid, usuario);
      console.log(usuario);
    },
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

.pasada {
  color: green;
}
</style>