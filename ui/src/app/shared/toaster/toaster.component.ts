import { animate, style, transition, trigger } from "@angular/animations";
import { Component, inject, OnInit } from "@angular/core";
import { ToasterService, ToastMessage } from "../services/toaster.service";
import { CommonModule } from "@angular/common";
import { Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-toaster",
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: "./toaster.component.html",
  styleUrls: ["./toaster.component.css"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ bottom: "-300px" }),
        animate("200ms ease-in-out", style({ bottom: "0px" })),
      ]),
      transition(":leave", [
        animate("100ms ease-in-out", style({ bottom: "-300px" })),
      ]),
    ]),
  ],
})
export class ToasterComponent implements OnInit {
  toasterService = inject(ToasterService);
  toastConfig!: ToastMessage | null;
  subscription!: Subscription;
  constructor() {}
  ngOnInit(): void {
    this.subscription = this.toasterService.toastMessage$
      .pipe(
        switchMap((toastMessage) => {
          this.toastConfig = toastMessage;
          return timer(3000);
        })
      )
      .subscribe(() => {
        this.toastConfig = null;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dismiss() {
    this.toastConfig = null;
  }
}
