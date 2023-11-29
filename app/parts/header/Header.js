(function () {
	'use strict';

	/**
	 * Класс для отрисовки хедера 
	 */
	class Header {
		constructor() {
			this.mobileBurgerEl = document.querySelector('.main-header__mobile-burger');
			this.mobileMenuEl = document.querySelector('.main-header__mobile-menu');
			this.popUpOverlayEl = document.querySelector('.pop-up__overlay');
			this.linkElems = document.querySelectorAll('.main-header__link');
			this.mainHeaderEl = document.querySelector('.main-header');
			this.firstEl = document.querySelector('.first');
			this.sectionsElems = document.querySelectorAll('header, section, footer');
			this.bottomFixedEl = document.querySelector('.main-header__bottom.fixed');
		}

		/**
		 * Инициализация хедера 
		 */
		init() {
			this.addMobileBurgerClickListener();
			this.setMobileMenuTop();
			this.setMobileMenuHeight();
			this.addWindowResizeListener();
			this.addLinksClickListener();
			this.addWindowScrollListener();
		}

		/**
		 * Метод добавляет бургеру меню слушатель события клика
		 */
		addMobileBurgerClickListener() {
			this.mobileBurgerEl.addEventListener('click', () => {
				this.mainHeaderEl.classList.toggle('active');
				this.mobileMenuEl.classList.toggle('active');
				this.popUpOverlayEl.classList.toggle('active-mobile-menu');
				this.mobileBurgerEl.classList.toggle('cross');
				this.addPopUpOverlayElClickListener();
			});
		}

		/**
		 * Метод устанавливает мобильному меню расстояние от верхней границы
		 */
		setMobileMenuTop() {
			let mainHeaderHeight = this.mainHeaderEl.clientHeight;
			this.mobileMenuEl.style.top = `${mainHeaderHeight}px`;
		}

		/**
		 * Метод устанавливает мобильному меню высоту
		 */
		setMobileMenuHeight() {
			let windowHeight = window.innerHeight;
			let mainHeaderHeight = this.mainHeaderEl.clientHeight;
			let mobileMenuHeight = this.mobileMenuEl.clientHeight;

			if (windowHeight - mainHeaderHeight > mobileMenuHeight) {
				this.mobileMenuEl.style.height = `${windowHeight - mainHeaderHeight}px`;
			}
		}

		/**
		 * Метод добавляет окну браузера слушатель события изменения размеров окна браузера
		 */
		addWindowResizeListener() {
			window.addEventListener('resize', () => {
				this.setMobileMenuHeight();
				this.setMobileMenuTop();
			});
		}

		/**
		 * Метод добавляет ссылкам мобильного меню слушатель события клика
		 */
		addLinksClickListener() {
			this.linkElems.forEach((linkEl) => {
				linkEl.addEventListener('click', () => {
					this.popUpOverlayEl.classList.remove('active-mobile-menu');
					this.mobileMenuEl.classList.remove('active');
					this.mobileBurgerEl.classList.remove('cross');
					this.mainHeaderEl.classList.remove('active');
				})
			});
		}

		/**
		 * Метод добавляет окну браузера слушатель события скролла
		 */
		addWindowScrollListener() {
			window.addEventListener('scroll', () => {
				this.setPinnedMenu();
				this.highlightNameOfCurrentSection();
			});
		}

		/**
		 * Метод устанавливает закрепленное меню
		 */
		setPinnedMenu() {
			if (window.scrollY > 150) {
				this.bottomFixedEl.classList.add('active');
			} else if (window.scrollY <= 150) {
				this.bottomFixedEl.classList.remove('active');
			}
		}

		/**
		 * Метод выделяет название текущей секции в закрепленном меню
		 */
		highlightNameOfCurrentSection() {
			this.sectionsElems.forEach((section) => {
				let rect = section.getBoundingClientRect();
				let top = rect.top + window.pageYOffset - this.bottomFixedEl.offsetHeight;
				let bottom = top + rect.height;
				let scroll = window.pageYOffset;
				let id = section.getAttribute('id');
				let activeLink = document.querySelector('a.active');
				let targetLink = document.querySelector(`.main-header__bottom.fixed a[data-section="${id}"]`);

				if (scroll > top && scroll < bottom) {
					if (activeLink) {
						activeLink.classList.remove("active");
					}
					if (targetLink) {
						targetLink.classList.add("active");
					}
				}
			})
		}

		/**
		 * Метод добавляет затемненному меню слушатель события клика
		 */
		addPopUpOverlayElClickListener() {
			this.popUpOverlayEl.addEventListener('click', (event) => {
				if (event.target == this.popUpOverlayEl) {
					this.popUpOverlayEl.classList.remove('active-mobile-menu');
					this.mobileMenuEl.classList.remove('active');
					this.mobileBurgerEl.classList.remove('cross');
					this.mainHeaderEl.classList.remove('active');
				}
			})
		}
	}

	window.addEventListener('load', () => {
		let header = new Header();
		header.init();
	});
})();