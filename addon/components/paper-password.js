import $ from 'jquery';

import strength from 'password-strength';

import { computed } from '@ember/object';

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

	passwordStrength: strength, // eslint-disable-line

	showPasswordStrength: true,

	strengthLabel: 'Password Strength',

	strengthLevels: ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'], // eslint-disable-line

	didInsertElement() {
		if (!this.get('reveal')) {
			return;
		}

		if (this.isDestroyed) {
			return;
		}

		this._super(...arguments);

		this.attachIcon();
	},

	willDestroyElement() {
		if (!this.get('reveal')) {
			return;
		}

		if (this.isDestroyed) {
			return;
		}

		this._super(...arguments);

		this.unbindIcon();
	},

	strength: computed('value', function() {
		let value = this.get('value');
		let defaultStrength = { score: 0 };
		let passwordStrength = this.get('passwordStrength');
		return !value ? defaultStrength : passwordStrength(value);
	}),

	strengthValue: computed('value', function() {
		let strength = this.get('strength');
		return strength.score / 4 * 100;
	}),

	strengthLevel: computed('value', function() {
		let strength = this.get('strength');
		return this.get('strengthLevels')[strength.score];
	}),

	strengthWarning: computed('value', function() {
		let strength = this.get('strength');
		return strength.score < this.get('minStrength');
	}),

	bindEvent() {
		let namespace = '.passwordReveal';
		let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		let bindEvent = (supportsTouch ? 'touchstart' : 'click') + namespace;

		return bindEvent;
	},

	unbindIcon() {
		if (!$ || this.isDestroyed || this.isDestroying) {
			return;
		}

		let bindEvent = this.bindEvent();

		this.$('input').next('i').unbind(bindEvent);
	},

	attachIcon() {
		if (!$ || this.isDestroyed || this.isDestroying) {
			return;
		}

		let namespace = '.passwordReveal';
		let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		let bindEvent = (supportsTouch ? 'touchstart' : 'click') + namespace;

		let open = 'fa-eye';
		let closed = 'fa-eye-slash';
		let classes = 'fa password-reveal';

		let _class = (_classes) => [classes, _classes].join(' ');

		let right = this.get('iconRight') ? '1.5em' : '2px'

		let _style = () => ({
			zIndex: '1',
			top: '0.4em',
			right: right,
			marginRight: '0',
			fontSize: '1.4em',
			cursor: 'pointer',
			position: 'absolute'
		});

		let toggleEye = ($element, $icon) => {
			let type = $element.attr('type');
			let defaultType = 'password';
			let newType = 'text';

			$element.attr('type', type === defaultType ? newType : defaultType);

			return type === defaultType ?
				$icon.addClass(open).removeClass(closed) :
				$icon.addClass(closed).removeClass(open);
		};

		let $this = this.$('input')

		let $icon = $('<i/>', {
			'class': _class(closed)
		}).css(_style());

		$icon.bind(bindEvent, (e) => {
			e.stopImmediatePropagation();
			toggleEye($this, $icon);
			return false;
		});

		$icon.insertAfter($this);
	}
});