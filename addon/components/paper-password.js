import $ from 'jquery';
import PaperInput from 'ember-paper/components/paper-input';
import layout from 'ember-paper/templates/components/paper-input';

export default PaperInput.extend({
	layout,

	type: 'password',

	bindEvent() {
		let namespace = '.passwordReveal';
		let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		let bindEvent = (supportsTouch ? 'touchstart' : 'click') + namespace;

		return bindEvent;
	},

	didInsertElement() {
		if (this.isDestroyed) { return; }

		this._super(...arguments);
		this.attachIcon();
	},

	willDestroyElement() {
		if (this.isDestroyed) { return; }

		this._super(...arguments);
		let bindEvent = this.bindEvent();
		this.$('input').next('i').unbind(bindEvent);
	},

	attachIcon() {
		if (this.isDestroyed) { return; }

		let namespace = '.passwordReveal';
		let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
		let bindEvent = (supportsTouch ? 'touchstart' : 'click') + namespace;

		let open = 'fa-eye';
		let closed = 'fa-eye-slash';
		let classes = 'fa password-reveal';

		let _class = (_classes) => [classes, _classes].join(' ');

		let _style = () => ({
			zIndex: '1',
			right: '2px',
			top: '0.4em',
			marginRight: '0',
			fontSize: '1.4em',
			cursor: 'pointer',
			position: 'absolute'
		});

		let toggleEye = ($element, $icon) => {
			let type = $element.attr('type');
			// let types = ['password', 'text']
			let defaultType = 'password';
			let newType = 'text';

			$element.attr('type', type === defaultType ? newType : defaultType);

			return type === defaultType
				? $icon.addClass(open).removeClass(closed)
				: $icon.addClass(closed).removeClass(open);
		};

		let $this = this.$('input')

		let $icon = $('<i/>', { 'class': _class(closed) }).css(_style());

		$icon.bind(bindEvent, (e) => {
			e.stopImmediatePropagation();
			toggleEye($this, $icon);
			return false;
		});

		$icon.insertAfter($this);
	}
});
