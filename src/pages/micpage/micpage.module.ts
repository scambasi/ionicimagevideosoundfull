import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MicpagePage } from './micpage';

@NgModule({
  declarations: [
    MicpagePage,
  ],
  imports: [
    IonicPageModule.forChild(MicpagePage),
  ],
})
export class MicpagePageModule {}
