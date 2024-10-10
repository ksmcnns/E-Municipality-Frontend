import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../services/register/register.service";
import { RegisterTaxPayerDTO } from "../../models/register-taxpayer.dto";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registrationSuccess:boolean = false;
  registrationError:boolean = false;
  errorMessage:string = "";

  constructor(private fb: FormBuilder, private registerService: RegisterService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      nationalIdNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      municipalityId: [1]  // Set default value hereng serve
    }, { validators: this.passwordMatchValidator });
  }
onSubmit(): void {
  if (this.registerForm.valid) { // Formun geçerli olup olmadığını kontrol et
    const registerData: RegisterTaxPayerDTO = {
      nationalIdNo: this.registerForm.get('nationalIdNo')?.value,
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      email: this.registerForm.get('email')?.value,
      birthDate: this.registerForm.get('birthDate')?.value,
      telephone: this.registerForm.get('telephone')?.value,
      gender: this.registerForm.get('gender')?.value,
      municipalityId: this.registerForm.get('municipalityId')?.value,
      city: this.registerForm.get('city')?.value,
      district: this.registerForm.get('district')?.value,
      postcode: this.registerForm.get('postcode')?.value,
      address: this.registerForm.get('address')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.registerService.registerTaxPayer(registerData).subscribe({
      next: (response) => {
        this.registrationSuccess = true;
        this.registrationError = false;
        console.log("Successfully registered data", response);
      },
      error: (error) => {
        console.log('Registration error', error);
        this.registrationSuccess = false;
        this.registrationError = true;
         this.errorMessage = error.message || 'Kayıt işlemi başarısız. Lütfen tekrar deneyin.';
        console.log('Registration error', error);
        this.toastr.error('','Kayıt Hatası')
      },
      complete: () => {
        console.log('Registration process completed.');
         this.toastr.success('Hello world!', 'Başarıyla Kaydedildi');
      }
    });
  }
}
  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      return null;
    }
  }
}
