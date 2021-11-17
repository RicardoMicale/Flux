<template>
  <div class="informacion">
    <div class="link-materia">
      <h4>{{ materia.nombre }}</h4>
      <p>{{ materia.codigo }}</p>
    </div>
    <div class="agg-materia">
      <font-awesome-icon
        icon="plus"
        class="fas plus"
        v-if="!inscrita"
        @click="agregarMateria()"
      ></font-awesome-icon>
      <font-awesome-icon
        icon="minus"
        class="fas minus"
        v-else
        @click="eliminarMateria()"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Materia",
  props: {
    materia: Object,
    inscrita: Boolean,
  },
  data() {
    const userId = firebase.auth().currentUser.uid;
    return {
      userId,
      user: {},
    };
  },
  methods: {
    async getUser() {
      await fb.getUsuarioDinamico(this.userId).then((res) => {
        res.onSnapshot((snap) => {
          this.user = snap.data();
        });
      });
    },
    agregarMateria() {
      if (this.user.trimestreActual.includes(this.materia.codigo)) {
        alert("Esta materia ya esta inscrita");
        return;
      }

      this.user.trimestreActual.push(this.materia.codigo);
      fb.updateUser(this.userId, this.user);
    },
    eliminarMateria() {
      const index = this.user.trimestreActual.indexOf(this.materia.codigo);

      this.user.trimestreActual.splice(index, 1);
      fb.updateUser(this.userId, this.user);
    },
  },
  beforeMount() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.fas {
  color: $fas-color;
  cursor: pointer;
}

.link-materia {
  color: $font;
}

.informacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: $bg-secundario;
  padding: 1rem 2rem;
  margin: 1rem 0;
  border-radius: 0.5rem;

  p {
    opacity: 0.7;
    font-size: 0.8rem;
  }
}

.agg-materia {
  cursor: pointer;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;

  &:hover {
    background-color: $bg-dark;
    transform: scale(1.2);
  }
}
</style>