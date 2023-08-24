$(document).ready(function () {
	// Когда кликаем по dropdown
	$(".dropdown").click(function (e) {
		e.stopPropagation();

		// скрываем все открытые списки
		$(".dropdown-content").hide();

		// показываем содержимое выбранного списка
		$(this).find(".dropdown-content").show();
	});

	// Когда кликаем в любом месте документа, закрываем все списки
	$(document).click(function () {
		$(".dropdown-content").hide();
	});
	// Функция фильтрации
	const applyFilters = function () {

		// Получаем активные кнопки фильтра
		const activeButtons = $('.filters__list-item.active');

		// Получаем их значения
		const activeValues = activeButtons.length > 0 ? Array.from(activeButtons).map(button => button.value) : [];

		// Скрываем все элементы 
		const allItems = $('div[data-tag]');
		allItems.css('display', 'none');

		// если есть активные фильтры, производим фильтрацию
		if (activeValues.length > 0) {

			// Фильтруем элементы
			const filteredItems = allItems.filter((_, item) => {
				const itemDataTag = $(item).data('tag');
				return activeValues.every(value => itemDataTag.includes(value));
			});

			// Отображаем отфильтрованные элементы
			setTimeout(function () {
				filteredItems.css('display', 'block');
			}, 100);
		}
		//Обновляем URL
		const params = new URLSearchParams(window.location.search);
		if (activeValues.length) {
			params.set('filters', activeValues.join(','));
			window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
		} else {
			params.delete('filters');
			window.history.replaceState({}, '', window.location.pathname);
		}

		// Обработка внешнего вида кнопки сброса
		if ($('.filters__list-item.active').length > 0) {
			$('.filters__reset').show();
		} else {
			$('.filters__reset').hide();
		}
	};

	// Получаем параметры из URL
	const params = new URLSearchParams(window.location.search);
	const filters = params.get('filters');

	// При наличии параметров в URL, активируем соответствующие фильтры
	if (filters) {
		const filtersArray = filters.split(',');
		filtersArray.forEach(filter => {
			$(`.filters__list-item[value='${filter}']`).addClass('active');
		});
		// применяем фильтры сразу после загрузки страницы
		applyFilters();
	}

	// при клике на фильтр
	$('.filters__list-item').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		applyFilters();
		// корректируем время задержки по мере необходимости
		setTimeout(() => {
			$(".dropdown-content").hide();
		}, 100);
	});

	// при клике на кнопку сброса
	$('.filters__reset').click(function () {
		$('.filters__list-item.active').removeClass('active');
		applyFilters();
		// Все карточки показываются после сброса фильтров
		const allItems = $('div[data-tag]');
		allItems.css('display', 'block');
	});

});