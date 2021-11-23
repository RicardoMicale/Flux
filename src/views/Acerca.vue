<template>
  <div class="acerca">
    <h2>Acerca de</h2>
    <p>
      Flux es un <span>flujograma interactivo</span>, es un proyecto desarrollado para que
      sea más fácil la organización del trimestre. Además de poder visualizar el
      flujograma, también es posible entrar a ver los 
      <span>
        detalles, descripción y una discusión
        de cada materia
      </span> solamente haciendo click en la materia que se quiere
      revisar.
    </p>
    <p>
      Por cada materia es posible revisar:
      <ul>
          <li>Creditos que se cursan</li>
          <li>Creditos necesarios para verla</li>
          <li>Creditos BP necesarios para verla</li>
          <li>Materia(s) prelatorias</li>
          <li>Nombre y código en sirius</li>
          <li>Una breve descripción sobre la materia</li>
      </ul>
    </p>
    
    <p>
      En la discusión de cada materia, se espera que los alumnos puedan discutir o dar tips
      sobre la materia para los siguientes estudiantes que la inscriban
    </p>
  </div>
  <section class="nosotros">
    <div class="info-devs">
      <h2 class="titulo-dev titulo-uno">Desarrolladores</h2>
      <section class="personas">
        <div class="persona">
          <h4>Ricardo Micale</h4>
          <img src="../assets/micale.jpeg" alt="Foto Ricardo Micale">
        </div>
        <div class="persona">
          <h4>Gabriel Marrero</h4>
          <img src="../assets/gabriel.jpg" alt="Foto Gabriel Marrero">
        </div>
        <div class="persona">
          <h4>Carlos González</h4>
          <img src="../assets/carlos.jpeg" alt="Foto Carlos González">
        </div>
      </section>
    </div>
    <section class="redes">
      <div class="separador"></div>
      <div class="link-repo">
        <h2 class="titulo-dev titulo-dos">Github y redes</h2>
        <div class="repositorio">
          <h4>Repositorio</h4>
          <a href="https://github.com/RicardoMicale/Flux" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" class="fas github"></font-awesome-icon>
            Flux
          </a>
        </div>
          <div class="sociales">
            <div class="desarrollador">
              <p>Ricardo Micale</p>
              <div class="links">
                <a href="https://github.com/RicardoMicale" target="_blank">
                  <font-awesome-icon :icon="['fab', 'github']" class="fas github"></font-awesome-icon>
                </a>
                <a href="https://twitter.com/RicardoMicale" target="_blank">
                  <font-awesome-icon :icon="['fab', 'twitter']" class="fas twitter"></font-awesome-icon>
                </a>
                <a href="https://github.com/RicardoMicale/Flux" target="_blank">
                  <font-awesome-icon :icon="['fab', 'instagram']" class="fas instagram"></font-awesome-icon>
                </a>
              </div>
            </div>
            <div class="circulo"></div>
            <div class="desarrollador">
              <p>Gabriel Marrero</p>
              <div class="links">
                <a href="https://github.com/gabrielmarrero0801" target="_blank">
                  <font-awesome-icon :icon="['fab', 'github']" class="fas github"></font-awesome-icon>
                </a>
                <a href="https://www.instagram.com/gmarrero0801" target="_blank">
                  <font-awesome-icon :icon="['fab', 'instagram']" class="fas instagram"></font-awesome-icon>
                </a>
              </div>
            </div>
            <div class="circulo"></div>
            <div class="desarrollador">
              <p>Carlos González</p>
              <div class="links">
                <a href="https://github.com/carlosigonz" target="_blank">
                  <font-awesome-icon :icon="['fab', 'github']" class="fas github"></font-awesome-icon>
                </a>
                <a href="https://twitter.com/carlitosg99" target="_blank">
                  <font-awesome-icon :icon="['fab', 'twitter']" class="fas twitter"></font-awesome-icon>
                </a>
                <a href="https://www.instagram.com/carlosigonzalez99" target="_blank">
                  <font-awesome-icon :icon="['fab', 'instagram']" class="fas instagram"></font-awesome-icon>
                </a>
              </div>
            </div>
          </div>
      </div>
    </section>
  </section>
  
</template>

<script>
export default {
  name: "Acerca",
};
</script>

<style lang="scss" scoped>
@import "../variabes.scss";

span {
  color: $acento;
}

.acerca {
  color: $font;
  padding: 3rem;

  p {
    margin: 2rem 0;
  }

  h2 {
    color: $font;
    margin: 0 0 2rem;
  }

  ul {
    margin: 1rem 3rem;
  }
}

.titulo-dev {
  color: $font;
}

.nosotros {
  padding: 0 3rem 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: $font;

  h2 {
    margin-bottom: 3rem;
  }
}

.info-devs {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 40%;
}

.personas {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  h4 {
    margin-bottom: 1rem;
  }

  img {
    width: 8rem;
    height: 8rem;
  }
}

.redes {
  margin-left: 2rem;
  display: flex;
  justify-content: flex-start;

  .separador {
    border-radius: 5000px;
    background-color: $acento;
    width: 0.5rem;
    height: 15rem;
    margin: 0 1rem;
  }

  .circulo {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: $acento;
  }

  a {
    text-decoration: none;
    color: $font;
    font-size: 1.2rem;
  }

  .fas {
    font-size: 1.5rem;
  }

  .repositorio {
    margin-bottom: 2rem;

    h4 {
      margin-bottom: 0.7rem;
    }

    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: color 0.3s ease;
      font-size: 1.4rem;

      .fas {
        margin-right: 1rem;
      }

      &:hover {
        color: $acento;
      }
    }
  }

  .sociales {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .desarrollador {
      margin: 0 2rem;

      &:first-child {
        margin-left: 0;
      }

      .twitter {
        color: $twitter;
      }

      .instagram {
        color: $instagram;
      }

      .links {
        margin-top: 0.7rem;

        .fas {
          margin-left: 1rem;
          transition: transform 0.2s ease;

          &:hover {
            transform: scale(1.4);
          }
        }

        .github {
          margin-left: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 858px) {
  .nosotros {
    flex-direction: column;
  }

  .info-devs {
    width: 100%;
  }

  .personas {
    flex-direction: column;
    align-items: center;

    img {
      margin-bottom: 2rem;
    }
  }

  .redes {
    margin-left: 0;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .separador {
      width: 10rem;
      height: 0.5rem;
      margin-bottom: 2rem;
    }

    .repositorio {
      margin-bottom: 0;

      h4 {
        font-size: 1.4rem;
      }

      a .fas {
        font-size: 2rem;
      }
    }

    .circulo {
      margin: 0.5rem 1rem;
    }

    .sociales {
      flex-direction: column;
      align-items: flex-start;

      .desarrollador {
        margin: 2rem 0 1rem;

        p {
          font-size: 1.2rem;
        }

        a .fas {
          font-size: 2rem;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>