import { Routes } from '@angular/router';
import { IndexPage } from '../components/index.component';
import { FormPage } from '../components/form.component';
import { ErrorPage } from '../components/error.component';
import { DashboardPage } from '../components/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardPage
    },
    {
        path: 'items',
        component: IndexPage
    },
    {
        path: 'edit',
        component: FormPage
    },
    {
        path: 'form',
        component: FormPage
    },
    {
        path:'**',
        component: ErrorPage
    }
];
