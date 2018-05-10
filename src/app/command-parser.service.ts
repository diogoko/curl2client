import { Injectable } from '@angular/core';
import { CurlCommand } from './curl-command';
import stringArgv = require('string-argv');
import parseArgs = require('minimist');

@Injectable()
export class CommandParserService {

  constructor() { }

  parse(text: string): CurlCommand {
    var argv = stringArgv(text);

    // TODO: discard 'curl'

    var args = parseArgs(argv);

    var command = new CurlCommand();

    // TODO: --request
    command.method = args.X || 'GET';
    // TODO: consider just -X that is a string

    command.url = args._[0];
    // TODO: consider just url that is a string

    // TODO: --header
    if (args.H) {
      // TODO: only consider args.H that is a string when not array
      command.headers = Array.isArray(args.H) ? args.H : [args.H];
    } else {
      command.headers = [];
    }

    // TODO: -F, --form name=content (join all -F with &)

    // TODO: --data
    // TODO: @filename
    if (args.d) {
      // TODO: only consider first -d
      command.data = args.d;
    }

    return command;
  }

}
