import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient, IngredientService } from '../../services/ingredient';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './storage.html',
  styleUrl: './storage.scss'
})
export class Storage implements OnInit {
  
  private ingredientService = inject(IngredientService);

  ingredients: Ingredient[] = [];

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data => {
      console.log(data);
      this.ingredients = data;
    });
  }
}
