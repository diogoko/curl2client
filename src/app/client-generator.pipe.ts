import { Pipe, PipeTransform, Component } from '@angular/core';
import { Target } from './target';
import { CommandParserService } from './command-parser.service';

@Pipe({
  name: 'clientGenerator'
})
export class ClientGeneratorPipe implements PipeTransform {

  constructor(private commandParserService: CommandParserService) { }

  transform(command: string, target: Target): any {
    if (!command || !command.trim()) {
      return '';
    }

    var args = this.commandParserService.parse(command);
    return target.generate(args);
  }

}
