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

  @ViewChild('f') slForm: NgForm;

  editMode = false;
  subscriptionElementChange: Subscription;
  subscriptionStartedEditing: Subscription;
  elements: Item[];
  editedItemIndex: number;
  editItem: Item;
  constructor(private elementBoxService: ElementBoxService) { }

  ngOnInit() {
    this.elements = this.elementBoxService.getItems();
    this.subscriptionElementChange = this.elementBoxService.elementsChanged
      .subscribe(
          (elements: Item[]) => {
            this.elements = elements;
          }
      );

    this.subscriptionStartedEditing = this.elementBoxService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editItem = this.elementBoxService.getItem(index);
          this.slForm.setValue({
            'name': this.editItem.name,
            'desription': this.editItem.desription
          })
        }
      );

  }

  onSelectItem(index: number) {
    this.elementBoxService.startedEditing.next(index);
  }

  onClickDelete() {
    this.elementBoxService.removeItem(this.editedItemIndex)
    this.slForm.reset();
    this.editMode = false;
  }

  onClickCancel() {
    this.editMode = false;
    this.slForm.reset();
  }

  onSubmit(form : NgForm) {
    const newElement = form.value;
    if (this.editMode) {
      this.elementBoxService.update(newElement, this.editedItemIndex);
    } else {
      this.elementBoxService.addNewItem(newElement);
    }
    this.editMode = false;
    this.slForm.reset();
  }

}
