// Checks the chat and audit answer validation: `node scripts/check-validate.mjs`. Fails loudly if a case regresses.
import assert from 'node:assert/strict';
import { checks, hostOf, gibberish } from '../src/scripts/validate.js';

const ok = (key, v) => assert.equal(checks[key](v), '', `${key} should accept "${v}"`);
const bad = (key, v) => assert.notEqual(checks[key](v), '', `${key} should reject "${v}"`);

['asdfgh', 'aaaaaaa', 'xkcdvbnt', '!!!!', 'qwerty'].forEach((v) => assert.ok(gibberish(v), `"${v}" is gibberish`));
['Fix a broken site', 'I need a new WordPress theme', 'আমার একটি ওয়েবসাইট দরকার', 'SEO'].forEach((v) => assert.ok(!gibberish(v), `"${v}" is real text`));

assert.equal(hostOf('https://www.Example.com/shop'), 'example.com');
assert.equal(hostOf('mysite.co.uk'), 'mysite.co.uk');
['hello', 'asdf.qwer', 'not a site', 'site.123', 'http://'].forEach((v) => assert.equal(hostOf(v), '', `"${v}" is not a site`));

ok('need', 'Speed up a slow site'); bad('need', 'jk'); bad('need', 'sdfsdfsdf');
bad('need', 'AGASGAG'); bad('need', 'lorem bapi kotun'); ok('need', 'SEO'); ok('need', 'Something else'); ok('need', 'I want a booking system for my clinic'); ok('need', 'আমার একটি ওয়েবসাইট দরকার');
bad('goal', 'blah fooble'); ok('goal', 'Rank higher on Google'); ok('goal', 'faster checkout');
ok('site', 'usetabby.com'); ok('site', 'No site yet'); ok('site', 'not yet'); bad('site', 'asdasd'); bad('site', 'my website');
ok('goal', 'More signups from the pricing page'); bad('goal', 'yes'); bad('goal', 'asdf asdf');
ok('timeline', 'Within a month'); ok('timeline', 'by December'); ok('timeline', '3 weeks'); bad('timeline', 'banana'); bad('timeline', 'asdf1234');
ok('budget', '$500 to $2,000'); ok('budget', 'Not sure yet'); ok('budget', 'around 800'); bad('budget', 'hello');
ok('name', 'Sakib Islam'); ok('name', "Md. O'Brien-Khan"); ok('name', 'রহিম'); bad('name', 'x'); bad('name', 'John123'); bad('name', 'aaaa'); bad('name', 'sdfgh');
ok('contact', 'a.b@company.co'); ok('contact', '+880 1950-025990'); bad('contact', 'me@x'); bad('contact', '12345'); bad('contact', 'call me'); bad('contact', '1234567890123456789');

console.log('validation checks pass');
