<template>
  <h2>Flujograma</h2>
  <div class="flujograma">
    <section class="info-carrera">
        <p>
          Cantidad total de creditos acumulados:
          <span>{{ user.creditosTot }}</span>
        </p>
        <p>
          Cantidad de creditos en materias BP:
          <span>{{ user.creditosBP }}</span>
        </p>
        <p>
          Cantiadad de creditos faltantes pir cursar:
          <span>
            {{ user.creditosFaltantes }}
          </span>
        </p>
    </section>
    <div
      class="contenedor-materias"
      v-for="(trimestre, index) in trimestres"
      :key="trimestre.id"
    >
      <Trimestre :trimestre="trimestre.materias" :index="index" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase.js";
import Trimestre from "../components/Trimestre.vue";

export default {
  name: "Flujograma",
  components: {
    Trimestre,
  },
  data() {
    const trimestres = [];
    const materias = [];
    return {
      trimestres,
      materias,
      user: {},
    };
  },
  methods: {
    async getMaterias() {
      await fb.getAllMaterias().then((res) => {
        this.materias = [...res];
      });

      this.pasadasEstudiante();

      const trimestre1 = this.filtroMaterias(this.materias, 1);
      const trimestre2 = this.filtroMaterias(this.materias, 2);
      const trimestre3 = this.filtroMaterias(this.materias, 3);
      const trimestre4 = this.filtroMaterias(this.materias, 4);
      const trimestre5 = this.filtroMaterias(this.materias, 5);
      const trimestre6 = this.filtroMaterias(this.materias, 6);
      const trimestre7 = this.filtroMaterias(this.materias, 7);
      const trimestre8 = this.filtroMaterias(this.materias, 8);
      const trimestre9 = this.filtroMaterias(this.materias, 9);
      const trimestre10 = this.filtroMaterias(this.materias, 10);
      const trimestre11 = this.filtroMaterias(this.materias, 11);
      const trimestre12 = this.filtroMaterias(this.materias, 12);

      const flujograma = [
        { materias: trimestre1, id: 1 },
        { materias: trimestre2, id: 2 },
        { materias: trimestre3, id: 3 },
        { materias: trimestre4, id: 4 },
        { materias: trimestre5, id: 5 },
        { materias: trimestre6, id: 6 },
        { materias: trimestre7, id: 7 },
        { materias: trimestre8, id: 8 },
        { materias: trimestre9, id: 9 },
        { materias: trimestre10, id: 10 },
        { materias: trimestre11, id: 11 },
        { materias: trimestre12, id: 12 },
      ];

      return flujograma;
    },
    filtroMaterias(todasLasMaterias, noTrim) {
      let trimestre = todasLasMaterias.filter((materia) => {
        return materia.trimestre === noTrim;
      });

      return trimestre;
    },
    async pasadasEstudiante() {
      if (!firebase.auth().currentUser) {
        return;
      }
      const idActual = firebase.auth().currentUser.uid;
      let user;

      await fb.getUsuario(idActual).then((res) => {
        user = res.data();
        this.materias.forEach((materia) => {
          if (user.materiasCursadas.includes(materia.codigo)) {
            materia.pasada = true;
          } else {
            materia.pasada = false;
          }
        });
      });
    },
  },
  mounted() {
    this.getMaterias().then((res) => {
      this.trimestres = res;
    });
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
    return {
      user,
    };
  },
};
</script>

<style scoped lang='scss'>
@import "../variabes.scss";

h2 {
  color: $font;
  padding: 2rem 3rem 1rem;
}

.flujograma {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 1rem 0.5rem 2rem;
}

.contenedor-materias {
  width: 100%;
}

.info-carrera{
  color: $font;
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-left: -67px;
  padding-bottom: 1rem;
  font-size: 17px;
}
</style>