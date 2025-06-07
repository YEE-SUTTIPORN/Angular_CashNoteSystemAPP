import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // แก้ไขชื่อเป็น FormsModule

@Component({
  selector: 'app-add-transaction',
  imports: [FormsModule, CommonModule, ReactiveFormsModule], // ใช้ FormsModule สำหรับการจัดการฟอร์ม
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {
  transaction = {
    type: 'รายรับ',
    amount: 0,
    category: '',
    note: '',
    date: new Date().toISOString().slice(0, 10) // yyyy-mm-dd
  };

  categories = ['เงินเดือน', 'อาหาร', 'เดินทาง', 'บันเทิง', 'สุขภาพ'];

  submitForm() {
    console.log('บันทึกรายการ:', this.transaction);
    // ที่นี่จะเรียก service หรือ store เพื่อบันทึกข้อมูล
  }
}
