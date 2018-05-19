import { Target } from './target';
import { CurlCommand } from './curl-command';

export class AngularJSTarget extends Target {

  constructor() {
    super(
      'AngularJS $http',
      'https://docs.angularjs.org/api/ng/service/$http#usage'
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

    var fieldsText = this.indent(fields.join(',\n'), indentationSize);
    return `$http({
${fieldsText}
}).then(response => /* handle success */, response => /* handle error */);`;
  }

}
