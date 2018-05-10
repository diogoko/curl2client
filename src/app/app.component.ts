import { Component, OnInit } from '@angular/core';
import { ClientGeneratorService } from './client-generator.service';
import { Target } from './target';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ClientGeneratorService]
})
export class AppComponent implements OnInit {
  targets: Target[];
  selectedTarget: Target;
  command: string;

  constructor(private clientGeneratorService: ClientGeneratorService) { }

  ngOnInit(): void {
    this.targets = this.clientGeneratorService.getTargets();
    this.selectedTarget = this.targets[0];
  }
}
