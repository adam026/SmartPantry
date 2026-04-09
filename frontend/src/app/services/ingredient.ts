import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingredient {
  id?: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  addedAt: string;
  expiresAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/ingredients';

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, ingredient);
  }
}
