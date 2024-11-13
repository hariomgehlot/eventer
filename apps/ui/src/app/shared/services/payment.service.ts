import { Injectable } from "@angular/core";
declare let Razorpay: any;
@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor() {}

  createPayment(options: any) {
    const rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
