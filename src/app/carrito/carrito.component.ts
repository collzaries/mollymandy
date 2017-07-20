import { Component, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../servicios/user.service'

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  art: String = 'Franela Gris'
  cant: Number = 0
  precio: Number = 30000
  data = {}

constructor(private userService: UserService) {
  //console.log(this.data)
}

  ngOnInit() {
  }
}
