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
		setTimeout(function () {

			// Получаем активные кнопки фильтра
			const activeButtons = $('.filters__list-item.active');

			// Получаем их значения
			const activeValues = activeButtons.length > 0 ? Array.from(activeButtons).map(button => button.value) : [];

			//! Сначала все карточки скрываются
			const allItems = $('div[data-tag]');
			allItems.css('display', 'none');

			//!-----------------------------------------

			// если есть активные фильтры, производим фильтрацию
			if (activeValues.length > 0) {
				// Если есть активные фильтры, производим фильтрацию

				// Фильтруем элементы
				const filteredItems = allItems.filter((_, item) => {
					const itemDataTag = $(item).data('tag');
					return activeValues.every(value => itemDataTag.includes(value));
				});

				// Отображаем отфильтрованные элементы
				filteredItems.css('display', 'block');


			} else {
				// если нет активных фильтов, показываем первые 6 карточек
				allItems.slice(0, 6).css('display', 'block');
			}

			// Обработка внешнего вида кнопки сброса и кнопки "Загрузить еще"
			if ($('.filters__list-item.active').length > 0) {
				$('.filters__reset').show();
				$('#loadMore').hide();
			} else {
				$('.filters__reset').hide();
				$('#loadMore').show();
			}

			//! Затем обновляем URL с учетом текущих фильтров
			const params = new URLSearchParams(window.location.search);

			if (activeValues.length) {
				params.set('filters', activeValues.join(','));
				window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
			} else {
				params.delete('filters');
				window.history.replaceState({}, '', window.location.pathname);
			}


		}, 300); // 1000ms = 1 second delay

	};
	//!-----------------------------------------
	// Это код, который изначально загрузит активные фильтры из URL при открытии страницы
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
	} else {
		// показываем первые 6 карточек и кнопку "Загрузить еще"
		const allItems = $('div[data-tag]');
		allItems.css('display', 'none');
		allItems.slice(0, 6).css('display', 'block');
		$('#loadMore').show();
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
		// Нужно показать первые 6 карточек после сброса фильтров
		const allItems = $('div[data-tag]');
		allItems.css('display', 'none');
		allItems.slice(0, 6).css('display', 'block');
	});

	// Функциональность кнопки "Загрузить еще"
	$('#loadMore').on('click', function () {

		// Показываем дополнительные карточки товара
		$('div[data-tag]:hidden').slice(0, 6).css('display', 'block');

		// Проверка, если все карточки уже загружены
		if ($('div[data-tag]:hidden').length == 0) {
			// Если все карточки загружены, скрываем кнопку
			$('#loadMore').hide();
		}
	});

});