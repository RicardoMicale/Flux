<template>
  <form @submit.prevent="comentar()">
    <label for="comentario">Deja tu comentario!</label>
    <textarea
      placeholder="Esta materia es..."
      cols="80"
      rows="7"
      v-model="comentario"
    />
    <input type="submit" value="Comentar" />
  </form>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Comentar",
  data() {
    return {
      comentario: "",
    };
  },
  methods: {
    nuevoComment(nombre, id, indice) {
      //Crea un nuevo comentario como objeto
      const comment = {
        nombre: nombre,
        id: id,
        comentario: this.comentario,
        indice: indice,
      };

      return comment;
    },
    comentar() {
      /* 
      Si no hay una sesion activa, muestra un aviso y termina la funcion
      Si no hay nada escrito, muesta un aviso y termina la funcion
      Finalmente, se busca el usuario actual y el codigo de la discusion para crear el objeto comentario nuevo
      Se agrega el comentario a la discusion y se actualiza en la base de datos
      Se vacia el campo para escribir otro comentario
      */

      if (firebase.auth().currentUser === null) {
        alert("Debes iniciar sesion para comentar");
        return;
      } else if (this.comentario === "") {
        alert("El comentario no debe estar vacio");
        return;
      } else {
        const user = firebase.auth().currentUser;
        let discusion;
        const codigo = this.$route.params.id;

        fb.getDiscusion(codigo).then((res) => {
          discusion = res.data();
          const comentarioNuevo = this.nuevoComment(
            user.displayName,
            user.uid,
            discusion.comentarios.length
          );
          discusion.comentarios.push(comentarioNuevo);
          fb.updateDiscusion(codigo, discusion);
          this.comentario = "";
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  input,
  textarea {
    font-family: $fonts;
  }

  textarea {
    resize: none;
    padding: 0.3rem 0.6rem;
    margin: 0.5rem 0 0.6rem;
  }

  input {
    padding: 0.4rem 0.8rem;
    color: $font;
    background-color: $acento;
    outline: none;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    margin-bottom: 2rem;

    &:hover {
      color: $input-bg-alt;
      background-color: $button-press;
    }
  }

  label {
    color: $font;
  }
}
@media screen and (max-width: 858px){
  textarea {
    resize: none;
    padding: 0.3rem 2rem;
    margin: 0.5rem 0 0.6rem;
    width: 100%;
    height: 100%;
  }
}
</style>