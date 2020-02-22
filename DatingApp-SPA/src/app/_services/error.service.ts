import { AlertifyService } from './alertify.service';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor(private alertify: AlertifyService) {}

  handleError(error: any) {
    this.alertify.error(error);
    console.log(error);
  }
}
