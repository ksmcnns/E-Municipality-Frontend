import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegisterComponent} from "./components/user-register/user-register.component";
import { PaymentComponent} from "./components/payment/payment.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'payment', component: PaymentComponent }
];
