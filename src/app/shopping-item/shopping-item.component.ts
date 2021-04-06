import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';
import {NgForm} from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {
  shoppingItemList: Item[] = [];
  selectedItem: Item = new Item;
  toggleForm: boolean = false;

  constructor(private dataservice: DataService) { }

  getItems() {
    this.dataservice.getShoppingItems()
    .subscribe( items => {
      this.shoppingItemList = items;
      console.log('data from dataservice: '+this.shoppingItemList[0].itemName);
    })
  }

  addItem(form: NgForm) {
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false,
    };
    this.dataservice.addShoppingItem(newItem)
    .subscribe(item => {
      console.log(item);
      this.getItems();
      form.reset();
    })
  }

  showEditForm(item: any) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  editItem(form: NgForm){
    let newItem: Item = {
      _id: this.selectedItem._id,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: form.value.itemBought
    }
    this.dataservice.updateShoppingItem(newItem)
    .subscribe( res => {
      console.log('original item updated with old values:'+res);
      this.getItems()
    });
    this.toggleForm = !this.toggleForm;
  }

  updateItemChecked(item: Item){
    item.itemBought = !item.itemBought;
    this.dataservice.updateShoppingItem(item)
    .subscribe( res => {
      console.log('original chechbox values:'+res.itemBought);
      this.getItems()
    });
  }

  deleteItem(id:any){
    this.dataservice.deleteShoppingItem(id)
    .subscribe((data:any) => {
      console.log(data);
      if(data.deletedCount == 1){
        for (var i = 0; i < this.shoppingItemList.length-1; i++) {
          if(this.shoppingItemList[i]._id){
            this.shoppingItemList.splice(i, 1);
          }
        }
      }
      this.getItems()
    });
  }

  ngOnInit(): void {
    this.getItems();
  }

}
