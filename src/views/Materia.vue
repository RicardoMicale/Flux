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
      <div class="separador"></div>
      <div class="descripcion">
        <div class="descrip">
          <h3>Descripcion</h3>
          <div v-if="materia.descripcion === 'Por definir tambien'">
            <p>Esta materia aun no tiene descripcion</p>
            <button class="agg-descrip" @click="actualizarDescripcion()">
              <font-awesome-icon icon="plus" class="fas"></font-awesome-icon>
              Agregar descripcion
            </button>
          </div>
          <p v-else>{{ materia.descripcion }}</p>
        </div>
        <div class="discusion">
          <router-link
            :to="'/discusion/' + materia.codigo + 'D'"
            class="link-disc"
          >
            Ir al foro
            <font-awesome-icon
              icon="angle-right"
              class="fas"
            ></font-awesome-icon
          ></router-link>
          <p
            v-if="
              materia.discusion === 'Por definir' ||
              Object.keys(comment).length === 0
            "
          >
            Aun no se ha empezado la discusion! Se el primero en comentar esta
            materia
          </p>
          <Comentario v-else :comment="comment" />
        </div>
      </div>
    </section>
    <router-link to="/flujograma" class="volver">
    <font-awesome-icon icon="angle-left" class="fas"></font-awesome-icon>
    Volver al flujograma
    </router-link>
    <Descripcion
      class="describir"
      v-if="abrirEdicion"
      @cerrar="abrirEdicion = false"
      :codigo="codigo"
    />
  </div>
</template>

<script>
import * as fb from "../firebase";
import Comentario from "../components/Comentario.vue";
import Descripcion from "../components/Descripcion.vue";

export default {
  name: "Materia",
  components: {
    Comentario,
    Descripcion,
  },
  data() {
    return {
      materia: {},
      prelatorias: [],
      comment: {},
      abrirEdicion: false,
      codigo: "",
    };
  },
  mounted() {
    this.getMateriaActual();
  },
  //Se mantiene un watcher para cuando cambie la ruta se cambia el codigo de la materia actual
  watch: {
    "$route.path": function () {
      this.getMateriaActual();
    },
  },
  methods: {
    resetValues() {
      this.materia = {};
      this.prelatorias = [];
      this.comment = {};
      this.abrirEdicion = false;
      this.codigo = "";
    },
    getMateriaActual() {
      const idMateria = this.$route.params.id; //Id de la materia actual desde el url

      fb.getMateriaDinamica(idMateria).then((res) => {
        res.onSnapshot((snap) => {
          this.materia = snap.data(); //Se define la materia
          this.codigo = this.materia.codigo; //Se agarra el codigo por separado
          if (this.prelatorias.length > 0) {
            this.prelatorias = []; //Si la lista tenia valores, se vacia para que tenga valores nuevos
          }
          //Se buscan las materias prelaotrias y se agregan al array con sus atributos
          this.materia.prelatorias.forEach((prelatoria) => {
            fb.getMateria(prelatoria).then((res) => {
              const materia = {
                codigo: res.data().codigo,
                nombre: res.data().nombre,
              };
              this.prelatorias.push(materia);
            });
          });
          //Si la materia tiene algun comentario en la discusion se muestra el primero
          if (this.materia.discusion !== "Por definir") {
            fb.getDiscusion(this.materia.codigo + "D").then((res) => {
              if (res.data().comentarios.length > 0) {
                this.comment = res.data().comentarios[0];
              }
            });
          }
        });
      });
    },
    actualizarDescripcion() {
      this.abrirEdicion = !this.abrirEdicion;
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
  align-items: flex-start;
  height: 40%;
  width: 100%;

  .prelatorias {
    width: 30%;
    margin-right: 1rem;

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

.descripcion {
  width: 65%;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
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
  font-size: 1rem;
  width: fit-content;

  &:hover .fas {
    animation: moverIzq 1s infinite ease alternate-reverse forwards;
  }
}

.separador {
  height: 100%;
  width: 0.5rem;
  border-radius: 50000px;
  background-color: $acento;
}

.link-disc {
  text-decoration: none;
  color: $font;
  font-size: 1rem;

  .fas {
    margin-left: 0.2rem;
  }

  &:hover .fas {
    animation: moverDer 1s infinite ease alternate-reverse forwards;
  }
}

.fas {
  margin-left: 0.5rem;
}

.agg-descrip {
  font-family: $fonts;
  color: $font;
  background-color: $bg-secundario;
  padding: 0.8rem 1.4rem;
  outline: none;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 1rem;
}

.describir {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.descrip {
  margin-bottom: 1rem;
}

.descrip p {
  margin: 1rem 0;
  width: 90%;
}
@media screen and (max-width: 858px){
.nombre-materia{
  p {
    margin: 0.2rem 0;
    opacity: 1;
  }
  
}
  .informacion {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  .prelatorias {
    width: 100%;
    margin-top: 5%;
  
    p {
      margin: 1rem 0;
      font-size: 18px;
    }
    h4{
      margin-top: 3%;
    }

    .materias-prelatorias {
      display: flex;
      flex-direction: column;
      height: 50%;
      margin-top: 5%;

    }
  }
}
.link-prela {
      width: 80%;   
      font-size: 16px; 
  }
  h3{
    font-size: 1.8rem;
  }
  .nombre-materia {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    .nombre-grande{
      display: none;
    }
     .info{
    width: 100%;
    height: 100%;
  }
    h2{
      font-size: 1.6rem;
      width: 100%;
    }
  }
 
  
  
  
  .creditos-prelatorios{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;

  }
    .creditos-prelatorios p{
      font-size: 15px;
      width: 100%;
      height: 5%;
    }
  .descripcion{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .agg-descrip{
      padding: 0.8rem 2.9rem;
    font-size: 16px; 
  }
  .link-disc{
    margin-top: 1rem;
    font-size: 18px;
  }
  .discusion p{
    margin-top: 1rem;
    font-size: 14px;
  }
  .volver{
    font-size: 16px;
    margin-bottom: 2rem;
  }
}



</style>