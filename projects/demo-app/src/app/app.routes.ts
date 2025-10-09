import { Routes } from '@angular/router';
import { IndexPage } from '../components/index.component';
import { FormPage } from '../components/form.component';
import { ErrorPage } from '../components/error.component';
import { DashboardPage } from '../components/dashboard.component';
import { DeepNestedPage } from '../components/deep-nested.component';
import { DeepNested2Page } from '../components/deep-nested2.component';

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
        path: 'deeply/nested',
        component: DeepNestedPage
    },
    {
    path: 'deeply/nested/create',
        component: DeepNested2Page
    },
    {
        path: 'deeply/nested/edit/:id',
        component: DeepNested2Page
    },
    {
        path: 'deeply/nested/details/:id',
        component: DeepNested2Page
    },
        {
        path: 'deeply/nested/crate',
        component: DeepNested2Page
    },
    {
        path:'**',
        component: ErrorPage
    }
];
