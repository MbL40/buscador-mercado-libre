import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolsModule } from './modules/tools/tools.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,AppRoutingModule,ToolsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
