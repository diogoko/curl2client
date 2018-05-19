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
    return 'bla';
  }

}
