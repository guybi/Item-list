import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainBoardComponent } from './main-board/main-board.component';
import { ElementBoxComponent } from './main-board/element-box/element-box.component';
import { ElementBoxService } from 'src/app/element-box.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditElementComponent } from 'src/app/main-board/edit-element/edit-element.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBoardComponent,
    ElementBoxComponent,
    EditElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ElementBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
