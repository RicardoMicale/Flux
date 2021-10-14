<template>
  <form @submit.prevent="aggMateria()">
    Agregar materias

    <label for="codigo">codigo</label>
    <input type="text" name="" id="codigo" v-model="codigo" />
    <label for="nombre">nombre</label>
    <input type="text" name="" id="nombre" v-model="nombre" />
    <label for="creditosPrelatorios">creditosPrelatorios</label>
    <input
      type="number"
      name=""
      id="creditosPrelatorios"
      v-model="creditosPrelatorios"
    />
    <label for="creditosBP">creditosBP</label>
    <input type="number" name="" id="creditosBP" v-model="creditosBP" />
    <label for="prelatorias">prelatorias</label>
    <input type="text" name="" id="prelatorias" v-model="prelatoria" />
    <button @click="aggPrel()">Agregar</button>
    <label for="trimestre">trimestre</label>
    <input type="number" name="" id="trimestre" v-model="trimestre" />
    <input type="submit" />
  </form>
</template>

<script>
import * as fb from "../firebase.js";

export default {
  name: "Flujograma",
  data() {
    return {
      codigo: "",
      nombre: "",
      creditosPrelatorios: 0,
      creditosBp: 0,
      prelatorias: [],
      trimestre: 0,
      discusion: "Por definir",
      descripcion: "Por definir tambien",
      prelatoria: "",
    };
  },
  methods: {
    crearMaterias(
      codigo,
      nombre,
      creditosPrelatorios,
      creditosBp,
      prelatorias,
      trimestre,
      discusion,
      descripcion
    ) {
      const materia = {
        codigo: codigo,
        nombre: nombre,
        creditosPrelatorios: creditosPrelatorios,
        creditosBp: creditosBp,
        prelatorias: prelatorias,
        trimestre: trimestre,
        discusion: discusion,
        descripcion: descripcion,
      };

      return materia;
    },
    aggMateria() {
      const id = this.codigo;

      const materia = this.crearMaterias(
        this.codigo,
        this.nombre,
        this.creditosPrelatorios,
        this.creditosBp,
        this.prelatorias,
        this.trimestre,
        this.discusion,
        this.descripcion
      );
      fb.crearMateria(id, materia);
    },
    aggPrel() {
      this.prelatorias.push(this.prelatoria);
    },
  },
};
</script>

<style scoped lang='scss'>
form {
  display: flex;
  flex-direction: column;
  width: 500px;
}

input {
  height: 30px;
}
label {
  color: white;
}
</style>