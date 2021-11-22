<template>
  <section class="materias">
    <div class="informacion" v-for="materia in materias" :key="materia.codigo">
      <div class="datos-materia">
        <div class="link-materia">
          <h3>{{ materia.nombre }}</h3>
          <span class="codigo">{{ materia.codigo }}</span>
          <p>3 creditos</p>
        </div>
      </div>
      <router-link :to="'/materias/' + materia.codigo" class="link">
        <font-awesome-icon
          icon="external-link-alt"
          class="fas"
        ></font-awesome-icon>
      </router-link>
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
    getMaterias() {
      const idUser =
        firebase.auth().currentUser.uid || localStorage.getItem("user"); //Id del usuario actual

      let user;

      fb.getUsuario(idUser).then((res) => {
        user = res.data(); //Se guarda el usuario actual
        user.trimestreActual.forEach((materia) => {
          /* 
          Se buscan las materias en la base de datos
          Se agregan a la lista de materias que usa
          el componente
          */
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

.datos-materia {
  display: flex;
  justify-content: center;
  align-items: center;
}

.link {
  color: $font;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $acento;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
}

.link-materia {
  color: $font;
  text-decoration: none;
}

.total-creditos {
  margin-top: 3rem;
}

span {
  font-weight: bold;
}

.codigo {
  font-weight: unset;
  opacity: 0.7;
}
</style>