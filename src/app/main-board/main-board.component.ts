import { ElementBoxService } from './../element-box.service';
import { Item } from './../shared/item';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ElementBoxComponent } from 'src/app/main-board/element-box/element-box.component';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('disInput') disInput: ElementRef;

  selectedItem: Item;

  constructor(private elementBoxService: ElementBoxService) { }

  ngOnInit() {
  }

  getElements() {
    return this.elementBoxService.getItems();
  }

  onSaveItem() {
    const name = this.nameInput.nativeElement.value;
    const dec = this.disInput.nativeElement.value;
    if (name === '' || dec === '') {
      return;
    }
    console.log(this.selectedItem);
    if (this.selectedItem === undefined) {
      const item = new Item(name, dec);
      this.elementBoxService.addNewItem(item);
    } else {
      this.selectedItem.name = name;
      this.selectedItem.desription = dec;
      this.elementBoxService.saveItem(this.selectedItem);
    }

    this.nameInput.nativeElement.value = '';
    this.disInput.nativeElement.value = '';
    this.selectedItem = undefined;
  }

  onClickNewItem() {
    this.selectedItem = undefined;
    this.nameInput.nativeElement.value = '';
    this.disInput.nativeElement.value = '';
  }

  onSelectedItem(element: Item) {
    this.nameInput.nativeElement.value = element.name;
    this.disInput.nativeElement.value = element.desription;
    this.selectedItem = element;
  }

  onDeleteItem() {
    console.log(this.selectedItem);
    if (this.selectedItem === undefined) {
      return;
    }
    this.elementBoxService.removeItem(this.selectedItem);
    this.selectedItem = undefined;
    this.onClickNewItem();
  }
}
