'use strict';

/**
 * Этот класс будет хранить в себе информацию об этапах работы
 */
class StepDTO {
	/**
	 * @param {number} id уникальный идентификатор каждого этапа
	 * @param {number} number номер этапа
	 * @param {string} name название этапа
	 * @param {string} description описание этапа
	 */
	constructor(id, number, name, description) {
		this.id = id;
		this.number = number;
		this.name = name;
		this.description = description;
	}
}