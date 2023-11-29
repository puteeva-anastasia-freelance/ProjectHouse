(function () {
	"use strict";

	/**
	 * Класс для отрисовки карточек услуг
	 */
	class Service {
		constructor() {
			this.pathToServicesImages = 'img/dist/services';

			this.wrapperEl = document.querySelector('#service-slider .swiper-wrapper');

			this.settings = {
				slidesPerView: 'auto',
				speed: 1200,
				freeMode: true,
				watchSlidesProgress: true,
				scrollbar: {
					el: '.service-scrollbar',
					draggable: true,
				}
			}
		}

		/**
		 * Метод вставляет карточки услуг на страницу
		 * @param {ServiceDTO[]} services массив услуг из файла services.js
		 */
		insertServicesIntoPage(services) {
			let servicesMarkup = '';

			for (let service of services) {
				if (service.image != '') {
					servicesMarkup += this.getServiceMarkup(service);
				}
			}

			this.wrapperEl.insertAdjacentHTML('beforeend', servicesMarkup);

			this.setEqualHeightDescriptionEl();

			this.addWindowResizeListener();

			this.addSliderServices();
		}

		/**
		 * Метод получает разметку одной карточки услуги
		 * @param {ServiceDTO} service объект с информацией об услуге
		 * @returns {string} html-разметка карточки услуги
		 */
		getServiceMarkup(service) {
			let priceMarkup = this.getPriceServiceMarkup(service);
			let descriptionMarkup = this.getDescriptionServicesMarkup(service);

			return `
			<div class="swiper-slide">
				<div class="service__item">
					<div class="service__flipper">
						<div class="service__front" style="background: center / cover no-repeat url(${this.pathToServicesImages}/${service.image}) #fff;">
							<div class="service__front-inner">
								<h3 class="h3 service__subtitle">${service.name}</h3>
								${priceMarkup}
							</div>
						</div>
						<div class="service__back">
							<div class="service__back-inner">
								<h3 class="h3 service__subtitle service__back-subtitle">${service.name}</h3>
								<div class="service__desc">
									${descriptionMarkup}
								</div>
								<div class="service__item-bottom">
									${priceMarkup}
								</div>
								<button class="service__button button__feedback" data-value="Проконсультироваться: ${service.name}">Проконсультироваться</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
		}

		/**
		 * Метод получает разметку минимальной стоимости услуги за м2
		 * @param {ServiceDTO} service объект с информацией об услуге
		 * @returns {string} html-разметка минимальной стоимости услуги
		 */
		getPriceServiceMarkup(service) {
			if (service.price != '') {
				return `<p class="service__item-cost">Стоимость услуги</p><span class="service__price">${service.price}</span>`
			} else {
				return '<span class="service__price">&nbsp;</span>'
			}
		}

		/**
		 * Метод получает разметку описания услуги
		 * @param {ServiceDTO} service объект с информацией об услуге
		 * @returns {string} html-разметка описания услуги
		 */
		getDescriptionServicesMarkup(service) {
			let string = service.description;
			let regex = /\* (.+)/g;
			let match = [];
			let listItems = [];
			let descriptionMarkup = '';
			let textAfterList = '';

			while ((match = regex.exec(string)) != null) {
				listItems.push(match[1]);
			}

			let firstMarkerIndex = string.search(regex);
			let textBeforeList = string.slice(0, firstMarkerIndex).trim();

			if (listItems[listItems.length - 1]) {
				let lastSubtitle = listItems[listItems.length - 1];
				let lastMarkerIndex = string.lastIndexOf(lastSubtitle) + lastSubtitle.length;
				textAfterList = string.slice(lastMarkerIndex, string.length).trim();
			}

			if (textBeforeList != '') {
				descriptionMarkup += `<p class="service__item-txt">${textBeforeList}</p>`
			}

			if (listItems.length != 0) {
				descriptionMarkup += '<ul class="service__item-list">';
				for (let item of listItems) {
					descriptionMarkup += `<li>${item}</li>`;
				}
				descriptionMarkup += '</ul>';
			}

			if (textAfterList != '') {
				descriptionMarkup += `<p class="service__item-txt">${textAfterList}</p>`
			}

			return descriptionMarkup;
		}

		/**
		 * Метод добавляет слайдер услугам
		 */
		addSliderServices() {
			new Swiper('#service-slider', this.settings);
		}

		/**
		 * Метод устанавливает одинаковую высоту элементу описания
		 */
		setEqualHeightDescriptionEl() {
			let descriptionElems = document.querySelectorAll('.service__desc');
			let maxHeight = 0;

			for (let i = 0; i < descriptionElems.length; i++) {
				descriptionElems[i].style.height = "auto";
			}

			for (let i = 0; i < descriptionElems.length; i++) {
				maxHeight = Math.max(maxHeight, descriptionElems[i].offsetHeight);
			}

			for (let i = 0; i < descriptionElems.length; i++) {
				descriptionElems[i].style.height = `${maxHeight}px`;
			}
		}

		/**
		 * Метод добавляет слушатель события изменения размеров окна
		 */
		addWindowResizeListener() {
			window.addEventListener('resize', () => {
				this.setEqualHeightDescriptionEl();
			});
		}
	}

	window.addEventListener('load', () => {
		let service = new Service();
		service.insertServicesIntoPage(services);
	});
})();