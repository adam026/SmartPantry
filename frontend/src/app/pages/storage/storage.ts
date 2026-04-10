import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ingredient, IngredientService } from '../../services/ingredient';

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

  newIngredient: Ingredient = {
    name: '',
    quantity: 1,
    unit: '',
    location: 'fridge',
    addedAt: '',
    expiresAt: new Date().toISOString().split('T')[0]
  };

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });
  }

  addIngredient(): void {
    const ingredientToSend: Ingredient = {
      ...this.newIngredient,
      addedAt: new Date().toISOString(),
      expiresAt: new Date(this.newIngredient.expiresAt).toISOString()
    };

    this.ingredientService.addIngredient(ingredientToSend).subscribe(() => {
      this.ingredients = [...this.ingredients, ingredientToSend];

      this.newIngredient = {
        name: '',
        quantity: 1,
        unit: '',
        location: 'fridge',
        addedAt: '',
        expiresAt: new Date().toISOString().split('T')[0]
      };

      this.loadIngredients();
    });
  }

  get fridgeIngredients(): Ingredient[] {
    return this.ingredients.filter(i => i.location === 'fridge');
  }

  get pantryIngredients(): Ingredient[] {
    return this.ingredients.filter(i => i.location === 'pantry');
  }
}