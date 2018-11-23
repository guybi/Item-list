import { element } from 'protractor';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Item } from 'src/app/shared/item';

@Component({
  selector: 'app-element-box',
  templateUrl: './element-box.component.html',
  styleUrls: ['./element-box.component.css']
})
export class ElementBoxComponent implements OnInit {

  @Input() element: Item;
  
  constructor() { }

  ngOnInit() {
  }

}
