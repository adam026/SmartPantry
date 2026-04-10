import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient, IngredientService } from '../../services/ingredient';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './storage.html',
  styleUrl: './storage.scss'
})
export class Storage implements OnInit {
  private ingredientService = inject(IngredientService);

  ingredients: Ingredient[] = [];

  showModal = false;
  errorMessage = '';

  newIngredient: Ingredient = this.createEmptyIngredient();

  ngOnInit(): void {
    this.loadIngredients();
  }

  createEmptyIngredient(): Ingredient {
    return {
      name: '',
      quantity: 1,
      unit: '',
      location: 'fridge',
      addedAt: '',
      expiresAt: new Date().toISOString().split('T')[0]
    };
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      this.ingredients = data.filter(i => i.name && i.name.trim().length > 0);

      localStorage.setItem('ingredients', JSON.stringify(this.ingredients));
    });
  }

  openModal(): void {
    this.errorMessage = '';
    this.newIngredient = this.createEmptyIngredient();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  isSaving = false;

  saveIngredient(): void {
    if (this.isSaving) {
      return;
    }

    if (!this.newIngredient.name.trim()) {
      this.errorMessage = 'A név megadása kötelező.';
      return;
    }

    if (this.newIngredient.quantity <= 0) {
      this.errorMessage = 'A mennyiség legyen nagyobb mint 0.';
      return;
    }

    if (!this.newIngredient.unit.trim()) {
      this.errorMessage = 'Az egység megadása kötelező.';
      return;
    }

    this.isSaving = true;

    const ingredientToSend: Ingredient = {
      ...this.newIngredient,
      addedAt: new Date().toISOString(),
      expiresAt: new Date(this.newIngredient.expiresAt).toISOString()
      };

    this.ingredientService.addIngredient(ingredientToSend).subscribe({
      next: created => {
        this.ingredients = [...this.ingredients, created];
        this.closeModal();
        this.isSaving = false;
        localStorage.setItem('ingredients', JSON.stringify(this.ingredients));
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  get fridgeIngredients(): Ingredient[] {
    return this.ingredients.filter(i => i.location === 'fridge');
  }

  get pantryIngredients(): Ingredient[] {
    return this.ingredients.filter(i => i.location === 'pantry');
  }

  addToShoppingList(ingredient: Ingredient): void {
    const saved = localStorage.getItem('shopping-list');

    const items = saved ? JSON.parse(saved) : [];

    items.push({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      bought: false
    });

    localStorage.setItem('shopping-list', JSON.stringify(items));
  }
}