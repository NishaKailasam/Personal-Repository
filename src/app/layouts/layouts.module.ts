import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, LayoutComponent, FooterComponent],
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule
  ],
})
export class LayoutsModule {}
