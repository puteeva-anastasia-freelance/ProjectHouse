(function () {
	"use strict";

	/**
	 * Класс для отрисовки цен
	 */
	class Price {
		constructor() {
			this.titleTypeProjectEl = document.querySelector('#title-type-project');
			this.titlePriceProjectEl = document.querySelector('#title-price-project');
		}

		/**
		 * Метод вставляет типы проектов и их стоимость на страницу
		 * @param {ServiceDTO[]} services массив услуг из файла services.js
		 */
		insertPricesIntoPage(services) {
			let typesProjectsMarkup = '';
			let pricesMarkup = '';

			for (let service of services) {
				if (service.price != '') {
					typesProjectsMarkup += this.getTypeProjectMarkup(service);
					pricesMarkup += this.getPriceMarkup(service);
				}
			}

			this.titleTypeProjectEl.insertAdjacentHTML('afterend', typesProjectsMarkup);
			this.titlePriceProjectEl.insertAdjacentHTML('afterend', pricesMarkup);
		}

		/**
		 * Метод получает разметку одного типа проекта
		 * @param {ServiceDTO} service объект с информацией об услуге
		 * @returns {string} html-разметка одного типа проекта
		 */
		getTypeProjectMarkup(service) {
			return `<span class="price__table-col">${service.name}</span>`;
		}

		/**
		 * Метод получает разметку цены проекта
		 * @param {ServiceDTO} service объект с информацией об услуге
		 * @returns {string} html-разметка цены проекта
		 */
		getPriceMarkup(service) {
			return `<span class="price__table-col">${service.price}</span>`;
		}

	}

	window.addEventListener('load', () => {
		let price = new Price();
		price.insertPricesIntoPage(services);
	});


})();