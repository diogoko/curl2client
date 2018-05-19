export class Header {

  constructor(public name: string, public value: string) { }

  static parse(text: string): Header {
    var match = /([^: ]+)\s*:\s*(.+)/.exec(text);
    if (!match) {
      return null;
    }

    return new Header(match[1], match[2]);
  }

}
