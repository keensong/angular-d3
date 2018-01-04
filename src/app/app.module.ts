import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './routing';
import { AppComponent } from './app.component';

import { SpeechService } from './speech.service';
import { HomeComponent } from './home/home.component';
import { ListenComponent } from './listen/listen.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ListenComponent
    ],
    imports: [
        BrowserModule,
        routing
    ],
    providers: [SpeechService],
    bootstrap: [AppComponent]
})
export class AppModule { }
