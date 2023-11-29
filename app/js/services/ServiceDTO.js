'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретной услуге
 */
class ServiceDTO {
	/**
	 * @param {number} id уникальный идентификатор каждой услуги
	 * @param {string} name название услуги
	 * @param {string | null} price стоимость услуги
	 * @param {string | null} description описание услуги
	 * @param {string | null} image название файла с картинкой
	 */
	constructor(id, name, price, description, image) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.image = image;
	}
}