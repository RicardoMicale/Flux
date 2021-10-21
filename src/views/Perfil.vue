<template>
  <div class="contenido">
    <div class="info-estudiante">
      <section class="info-contacto">
        <h2>{{ user.nombre }}</h2>
        <h4>{{ user.carrera }}</h4>
        <p>
          Contacto: <a :href="'mailto:' + user.email">{{ user.email }}</a>
        </p>
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
}
</style>