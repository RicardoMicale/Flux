//import firebase from 'firebase'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
const coleccionUsuarios = db.collection('Usuarios');
const coleccionDiscusiones = db.collection('Discusiones');

//CRUD materias
export const crearMateria = (id, materia) => {
    return coleccionMaterias.doc(id).set(materia);
}

export const getAllMaterias = async () => {
    const snapshot = await coleccionMaterias.get();
    const materias = [];
    snapshot.forEach(doc => {
        materias.push(doc.data())
    });
    return materias
}

export const getMateria = async id => {
    const materia = await coleccionMaterias.doc(id).get();
    return materia
}

export const getMateriaDinamica = async id => {
    const materia = await coleccionMaterias.doc(id);
    return materia
}

export const updateMateria = (id, materia) => {
    return coleccionMaterias.doc(id).update(materia)
}

//CRUD usuarios
export const crearUsuario = (id, usuario) => {
    return coleccionUsuarios.doc(id).set(usuario);
}

export const getUsuario = async id => {
    const user = await coleccionUsuarios.doc(id).get();
    return user;
}

export const updateUser = (id, user) => {
    return coleccionUsuarios.doc(id).update(user)
}

//CRUD discusiones
export const crearDiscusion = (id, discusion) => {
    return coleccionDiscusiones.doc(id).set(discusion)
}

export const getDiscusion = async (idDiscusion) => {
    const discusion = await coleccionDiscusiones.doc(idDiscusion).get();
    return discusion;
}

export const getDiscusionDinamica = async id => {
    const discusion = await coleccionDiscusiones.doc(id)
    return discusion
}

export const updateDiscusion = (id, discusion) => {
    return coleccionDiscusiones.doc(id).update(discusion);
}

export default app;