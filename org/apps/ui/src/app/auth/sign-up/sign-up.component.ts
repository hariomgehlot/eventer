import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../shared/services/api-service.service";
import { ToasterService } from "../../shared/services/toaster.service";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div
      class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <a
              routerLink="/signin"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in instead
            </a>
          </p>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label
                for="mobile"
                class="block text-sm font-medium text-gray-700"
                >Mobile Number</label
              >
              <input
                id="mobile"
                name="mobile"
                type="text"
                [(ngModel)]="mobile"
                required
                class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your mobile number"
              />
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                id="password"
                name="password"
                type="password"
                [(ngModel)]="password"
                required
                class="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Create a password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class SignUpComponent {
  mobile: string = "";
  password: string = "";
  apiService = inject(ApiService);
  toaster = inject(ToasterService);
  router = inject(Router);

  onSubmit() {
    const payload = {
      mobile: this.mobile,
      password: this.password,
    };
    this.apiService.signUp(payload).subscribe({
      next: (response) => {
        this.apiService.setUserData(response);
        this.router.navigate(["/"]);
        this.toaster.showToast("success", "Sign up successful");
      },
      error: (error) => {
        this.toaster.showToast("error", error.error.response.message);
      },
    });
  }
}
