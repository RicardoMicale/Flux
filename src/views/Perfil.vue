<template>
  <div class="contenido">
    <div class="info-estudiante">
      <section class="info-contacto">
        <h2 class="nombre">{{ user.nombre }}</h2>
        
        <h3 class="carrera">{{ user.carrera }}</h3>
        <h4 class="contacto">Contacto:</h4>
        <ul class="lista-contacto">
          <li><p>
            <a :href="'mailto:' + user.email">{{ user.email }}</a>
          </p></li>
          <li><p>Twitter: <input class="red-input twitter" type="text" :disabled= "disabled" /></p></li>
          <li><p>Instagram: <input class="red-input instagram" type="text" :disabled= "disabled" /></p></li>
          <li><p>LinkedIn: <input class="red-input linekedIn" type="text" :disabled= "disabled" /></p></li>
        </ul>
      </section>
      <section class="info-carrera">
        <p>
          Cantidad total de créditos acumulados:
          <span>{{ user.creditosTot }}</span>
        </p>
        <p>
          Cantidad de créditos en materias BP:
          <span>{{ user.creditosBP }}</span>
        </p>
        <p>
          Cantidad de créditos faltantes por cursar:
          <span>
            {{ user.creditosFaltantes }}
          </span>
        </p>
      </section>
    </div>
    <button class="btn-editar" @click="disabled = !disabled">Editar Perfil</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import * as fb from "../firebase";

export default {
  name: "Perfil",
  data() {
    return {
      user: {},
      disabled: true,
    };
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
  editar() {
    this.disabled = !this.disabled;
    this.UsuarioService.updateUser(this.user.uid, this.user);
  },
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

.contenido {
  padding: 1.5rem 3rem;

  .info-estudiante {
    color: $font;

    a {
      color: $font;
      text-decoration: none;
    }

    .info-contacto {
      margin: 2rem 2rem 1rem;

      h2 {
        margin-bottom: 0.6rem;
      }

      h4,
      p {
        opacity: 0.8;
        margin-bottom: 0.2rem;
      }
    }

    .info-carrera {
      margin: 2rem 2rem 1rem;

      p {
        margin: 0.3rem 0;

        span {
          font-weight: bold;
        }
      }
    }
  }
  .contacto{
    padding: 1rem;
  }
  .lista-contacto{
    list-style-type: none;
    .red-input{
      background-color: #e2e2e2;
      color: $bg-dark;
      &:disabled{
        background: transparent;
        border: none;
        outline: none;
        color: $font;
      }
    }
  }
  button{
    background-color: $acento;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    border: none;
    outline: none;
    font-family: $fonts;
    color: $font;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
      background-color: #b63a11;
      color: #e2e2e2;
    }
  }
}
</style>