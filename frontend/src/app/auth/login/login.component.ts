import { Component, OnInit } from '@angular/core';
import { LoaderServiceService } from 'src/app/appServices/loader/loader-service.service';
import { ToasterServiceService } from 'src/app/appServices/toaster/toaster-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toaster: ToasterServiceService, private loader : LoaderServiceService) {
    this.toaster.showSuccess('Login successfully');
    this.loader.loaderToggle(true);
   }

  ngOnInit(): void {
    this.loader.loaderToggle(false);
  }

}
