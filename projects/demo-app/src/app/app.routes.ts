import { Routes } from '@angular/router';
import { IndexPage } from '../components/index.component';
import { FormPage } from '../components/form.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexPage
    },
    {
        path: 'edit',
        component: FormPage
    },
    {
        path: 'form',
        component: FormPage
    }
];
