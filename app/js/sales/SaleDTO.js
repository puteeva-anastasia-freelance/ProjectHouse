'use strict';

/**
 * Этот класс будет хранить в себе информацию о конкретной скидке
 */
class SaleDTO {
	/**
	 * @param {number} id уникальный идентификатор каждой скидки
	 * @param {number} percent процент скидки
	 * @param {string} name название услуги, на которую распространяется данная скидка
	 * @param {string} term срок действия скидки
	 */
	constructor(id, percent, name, term) {
		this.id = id;
		this.percent = percent;
		this.name = name;
		this.term = term;
	}
}