import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {FooterComponent} from "./components/footer/footer.component";
import {DeptComponent} from "./components/dept/dept.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {MunicipalityRegisterComponent} from "./components/municipality-register/municipality-register.component";
import {HomeComponent} from "./components/home/home.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, UserRegisterComponent, FooterComponent, DeptComponent, PaymentComponent, MunicipalityRegisterComponent, HomeComponent, AdminPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
//Sidebar toggle show hide function
status = false;
addToggle()
{
  this.status = !this.status;
}
}
