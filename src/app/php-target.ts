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
    return 'bla';
  }

}
