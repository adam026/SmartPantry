import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss'
})
export class Recipes {
  recipes: Recipe[] = [
    {
      name: 'Rántotta',
      description: 'Egyszerű rántotta reggelire.',
      ingredients: ['Tojás', 'Tej']
    },
    {
      name: 'Tésztasaláta',
      description: 'Gyors ebéd tésztából.',
      ingredients: ['Tészta', 'Paradicsom', 'Sajt']
    },
    {
      name: 'Palacsinta',
      description: 'Klasszikus palacsinta.',
      ingredients: ['Tojás', 'Tej', 'Liszt']
    }
  ];

  pantryIngredients: string[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('ingredients');

    if (stored) {
      const parsed = JSON.parse(stored);
      this.pantryIngredients = parsed.map((x: any) => x.name.toLowerCase());
    }
  }

  hasAllIngredients(recipe: Recipe): boolean {
    return recipe.ingredients.every(i =>
      this.pantryIngredients.includes(i.toLowerCase())
    );
  }
}
