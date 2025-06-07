import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  user = {
    username: 'ผู้ใช้งาน',
    email: 'user@example.com'
  };

  newPassword = '';
  darkMode = false;

  saveUserInfo() {
    console.log('บันทึกข้อมูลผู้ใช้:', this.user);
  }

  changePassword() {
    console.log('เปลี่ยนรหัสผ่านเป็น:', this.newPassword);
    this.newPassword = '';
  }

  toggleTheme() {
    document.documentElement.classList.toggle('dark', this.darkMode);
    console.log('เปลี่ยนธีม:', this.darkMode ? 'โหมดมืด' : 'โหมดสว่าง');
  }

  resetAll() {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลทั้งหมด?')) {
      console.log('ล้างข้อมูลทั้งหมดแล้ว');
      // ลบข้อมูลจาก localStorage หรือ backend
    }
  }

}
