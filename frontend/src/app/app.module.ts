import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';   //Toaster Module
import { ToastrModule } from 'ngx-toastr';                                        // Toaster Module
import { NgxUiLoaderModule } from "ngx-ui-loader";                                //Loader Module
import { FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    //ToastrModule.forRoot(), // Normal ToastrModule added
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      }),                      // Customized ToastrModule added
    NgxUiLoaderModule,         //LoaderModule Added
    AppRoutingModule,
    CustomerModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
