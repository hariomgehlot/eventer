import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PaymentService } from "../../../shared/services/payment.service";

@Component({
  selector: "app-booking-dialog",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
        <div class="px-6 py-4 bg-indigo-600">
          <h3 class="text-lg font-medium text-white">Book Event</h3>
        </div>

        <form (ngSubmit)="confirmBooking()" class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Event</label
              >
              <p class="mt-1 text-lg font-semibold">{{ event.title }}</p>
            </div>

            <div>
              <label
                for="tickets"
                class="block text-sm font-medium text-gray-700"
                >Number of Tickets</label
              >
              <select
                id="tickets"
                [(ngModel)]="tickets"
                name="tickets"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                @for (num of [1,2,3,4,5]; track num) {
                <option [value]="num">
                  {{ num }} {{ num === 1 ? "ticket" : "tickets" }}
                </option>
                }
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Total Price</label
              >
              <p class="mt-1 text-2xl font-bold text-indigo-600">
                {{ event.price * tickets | currency }}
              </p>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              (click)="closeDialog()"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class BookingDialogComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  tickets: number = 1;
  paymentService = inject(PaymentService);
  closeDialog() {
    this.close.emit();
  }
  async confirmBooking() {
    const totalAmount = this.event.price * this.tickets;

    try {
      const options = {
        key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const response = this.paymentService.createPayment(options);
      this.closeDialog();

      // Here you would typically make an API call to your backend
      // to verify the payment and create the booking
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }
}
