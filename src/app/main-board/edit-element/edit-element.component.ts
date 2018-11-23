import { Item } from './../../shared/item';
import { Subscription } from 'rxjs/subscription';
import { ElementBoxService } from 'src/app/element-box.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent implements OnInit {
  
  @ViewChild('f') slForm: NgForm;
  
  editMode = false;
  subscriptionStartedEditing: Subscription;
  editedItemIndex: number;
  editItem: Item;
  constructor(private elementBoxService: ElementBoxService) { }

  ngOnInit() {
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
