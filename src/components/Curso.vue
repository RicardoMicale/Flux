<template>
  <section class="materias">
    <div class="informacion" v-for="materia in materias" :key="materia.codigo">
      <div class="datos-materia">
        <router-link :to="'/materias/' + materia.codigo" class="link-materia">
          <h3>{{ materia.nombre }}</h3>
          <p>{{ materia.codigo }}</p>
        </router-link>
      </div>
      <p class="creditos">3 creditos</p>
    </div>
    <p class="total-creditos">
      Total de creditos en curso: <span>{{ materias.length * 3 }}</span>
    </p>
  </section>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Curso",
  data() {
    return {
      materias: [],
    };
  },
  methods: {
    async getMaterias() {
      const idUser = firebase.auth().currentUser.uid;

      let user;

      await fb.getUsuario(idUser).then((res) => {
        user = res.data();
        user.trimestreActual.forEach((materia) => {
          fb.getMateria(materia).then((res) => {
            this.materias.push(res.data());
          });
        });
      });
    },
  },
  beforeMount() {
    this.getMaterias();
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.materias {
  color: $font;
  width: 100%;
}

.informacion {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 1rem 0;
}

.link-materia {
  color: $font;
  text-decoration: none;

  p {
    opacity: 0.7;
  }
}

.total-creditos {
  margin-top: 3rem;
}

span {
  font-weight: bold;
}
</style>