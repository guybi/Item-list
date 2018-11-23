import { Item } from './shared/item';
import { EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

export class ElementBoxService {
  elementsChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();
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
    this.elementsChanged.next(this.elements.slice());
  }

  getItem(index: number) {
    return this.elements[index];
  }

  removeItem(index: number) {
    this.elements.splice(index, 1);
    this.elementsChanged.next(this.elements.slice());
  }

  update(element: Item, index: number) {
    this.elements[index] = element;
    this.elementsChanged.next(this.elements.slice());
  }
}
