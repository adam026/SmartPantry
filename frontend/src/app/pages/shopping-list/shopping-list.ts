import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  bought: boolean;
}

const STORAGE_KEY = 'shopping-list';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.scss'
})
export class ShoppingList implements OnInit {
  items: ShoppingItem[] = [];

  ngOnInit(): void {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  saveItems(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  newItem: ShoppingItem = {
    name: '',
    quantity: 1,
    unit: '',
    bought: false
  };

  addItem(): void {
    if (!this.newItem.name.trim()) {
      return;
    }

    this.items = [
      ...this.items,
      { ...this.newItem }
    ];

    this.saveItems();

    this.newItem = {
      name: '',
      quantity: 1,
      unit: '',
      bought: false
    };
  }

  toggleBought(item: ShoppingItem): void {
    item.bought = !item.bought;
    this.saveItems();
  }

  deleteItem(item: ShoppingItem): void {
    this.items = this.items.filter(i => i !== item);
    this.saveItems();
  }
}
