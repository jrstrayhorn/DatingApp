import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likers';

  pageStream = new Subject<any>();

  source$: Observable<PaginatedResult<User[]>>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.source$ = this.pageStream.pipe(
      startWith(this.pageNumber),
      switchMap((page: number) => {
        return this.userService.getUsers(
          page,
          this.pageSize,
          null,
          this.likesParam
        );
      })
    );
  }

  loadUsers(page?) {
    const pageToLoad = page == null ? 1 : page;
    this.pageStream.next(pageToLoad);
  }
}
