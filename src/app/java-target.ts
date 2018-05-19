import { Target } from './target';
import { CurlCommand } from './curl-command';

export class JavaTarget extends Target {

  constructor() {
    super(
      'Java HttpURLConnection',
      'https://docs.oracle.com/javase/9/docs/api/java/net/HttpURLConnection.html'
    );
  }

  generate(args: CurlCommand): string {
    var headersText = '';
    if (args.headers.length > 0) {
      var headersStatements = args.headers.map(h => `con.setRequestProperty("${h.name}", "${h.value}");`);
      headersText = '\n' + headersStatements.join('\n');
    }

    var dataText = '';
    if (args.data) {
      dataText = `
con.setDoOutput(true);
con.getOutputStream().write("${args.data}".getBytes("UTF-8"));`
    }

    return `HttpURLConnection con = (HttpURLConnection) new URL("${args.url}").openConnection();
con.setRequestMethod("${args.method}");${headersText}${dataText}

int responseCode = con.getResponseCode();

// Read response body as string
ByteArrayOutputStream result = new ByteArrayOutputStream();
byte[] buffer = new byte[8192];
int length;
while ((length = con.getInputStream().read(buffer)) != -1) {
    result.write(buffer, 0, length);
}
string responseBody = result.toString("UTF-8");`;
  }

}
