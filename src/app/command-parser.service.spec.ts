import { TestBed, inject } from '@angular/core/testing';

import { CommandParserService } from './command-parser.service';
import { Header } from './header';

describe('CommandParserService', () => {
  let service: CommandParserService;

  beforeEach(() => {
    service = new CommandParserService();
  });

  it('URL', () => {
    var c = service.parse('http://www.google.com/');
    expect(c.method).toBe('GET');
    expect(c.url).toBe('http://www.google.com/');
    expect(c.headers.length).toBe(0);
    expect(c.data).toBeUndefined();
  });

  it('URL + method', () => {
    var c = service.parse('http://www.google.com/ -X POST');
    expect(c.method).toBe('POST');
    expect(c.url).toBe('http://www.google.com/');
    expect(c.headers.length).toBe(0);
    expect(c.data).toBeUndefined();
  });

  it('URL + header', () => {
    var c = service.parse('-H "X-Test: 123" http://www.google.com/');
    expect(c.method).toBe('GET');
    expect(c.url).toBe('http://www.google.com/');
    expect(c.headers).toEqual([new Header('X-Test', '123')]);
    expect(c.data).toBeUndefined();
  });

  it('URL + method + data', () => {
    var c = service.parse('-X POST http://www.google.com/ -d "q=test"');
    expect(c.method).toBe('POST');
    expect(c.url).toBe('http://www.google.com/');
    expect(c.headers.length).toBe(0);
    expect(c.data).toBe("q=test");
  });

  it('discards curl', () => {
    var c = service.parse('curl http://www.google.com/');
    expect(c.method).toBe('GET');
    expect(c.url).toBe('http://www.google.com/');
    expect(c.headers.length).toBe(0);
    expect(c.data).toBeUndefined();
  });

  it('handles --request', () => {
    var c = service.parse('--request POST');
    expect(c.method).toBe('POST');
  });

  it('handles --header', () => {
    var c = service.parse('--header "X-Test: 123"');
    expect(c.headers).toEqual([new Header('X-Test', '123')]);
  });

  it('multiple headers', () => {
    var c = service.parse('--header "X-Test: 123" -H "Content-type: application/json"');
    c.headers.sort((h1, h2) => h1.name.localeCompare(h2.name));
    expect(c.headers).toEqual([new Header('Content-type', 'application/json'), new Header('X-Test', '123')]);
  });

  it('handles --data', () => {
    var c = service.parse('--data "q=test"');
    expect(c.data).toBe('q=test');
  });

  it('uses only first URL', () => {
    var c = service.parse('http://www.google.com/ http://www.bing.com/');
    expect(c.url).toBe('http://www.google.com/');
  });

  it('ignores boolean -X', () => {
    var c = service.parse('-X');
    expect(c.method).toBe('GET');
  });

  it('ignores boolean --request', () => {
    var c = service.parse('--request');
    expect(c.method).toBe('GET');
  });

  it('ignores boolean -H', () => {
    var c = service.parse('-H');
    expect(c.headers.length).toBe(0);
  });

  it('ignores boolean --header', () => {
    var c = service.parse('--header');
    expect(c.headers.length).toBe(0);
  });

  it('ignores boolean -d', () => {
    var c = service.parse('-d');
    expect(c.data).toBeUndefined();
  });

  it('ignores boolean --data', () => {
    var c = service.parse('--data');
    expect(c.data).toBeUndefined();
  });

  it('uses only first data', () => {
    var c = service.parse('-d q=test -d q=wrong');
    expect(c.data).toBe('q=test');
  })
});
