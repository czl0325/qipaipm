import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MilestoneDetailPage } from './milestone-detail';

@NgModule({
  declarations: [
    MilestoneDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MilestoneDetailPage),
  ],
})
export class MilestoneDetailPageModule {}
