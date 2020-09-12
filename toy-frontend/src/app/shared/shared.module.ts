import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from './service/common.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,                     ReactiveFormsModule,                        FormsModule,

    MatInputModule,                   MatButtonModule,                            MatSelectModule,
  ],
  declarations: [

  ],
  exports: [
    CommonModule,                     ReactiveFormsModule,                        FormsModule,

    MatInputModule,                   MatButtonModule,                             MatSelectModule,
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        CommonService
      ]
    };
  }
}
