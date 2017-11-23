import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-password', 'Integration | Component | paper password', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-password onChange=null}}`);

  assert.equal(this.$().text().trim(), 'Password Strength: Very Poor');

  // Template block usage:
  this.render(hbs`
    {{#paper-password onChange=null}}
      template block text
    {{/paper-password}}
  `);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'template block text Password Strength: Very Poor');
});
