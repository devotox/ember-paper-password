import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-password', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{paper-password onChange=null}}`);

    assert.equal(this.element.textContent.trim(), 'Password Strength: Very Poor');

    // Template block usage:
    await render(hbs`
      {{#paper-password onChange=null}}
        template block text
      {{/paper-password}}
    `);

    assert.equal(this.element.textContent.trim().replace(/\s+/g, ' '), 'Password Strength: Very Poor template block text');
  });
});
