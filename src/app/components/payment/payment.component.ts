import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';
import {DebitPaymentDto} from "../../models/debit-payment.dto";
import {PaymentService} from "../../services/payment/payment.service";
import {cardCvvNumber, creditCardNumber} from "../validators/validator";

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  data?: { debitData?: any, municipalityName?: string, nationalIdNo?: number };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private paymentService: PaymentService
  ) {
    let currentNavigation = this.router.getCurrentNavigation();
    let extras = currentNavigation?.extras;
    if (extras && extras.state) {
      this.data = extras.state;
    }
    debugger;
    this.paymentForm = this.fb.group({
      nationalIdNo: [this.data?.nationalIdNo ?? '', [Validators.required]],
      municipalityName: [this.data?.municipalityName ?? ''],
      debitType: [this.data?.debitData?.debitType ?? ''],
      debitAmount: [this.data?.debitData?.debitAmount ?? ''],
      serviceName: [this.data?.debitData?.name ?? ''],
      debitId: [this.data?.debitData?.debitId ?? ''],
      cardOwner: ['', [Validators.required,]],
      cardNumber: ['', [Validators.required, creditCardNumber()]],
      paymentAmount: [''],
      cvv: ['',[Validators.required, cardCvvNumber()]],
    });

    // Form alanlarındaki değişiklikleri dinlemek için
    this.paymentForm.valueChanges.subscribe(() => {
    });
  }

  ngOnInit() {
    // Session storage'a kaydet
    sessionStorage.setItem('paymentFormData', JSON.stringify(this.paymentForm.value));
  }

  onSubmit() {
    debugger;
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    console.log('Form Values:', this.paymentForm.value);
    sessionStorage.setItem('paymentFormData', JSON.stringify(this.paymentForm.value));

    const paymentData: DebitPaymentDto = {
      id: this.data?.debitData.id,
      nationalId: this.data?.debitData.nationalIdNo,
      paymentStatus: true,
      cardNumber: this.paymentForm.get('cardNumber')?.value,
      cardOwner: this.paymentForm.get('cardOwner')?.value,
      cvvNumber: this.paymentForm.get('cvv')?.value,
      paymentAmount: this.paymentForm.get('debitAmount')?.value,
      debitType: this.data?.debitData.debitType
    };

    this.paymentService.payDebit(paymentData).subscribe(
      response => {
        this.toastr.success('Ödeme başarılı!', 'Ödendi!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error => {
        console.error('Payment failed', error);
        this.toastr.error('Ödeme başarısız', 'Hata!');
      }
    );

  }

  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); // Sayı olmayan karakterleri kaldır
    if (input.length > 16) {
      input = input.substring(0, 16); // 16 hane ile sınırlayın
    }
    // Her 4 haneden sonra "-" ekle
    let formattedInput = '';
    for (let i = 0; i < input.length; i += 4) {
      if (formattedInput.length > 0) {
        formattedInput += '-';
      }
      formattedInput += input.substring(i, i + 4);
    }
    event.target.value = formattedInput;
    // Form control değerini de güncelle
    this.paymentForm.get('cardNumber')?.setValue(formattedInput, {emitEvent: false});
  }

  get cardNo(): AbstractControl {
    return this.paymentForm.controls["cardNumber"] as AbstractControl;
  }
  get cardCvvNo(): AbstractControl {
    return this.paymentForm.controls["cvv"] as AbstractControl;
  }
  get cardOwner(): AbstractControl {
    return this.paymentForm.controls["cardOwner"] as AbstractControl;
  }


  limitCVVLength(event: any): void {
    let input = event.target.value.replace(/\D/g, ''); // Sayı olmayan karakterleri kaldır
    if (input.length > 3) {
      input = input.substring(0, 3); // 3 hane ile sınırlayın
    }
    event.target.value = input;
  }
}
