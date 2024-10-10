import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/authentication/auth.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserDataService } from "../../services/user-data/user-data.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nationalIdNo: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService) {
  }

  onLogin() {
    this.authService.login(this.nationalIdNo, this.password, this.name, this.surname)
      .subscribe(data => {
        if (data) {
          // Kullanıcı bilgilerini saklayın
          debugger;
          this.userDataService.setUserData({
            nationalIdNo: data.nationalIdNo,
            name: data.name,
            surname: data.surname
          });
          // Home component'e yönlendirin
          this.router.navigate(['/home']);
        }

      });
  }

  onRegister() {
    this.router.navigate(['/user-register']);
  }
}
