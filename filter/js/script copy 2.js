$(document).ready(function () {
	//...
	// Функция фильтрации
	const applyFilters = function () {
		//	...
		// Фильтруем элементы
		const filteredItems = allItems.filter((_, item) => {
			const itemDataTag = $(item).data('tag');
			return activeValues.every(value => itemDataTag.includes(value));
		});

		// Если после фильтрации ничего не найдено
		if (filteredItems.length == 0) {
			// Добавляем сообщение заглушку
			$(".uk-grid").append('<div>Ничего не найдено</div>');
		} else {
			// Удаляем сообщение заглушку, если оно присутствует
			$(".uk-grid").find('div:contains("Ничего не найдено")').remove();

			// Отображаем первые 6 отфильтрованных элементов
			setTimeout(function () {
				filteredItems.slice(0, 6).css('display', 'block');
			}, 100);
		}
		//	...
	};
	// ...

	// Клик на кнопку "Загрузить еще"
	$('#loadMore').on('click', function () {
		const currentlyVisible = $('div[data-tag]:visible').length;

		// Показываем дополнительные карточки товара
		$('div[data-tag]:hidden').slice(0, 6).css('display', 'block');

		// Проверяем, все ли карточки уже загружены 
		if ($('div[data-tag]:hidden').length == 0) {
			// Если все карточки загружены, скрываем кнопку
			$('#loadMore').hide();
		}
	});
});