import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Subject } from "rxjs";
export type User = {
  mobile: string;
  role: string;
  accessToken: string;
};
@Injectable({
  providedIn: "root",
})
export class ApiService {
  http = inject(HttpClient);
  BASE_URL = "http://localhost:3000/api";
  SIGN_IN = `${this.BASE_URL}/auth/login`;
  SIGN_UP = `${this.BASE_URL}/auth/signup`;
  GET_ALL_EVENTS = `${this.BASE_URL}/event`;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  constructor() {
    this.getUserData();
  }
  get isLoggedIn() {
    return !!this.userSubject.value;
  }
  signIn(payload: any) {
    return this.http.post(this.SIGN_IN, payload);
  }
  signUp(payload: any) {
    return this.http.post(this.SIGN_UP, payload);
  }
  setUserData(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
    this.userSubject.next(data);
  }
  getUserData() {
    const data = localStorage.getItem("user");
    this.userSubject.next(JSON.parse(data!));
  }
  getAllEvents() {
    return this.http.get(this.GET_ALL_EVENTS);
  }
  logout() {
    localStorage.removeItem("user");
    this.userSubject.next(null);
  }

  getEvent(id: any) {
    return this.http.get(`${this.GET_ALL_EVENTS}/${id}`);
  }
  getEventImages() {
    return this.http
      .get(
        "https://api.unsplash.com/search/photos?client_id=titSiqB-SEJqec8_qjj7oxm3VDFKTwHhO92_87oM4xM&query=events"
      )
      .pipe(map((res: any) => res.results.map((item: any) => item.urls.raw)));
  }
}
