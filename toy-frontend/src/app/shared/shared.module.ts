import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from './service/common.service';
import { SharedService } from './service/shared.service';
import { HttpClientService } from './service/http-client.service';
import { CookieService } from './service/cookie.service';
import { TokenInterceptorService } from './service/token-interceptor.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,                     ReactiveFormsModule,                        FormsModule,
    HttpClientModule,

    MatInputModule,                   MatButtonModule,                            MatSelectModule,
    MatToolbarModule,                 MatIconModule,                              MatMenuModule,
    MatTabsModule,                    MatRadioModule,                             MatTableModule,
    MatPaginatorModule,               MatCardModule,                              MatRippleModule,
    MatChipsModule
  ],
  declarations: [

  ],
  exports: [
    CommonModule,                     ReactiveFormsModule,                        FormsModule,
    HttpClientModule,

    MatInputModule,                   MatButtonModule,                            MatSelectModule,
    MatToolbarModule,                 MatIconModule,                              MatMenuModule,
    MatTabsModule,                    MatRadioModule,                             MatTableModule,
    MatPaginatorModule,               MatCardModule,                              MatRippleModule,
    MatChipsModule
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        CommonService, SharedService, HttpClientService, CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
      ]
    };
  }
}
