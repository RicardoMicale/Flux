<template>
  <div class="contenedor">
    <section class="nombre-materia">
      <div class="info">
        <h2>{{ materia.nombre }}</h2>
        <h4>{{ materia.codigo }}</h4>
        <p>3 creditos</p>
        <p>Trimestre: {{ materia.trimestre }}</p>
      </div>
      <div class="nombre-grande">
        <span>{{ materia.nombre }}</span>
      </div>
    </section>
    <section class="informacion">
      <div class="prelatorias">
        <h3>Prelaciones</h3>
        <h4 v-if="prelatorias.length === 0">No tiene materias prelatorias</h4>
        <div class="materias-prelatorias" v-else>
          <router-link
            v-for="prelatoria in prelatorias"
            :key="prelatoria.codigo"
            :to="'/materias/' + prelatoria.codigo"
            class="link-prela"
            >{{ prelatoria.nombre }}
            <font-awesome-icon
              icon="external-link-alt"
              class="fas"
            ></font-awesome-icon>
          </router-link>
        </div>
        <div class="creditos-prelatorios">
          <p>
            Creditos BP prelatorios:
            {{ materia.creditosBp === 0 ? "N/A" : materia.creditosBp }}
          </p>
          <p>
            Creditos prelatorios:
            {{
              materia.creditosPrelatorios === 0
                ? "N/A"
                : materia.creditosPrelatorios
            }}
          </p>
        </div>
      </div>
      <div class="descripcion">
        <div class="descrip">
          <h3>Descripcion</h3>
          <p>{{ materia.descripcion }}</p>
        </div>
        <div class="discusion">
          <h3>Discusion</h3>
          <p>{{ materia.discusion }}</p>
        </div>
      </div>
    </section>
    <router-link to="/flujograma" class="volver"
      ><font-awesome-icon icon="angle-left" class="fas"></font-awesome-icon>
      Volver al flujograma</router-link
    >
  </div>
</template>

<script>
import * as fb from "../firebase";
import { useRoute } from "vue-router";

export default {
  name: "Materia",
  data() {
    return {
      materia: {},
      prelatorias: [],
    };
  },
  mounted() {
    this.getMateriaActual();
  },
  methods: {
    getMateriaActual() {
      const route = useRoute();
      const idMateria = route.params.id;

      fb.getMateria(idMateria).then((res) => {
        this.materia = res.data();
        this.materia.prelatorias.forEach((prelatoria) => {
          fb.getMateria(prelatoria).then((res) => {
            this.prelatorias.push({
              codigo: res.data().codigo,
              nombre: res.data().nombre,
            });
          });
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "../variabes.scss";

.contenedor {
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  height: 100vh;
}

h2,
h3,
h4,
p {
  color: $font;
}

.nombre-materia {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40%;

  .nombre-grande {
    position: relative;
    width: 65%;

    span {
      position: absolute;
      top: -4rem;
      font-size: 8rem;
      line-height: 6.5rem;
      font-weight: bold;
      color: $bg-secundario;
      opacity: 0.6;
      z-index: -1;
    }
  }

  .info {
    width: 35%;
  }

  h2 {
    margin: 1rem 0 0.2rem;
    font-size: 2rem;
  }

  h4 {
    margin: 0.5rem 0 1rem;
  }

  p {
    margin: 0.2rem 0;
    opacity: 0.7;
  }
}

h3 {
  font-size: 1.4rem;
}

.informacion {
  display: flex;
  align-items: center;
  height: 40%;

  .prelatorias {
    width: 30%;

    p {
      margin: 1rem 0;
    }

    .materias-prelatorias {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
}

.link-prela {
  padding: 0.8rem 1.5rem;
  background-color: $acento;
  border-radius: 0.6rem;
  text-align: center;
  margin: 1rem 0 0.3rem;
}

.link-prela,
.volver {
  text-decoration: none;
  color: $font;
}

.volver {
  margin: 5rem 0 0;
  font-size: 0.8rem;
}

.fas {
  margin-left: 0.5rem;
}
</style>