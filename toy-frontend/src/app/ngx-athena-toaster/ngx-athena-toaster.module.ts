import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthenaToasterService } from './service/athena-toaster.service';
import { AthenaToasterComponent } from './component/athena-toaster/athena-toaster.component';
import { InteranlService } from './service/interanl.service';
import { ToasterDirective } from './directive/toaster.directive';



@NgModule({
  declarations: [AthenaToasterComponent, ToasterDirective],
  imports: [
    CommonModule,
  ],
  exports: [AthenaToasterComponent]
})
export class NgxAthenaToasterModule {

  public static forRoot(): ModuleWithProviders<NgxAthenaToasterModule> {
    return {
      ngModule: NgxAthenaToasterModule,
      providers: [
        AthenaToasterService, InteranlService
      ]
    };
  }
}
