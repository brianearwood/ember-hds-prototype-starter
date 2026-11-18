import { click, currentURL, triggerKeyEvent, visit } from '@ember/test-helpers';
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
    assert.dom('.hds-table .hds-badge').exists({ count: 3 });
  });

  test('selects scenarios and personas through the URL', async function (assert) {
    await visit('/');

    assert.dom('[data-test-scenario-toggle]').hasText('Baseline');
    assert.dom('[data-test-edit-action]').isEnabled();
    assert.dom('[data-test-permission-note]').doesNotExist();

    await click('[data-test-scenario-toggle]');
    await click('[data-test-scenario-option="edge-case"]');

    assert.strictEqual(currentURL(), '/?scenario=edge-case');
    assert.dom('[data-test-scenario-toggle]').hasText('Edge case');

    await click('[data-test-persona-toggle]');
    await click('[data-test-persona-option="viewer"]');

    assert.strictEqual(currentURL(), '/?persona=viewer&scenario=edge-case');
    assert.dom('[data-test-edit-action]').isDisabled();
    assert
      .dom('[data-test-edit-action]')
      .hasAttribute('aria-describedby', 'edit-permission-note');
    assert.dom('[data-test-permission-note]').includesText('Riley Kim');
  });

  test('restores state from a shared link and ignores unknown ids', async function (assert) {
    await visit('/?scenario=edge-case&persona=editor');

    assert.dom('[data-test-scenario-toggle]').hasText('Edge case');
    assert
      .dom('[data-test-persona-toggle]')
      .hasAttribute('aria-label', 'Persona: Jordan Lee, Write permission');

    await visit('/?scenario=missing&persona=missing');

    assert.dom('[data-test-scenario-toggle]').hasText('Baseline');
    assert.dom('[data-test-persona-toggle]').includesText('Avery Park');
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

  test('inspects stamped components and exits with Escape', async function (assert) {
    await visit('/');
    await click('[data-test-inspect-toggle]');

    assert.strictEqual(currentURL(), '/?inspect=true');
    assert
      .dom('[data-test-edit-action]')
      .hasAttribute('data-inspect-component', 'Hds::Button');

    await click('[data-test-edit-action]');

    assert.dom('[data-test-inspect-panel] h2').hasText('Hds::Button');
    assert
      .dom('[data-test-inspect-source]')
      .includesText('app/templates/application.gts:');

    await triggerKeyEvent(document, 'keydown', 'Escape');

    assert.strictEqual(currentURL(), '/');
    assert.dom('[data-test-inspect-panel]').doesNotExist();
  });
});
