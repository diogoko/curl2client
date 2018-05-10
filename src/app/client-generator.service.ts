import { Injectable } from '@angular/core';
import { Target } from './target';
import { CurlCommand } from './curl-command';

@Injectable()
export class ClientGeneratorService {

  // TODO: handle escaping

  constructor() { }

  getTargets(): Target[] {
    return [
      new Target(
        'AngularJS $http',
        this.generateAngularJS.bind(this),
        'https://docs.angularjs.org/api/ng/service/$http#usage'
      ),

      new Target(
        'Java HttpURLConnection',
        this.generateJava.bind(this),
        'https://docs.oracle.com/javase/9/docs/api/java/net/HttpURLConnection.html'
      ),

      new Target(
        'jQuery ajax',
        this.generateJQuery.bind(this),
        'https://api.jquery.com/jQuery.Ajax/'
      ),

      new Target(
        'PHP file_get_contents',
        this.generatePHP.bind(this),
        'http://php.net/manual/en/function.file-get-contents.php'
      ),
    ];
  }

  indent(text: string, spaces: number): string {
    var lines = text.split(/\r?\n/);
    var indentation = ' '.repeat(spaces);
    return lines.map(l => indentation + l).join('\n');
  }

  generateAngularJS(args: CurlCommand): string {
    const indentationSize = 2;
    var fields = [];

    fields.push(`url: '${args.url}'`);
    fields.push(`method: '${args.method}'`);

    if (args.headers.length > 0) {
      var headersFields =
        args.headers.map(h => h.replace(/([^: ]+)\s*:\s*(.+)/, "'$1': '$2'"));
      var headersText = this.indent(headersFields.join(',\n'), indentationSize);

      fields.push(`headers: {
${headersText}
}`);
    }

    if (args.data) {
      fields.push(`data: '${args.data}'`);
    }

    var fieldsText = this.indent(fields.join(',\n'), indentationSize);
    return `$http({
${fieldsText}
}).then(response => /* handle success */, response => /* handle error */);`;
  }

  generateJava(args: CurlCommand): string {
    return `bla`;
  }

  generateJQuery(args: CurlCommand): string {
    const indentationSize = 2;
    var fields = [];

    fields.push(`url: '${args.url}'`);
    fields.push(`method: '${args.method}'`);

    if (args.headers.length > 0) {
      var headersFields =
        args.headers.map(h => h.replace(/([^: ]+)\s*:\s*(.+)/, "'$1': '$2'"));
      var headersText = this.indent(headersFields.join(',\n'), indentationSize);

      fields.push(`headers: {
${headersText}
}`);
    }

    if (args.data) {
      fields.push(`data: '${args.data}'`);
    }

    fields.push('success: (data, textStatus, jqXHR) => /* handle success */');
    fields.push('error: (jqXHR, textStatus, errorThrown) => /* handle success */');

    var fieldsText = this.indent(fields.join(',\n'), indentationSize);
    return `$.ajax({
${fieldsText}
});`;
  }

  generatePHP(args: CurlCommand): string {
    return `bla`;
  }

}
