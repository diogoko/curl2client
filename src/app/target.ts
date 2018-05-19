import { CurlCommand } from './curl-command';

export abstract class Target {

  constructor(
    public label: string,
    public docUrl: string
  ) { }

  abstract generate(args: CurlCommand): string;

  protected indent(text: string, spaces: number): string {
    var lines = text.split(/\r?\n/);
    var indentation = ' '.repeat(spaces);
    return lines.map(l => indentation + l).join('\n');
  }

}
