(function () {
	"use strict";

	/**
	 * Метод управляет всплывающими окнами
	 */
	class PopUp {
		constructor() {
			this.buttonFeedbackElems = document.querySelectorAll('.button__feedback');
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');
			this.acceptedEl = document.querySelector('.accepted');
		}

		/**
		 * Метод добавляет кнопкам "Обратной связи" слушатель события клика
		 */
		addButtonsFeedbackClickListener() {
			let numberForm = 0;
			this.buttonFeedbackElems.forEach((button) => {
				button.addEventListener('click', () => {
					let nameForm = this.getNameForm(button);
					let textButton = this.getTextButton(button);
					let formFeedback = this.getFormFeedback(textButton, nameForm, numberForm);
					this.popUpOverlayEl.classList.add('active-pop-up');
					this.acceptedEl.insertAdjacentHTML('beforebegin', formFeedback);
					this.addMaskPhone();
					this.addCloseElemsClickListener();
					this.addPopUpElemsClickListener();
					this.addButtonsPopUpClickListener();
					numberForm++;
				});
			});
		}

		/**
		 * Метод получает форму для отправки заявки
		 * @param {string} textButton текст кнопки
		 * @param {string} nameForm название формы
		 * @param {number} numberForm номер формы
		 * @returns {string} html-разметка формы для отправки заявки
		 */
		getFormFeedback(textButton, nameForm, numberForm) {
			return `<div class="pop-up">
			<div class="pop-up__container">
				<div class="pop-up__body">
					<form class="pop-up__form form-application">
						<input type="hidden" name="name-form" value="${nameForm}">
						<p class="pop-up__txt">Оставьте Ваши контактные данные и&nbsp;наш менеджер свяжется с&nbsp;Вами в&nbsp;ближайшее время</p>
						<label for="name-pop-up-${numberForm}" class="pop-up__label">Ваше имя</label>
						<input type="text" placeholder="Иван Иванович" id="name-pop-up-${numberForm}" class="pop-up__input" name="name" >
						<label for="phone-pop-up-${numberForm}" class="pop-up__label">Ваш номер телефона*</label>
						<input type="text" placeholder="+375 (__)___-__-__" class="pop-up__input mask-phone" required id="phone-pop-up-${numberForm}" name="phone">	
						<span class="txt pop-up__error pop-up__error-phone">Для отправки формы, пожалуйста, укажите Ваш номер телефона</span>
						<button class="button__gradient pop-up__button">${textButton}</button>
					</form>
					<div class="pop-up__close">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="pop-up__close-svg">
							<path d="M1.375 1.375L10.625 10.625" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M10.625 1.375L1.375 10.625" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
					</div>
				</div>
			</div>
		</div>`;
		}

		/**
		 * Метод получает текст кнопки, на которую нажали
		 * @param {HTMLButtonElement} button кнопка, на которую нажали
		 * @returns {string} название кнопки в форме
		 */
		getTextButton(button) {
			let textButton = button.textContent.trim();
			if (textButton == '') {
				return button.dataset.value;
			} else {
				return button.textContent.trim();
			}
		}

		/**
		 * Метод получает название формы
		 * @param {HTMLButtonElement} button кнопка, на которую нажали
		 * @returns {string} название формы
		 */
		getNameForm(button) {
			return button.dataset.value;
		}

		/**
		 * Метод добавляет маску телефона
		 */
		addMaskPhone() {
			let countDigits = 0;
			$('.mask-phone').mask('+375 (99) 999-99-99');

			$('.pop-up .mask-phone').on("keyup", function () {
				countDigits = $(this).val().match(/\d+/g).join('').length;
				if (countDigits == 12) {
					$('.pop-up__error-phone').css('display', 'none');
				}
			});
		}

		/**
		 * Метод добавляет "Крестикам" слушатель события клика
		 */
		addCloseElemsClickListener() {
			let popUpCloseElems = document.querySelectorAll('.pop-up__close');

			popUpCloseElems.forEach((popUpCloseEl) => {
				popUpCloseEl.addEventListener('click', () => {
					let popUpEl = popUpCloseEl.closest('.pop-up');
					this.popUpOverlayEl.classList.remove('active-pop-up');
					popUpEl.style.display = 'none';
				});
			});
		}

		/**
		 * Метод добавляет кнопкам отправки формы слушатель события клика
		 */
		addButtonsPopUpClickListener() {
			let popUpButtonElems = document.querySelectorAll('.pop-up__button');
			popUpButtonElems.forEach((button) => {
				let popUpEl = button.closest('.pop-up');
				let popUpInputPhoneEl = popUpEl.querySelector('.mask-phone');
				let popUpErrorPhoneEl = popUpEl.querySelector('.pop-up__error-phone');

				button.addEventListener('click', () => {
					if (popUpInputPhoneEl.value == '') {
						popUpErrorPhoneEl.style.display = 'block';
					} else {
						popUpErrorPhoneEl.style.display = 'none';
					}
				});
			});
		}

		/**
		 * При клике на затемненный фон всплывающее окно закрывается
		 */
		addPopUpElemsClickListener() {
			let popUpElems = document.querySelectorAll('.pop-up');
			popUpElems.forEach((popUpEl) => {
				popUpEl.addEventListener('click', (event) => {
					let popUpContainerEl = popUpEl.querySelector('.pop-up__container');
					if (event.target == popUpContainerEl) {
						this.popUpOverlayEl.classList.remove('active-pop-up');
						popUpEl.style.display = 'none';
					}
				})
			});
		}
	}

	window.addEventListener('load', () => {
		let popUp = new PopUp();
		popUp.addButtonsFeedbackClickListener();
	});
})();