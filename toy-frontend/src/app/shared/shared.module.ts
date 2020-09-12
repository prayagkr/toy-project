import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from './service/common.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ],
  exports: [

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
