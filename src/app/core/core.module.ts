import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';
import { BlocksComponent } from './blocks/blocks.component';
import { TableComponent } from './table/table.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    CoreComponent,
    BlocksComponent,
    TableComponent,
    AuthComponent,
    SearchComponent,
    DetailComponent,
    SpinnerComponent
  ],
  imports: [CommonModule, CoreRoutingModule, FormsModule]
})
export class CoreModule {}
