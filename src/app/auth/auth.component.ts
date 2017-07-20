import { Component, OnInit } from '@angular/core'
import { UserService } from '../servicios/user.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers:  [ UserService ]
})
export class AuthComponent implements OnInit {

  constructor(private modalService: NgbModal, private userService: UserService) {}
  closeResult:String
  email:String
  password:String
  confirm:String
  localUserData:any = {
      indicadores: {
        displayLogin:true,
        displayUser:false
      }
    }

   ngOnInit() {
    this.userService.getUserState().then(data => {
      //console.log(data)
      var template = {
          res: {},
          indicadores: {
            oK:'',
            error:'',
            displayLogin:true,
            displayUser:false
          }
        }
      if (data) {
        template.res = data
        template.indicadores.displayLogin = false
        template.indicadores.displayUser = true
        this.userService.guardarUser(template)
        this.userService.getUser().then(localUserData => {
          this.localUserData = localUserData
          console.log(this.localUserData)
        })
      }
    }).catch(err => {
      console.log(err)
    })
    // this.localUserData = this.userService.localStorageUser
    // console.log(this.localUserData)
    //this.userService.getUser().then(data => {console.log(data)})
    //  this.localUserData = this.userService.localStorageUser
    //  setTimeout(_=>{this.localUserData = this.userService.localStorageUser},330)

    //  console.log(this.localUserData)
  }

   loginForm(u) {
     this.modalService.open(u).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
     });
   }

   registrarForm(registrar) {
     this.modalService.open(registrar).result.then((result) => {
       this.closeResult = `Closed with: ${result}`
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
     });
   }

   clicRegistrar() {
    this.userService.registrar(this.email, this.password, this.confirm)
    .then(result => {
      location.reload()
    })
    .catch(err => {
      if (err.message === 'The email address is badly formatted.') {
         this.localUserData.indicadores.error = '¡Ingresa un email valido por favor!'
          setTimeout(_=> {
            this.localUserData.indicadores.error = ''
          },3300)
                   //console.log(this.userService.localUser.indicadores)
      }
      else if (err.message === 'The password must be 6 characters long or more.') {
         this.localUserData.indicadores.error = '¡La contraseña debe tener minimo 6 caracteres!'
          setTimeout(_=> {
            this.localUserData.indicadores.error = ''
          },3300)
                   //console.log(this.userService.localUser.indicadores)
      }
      else if (err.message === undefined) {
         this.localUserData.indicadores.error = '¡Verifica la contraseña por favor!'
          setTimeout(_=> {
            this.localUserData.indicadores.error = ''
          },3300)
                   //console.log(this.userService.localUser.indicadores)
      }
    })
   }

   clicLogin () {
    this.userService.login(this.email, this.password)
    .then(data => {
      if (data === 'The email address is badly formatted.') {
         this.localUserData.indicadores.error = '¡Tu email no esta registrado!'
          setTimeout(_=> {
            this.localUserData.indicadores.error = ''
          },3300)
                   //console.log(this.userService.localUser.indicadores)
      }
      else if (data === 'The password is invalid or the user does not have a password.') {
            this.localUserData.indicadores.error = '¡Tu contraseña es incorrecta!'
          setTimeout(_=> {
            this.localUserData.indicadores.error = ''
          },3300)
      }
      else {
        this.userService.guardarUser(data)
        location.reload()
    }
    })
    .catch(err => {
       this.localUserData.indicadores.error = 'No pudiste iniciar sesion. ¡Lo sentimos!'
    })
   }

   onCerrarSesion () {
     this.userService.cerrarSesion()
     location.reload()
   }

   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }
}
