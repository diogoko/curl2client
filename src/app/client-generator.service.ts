import { Injectable } from '@angular/core';
import { Target } from './target';
import { CurlCommand } from './curl-command';
import { AngularJSTarget } from './angularjs-target';
import { JavaTarget } from './java-target';
import { JQueryTarget } from './jquery-target';
import { PHPTarget } from './php-target';

@Injectable()
export class ClientGeneratorService {

  // TODO: handle escaping

  private targets: Target[];

  constructor() {
    this.targets = [
      new AngularJSTarget(),
      new JavaTarget(),
      new JQueryTarget(),
      new PHPTarget(),
    ];
  }

  getTargets(): Target[] {
    return this.targets;
  }

}
