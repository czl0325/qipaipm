import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectCreatePage } from './project-create';

@NgModule({
  declarations: [
    ProjectCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectCreatePage),
  ],
})
export class ProjectCreatePageModule {}
