import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';

interface Transaction {
  date: string;
  type: 'รายรับ' | 'รายจ่าย';
  amount: number;
  category: string;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  balance = 12500;
  income = 18000;
  expense = 5500;

  recentTransactions = [
    { date: '2025-05-25', type: 'รายรับ', amount: 1000, category: 'เงินเดือน' },
    { date: '2025-05-24', type: 'รายจ่าย', amount: 200, category: 'กาแฟ' },
    { date: '2025-05-23', type: 'รายจ่าย', amount: 300, category: 'ขนม' },
  ];

  constructor() { }

  ngOnInit(): void { }
}
