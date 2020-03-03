import { Observable } from 'rxjs';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;

  users$: Observable<PaginatedResult<User[]>>;
  // users: User[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers(this.pageNumber, this.pageSize);
    // this.route.data.subscribe(data => {
    //   this.users = data.users;
    // });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
