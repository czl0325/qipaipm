import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubtaskPage } from './subtask';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SubtaskPage,
  ],
  imports: [
    IonicPageModule.forChild(SubtaskPage),
    PipesModule
  ],
})
export class SubtaskPageModule {}
