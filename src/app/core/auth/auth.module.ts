import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';

import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule]
})
export class AuthModule {}
