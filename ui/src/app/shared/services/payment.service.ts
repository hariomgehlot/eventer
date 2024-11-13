import { Injectable } from "@angular/core";
declare var Razorpay: any;
@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor() {}

  createPayment(options: any) {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
}
