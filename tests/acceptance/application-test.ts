import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-hds-prototype/tests/helpers';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('renders the HDS starter shell', async function (assert) {
    await visit('/');

    assert.dom('main#hds-main').exists();
    assert.dom('h1').hasText('Prototype starter');
    assert.dom('.hds-alert').exists();
    assert.dom('.hds-table').exists();
    assert.dom('.hds-badge').exists({ count: 3 });
  });

  test('applies HDS design tokens to custom styles', async function (assert) {
    await visit('/');

    assert.ok(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--hds-typography-font-stack-text')
        .trim(),
      'HDS token variables are defined',
    );

    const probe = document.createElement('span');
    probe.style.fontFamily = 'var(--hds-typography-font-stack-text)';
    document.body.append(probe);
    const expectedFontFamily = getComputedStyle(probe).fontFamily;
    probe.remove();

    assert.strictEqual(
      getComputedStyle(document.body).fontFamily,
      expectedFontFamily,
      'the body font uses the HDS text font stack',
    );
  });
});
