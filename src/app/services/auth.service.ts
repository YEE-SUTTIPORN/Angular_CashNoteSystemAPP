import { Injectable } from '@angular/core';
import { LoginModel, LoginResponseModel } from '../models/auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { ResponseMessageWithData } from '../models/response-message.model';
import { API_ENDPOINTS } from '../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<LoginResponseModel | null>;
  private authCheckedSubject = new BehaviorSubject<boolean>(false);
  public authChecked$ = this.authCheckedSubject.asObservable();

  public currentUser: Observable<LoginResponseModel | null>;

  constructor(private http: HttpClient) {
    // พยายามโหลดข้อมูลผู้ใช้เมื่อ Service เริ่มทำงาน (ถ้ามี Cookie อยู่แล้ว)
    // หรือจะให้ผู้ใช้กด Login ก่อนเสมอ
    this.currentUserSubject = new BehaviorSubject<LoginResponseModel | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // เช็กเฉพาะตอนรันจริง (ใน browser)
    if (typeof window !== 'undefined') {
      this.checkAuthenticationStatus().subscribe();
    }
  }

  public get currentUserValue(): LoginResponseModel | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(obj: LoginModel): Observable<ResponseMessageWithData<LoginResponseModel>> {
    return this.http.post<ResponseMessageWithData<LoginResponseModel>>(API_ENDPOINTS.AUTH.LOGIN, obj, {
      withCredentials: true // *** สำคัญมาก: เพื่อให้ Browser ส่ง Cookie ไปกับ Request ***
    }).pipe(
      tap(user => {
        this.currentUserSubject.next(user.data);
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.LOGOUT, {}, {
      withCredentials: true // *** สำคัญมาก ***
    }).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
        setTimeout(() => this.authCheckedSubject.next(true), 0);
      }),
      catchError(this.handleError)
    );
  }

  checkAuthenticationStatus(): Observable<ResponseMessageWithData<LoginResponseModel> | null> {
    return this.http.get<ResponseMessageWithData<LoginResponseModel>>(API_ENDPOINTS.AUTH.CHECK_AUTH, {
      withCredentials: true
    }).pipe(
      map(user => {
        if (user && user.success && user.data) {
          this.currentUserSubject.next(user.data);
        } else {
          this.currentUserSubject.next(null);
        }

        // ✅ delay trigger authChecked$ ไปตอนหลัง set user
        setTimeout(() => this.authCheckedSubject.next(true), 0);
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        this.currentUserSubject.next(null);
        setTimeout(() => this.authCheckedSubject.next(true), 0); // ✅ ให้ set หลัง currentUser ถูก clear
        return this.handleError(error);
      })
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    // ✅ เช็กแบบปลอดภัย ไม่ใช้ ErrorEvent (ซึ่งไม่มีใน SSR)
    if (error.error && typeof error.error.message === 'string') {
      // client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      // บางกรณี error อาจเป็น string
      errorMessage = error.error;
    } else if (error.status && error.message) {
      // server-side error
      errorMessage = `Server error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}