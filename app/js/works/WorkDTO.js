'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретной работе
 */
class WorkDTO {
	/**
	 * @param {number} id уникальный идентификатор каждой работы
	 * @param {string} name название работы
	 * @param {string} image название файла с картинкой
	 * @param {string} imageBig название файла с картинкой при открытии на весь экран
	 * @param {string} imageSmall название файла с картинкой для разрешения < 576px
	 */
	constructor(id, name, image, imageBig, imageSmall) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.imageBig = imageBig;
		this.imageSmall = imageSmall;
	}
}