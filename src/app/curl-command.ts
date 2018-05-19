import { Header } from "./header";

export class CurlCommand {
  url: string;
  method: string;
  headers: Header[];
  data: string;
}
