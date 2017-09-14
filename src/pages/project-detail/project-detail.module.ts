import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailPage } from './project-detail';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ProjectDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailPage),
    ComponentsModule
  ],
})
export class ProjectDetailPageModule {}
