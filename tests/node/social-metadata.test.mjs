import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
  renderSocialTags,
  resolveReleaseChannel,
  socialMetadata,
} from '../../config/social-metadata.mjs';

const prototype = {
  name: 'Example',
  description: 'An "example" <prototype>',
  releaseChannels: {
    stable: { label: 'Stable', branches: ['main'], isProduction: true },
    preview: { label: 'Preview', branches: [] },
  },
  defaultChannel: 'preview',
};

test('resolves channels from override, branch, production env, and default', () => {
  assert.equal(
    resolveReleaseChannel(prototype, { PROTOTYPE_RELEASE_CHANNEL: 'Stable' }),
    'stable',
  );
  assert.equal(
    resolveReleaseChannel(prototype, { VERCEL_GIT_COMMIT_REF: 'main' }),
    'stable',
  );
  assert.equal(
    resolveReleaseChannel(prototype, { VERCEL_ENV: 'production' }),
    'stable',
  );
  assert.equal(
    resolveReleaseChannel(prototype, { PROTOTYPE_BRANCH: 'feature' }),
    'preview',
  );
});

test('rejects an unknown release channel override', () => {
  assert.throws(
    () => resolveReleaseChannel(prototype, { PROTOTYPE_RELEASE_CHANNEL: 'ga' }),
    /not one of: stable, preview/,
  );
});

test('prefers a channel-specific social card and builds an absolute URL', () => {
  const publicDir = mkdtempSync(join(tmpdir(), 'social-'));
  writeFileSync(join(publicDir, 'social-card.png'), '');
  writeFileSync(join(publicDir, 'social-card-stable.png'), '');

  const stable = socialMetadata(prototype, {
    env: { PROTOTYPE_BRANCH: 'main', PROTOTYPE_PUBLIC_URL: 'https://x.dev/' },
    publicDir,
  });
  const preview = socialMetadata(prototype, { env: {}, publicDir });

  assert.equal(stable.image.url, 'https://x.dev/social-card-stable.png');
  assert.equal(preview.image.url, '/social-card.png');
});

test('omits image tags without a card and escapes content', () => {
  const html = renderSocialTags(
    socialMetadata(prototype, { env: {}, publicDir: undefined }),
  );

  assert.match(html, /name="twitter:card" content="summary"/);
  assert.doesNotMatch(html, /og:image/);
  assert.match(html, /An &quot;example&quot; &lt;prototype&gt;/);
});
