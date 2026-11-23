import test from 'node:test';
import assert from 'node:assert/strict';

import { rewriteRelativeGithubImages, updateArticleDates } from './fetch-external-articles.mjs';

test('rewriteRelativeGithubImages converts local image references to absolute GitHub raw URLs', () => {
  const markdown = `# Demo

![Alt](./images/diagram.png)
![Other](../images/other.png)
![Bare](images/bare.png "Caption")
<img src="./images/local.svg" />
<img data-src="images/lazy.png" />
![Remote](https://example.com/image.png)
![Root](/images/root.png)
![Fragment](#image)`;

  const rewritten = rewriteRelativeGithubImages(markdown, {
    repo: 'CodElecCz/STM32F1-CLRC663',
    branch: 'main',
    rootPath: 'blog',
  });

  assert.match(rewritten, /https:\/\/raw\.githubusercontent\.com\/CodElecCz\/STM32F1-CLRC663\/main\/blog\/images\/diagram\.png/);
  assert.match(rewritten, /https:\/\/raw\.githubusercontent\.com\/CodElecCz\/STM32F1-CLRC663\/main\/images\/other\.png/);
  assert.match(rewritten, /https:\/\/raw\.githubusercontent\.com\/CodElecCz\/STM32F1-CLRC663\/main\/blog\/images\/bare\.png "Caption"/);
  assert.match(rewritten, /https:\/\/raw\.githubusercontent\.com\/CodElecCz\/STM32F1-CLRC663\/main\/blog\/images\/local\.svg/);
  assert.match(rewritten, /https:\/\/raw\.githubusercontent\.com\/CodElecCz\/STM32F1-CLRC663\/main\/blog\/images\/lazy\.png/);
  assert.match(rewritten, /!\[Remote\]\(https:\/\/example\.com\/image\.png\)/);
  assert.match(rewritten, /!\[Root\]\(\/images\/root\.png\)/);
  assert.match(rewritten, /!\[Fragment\]\(#image\)/);
  assert.doesNotMatch(rewritten, /\]\(\.\/images\//);
});

test('repository push timestamps replace the date in every locale', async () => {
  const article = {
    repo: 'owner/repo',
    locales: { cs: { date: '2025-01-01', title: 'CS' }, en: { date: '2025-01-02', title: 'EN' } },
  };
  const updated = await updateArticleDates(article, async (url, options) => {
    assert.equal(url, 'https://api.github.com/repos/owner/repo');
    assert.equal(options.headers.Accept, 'application/vnd.github+json');
    assert.ok(options.signal);
    return { ok: true, json: async () => ({ pushed_at: '2026-11-20T13:14:15Z' }) };
  });
  assert.equal(updated.locales.cs.date, '2026-11-20T13:14:15Z');
  assert.equal(updated.locales.en.date, '2026-11-20T13:14:15Z');
  assert.equal(updated.locales.cs.title, 'CS');
  assert.equal(article.locales.cs.date, '2025-01-01');
});

test('failed or invalid GitHub responses preserve each original date', async (t) => {
  const article = { repo: 'owner/repo', locales: { cs: { date: '2025-01-01' }, en: { date: '2025-01-02' } } };
  const warn = t.mock.method(console, 'warn', () => {});
  for (const fetcher of [
    async () => { throw new Error('unreachable'); },
    async () => ({ ok: false, status: 403 }),
    async () => ({ ok: true, json: async () => ({ pushed_at: null }) }),
    async () => ({ ok: true, json: async () => ({ pushed_at: 'invalid' }) }),
    async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } }),
  ]) {
    assert.deepEqual(await updateArticleDates(article, fetcher), article);
  }
  assert.equal(warn.mock.callCount(), 5);
});

test('articles without a repository keep their dates without a request', async () => {
  const article = { locales: { cs: { date: '2025-01-01' } } };
  assert.deepEqual(await updateArticleDates(article, () => assert.fail('unexpected request')), article);
});
