<template>
  <div class="trimestre">
    <div class="info-trimestre">
      <p>{{ index + 1 }}</p>
      <div
        class="fas"
        @click="trimestrePasado()"
        :class="trimListo ? 'listo' : ''"
      >
        <font-awesome-icon icon="check" class="check"></font-awesome-icon>
      </div>
    </div>
    <div v-for="materia in trimestre" :key="materia.codigo">
      <Caja
        :codigo="materia.codigo"
        :nombre="materia.nombre"
        :pasada="materia.pasada"
        :enCurso="materia.enCurso"
      />
    </div>
  </div>
</template>

<script>
import Caja from "./Caja.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Trimestre",
  components: {
    Caja,
  },
  props: {
    trimestre: Array,
    index: Number,
  },
  data() {
    return {
      trimListo: false,
    };
  },
  methods: {
    trimestrePasado() {
      /* 
      Se busca el id del usuario
      Con ese id se busca el objeto usuario
      En el usuario se itera por la lista de materias en el trimestre
      Si la materia no esta en la lista de pasadas del usuario
      se agrega a la misma y se actualiza el usuario
      Al final se define que el trimestre esta listo
      */
      const userId =
        firebase.auth().currentUser.uid || localStorage.getItem("user");

      fb.getUsuario(userId).then((res) => {
        const usuario = res.data();

        this.trimestre.forEach((materia) => {
          if (!usuario.materiasCursadas.includes(materia.codigo)) {
            usuario.materiasCursadas.push(materia.codigo);
            fb.updateUser(userId, usuario);
          }
        });

        this.trimListo = true;
      });
    },
    async getTrimStatus() {
      /* 
      Se busca el id del usuario
      Con ese id se busca el objeto usuario
      En el usuario se itera por la lista de materias en el trimestre
      Si la materia no esta en la lista de pasadas del usuario
      se define 'todas' como falso
      Si 'todas' es verdadero, se considera el trimestre como totalmente pasado
      Si es falso, aun faltan materias y la variable global trimestreListo queda como false
      */
      const userId =
        firebase.auth().currentUser.uid || localStorage.getItem("user");
      let todas = false; //Variable que se refiere a todas las materias en el trimestre

      await fb.getUsuario(userId).then((res) => {
        const usuario = res.data();

        for (let i = 0; i < this.trimestre.length; i++) {
          let materia = this.trimestre[i];
          if (!usuario.materiasCursadas.includes(materia.codigo)) {
            todas = false;
            break;
          } else {
            todas = true;
          }
        }
      });

      if (todas) {
        this.trimListo = true;
      }
    },
  },
  mounted() {
    this.getTrimStatus();
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.trimestre {
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem;

  &:hover {
    p {
      font-weight: bold;
      color: $acento;
    }
  }
}

p {
  color: $font;
  // width: 1rem;
}

.info-trimestre {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .fas {
    padding: 0.2rem;
    margin-top: 1rem;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: $bg-secundario;
      box-shadow: 3px 3px 30px rgba(0, 0, 0, 0.4);

      .check {
        color: $check-hover;
      }
    }
  }

  .listo {
    background-color: $bg-secundario;
    box-shadow: 3px 3px 30px rgba(0, 0, 0, 0.4);

    .check {
      color: $materia-pasada;
    }
  }

  .check {
    color: $font;
  }
}
</style>