<template>
  <div class="modal-bg">
    <div class="modal">
      <font-awesome-icon
        icon="times"
        class="fas"
        @click="cerrar()"
      ></font-awesome-icon>
      <form @submit.prevent="agregar()">
        <label for="descripcion">Descripcion</label>
        <textarea
          name="descripcion"
          cols="30"
          rows="10"
          placeholder="Introduzca la descripcion de la materia"
          id="descripcion"
          v-model="descrip"
        />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  </div>
</template>

<script>
import * as fb from "../firebase";

export default {
  name: "Descripcion",
  props: {
    codigo: String,
  },
  data() {
    return {
      descrip: "",
    };
  },
  methods: {
    agregar() {
      const codigo = this.codigo;
      console.log(codigo, this.codigo);

      fb.getMateria(codigo).then((res) => {
        const materia = res.data();
        materia.descripcion = this.descrip;

        fb.updateMateria(codigo, materia);
        this.cerrar();
      });
    },
    cerrar() {
      this.$emit("cerrar");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.modal-bg {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $popup-bg;
}

.modal {
  position: relative;
  opacity: 1;
  background-color: $bg-secundario;
  width: 50%;
  height: 40%;
  border-radius: 0.6rem;

  .fas {
    color: $cerrar-popup;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    margin: 1rem 5rem;

    label {
      color: $font;
    }

    textarea {
      width: 100%;
      height: 8rem;
      resize: none;
      padding: 0.3rem 0.5rem;
      font-family: $fonts;
      margin: 1rem 0;

      &:focus {
        outline: $acento solid 1px;
      }
    }

    input {
      padding: 0.5rem 1rem;
      color: $font;
      background-color: $acento;
      font-family: $fonts;
      border: none;
      outline: none;
      border-radius: 0.3rem;
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
</style>