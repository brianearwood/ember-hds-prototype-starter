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
});
