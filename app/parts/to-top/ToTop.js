(function () {
	'use strict';

	/**
	 * Класс для управления кнопкой "Наверх"
	 */
	class ToTop {
		constructor() {
			this.toTopEl = document.querySelector('.to-top')
		}

		/**
		 * Метод добавляет окну браузера слушатель события скролла
		 */
		addWindowScrollListener() {
			window.addEventListener('scroll', () => {
				this.addButtonOnPage();
			});
		}
		/**
		 * Метод добавляет кнопку "Наверх" на страницу
		 */
		addButtonOnPage() {
			let scrollTop = window.pageYOffset;
			let windowHeight = window.innerHeight;
			if (scrollTop > (1.5 * windowHeight)) {
				this.toTopEl.classList.add('active');
			} else {
				this.toTopEl.classList.remove('active');
			}
		}
	}

	window.addEventListener('load', () => {
		let toTop = new ToTop();
		toTop.addWindowScrollListener();
	});
})();