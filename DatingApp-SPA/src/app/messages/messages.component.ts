import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  pageStream = new Subject<any>();

  source$: Observable<PaginatedResult<Message[]>>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.source$ = this.pageStream.pipe(
      startWith(this.pageNumber),
      switchMap((page: number) => {
        return this.userService.getMessages(
          this.authService.decodedToken.nameid,
          this.pageNumber,
          this.pageSize,
          this.messageContainer
        );
      })
    );
  }

  loadMessages(page?) {
    const pageToLoad = page == null ? 1 : page;
    this.pageStream.next(pageToLoad);
  }
}
