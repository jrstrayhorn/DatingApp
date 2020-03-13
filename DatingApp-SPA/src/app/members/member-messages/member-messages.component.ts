import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  // messages: Message[];
  messages$: Observable<Message[]>;
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.messages$ = this.userService
      .getMessageThread(currentUserId, this.recipientId)
      .pipe(
        tap(messages => {
          for (const message of messages) {
            if (
              message.isRead === false &&
              message.recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, message.id);
            }
          }
        })
      );
  }

  sendMessage(messages: Message[]) {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((message: Message) => {
        messages.unshift(message);
        this.newMessage.content = '';
      });
  }

  // loadMessages() {
  //   return
  // }
}
