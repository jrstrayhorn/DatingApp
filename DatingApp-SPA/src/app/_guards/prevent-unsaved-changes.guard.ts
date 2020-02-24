import { Observable } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<MemberEditComponent> {
  constructor(private alertify: AlertifyService) {}
  canDeactivate(component: MemberEditComponent) {
    // if (component.editForm.dirty) {
    //   return confirm(
    //     'Are you sure you want to continue? Any unsaved changes will be lost'
    //   );
    // }
    // return true;
    return new Observable<boolean>(observer => {
      if (component.editForm.dirty) {
        this.alertify.confirmCancel(
          'Are you sure you want to continue? Any unsaved changes will be lost',
          () => {
            observer.next(true);
            observer.complete();
          },
          () => {
            observer.next(false);
            observer.complete();
          }
        );
      } else {
        observer.next(true);
        observer.complete();
      }
      // observer.complete();
    });
  }
}
