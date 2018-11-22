import { Item } from './shared/item';
import { EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

export class ElementBoxService {
  elementsChanged = new EventEmitter<Item[]>();

  private elements: Item[] = [  new Item('item1', 'item2'),
                                new Item('item2', 'item3'),
                                new Item('item3', 'item4'),
                                new Item('item3', 'item4'),
                                new Item('item3', 'item4')
                              ];

  constructor() { }

  getItems() {
    return this.elements.slice();
  }

  addNewItem(item: Item) {
    this.elements.push(item);
    this.elementsChanged.emit(this.elements.slice());
  }

  getItem(index: number) {
    return this.elements[index];
  }

  saveItem(item: Item) {
    console.log(this.elements.indexOf(item));
  }

  removeItem(item: Item) {
    const index = this.elements.indexOf(item, 0);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  }
}
