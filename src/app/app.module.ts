import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CommandParserService } from './command-parser.service';
import { ClientGeneratorPipe } from './client-generator.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ClientGeneratorPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CommandParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
