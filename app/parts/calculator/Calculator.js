(function () {
	"use strict";

	/**
	 * Класс управляет блоком "Онлайн-калькулятор"
	 */
	class Calculator {
		constructor() {
			this.buttonEl = document.querySelector('.calculator__button');
			this.inputPhoneEl = document.querySelector('.calculator .mask-phone');
			this.errorPhone = document.querySelector('.calculator__error-phone');
			this.serviceEmptyEl = document.querySelector('.service-empty');
		}

		/**
		 * Инициализация блока "Онлайн-калькулятор"
		 * @param {ServiceDTO[]} services массив услуг из файла services.js
		 */
		init(services) {
			this.addButtonClickListener();
			this.addMaskPhone();
			this.loadServicesInSelectTypeProject(services);
			this.addSelectizeTypeProjectAndTypeRoof();
		}

		/**
		 * Метод добавляет кнопке отправки формы слушатель события клика
		 */
		addButtonClickListener() {
			this.buttonEl.addEventListener('click', () => {
				if (this.inputPhoneEl.value == '') {
					this.errorPhone.style.display = 'block';
				} else {
					this.errorPhone.style.display = 'none';
				}
			});
		}

		/**
		 * Метод добавляет маску телефона
		 */
		addMaskPhone() {
			$('.calculator .mask-phone').mask('+375 (99) 999-99-99');

			$('.calculator .mask-phone').on("keyup", function () {
				let countDigits = ($(this).val().match(/\d+/g).join('')).length;
				if (countDigits == 12) {
					$('.calculator__error-phone').css('display', 'none');
				}
			});
		}

		/**
		 * Метод загружает услуги в выпадающий список "Тип проекта"
		 * @param {ServiceDTO[]} services массив услуг из файла services.js
		 */
		loadServicesInSelectTypeProject(services) {
			let servicesMarkup = '';

			for (let service of services) {
				servicesMarkup += `<option value="${service.name}">${service.name}</option>`
			}

			this.serviceEmptyEl.insertAdjacentHTML('afterend', servicesMarkup);
		}

		/**
		 * Метод добавляет плагин selectize выпадающим спискам: тип проекта и тип кровли
		 */
		addSelectizeTypeProjectAndTypeRoof() {
			$('#project').selectize({
				placeholder: 'Выбрать...'
			});

			$('#type-roof').selectize({
				placeholder: 'Выбрать...'
			});
		}
	}
	window.addEventListener('load', () => {
		let calculator = new Calculator();
		calculator.init(services);
	});
})();