import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AddTransactionComponent } from './pages/add-transaction/add-transaction.component';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: 'add',
        component: AddTransactionComponent, canActivate: [AuthGuard]
    },
    {
        path: 'transactions',
        component: TransactionListComponent, canActivate: [AuthGuard]
    },
    {
        path: 'categories',
        component: CategoryListComponent, canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: SettingsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/dashboard', pathMatch: 'full'
    }
];
