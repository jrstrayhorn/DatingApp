import { map, startWith, switchMap, share, pluck } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;

  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' }
  ];
  userParams: any = {};

  pageStream = new Subject<any>();

  // users$: Observable<PaginatedResult<User[]>>;
  // users: User[];
  // users$: Observable<User[]>;
  // pagination$: Observable<Pagination>;
  source$: Observable<PaginatedResult<User[]>>;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;

    const pageSource = this.pageStream.pipe(
      map(pageNumber => {
        console.log(`page number is: ${pageNumber}`);
        return { page: pageNumber };
      })
    );

    this.source$ = pageSource.pipe(
      startWith({ page: this.pageNumber }),
      switchMap((params: { page: number }) => {
        return this.userService.getUsers(params.page, 5, this.userParams);
      })
      // ,
      // share()
    );

    // this.users$ = source.pipe(pluck('results'));
    // this.pagination$ = source.pipe(pluck('pagination'));

    // this.users$ = this.userService.getUsers(this.pageNumber, this.pageSize);
    // this.route.data.subscribe(data => {
    //   this.users = data.users;
    // });
  }

  loadUsers(page?, itemsPerPage?) {
    if (page == null) {
      this.pageStream.next(1);
      return;
    }

    // this.users$ = this.userService.getUsers(page, itemsPerPage);
    this.pageStream.next(page);
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
}
