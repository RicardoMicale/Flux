<template>
  <div>
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
    <div class="desarrolladores">
      <h3> Desarrolladores</h3>
    <div class="personas">
      <div class="persona">
        <h4>Ricardo Micale</h4>
        <img src="../assets/micale.jpeg" alt="">
      </div>
      <div class="persona">
        <h4>Gabriel Marrero</h4>
        <img src="../assets/gabriel.jpg" alt="">
      </div>
      <div class="persona">
        <h4>Carlos Gonzalez</h4>
        <img src="../assets/carlos.jpeg" alt="">
      </div>
      
    </div>
    </div>
    <div class="desarrolladores">
      <h3>GitHub y redes</h3>
            <h4>Flux <i class="fab fa-github"></i>      
            </h4>  
      <div class="personas">     
      <div class="redes">
        <h4>Ricardo Micale</h4>
        <div class="botones">
          <a href="https://www.instagram.com/ricardo_micale/">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/RicardoMicale
">
              <i class="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/RicardoMicale/Flux">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
      <div class="redes">

        <h4>Gabriel Marrero</h4>
      <div class="botones">
        <a href="https://www.instagram.com/gmarrero0801">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/RicardoMicale/Flux">
            <i class="fab fa-github"></i>
          </a>
      </div>
      </div>
      <div class="redes">
        <h4>Carlos Gonzalez</h4>
      <div class="botones">
          <a href="https://www.instagram.com/carlosigonzalez99">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/carlitosg99">
              <i class="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/RicardoMicale/Flux">
            <i class="fab fa-github"></i>
          </a>
      </div>
      </div>
    </div> 
    </div>
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

div {
  color: $font;
  padding: 3rem;

  p {
    margin: 2rem 0;
  }

  h2 {
    color: bg-light-secundario;
    margin: 0 0 2rem;
  }

  ul {
    margin: 1rem 3rem;
  }
}
.nosotros{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  
}
.desarrolladores{
  width: 50%;
  height: 100%;
  margin-left: 2rem;
  
}

.personas{  
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100%;
    margin-left: 0;
    margin-top: 0;
    padding-top: 0;

}
.persona{
  margin-top: 0;
  width: 33,33%;
  height: 100%;
  margin-left: 0;
}
h4{
  margin-top: 0;
  width: 100%;
  font-size: 14px;
}
img{
  margin-top: 13%;
  width: 8rem;
  height: 65%;
}
.redes{
  margin-top: 0;
  width: 33%;
  height: 100%;
  padding-top: 0;
}
.botones{
  display: flex;
  flex-direction: row;
  width: 10%;
  height: 5%;
  align-items: center;
  margin-right: 50%;
  padding-top: 0;
  padding-left: 20%;
  margin: auto;
}
.botones a{
  margin-right: 50%;
  margin-left: 2px;
  padding-left: 0;
}
.redes h4{
  font-size: 12px;
  width: 180%;
}
@media screen and (max-width: 858px){
  .nosotros{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  
}
.desarrolladores{
  width: 100%;
  height: 100%;
  margin-left: 2rem;
  
}

.personas{  
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
    margin-left: 0;
    margin-top: 0;
    padding-top: 0;

}
.persona{
  margin-top: 0;
  width: 100%;
  height: 100%;
  margin-left: 0;
}
h4{
  margin-top: 0;
  width: 100%;
  font-size: 16px;
}
img{
  margin-top: 13%;
  width: 8rem;
  height: 65%;
}
.redes{
  margin-top: 0;
  width: 100%;
  height: 100%;
  padding-top: 0;
  align-items: center;
  margin: auto;
  display: flex;
  flex-direction: row;
}
.botones{
  display: flex;
  flex-direction: row;
  width: 10%;
  height: 5%;
  align-items: center;
  margin-right: 50%;
  padding-left: 15%;
  margin: auto;
  padding-top: 45px;
}
.botones a{
  margin-right: 50%;
  margin-left: 2px;
  padding-left: 0;
}
.redes h4{
  font-size: 12px;
  width: 100%;
  align-items: center;
  margin-left: 5px;
}
}
</style>