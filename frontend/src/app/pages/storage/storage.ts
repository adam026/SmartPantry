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

  showUsedModal = false;
  selectedIngredient: Ingredient | null = null;

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
    const cached = localStorage.getItem('ingredients');

    if (cached) {
      this.ingredients = JSON.parse(cached);
    }

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

    this.errorMessage = '';

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
        this.closeModal();
        
        this.ingredients = [...this.ingredients, created];
        localStorage.setItem('ingredients', JSON.stringify(this.ingredients));

        this.newIngredient = this.createEmptyIngredient();
        this.isSaving = false;
      },
      error: () => {
        this.errorMessage = 'Nem sikerült menteni.';
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

  markAsUsed(ingredient: Ingredient): void {
    this.selectedIngredient = ingredient;
    this.showUsedModal = true;
  }

  confirmUsed(addToShoppingList: boolean): void {
    if (!this.selectedIngredient) {
      return;
    }

    const ingredient = this.selectedIngredient;

    this.ingredientService.deleteIngredient(ingredient.id!).subscribe({
      next: () => {
        this.ingredients = this.ingredients.filter(i => i.id !== ingredient.id);
        localStorage.setItem('ingredients', JSON.stringify(this.ingredients));

        if (addToShoppingList) {
          this.addToShoppingList(ingredient);
        }

        this.selectedIngredient = null;
        this.showUsedModal = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Nem sikerült törölni az alapanyagot.';
      }
    });
  }

  closeUsedModal(): void {
    this.selectedIngredient = null;
    this.showUsedModal = false;
  }
}