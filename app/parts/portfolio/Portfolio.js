(function () {
	'use strict';

	/**
	 * Класс для отрисовки портфолио
	 */
	class Portfolio {
		constructor() {
			this.pathToWorksImages = 'img/dist/works';
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');
			this.wrapperEl = document.querySelector('#portfolio-slider .swiper-wrapper');
			this.acceptedEl = document.querySelector('.accepted');
			this.portfolioEl = document.querySelector('.portfolio');
			this.moreEl = document.querySelector('.portfolio__more');

			this.settings = {
				slidesPerView: 'auto',
				speed: 1200,
				freeMode: true,
				scrollbar: {
					el: '.swiper-scrollbar',
					draggable: true,
				},
				breakpoints: {
					320: {
						spaceBetween: 5,
					},
					993: {
						spaceBetween: 0,
					}
				}
			};

			this.numberOfCardsOnDesktop = 8;
			this.numberOfCardsOnTablet = 6;
		}

		/**
		 * Метод вставляет портфолио на страницу
		 * @param {WorkDTO[]} works массив выполненных работ из файла works.js
		 */
		insertPortfolioIntoPage(works) {
			this.insertProjectsIntoPage(works);
			this.addProjectsClickListener(works);
			let sliderPortfolio = this.addSliderPortfolio();
			this.checkWidthWidth(sliderPortfolio);
			this.setHeightCards();
			this.addButtonMore(works);

			window.addEventListener('resize', () => {
				this.insertProjectsIntoPage(works);
				this.addProjectsClickListener(works);
				sliderPortfolio.update();
				this.checkWidthWidth(sliderPortfolio);
				this.setHeightCards();
				this.addButtonMore(works);
			});
		}

		/**
		 * Метод вставляет проекты на страницу
		 * @param {WorkDTO[]} works массив выполненных работ из файла works.js
		 */
		insertProjectsIntoPage(works) {
			let windowWidth = window.innerWidth;
			let projectsMarkup = '';
			this.wrapperEl.innerHTML = '';
			let count = 0;

			for (let work of works) {
				if (windowWidth > 1366 && count < this.numberOfCardsOnDesktop) {
					projectsMarkup += this.getCardMarkup(work);
					count++;
				} else if (windowWidth <= 1366 && windowWidth > 992 && count < this.numberOfCardsOnTablet) {
					projectsMarkup += this.getCardMarkup(work);
					count++;
				} else if (windowWidth <= 992) {
					projectsMarkup += this.getCardMarkup(work);
				}
			}

			this.wrapperEl.insertAdjacentHTML('beforeend', projectsMarkup);
		}

		/**
		 * Метод получает разметку карточки выполненной работы
		 * @param {WorkDTO} work объект с информацией о выполненной работе
		 * @returns {string} html-разметка карточки выполненной работы
		 */
		getCardMarkup(work) {
			return `
			<div class="swiper-slide">
				<img src="${this.pathToWorksImages}/${work.id}/${work.image}" width="421" height="440" alt="${work.name}" class="portfolio__item" data-id="${work.id}">
			</div>`;
		}

		/**
		 * Метод добавляет проектам слушатель события клика
		 * @param {WorkDTO[]} works массив выполненных работ из файла works.js
		 */
		addProjectsClickListener(works) {
			let cardsElems = document.querySelectorAll('.portfolio__item');

			cardsElems.forEach((card) => {
				for (let work of works) {
					if (card.dataset.id == work.id) {
						card.addEventListener('click', () => {
							let popUpWithFullImage = this.getPopUpWithFullImage(work);
							this.popUpOverlayEl.classList.add('active-pop-up');
							this.acceptedEl.insertAdjacentHTML('beforebegin', popUpWithFullImage);
							this.addCloseElemsClickListener();
							this.addImagesElemsClickListener();
						});
					}
				}
			});
		}

		/**
		 * Метод получает поп-ап с полной картинкой
		 * @param {WorkDTO} work объект с информацией о выполненной работе
		 * @returns {string} html-разметка поп-апа с полной картинкой
		 */
		getPopUpWithFullImage(work) {
			return `
			<div class="image">
				<div class="image__body">
					<img src="${this.pathToWorksImages}/${work.id}/${work.imageBig}" alt="${work.name}" width="1500" height="1058" class="image__picture">
				</div>
				<button class="image__close" type="button">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="image__close-icon">
						<path d="M1.2915 1.29163L16.7082 16.7083" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M16.7082 1.29163L1.2915 16.7083" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>`;
		}

		/**
		 * Метод добавляет "Крестикам" слушатель события клика
		 */
		addCloseElemsClickListener() {
			let imagesCloseElems = document.querySelectorAll('.image__close');
			imagesCloseElems.forEach((imageCloseEl) => {
				imageCloseEl.addEventListener('click', () => {
					let imageEl = imageCloseEl.closest('.image');
					this.popUpOverlayEl.classList.remove('active-pop-up');
					imageEl.style.display = 'none';
				});
			});
		}

		/**
		 * При клике на затемненный фон всплывающее окно с картинкой закрывается
		 */
		addImagesElemsClickListener() {
			let imagesElems = document.querySelectorAll('.image');
			imagesElems.forEach((imageEl) => {
				imageEl.addEventListener('click', (event) => {
					let imageBodyEl = imageEl.querySelector('.image__body');
					if (event.target == imageBodyEl) {
						this.popUpOverlayEl.classList.remove('active-pop-up');
						imageEl.style.display = 'none';
					}
				})
			});
		}

		/**
		 * Метод добавляет слайдер портфолио
		 * @returns {Swiper} sliderPortfolio слайдер портфолио
		 */
		addSliderPortfolio() {
			let sliderPortfolio = new Swiper('#portfolio-slider', this.settings);
			return sliderPortfolio;
		}

		/**
		 * Метод проверяет ширину экрана
		 * @param {Swiper} sliderPortfolio слайдер портфолио
		 */
		checkWidthWidth(sliderPortfolio) {
			let windowWidth = +this.portfolioEl.getBoundingClientRect().width.toFixed(1);

			if (windowWidth > 992) {
				sliderPortfolio.allowTouchMove = false;
			} else {
				sliderPortfolio.allowTouchMove = true;
			}
		}

		/**
		 * Метод устанавливает высоту карточкам
		 */
		setHeightCards() {
			let itemsElems = document.querySelectorAll('.portfolio .portfolio__item');

			itemsElems.forEach((itemEl) => {
				let widthImgEl = itemEl.offsetWidth;
				itemEl.style.height = `${widthImgEl}px`;
			});
		}

		/**
		 * Метод добавляет кнопке "Смотреть еще" видимость, если не все карточки отображены на странице
		 * @param {WorkDTO[]} works массив выполненных работ из файла works.js
		 */
		addButtonMore(works) {
			let numberCards = document.querySelectorAll('.portfolio .portfolio__item').length;

			let countWorks = works.length;

			if (countWorks > numberCards) {
				this.moreEl.style.display = 'block';
			} else {
				this.moreEl.style.display = 'none';
			}

			this.addButtonMoreClickListener(works);
		}

		/**
		 * Метод добавляет кнопке "Смотреть еще" слушатель события клика
		 * @param {WorkDTO[]} works массив выполненных работ из файла works.js
		 */
		addButtonMoreClickListener(works) {
			this.moreEl.addEventListener('click', () => {
				let projectsMarkup = '';
				this.wrapperEl.innerHTML = '';

				for (let work of works) {
					projectsMarkup += this.getCardMarkup(work);
				}

				this.wrapperEl.insertAdjacentHTML('beforeend', projectsMarkup);
				this.addProjectsClickListener(works);
				this.setHeightCards();

				this.moreEl.style.display = 'none';
			});
		}

		/**
		 * Метод находит число выполненных
		 * @param {WorkDTO[]} works массив выполненных работ из файла works.js
		 * @param {string} type тип работы
		 * @returns {number} количество выполненных работ
		 */
		findNumberWorks(works, type) {
			return works.filter(function (work) {
				return work.type == type;
			}).length;
		}
	}

	window.addEventListener('load', () => {
		let portfolio = new Portfolio();
		portfolio.insertPortfolioIntoPage(works);
	});
})();