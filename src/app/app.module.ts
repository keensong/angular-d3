import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './routing';
import { AppComponent } from './app.component';

import { SpeechService } from './speech.service';
import { HomeComponent } from './home/home.component';
import { ListenComponent } from './listen/listen.component';
import { FlowComponent } from './flow/flow.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ListenComponent,
        FlowComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [SpeechService],
    bootstrap: [AppComponent]
})
export class AppModule { }
