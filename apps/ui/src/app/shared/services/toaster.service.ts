import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
export type ToastMessage = {
  type: "success" | "error" | "info";
  text: string;
};
@Injectable({
  providedIn: "root",
})
export class ToasterService {
  private toastMessageSubject = new Subject<ToastMessage>();

  toastMessage$ = this.toastMessageSubject.asObservable();

  showToast(type: "success" | "error" | "info", text: string) {
    this.toastMessageSubject.next({ type, text });
  }
}
