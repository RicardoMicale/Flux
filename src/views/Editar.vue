<template>
  <div class="editar-view">
    <div class="busqueda">
      <h3>Buscar materias</h3>
      <form @submit.prevent="buscar()" class="search">
        <div class="barra">
          <label for="nombre">Nombre de la materia</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Ingresa el nombre de una materia..."
            v-model="nombre"
          />
        </div>
        <input type="submit" value="Buscar" @click="buscar()" />
      </form>
      <div class="resultados">
        <Materia
          class="materia"
          v-for="materia in busqueda"
          :key="materia.codigo"
          :materia="materia"
          :inscrita="false"
        />
      </div>
    </div>
    <section class="inscritas">
      <h3>Asignaturas inscritas</h3>
      <div class="materias-inscritas">
        <Materia
          class="materia"
          v-for="materia in actuales"
          :key="materia.codigo"
          :materia="materia"
          :inscrita="true"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Materia from "../components/Materia.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Editar",
  components: {
    Materia,
  },
  data() {
    return {
      materias: [], //Toda la materia
      busqueda: [], //Materias resultado de la busqueda
      nombre: "", //V-model para la busqueda
      actuales: [], //Materias inscritas
      user: {},
    };
  },
  methods: {
    async getMaterias() {
      //Busca todas las materias y las guarda en una lista
      await fb.getAllMaterias().then((res) => {
        this.materias = [...res];
      });
    },
    buscar() {
      //Se vacia la lista de busqeuda
      this.busqueda = [];

      /*
      Se itera sobre la lista con todas las materias
      Se revisa busqueda que se hace usando el v-model
      Si el nombre de la materia contiene el string de busqueda
      se muestran los resultados en pantalla 
      */
      this.materias.forEach((materia) => {
        if (materia.nombre.toLowerCase().includes(this.nombre.toLowerCase())) {
          this.busqueda.push(materia);
        }
      });
    },
    async getUser() {
      //Usuario actual
      const user = localStorage.getItem("user") || firebase.auth().currentUser;

      if (!user) {
        //Si no existe se devuelve al usuario anonimo al inicio y se termina la funcion
        this.$router.push("/");
        return;
      }
      //Se busca el id del usuario actual
      const userId =
        localStorage.getItem("user") || firebase.auth().currentUser.uid;
      /* 
      Se busca el usuario actual con cambios a tiempo real
      Se vacia la lista local de materias inscritas
      Se itera en la lista del trimestre actual del usuario
      Se busca la materia de la base de datos como objeto y
      se agrega a la lista de materias inscritas
      */
      await fb.getUsuarioDinamico(userId).then((res) => {
        res.onSnapshot((snap) => {
          this.user = snap.data();
          this.actuales = [];
          this.user.trimestreActual.forEach((materia) => {
            fb.getMateria(materia).then((res) => {
              this.actuales.push(res.data());
            });
          });
        });
      });
    },
  },
  beforeMount() {
    this.getMaterias();
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.editar-view {
  padding: 3rem;
  display: flex;
  align-items: flex-start;

  h3 {
    color: $font;
    margin-bottom: 2rem;
    font-size: 1.3rem;
  }
}

.search {
  width: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 2rem;

  input {
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 0.2rem;
    font-family: $fonts;
  }

  input[type="submit"] {
    background-color: $acento;
    color: $font;
    margin-left: 1rem;
    cursor: pointer;

    &:hover {
      background-color: $button-press;
      color: $input-bg-alt;
    }
  }

  .barra {
    display: inherit;
    flex-direction: column;

    label {
      color: $font;
      margin-bottom: 0.5rem;
    }

    input {
      width: 18rem;

      &:focus {
        border: 1px solid $acento;
      }
    }
  }
}

.inscritas {
  margin-left: 10%;
}
</style>