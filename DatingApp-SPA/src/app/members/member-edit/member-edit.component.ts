import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  // not working @ViewChild('editForm', { static: true }) editForm: NgForm;
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.user$ = this.userService.getUser(this.authService.decodedToken.nameid);
  }

  updateUser(user: User, editForm: NgForm) {
    console.log(user);
    this.alertify.success('Profile updated successfully');
    editForm.resetForm(user);
  }
}
