import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import { LocalStorageService } from 'angular-2-local-storage'

@Injectable()
export class UserService {
  items:any
  localStorageUser:any

  constructor(private fbAuth: AngularFireAuth, private localStorage: LocalStorageService, private db: AngularFireDatabase) {
    this.items = this.db.list('/pedidos')
  }

    // obtenerValores () {
    //   this.items.subscribe(snapshots => {
    //       // snapshots.forEach(snapshot => {
    //       //   console.log(snapshot)
    //       // });
    //       //console.log(snapshots)
    //     })
    //   }

    // enviarDatos () {
      //console.log(this.localUser)
      // this.items.push('mygad',
      //    {
      //       uId: 'dkg123CKft1824',
      //       nombre: 'Renny',
      //       email: this.localUser.res,
      //       articulos: [
      //         {
      //           artId: '126786783',
      //           color: '123',
      //           precio:'123123',
      //           talla: '123'
      //         }]
      // })
    // }
    login(email, password) {
      return this.fbAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        return error.message
        })
      .then(data => {
        return data
      })
    }

    registrar(email, password, confirm) {
    if (password !== confirm) {
    return Promise.reject("Las contraseñas no coinciden")
    }

    // TODO: Checar si el email está verificado

    return this.fbAuth.auth.createUserWithEmailAndPassword(email, password)
    }

    forget(email) {
    return this.fbAuth.auth.sendPasswordResetEmail(email)
    }

    cerrarSesion () {
      return this.fbAuth.auth.signOut()
    }

    guardarUser(user) {
      if(user === null) {
        let template = {
            res: user,
            indicadores: {
              oK:'',
              error:'',
              displayLogin:true,
              displayUser:false
            }
          }
        this.localStorage.set('userSesion', template)
      }
      else {
        this.localStorage.set('userSesion', user)
          }
      }

//Esta funcion es la primera que se ejecuta en el OnInit
   getUserState () {
      let promesa = new Promise((solucion, error) => { //objeto interno que contiene las promesas
        this.fbAuth.auth.onAuthStateChanged(sesion => { //obtener el estado de la sesion y enviar la respuesta a una condicional
          if(sesion === null) { //en la primera carga este objeto sera null por lo tanto respondemos ante ese estado
            this.guardarUser(null) //guardamos en el localStorage para que al recargar se mantengan los datos
            error('No hay sesion activa.') // mostramos una alerta con el error
          }
          else { //de lo contrario
            solucion(sesion) //mostramos la data que nos devuelve firebase
          }
        })
      })
        return promesa //retornamos la promesa
    }

    async getUser () { //funcion para obtener la data del localStorage, agregue async porque no siempre habran datos en el localStorage, asi que cuando este lleno, este lo detectara en su momento.
      let data = this.localStorage.get('userSesion')
      return data
      }
    }
