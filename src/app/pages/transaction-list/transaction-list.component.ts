import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  searchTerm = '';
  sortNewestFirst = true;

  transactions = [
    { id: 1, date: '2025-05-25', type: 'รายรับ', amount: 9500, category: 'เงินเดือน' },
    { id: 2, date: '2025-05-24', type: 'รายจ่าย', amount: 150, category: 'กาแฟ' },
    { id: 3, date: '2025-05-23', type: 'รายจ่าย', amount: 300, category: 'ค่าเดินทาง' }
  ];

  get filteredTransactions() {
    const keyword = this.searchTerm.trim().toLowerCase();
    let filtered = this.transactions.filter(tx =>
      tx.category.toLowerCase().includes(keyword) || tx.type.includes(keyword)
    );

    return filtered.sort((a, b) => {
      return this.sortNewestFirst
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  get totalIncome() {
    return this.transactions
      .filter(tx => tx.type === 'รายรับ')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  get totalExpense() {
    return this.transactions
      .filter(tx => tx.type === 'รายจ่าย')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  get balance() {
    return this.totalIncome - this.totalExpense;
  }

  toggleSortOrder() {
    this.sortNewestFirst = !this.sortNewestFirst;
  }

  deleteTransaction(id: number) {
    this.transactions = this.transactions.filter(tx => tx.id !== id);
  }
}
