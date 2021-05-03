import { Component, OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  private notifications: Notification[] =[];
  private subscription;
  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
    //this.subscription = this.notificationService.getNotification().subscribe(notification =>{
    //  this.notifications.push(notification);
    //}
  //)
}

ngOnDestroy(): void {
  //this.subscription.unsubscribe();
}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
