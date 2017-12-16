import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LineComponent } from './line/line.component';
import { BarComponent } from './bar/bar.component';
import { MultilineComponent } from './multiline/multiline.component';

export const routes: Routes = [
    { path: 'line', component: LineComponent},
    { path: 'bar', component: BarComponent},
    { path: 'multiline', component: MultilineComponent},

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
