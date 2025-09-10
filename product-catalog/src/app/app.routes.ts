import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list';
import { ProductFormComponent } from './pages/product-form/product-form';

export const routes: Routes = [
    // { path: '', component: ProductListComponent },
    // { path: 'create', component: ProductFormComponent },
    // { path: 'edit/:id', component: ProductFormComponent },
    // { path: '**', redirectTo: '' }
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'products/new', component: ProductFormComponent },   // create
    { path: 'products/edit/:id', component: ProductFormComponent }, // edit
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }