import { inject } from '@ember/service';

import { computed } from '@ember/object';

import { dasherize } from '@ember/string';

import PaperInput from 'ember-paper/components/paper-input';

import layout from '../templates/components/paper-password';

// import layout from 'ember-paper/templates/components/paper-input';

export default PaperInput.extend({
	layout,

	errors: [], // eslint-disable-line

	reveal: true,

	minStrength: 3,

	type: 'password',

	customValidations: [], // eslint-disable-line

	passwordStrength: inject(), // eslint-disable-line

	showPasswordStrength: true,

	strengthLabel: 'Password Strength',

	strengthLevels: ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'], // eslint-disable-line

	iconClasses: computed(function() {
		return {
			open: 'fa-eye',
			closed: 'fa-eye-slash',
			default: 'fa password-reveal'
		};
	}),

	strength: computed('value', async function() {
		let value = this.get('value');
		let defaultStrength = { score: 0 };
		let passwordStrength = this.get('passwordStrength');
		return !value ? defaultStrength : passwordStrength.strength(value);
	}),

	strengthValue: computed('value', async function() {
		let strength = await this.get('strength');
		return strength.score / 4 * 100;
	}),

	strengthLevel: computed('value', async function() {
		let strength = await this.get('strength');
		return this.get('strengthLevels')[strength.score];
	}),

	strengthWarning: computed('value', async function() {
		let strength = await this.get('strength');
		return strength.score < this.get('minStrength');
	}),

	shouldReturn() {
		return !this.get('reveal') || this.isDestroyed || this.isDestroying
	},

	didInsertElement() {
		if (this.shouldReturn()) { return; }

		this._super(...arguments);

		this.attachIcon();
	},

	willDestroyElement() {
		if(this.shouldReturn()) { return; }

		this._super(...arguments);

		this.unbindIcon();
	},

	iconConfig(icon) {
		if(this.shouldReturn()) { return; }
		
		let iconClasses = this.get('iconClasses');

		let input = this.element.querySelector('input');

		icon = icon || this.element.querySelector('i.password-reveal');

		function toggleEye(input, icon) {
			let newType = 'text';
			let defaultType = 'password';
			let type = input.getAttribute('type');

			let currentType = type === defaultType ? newType : defaultType;
			input.setAttribute('type', currentType);

			return type === defaultType ?
				icon.setAttribute('class', `${iconClasses.default} ${iconClasses.open}`) :
				icon.setAttribute('class', `${iconClasses.default} ${iconClasses.closed}`);
		}

		let bindFunction = this.get('bindFunction') 
			|| this.set('bindFunction', function(event) {
				event.stopImmediatePropagation();
				toggleEye(input, icon);
				return false;
			});

		let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		let bindEvent =  supportsTouch ? 'touchstart' : 'click';

		return { bindEvent, bindFunction, iconClasses, input, icon };
	},

	unbindIcon() {
		if(this.shouldReturn()) { return; }

		let { 
			icon,
			bindEvent, bindFunction
		} = this.iconConfig();
		
		icon.removeEventListener(bindEvent, bindFunction);
	},

	attachIcon() {
		if(this.shouldReturn()) { return; }

		let _style = () => Object.entries({
			zIndex: '1',
			top: '0.4em',
			marginRight: '0',
			fontSize: '1.4em',
			cursor: 'pointer',
			position: 'absolute',
			right: this.get('iconRight') ? '1.5em' : '2px'
		}).map(([k, v]) => `${dasherize(k)}:${v}`).join(';')

		let icon = document.createElement('i');

		let { 
			iconClasses, input,
			bindEvent, bindFunction
		} = this.iconConfig(icon);


		icon.setAttribute('style', _style(true));

		input.insertAdjacentElement('afterend', icon);

		icon.addEventListener(bindEvent, bindFunction);

		icon.setAttribute('class', `${iconClasses.default} ${iconClasses.closed}`);
	}
});