import { map, switchMap } from 'rxjs/operators';
import { AlertifyService } from './../../_services/alertify.service';
import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';
import { Photo } from 'src/app/_models/photo';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, AfterViewInit {
  // user: User;
  user$: Observable<User>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', { static: false }) set memberTabs(
    memberTabs: TabsetComponent
  ) {
    if (memberTabs) {
      this.myMemberTabs = memberTabs;
      const selectedTab = +this.route.snapshot.queryParams['tab'];
      this.myMemberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    }
  }
  // @ViewChildren(TabsetComponent) allTabs: QueryList<TabsetComponent>;
  myMemberTabs: TabsetComponent;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    // this.allTabs.changes.subscribe((comps: QueryList<TabsetComponent>) => {
    //   console.log(`comps on page: ${comps.length}`);
    //   if (comps.length === 1) {
    //     this.myMemberTabs = comps.first;
    //     // const selectedTab = +this.route.snapshot.queryParams['tab'];
    //     // this.myMemberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    //     this.route.queryParams.subscribe(params => {
    //       const selectedTab = params['tab'];
    //       this.myMemberTabs.tabs[
    //         selectedTab > 0 ? selectedTab : 0
    //       ].active = true;
    //     });
    //   }
    // });
    // // this.route.queryParams.subscribe(params => {
    //   const selectedTab = params['tab'];
    //   this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    // });
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   const selectedTab = params['tab'];
    //   this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    // });
    this.user$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.userService.getUser(id))
    );

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    // this.galleryImages = this.getImages();
    // this.route.data.subscribe(data => {
    //   this.user = data.user;
    // });
  }

  // getImages() {
  //   const imageUrls = [];
  //   for (const photo of this.user.photos) {
  //     imageUrls.push({
  //       small: photo.url,
  //       medium: photo.url,
  //       large: photo.url,
  //       description: photo.description
  //     });
  //   }
  //   return imageUrls;
  // }

  // TODO: Make this a pipe
  getImagesFromUserPhotos(userPhotos: Photo[]): any[] {
    return userPhotos.map(p => {
      return {
        small: p.url,
        medium: p.url,
        large: p.url,
        description: p.description
      };
    });
  }

  selectTab(tabId: number) {
    // this.memberTabs.tabs[tabId].active = true;
    this.myMemberTabs.tabs[tabId].active = true;
  }

  // members/4
  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params.id).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
