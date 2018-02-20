import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { ListenComponent } from './listen/listen.component';
import { FlowComponent } from './flow/flow.component';


export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'listen', component: ListenComponent },
    { path: 'flow', component: FlowComponent },
    { path: 'graph', loadChildren: 'app/graph/graph.module#GraphModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
