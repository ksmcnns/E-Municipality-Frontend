import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {UserDataService} from "../../services/user-data/user-data.service";
import {DebitService} from "../../services/debit/debit.service";
import {DatePipe} from "@angular/common";
import {CommonModule} from "@angular/common";
import {DebitResponseDto} from "../../models/debit-response.dto";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  protected debits: {
    debitType: number;
    paymentDeadline: string;
    debitAmount: number;
    debitStatus: boolean;
    nationalIdNo: number
    name: string;
  }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private debitService: DebitService) {
  }

  municipalityName: string = "Ütopya Belediyesi";
  // User Domain
  userData: any = {};
  // Default Table Headers
  tableHeaders = {
    title: '',
    domain: '',
    dateOrder: '',
    status: ''
  };

  ngOnInit(): void {
    // Session storage'dan verileri al
    const savedUserData = sessionStorage.getItem("userData");
    if (savedUserData) {
      this.userData = JSON.parse(savedUserData);
    } else {
      // Kullanıcı bilgilerini al ve session storage'a kaydet
      this.userDataService.userDataChange.subscribe((data: any) => {
        this.userData = data;
        sessionStorage.setItem('userData', JSON.stringify(this.userData));
      });
    }

    this.debitService.getDebitsByNationalIdNo(this.userData.nationalIdNo).subscribe(
      (debits: DebitResponseDto[]) => {
        this.debits = debits;
        sessionStorage.setItem('debits', JSON.stringify(this.debits));
      },
      error => {
        console.error('Borç verileri alınamadı:', error);
      }
    );
  }

  updateTableHeaders(type: string) {
    console.log(type);

    if (type === 'upcomingPayments') {
      this.tableHeaders = {
        title: 'Borç Tutarı',
        domain: 'Borçlar',
        dateOrder: 'Son Ödeme Tarihi',
        status: 'Durum'
      };

      // noinspection JSDeprecatedSymbols
      this.debitService.getDebitsByNationalIdNo(this.userData.nationalIdNo)
        .subscribe((debits: DebitResponseDto[]) => {
          console.log(debits.length);

          // paymentDeadline değerini kontrol edip Date nesnesine dönüştürmek
          this.debits = debits.map(debit => {
            let newDate = new Date(debit.paymentDeadline);
            let isoDateString = '';

            // Date nesnesinin geçerli olup olmadığını kontrol et
            if (newDate.toString() !== 'Invalid Date') {
              isoDateString = newDate.toISOString();
            } else {
              console.error(`Invalid date string for debit: ${debit.paymentDeadline}`);
            }

            return {
              ...debit,
              paymentDeadline: isoDateString
            };
          });
          sessionStorage.setItem('debits', JSON.stringify(this.debits));
        }, error => {
          console.error('Veri çekilirken hata oluştu:', error);
        });
    } else if (type === 'servicesUsed') {
      this.tableHeaders = {
        title: 'Yararlandığım Hizmetler',
        domain: 'Hizmetler',
        dateOrder: '',
        status: ''
      };
      this.debits = [];
    } else if (type === 'automaticPayments') {
      this.tableHeaders = {
        title: 'Otomatik Ödeme Talimatlarım',
        domain: 'Hizmetler',
        dateOrder: '',
        status: ''
      };
      this.debits = [];
    } else {
      this.tableHeaders = {
        title: '',
        domain: '',
        dateOrder: '',
        status: ''
      };
      this.debits = [];
    }
  }

  logout() {
    // LoginComponent'e yönlendirme yapma
    this.router.navigate(['/login']);
  }

  goToPaymentPage(debit: any) {

    const navigationExtras: NavigationExtras = {
      state: {
        debitData: debit,
        municipalityName: this.municipalityName,
        nationalIdNo: this.userData.nationalIdNo,
        serviceName: debit.name,
        debitId: debit.id
      }
    }
    this.router.navigate(['/payment'], navigationExtras);
  }
}
