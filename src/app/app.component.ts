import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'my-app';

  constructor(private elementRef: ElementRef, public service: LoginService){

  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(233, 229, 229)';
 }



}

