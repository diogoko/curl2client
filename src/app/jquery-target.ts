import { Target } from './target';
import { CurlCommand } from './curl-command';

export class JQueryTarget extends Target {

  constructor() {
    super(
      'jQuery ajax',
      'https://api.jquery.com/jQuery.Ajax/'
    );
  }

  generate(args: CurlCommand): string {
    const indentationSize = 2;
    var fields = [];

    fields.push(`url: '${args.url}'`);
    fields.push(`method: '${args.method}'`);

    if (args.headers.length > 0) {
      var headersFields = args.headers.map(h => `'${h.name}': '${h.value}'`);
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

}
