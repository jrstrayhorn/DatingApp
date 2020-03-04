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

  pageStream = new Subject<any>();

  // users$: Observable<PaginatedResult<User[]>>;
  // users: User[];
  users$: Observable<User[]>;
  pagination$: Observable<Pagination>;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const pageSource = this.pageStream.pipe(
      map(pageNumber => {
        console.log(`page number is: ${pageNumber}`);
        return { page: pageNumber };
      })
    );

    const source = pageSource.pipe(
      startWith({ page: this.pageNumber }),
      switchMap((params: { page: number }) => {
        return this.userService.getUsers(params.page, 5);
      }),
      share()
    );

    this.users$ = source.pipe(pluck('results'));
    this.pagination$ = source.pipe(pluck('pagination'));

    // this.users$ = this.userService.getUsers(this.pageNumber, this.pageSize);
    // this.route.data.subscribe(data => {
    //   this.users = data.users;
    // });
  }

  pageChanged(event: any): void {}

  logMe(msg): void {
    console.log(msg);
  }

  loadUsers(page, itemsPerPage) {
    // this.users$ = this.userService.getUsers(page, itemsPerPage);
    this.pageStream.next(page);
  }
}
