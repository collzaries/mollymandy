import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

//Bootstrap
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import {
      MdSidenavModule,
      MdToolbarModule,
      MdButtonModule,
      MdIconModule,
      MdTooltipModule,
      MdButtonToggleModule,
      MdMenuModule,
      MdCardModule,
      MdInputModule,
      MdDatepickerModule,
      MdNativeDateModule,
      MdCheckboxModule,
      MdRadioModule,
      MdSelectModule,
      MdSlideToggleModule,
      MdTabsModule,
      MdChipsModule,
      MdProgressSpinnerModule,
      MdProgressBarModule,
      MdDialogModule,
      MdSnackBarModule,
      MdTableModule
      } from '@angular/material';
import 'hammerjs'


//Firebase
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'

//Servicios
import { UserService } from './servicios/user.service'

import { AuthComponent } from './auth/auth.component'
import { CarritoComponent} from './carrito/carrito.component'
import { LocalStorageModule } from 'angular-2-local-storage'
import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AuthComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
    NgbModule.forRoot(),
    // MATERIAL
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdButtonToggleModule,
    MdMenuModule,
    MdCardModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdTabsModule,
    MdChipsModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdDialogModule,
    MdSnackBarModule,
    MdTableModule
  ],
  providers: [UserService],
  bootstrap: [AuthComponent, CarritoComponent]
})
export class AppModule { }
