import test from 'node:test';
import assert from 'node:assert/strict';

try {
  const { sanitizeText, validateEventInput, validateNewsInput } = await import('./auth.js');

  test('sanitizeText trims and collapses whitespace', () => {
    assert.equal(sanitizeText('  Hello   world  '), 'Hello world');
  });

  test('validateEventInput rejects missing title', () => {
    const result = validateEventInput({ description: 'ok', date: '2026-01-01' });
    assert.equal(result.ok, false);
    assert.match(result.message, /title/i);
  });

  test('validateNewsInput accepts valid values', () => {
    const result = validateNewsInput({
      title: 'Trust update',
      description: 'A short update',
      date: '2026-09-17',
      published: true,
    });
    assert.equal(result.ok, true);
  });
} catch (error) {
  test('server auth utilities should exist', () => {
    assert.fail(`Missing auth utilities: ${error.message}`);
  });
}
