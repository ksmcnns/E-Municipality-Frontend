
export interface DebitResponseDto {
  nationalIdNo: number;
  debitType: number;
  debitAmount: number;
  debitStatus: boolean;
  paymentDeadline: string; // ISO formatında tarih
  name:string;
}
