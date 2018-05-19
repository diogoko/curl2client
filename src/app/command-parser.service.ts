import { Injectable } from '@angular/core';
import { CurlCommand } from './curl-command';
import * as stringArgv from 'string-argv';
import * as parseArgs from 'minimist';

@Injectable()
export class CommandParserService {

  constructor() { }

  parse(text: string): CurlCommand {
    var argv: string[] = stringArgv(text);

    if (argv[0] == 'curl') {
      argv.shift();
    }

    var args = parseArgs(argv);

    var command = new CurlCommand();

    var methods = this.forceArray([args.X, args.request]);
    command.method = methods[0] || 'GET';

    command.url = args._[0];

    command.headers = this.forceArray([args.H, args.header]);

    // TODO: -F, --form name=content (join all -F with &)

    var data = this.forceArray([args.d, args.data]);
    command.data = data[0];

    return command;
  }

  private forceArray(value: any): string[] {
    if (!this.isValidArrayItem(value)) {
      return [];
    }

    if (!Array.isArray(value)) {
      return [String(value)];
    }

    return value.reduce((a1, a2) => a1.concat(a2), [])
      .filter(this.isValidArrayItem);
  }

  private isValidArrayItem(value: any): boolean {
    return !(value == null || typeof value == 'boolean');
  }
}
