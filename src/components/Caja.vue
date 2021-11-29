<template>
  <div class="contenido" :class="pasada || lista ? 'materia-pasada' : ''">
    <router-link :to="'/materias/' + codigo" class="link-materia">
      <div
        class="informacion"
        :class="(enCurso || actual) && !(pasada || lista) ? 'en-curso' : ''"
      >
        <h3>{{ nombre }}</h3>
        <p>{{ codigo }}</p>
      </div>
    </router-link>
    <div class="acciones">
      <font-awesome-icon
        icon="eye"
        class="fas ojo"
        @click="materiaEnCurso()"
        :class="(enCurso || actual) && !(pasada || lista) ? 'cursando' : ''"
      ></font-awesome-icon>
      <font-awesome-icon
        icon="check"
        class="fas check"
        @click="materiaPasada()"
        :class="pasada || lista ? 'pasada' : ''"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase.js";

export default {
  name: "Caja",
  props: {
    codigo: String,
    nombre: String,
    pasada: Boolean,
    enCurso: Boolean,
  },
  data() {
    return {
      lista: false,
      actual: false,
    };
  },
  methods: {
    async materiaPasada() {
      let usuario;
      //Se busca el usuario actual
      const userId =
        localStorage.getItem("user") || firebase.auth().currentUser.uid;
      await fb.getUsuario(userId).then((res) => {
        usuario = res.data();
      });

      /* 
      Si el codigo de la materia esta en la lista de materias pasadas del usuario
      se busca su indice, se elimina de la lista y
      se ajustan los creditos
      De lo contrario, se agrega el codigo en la lista de materias pasadas y se ajustan los creditos
      y se actualiza el usuario
      */
      if (usuario.materiasCursadas.includes(this.codigo)) {
        const index = usuario.materiasCursadas.indexOf(this.codigo);
        usuario.materiasCursadas.splice(index, 1);
        usuario.creditosTot = usuario.creditosTot - 3;
        usuario.creditosFaltantes = usuario.creditosFaltantes + 3;
        if (this.codigo.includes("BP")) {
          usuario.creditosBP = usuario.creditosBP - 3;
        }
      } else {
        usuario.materiasCursadas.push(this.codigo);
        usuario.creditosTot = usuario.creditosTot + 3;
        usuario.creditosFaltantes = usuario.creditosFaltantes - 3;
        if (this.codigo.includes("BP")) {
          usuario.creditosBP = usuario.creditosBP + 3;
        }
      }
      fb.updateUser(firebase.auth().currentUser.uid, usuario);

      this.lista = !this.lista;
    },
    async materiaEnCurso() {
      let usuario;

      const userId =
        localStorage.getItem("user") || firebase.auth().currentUser.uid;
      await fb.getUsuario(userId).then((res) => {
        usuario = res.data();
      });

      /* 
      Si la materia ya esta en la lista de pasadas, se muestra un aviso que no se puede agregar y termina la funcion
      Si el codigo de la materia esta en la lista de materias en curso del usuario
      se busca su indice, se elimina de la lista y
      se ajustan los creditos
      De lo contrario, se agrega el codigo en la lista de materias en curso y se ajustan los creditos
      y se actualiza el usuario
      */
      if (usuario.materiasCursadas.includes(this.codigo)) {
        alert("Materia pasada! No se pueden ver materias ya pasadas");
        return;
      }

      if (usuario.trimestreActual.includes(this.codigo)) {
        const index = usuario.trimestreActual.indexOf(this.codigo);
        usuario.trimestreActual.splice(index, 1);
      } else {
        usuario.trimestreActual.push(this.codigo);
      }

      fb.updateUser(firebase.auth().currentUser.uid, usuario);

      this.actual = !this.actual;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.link-materia {
  text-decoration: none;
  color: $font;
  width: 80%;
}

.contenido {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 13rem;
  height: 7rem;
  border: solid 0.5rem $font;
  border-radius: 0.3rem;
  padding: 0.5rem;
  box-shadow: 0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.5);
  transition: transform 0.2s;
  transition: all 0.3s;
  &:hover {
    // border-color: $acento;
    transform: scale(1.05);
  }
}

.acciones {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  color: $font;

  .fas {
    cursor: pointer;
    font-size: 1.2rem;
  }

  .check:hover {
    color: $check-hover;
  }

  .ojo:hover {
    color: $ojo-hover;
  }
}

.informacion {
  transition: all 0.2s;

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.8rem;
    opacity: 0.7;
  }
}

.pasada {
  color: $materia-pasada;
}

.cursando {
  color: $materia-actual;
}

.en-curso {
  color: $materia-actual;
}

.materia-pasada {
  opacity: 0.7;

  .check:hover {
    color: $materia-pasada;
  }

  .ojo:hover {
    color: unset;
  }
}

.clickeable {
  cursor: pointer;
}
@media screen and (max-width: 858px) {
  .link-materia h3 {
    margin-bottom: 0.5rem;
  }
  .contenido {
    width: 15rem;
    height: 8rem;
    margin-right: 2rem;
    padding: 0.8rem;
  }
}
</style>