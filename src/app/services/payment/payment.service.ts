import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {DebitPaymentDto} from "../../models/debit-payment.dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) {
  }
  payDebit(debitPaymentDto: DebitPaymentDto): Observable<DebitPaymentDto> {
    return this.http.post<DebitPaymentDto>(`${this.apiUrl}`, debitPaymentDto);
  }
}


