import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './graph.routing';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { MultilineComponent } from './multiline/multiline.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [BarComponent, LineComponent, MultilineComponent]
})
export class GraphModule { }
