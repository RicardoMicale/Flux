<template>
  <div>Flujograma</div>
  <div class="flujograma">
    <div
      class="contenedor-materias"
      v-for="trimestre in trimestres"
      :key="trimestre.id"
    >
      <Trimestre :trimestre="trimestre.materias" />
    </div>
  </div>
</template>

<script>
import * as fb from "../firebase.js";
import Trimestre from "../components/Trimestre.vue";

export default {
  name: "Flujograma",
  components: {
    Trimestre,
  },
  data() {
    const trimestres = [];
    return {
      trimestres,
    };
  },
  methods: {
    async getMaterias() {
      let materias = [];

      await fb.getAllMaterias().then((res) => {
        materias = [...res];
      });

      const trimestre1 = this.filtroMaterias(materias, 1);
      const trimestre2 = this.filtroMaterias(materias, 2);
      const trimestre3 = this.filtroMaterias(materias, 3);
      const trimestre4 = this.filtroMaterias(materias, 4);
      const trimestre5 = this.filtroMaterias(materias, 5);
      const trimestre6 = this.filtroMaterias(materias, 6);
      const trimestre7 = this.filtroMaterias(materias, 7);
      const trimestre8 = this.filtroMaterias(materias, 8);
      const trimestre9 = this.filtroMaterias(materias, 9);
      const trimestre10 = this.filtroMaterias(materias, 10);
      const trimestre11 = this.filtroMaterias(materias, 11);
      const trimestre12 = this.filtroMaterias(materias, 12);

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
      console.log(flujograma);

      return flujograma;
    },
    filtroMaterias(todasLasMaterias, noTrim) {
      let trimestre = todasLasMaterias.filter((materia) => {
        return materia.trimestre === noTrim;
      });

      return trimestre;
    },
  },
  mounted() {
    this.getMaterias().then((res) => {
      this.trimestres = res;
    });
  },
};
</script>

<style scoped lang='scss'>
@import "../variabes.scss";

.flujograma {
  height: 100vh;
}
</style>