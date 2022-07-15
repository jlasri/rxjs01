import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicsComponent } from './basics/basics.component';
import { OperatorsComponent } from './operators/operators.component';

const routes: Routes = [
  {path: 'operators', component:OperatorsComponent},
  {path: 'basics', component:BasicsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
