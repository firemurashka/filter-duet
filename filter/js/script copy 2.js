/* Стиль */
$("#dropdown-style").click(function (e) {
	e.stopPropagation();
	$("#dropdown-content-style").show();
});

$(document).click(function () {
	$("#dropdown-content-style").hide();
});


/* Цвет  */
$("#dropdown-color").click(function (e) {
	e.stopPropagation();
	$("#dropdown-content-color").show();
});

$(document).click(function () {
	$("#dropdown-content-color").hide();
});


/* Конфигурация */
$("#dropdown-config").click(function (e) {
	e.stopPropagation();
	$("#dropdown-content-config").show();
});

$(document).click(function () {
	$("#dropdown-content-config").hide();
});


/* Дизайн */
$("#dropdown-design").click(function (e) {
	e.stopPropagation();
	$("#dropdown-content-design").show();
});

$(document).click(function () {
	$("#dropdown-content-design").hide();
});

$(".dropdown").click(function (e) {
	e.stopPropagation();

	// скрываем все открытые списки
	$(".dropdown-content").hide();

	// показываем содержимое выбранного списка
	$(this).find(".dropdown-content").show();
});

$(document).click(function () {
	$(".dropdown-content").hide();
});


$(document).ready(function () {
	const params = new URLSearchParams(window.location.search);
	const filters = params.get('filters');

	// Если есть параметры в URL, мы ищем соответствующий фильтр и делаем его активным
	if (filters) {
		const filtersArray = filters.split(',');
		filtersArray.forEach(filter => {
			$(`.filters__list-item[value='${filter}']`).addClass('active');
		});
		applyFilters(); // Вызываем функцию applyFilters для применения фильтров.

	}
	const applyFilters = function () {

		// получение активных кнопок стиля и конфигурации
		const activeButtons = $('.filters__list-item.active');

		// получаем их значения
		const activeValues = activeButtons.length > 0 ? Array.from(activeButtons).map(button => button.value) : [];

		// скрываем все элементы 
		const allItems = $('div[data-tag]');
		allItems.css('display', 'none');

		// фильтрация элементов
		const filteredItems = allItems.filter((_, item) => {
			const itemDataTag = $(item).data('tag');
			if (activeValues.some(value => !itemDataTag.includes(value))) {
				return false;
			}
			return true;
		});

		// отображаем отфильтрованные элементы
		setTimeout(function () {
			filteredItems.css('display', 'block');
		}, 100);


		if (activeValues.length) {
			params.set('filters', activeValues.join(','));
			window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
		} else {
			params.delete('filters');
			window.history.replaceState({}, '', `${window.location.pathname}`);
		}
	};


	$('.filters__list-item').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		applyFilters();

		// корректируем время задержки по мере необходимости
		setTimeout(() => {
			$(".dropdown-content").hide();
		}, 100);
		// Проверяем наличие активного класса
		if ($('.filters__list-item.active').length > 0) {
			$('.filters__reset').show();
		} else {
			$('.filters__reset').hide();
		}

	});

	// Скрыть кнопку сброса после сброса
	$('.filters__reset').click(function () {
		$('.filters__list-item').removeClass('active');
		applyFilters();
		$('.filters__reset').hide();
	});

});
