import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { RouterModule } from '@angular/router';
import { ToolRoutingModule } from './tools-routing.module';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [CommonModule, RouterModule, ToolRoutingModule],
  exports: [SearchBoxComponent]
})
export class ToolsModule { }
