import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: false }) editForm: NgForm;
  user$: Observable<User>;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.user$ = this.userService.getUser(this.authService.decodedToken.nameid);
  }

  updateUser(user: User) {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, user)
      .subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.resetForm(user);
      });
  }

  // updateMainPhoto(photoUrl) {
  //   this.user.photoUrl = photoUrl;
  // }
}
