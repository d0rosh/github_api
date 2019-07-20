import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { BlocksComponent } from './blocks/blocks.component';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './auth/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        redirectTo: '/blocks',
        pathMatch: 'full'
      },
      {
        path: 'blocks',
        canActivate: [AuthGuard],
        component: BlocksComponent
      },
      {
        path: 'table',
        canActivate: [AuthGuard],
        component: TableComponent
      },
      {
        path: 'detail/:login',
        canActivate: [AuthGuard],
        component: DetailComponent
      },
      {
        path: 'auth',
        component: AuthComponent,
        canActivate: [AuthGuard],
        data: { isAuth: true }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
