import { AlertifyService } from './alertify.service';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SanitizedError } from './error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor(private alertify: AlertifyService) {}

  handleError(error: any) {
    if (typeof error === 'string') {
      this.alertify.error(error);
      return;
    }
    const sanitized = this.sanitiseError(error);
    this.alertify.error(`${sanitized.message}`);
  }

  // Used from https://www.freecodecamp.org/news/global-error-handling-in-angular-with-the-help-of-the-cdk/
  private sanitiseError(error: Error | HttpErrorResponse): SanitizedError {
    const sanitisedError: SanitizedError = {
      message: error.message,
      details: []
    };
    if (error instanceof Error) {
      sanitisedError.details.push(error.stack);
    } else if (error instanceof HttpErrorResponse) {
      sanitisedError.details = Object.keys(error).map(
        (key: string) => `${key}: ${error[key]}`
      );
    } else {
      sanitisedError.details.push(JSON.stringify(error));
    }
    return sanitisedError;
  }
}
