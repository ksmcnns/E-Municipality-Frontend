export interface DebitPaymentDto{
  id: number;
  nationalId:number;
  paymentStatus:boolean;
  cardNumber:string;
  cardOwner:string;
  paymentAmount:number;
  debitType:number;
  cvvNumber:number;
}
