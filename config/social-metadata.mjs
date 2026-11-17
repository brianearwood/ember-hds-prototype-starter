import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

export function resolveReleaseChannel(prototype, env = process.env) {
  const channels = prototype.releaseChannels;
  const override = env.PROTOTYPE_RELEASE_CHANNEL?.trim().toLowerCase();

  if (override) {
    if (!channels[override]) {
      throw new Error(
        `PROTOTYPE_RELEASE_CHANNEL "${override}" is not one of: ${Object.keys(channels).join(', ')}`,
      );
    }
    return override;
  }

  const branch = env.PROTOTYPE_BRANCH ?? env.VERCEL_GIT_COMMIT_REF;
  const branchChannel = Object.keys(channels).find((id) =>
    channels[id].branches?.includes(branch),
  );
  if (branch && branchChannel) {
    return branchChannel;
  }

  if (env.VERCEL_ENV === 'production') {
    const productionChannel = Object.keys(channels).find(
      (id) => channels[id].isProduction,
    );
    if (productionChannel) {
      return productionChannel;
    }
  }

  if (!channels[prototype.defaultChannel]) {
    throw new Error(
      `defaultChannel "${prototype.defaultChannel}" is not a configured release channel`,
    );
  }
  return prototype.defaultChannel;
}

export function socialMetadata(prototype, { env = process.env, publicDir }) {
  const channel = resolveReleaseChannel(prototype, env);
  const { label } = prototype.releaseChannels[channel];
  const title = `${prototype.name} - ${label}`;
  const baseUrl = (
    env.PROTOTYPE_PUBLIC_URL ??
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : '')
  ).replace(/\/+$/, '');
  const imageName = [`social-card-${channel}.png`, 'social-card.png'].find(
    (name) => publicDir && existsSync(join(publicDir, name)),
  );

  return {
    channel,
    title,
    description: prototype.description,
    siteName: prototype.name,
    image: imageName
      ? { url: `${baseUrl}/${imageName}`, alt: `${title} social preview` }
      : undefined,
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function renderSocialTags(metadata) {
  const tags = [
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', metadata.siteName],
    ['name', 'prototype:release-channel', metadata.channel],
    [
      'name',
      'twitter:card',
      metadata.image ? 'summary_large_image' : 'summary',
    ],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
  ];

  if (metadata.image) {
    tags.push(
      ['property', 'og:image', metadata.image.url],
      ['property', 'og:image:width', '1200'],
      ['property', 'og:image:height', '630'],
      ['property', 'og:image:alt', metadata.image.alt],
      ['name', 'twitter:image', metadata.image.url],
    );
  }

  return tags
    .map(
      ([attribute, key, content]) =>
        `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`,
    )
    .join('\n    ');
}

/**
 * Injects the page title, description, Open Graph, and Twitter card metadata
 * into the root index.html for the current release channel.
 */
export function socialMetadataPlugin(prototype) {
  let root;
  let publicDir;

  return {
    name: 'prototype-social-metadata',
    configResolved(config) {
      root = config.root;
      publicDir = config.publicDir;
    },
    transformIndexHtml(html, ctx) {
      if (resolve(ctx.filename) !== resolve(root, 'index.html')) {
        return html;
      }

      const metadata = socialMetadata(prototype, { publicDir });

      return html
        .replace(
          /<title>[^<]*<\/title>/,
          `<title>${escapeHtml(metadata.title)}</title>`,
        )
        .replace(
          /<meta name="description" content="[^"]*">/,
          `<meta name="description" content="${escapeHtml(metadata.description)}">\n    ${renderSocialTags(metadata)}`,
        );
    },
  };
}
