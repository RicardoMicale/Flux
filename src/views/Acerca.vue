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
</style>