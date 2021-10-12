import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBlgB-t0QQl5APvJYuvAujeqJMiQfOJK_A",
    authDomain: "fluxunimet.firebaseapp.com",
    projectId: "fluxunimet",
    storageBucket: "fluxunimet.appspot.com",
    messagingSenderId: "591629630343",
    appId: "1:591629630343:web:54403dae4049d02d953122"
  };

const app = firebase.initializeApp(config);
const db = app.firestore();

const coleccionMaterias = db.collection('Materias');

export const getMateria = async id => {
    const materia = await coleccionMaterias.doc(id).get();
    return materia
}

export default app;