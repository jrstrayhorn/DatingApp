import { map, switchMap } from 'rxjs/operators';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  // user: User;
  user$: Observable<User>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
