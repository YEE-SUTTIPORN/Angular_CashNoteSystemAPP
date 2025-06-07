import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  iconColor: string;
}

type NewCategoryData = {
  name: string;
  type: 'income' | 'expense';
  icon: string;
};

@Component({
  selector: 'app-category-list',
  imports: [NgFor, NgClass, NgIf, FormsModule, NgClass],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent {
  categories: Category[] = [
    { id: 1, name: 'เงินเดือน', type: 'income', icon: '💼', iconColor: 'text-green-500' },
    { id: 2, name: 'อาหาร', type: 'expense', icon: '🍽️', iconColor: 'text-red-500' },
    { id: 3, name: 'เดินทาง', type: 'expense', icon: '🚌', iconColor: 'text-red-500' },
  ];

  showModal = false;

  newCategory: NewCategoryData = {
    name: '',
    type: 'expense',
    icon: ''
  };

  openAddModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  addCategory() {
    if (this.newCategory.name.trim()) {
      const category: Category = {
        ...this.newCategory,
        id: Date.now(),
        iconColor: this.newCategory.type === 'income' ? 'text-green-500' : 'text-red-500'
      };
      this.categories.push(category);
      this.closeModal();
    }
  }

  resetForm() {
    this.newCategory = {
      name: '',
      type: 'expense',
      icon: ''
    };
  }

  editCategory(category: Category) {
    // TODO: Implement edit logic
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
  }
}