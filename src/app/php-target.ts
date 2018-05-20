import { Target } from './target';
import { CurlCommand } from './curl-command';

export class PHPTarget extends Target {

  constructor() {
    super(
      'PHP file_get_contents',
      'http://php.net/manual/en/function.file-get-contents.php'
    );
  }

  generate(args: CurlCommand): string {
    const indentationSize = 2;

    var contextFields = [];
    contextFields.push(`'method' => '${args.method}'`);
    contextFields.push(`'ignore_errors' => true`);

    if (args.headers.length > 0) {
      var headersItems = args.headers.map(h => `'${h.name}: ${h.value}'`);
      var headersText = this.indent(headersItems.join(',\n'), indentationSize);

      contextFields.push(`'header' => [
${headersText}
]`);
    }

    if (args.data) {
      contextFields.push(`'content' => '${args.data}`);
    }

    var contextFieldsText = this.indent(contextFields.join(',\n'), indentationSize * 2);
    return `$context = stream_context_create([
  'http' => [
${contextFieldsText}
  ]
]);

$responseBody = file_get_contents('${args.url}', false, $context);

// Parse response code
preg_match('#HTTP/[0-9\\.]+\\s+([0-9]+)#', $http_response_header[0], $matches);
$responseCode = $matches[1];
`;
  }

}
