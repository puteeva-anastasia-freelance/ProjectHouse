(function () {
	"use strict";

	/**
	 * Класс для отрисовки этапов работы
	 */
	class Step {
		constructor() {
			this.wrapEl = document.querySelector('.step__wrap');
		}

		/**
		 * Метод вставляет этапы работы на страницу
		 * @param {StepDTO[]} steps массив этапов работы из файла steps.js
		 */
		insertStepsIntoPage(steps) {
			let stepsMarkup = '';

			this.sortStepsInAscendingOrder(steps);

			for (let i = 0; i < steps.length; i++) {
				if (i % 2 == 0) {
					stepsMarkup += this.getStepLeftMarkup(steps[i]);
				} else {
					stepsMarkup += this.getStepRightMarkup(steps[i]);
				}
			}

			this.wrapEl.insertAdjacentHTML('beforeend', stepsMarkup);
		}

		/**
		 * Массив сортирует этапы работы по возрастанию номеров этапов
		 * @param {StepDTO[]} steps массив этапов работы из файла steps.js
		 */
		sortStepsInAscendingOrder(steps) {
			steps.sort(function (a, b) {
				return a.number - b.number;
			});
		}

		/**
		 * Метод получает разметку одного этапа работы с левой стороны
		 * @param {StepDTO} step объект с информацией об этапе работы
		 * @returns {string} html-разметка этапа работы с левой стороны
		 */
		getStepLeftMarkup(step) {
			return `
			<div class="step__item step__item-top">
				<div class="step__inner step__inner_top">
					<h3 class="h5 step__subtitle">${step.name}</h3>
					<p class="step__txt">${step.description}</p>
				</div>
				<div class="step__inner">
					<span class="step__number">${step.number} этап</span>
				</div>
			</div>
			`;
		}

		/**
		 * Метод получает разметку одного этапа работы с правой стороны
		 * @param {StepDTO} step объект с информацией об этапе работы
		 * @returns {string} html-разметка этапа работы с правой стороны
		 */
		getStepRightMarkup(step) {
			return `
			<div class="step__item">
				<div class="step__inner step__inner_top">
					<span class="step__number step__number_top">${step.number} этап</span>
				</div>
				<div class="step__inner">
					<h3 class="h5 step__subtitle">${step.name}</h3>
					<p class="step__txt">${step.description}</p>
				</div>
			</div>
			`;
		}

	}

	window.addEventListener('load', () => {
		let step = new Step();
		step.insertStepsIntoPage(steps);
	});


})();