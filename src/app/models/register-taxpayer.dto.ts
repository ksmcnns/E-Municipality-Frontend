// src/app/models/register-taxpayer.dto.ts
export interface RegisterTaxPayerDTO {
  nationalIdNo: number;
  name: string;
  surname: string;
  email: string;
  birthDate: string; // ISO formatında tarih
  telephone: string;
  gender: string;
  municipalityId: number;
  city: string;
  district: string;
  postcode: string;
  address: string;
  password: string;
}
