import { element } from 'protractor';
import { ElementBoxService } from './../element-box.service';
import { Item } from './../shared/item';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ElementBoxComponent } from 'src/app/main-board/element-box/element-box.component';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {

  subscriptionElementChange: Subscription;
  elements: Item[];
  constructor(private elementBoxService: ElementBoxService) { }

  ngOnInit() {
    this.elements = this.elementBoxService.getItems();
    this.subscriptionElementChange = this.elementBoxService.elementsChanged
      .subscribe(
          (elements: Item[]) => {
            this.elements = elements;
          }
      );
  }

  onSelectItem(index: number) {
    this.elementBoxService.startedEditing.next(index);
  }

}
