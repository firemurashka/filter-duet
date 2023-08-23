$(document).ready(function () {

	const applyFilters = function () {
		// get active style and configuration buttons
		const styleButton = $('.filters__list-style-item.active');
		const configButtons = $('.filters__list-configuration-item.active');

		// get their values
		const styleValue = styleButton.length > 0 ? styleButton[0].value : null;
		const configValues = configButtons.length > 0 ? Array.from(configButtons).map(button => button.value) : [];

		// hide all items 
		const allItems = $('div[data-tag]');
		allItems.css('display', 'none');

		// filter items
		const filteredItems = allItems.filter((_, item) => {
			const itemDataTag = $(item).data('tag');
			// check style
			if (styleValue && !itemDataTag.includes(styleValue)) {
				return false;
			}
			// check configurations
			if (configValues.some(configValue => !itemDataTag.includes(configValue))) {
				return false;
			}
			return true;
		});

		// display filtered items
		setTimeout(function () {
			filteredItems.css('display', 'block');
		}, 100);



		// добавляем параметры в URL------------------------------------
		const params = new URLSearchParams(window.location.search);

		if (styleValue) {
			params.set('style', styleValue);
		} else {
			params.delete('style');  // удалить параметр, если нет активного стиля
		}

		if (configValues.length) {
			params.set('configurations', configValues.join(','));
		} else {
			params.delete('configurations');  // удалить параметр, если нет активной конфигурации
		}

		window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
		//-------------------------------------------------------
	};

	$('.filters__list-style-item, .filters__list-configuration-item').click(function (e) {
		 // Code for when a filter is clicked
	});

	$('.filters__reset').click(function () {
		$('.filters__list-style-item, .filters__list-configuration-item').removeClass('active');
		applyFilters();
		$('.filters__reset').hide(); // Скрыть кнопку сброса после сброса

	});

	const $cards = $('[data-tag]'); 
	const showPerClick = 6; 
	
	$cards.hide(); 

	function showCards(count) {
		 $cards.slice(0, count).fadeIn(600);
	}

	showCards(showPerClick); 

	$('#loadMore').on('click', function() { 
		const currentlyVisible = $cards.filter(':visible').length; 

		showCards(currentlyVisible + showPerClick); 

		$('html, body').animate({
			 scrollTop: $cards.eq(currentlyVisible).offset().top
		}, 500);
		
		// проверяем, все ли карточки уже загружены 
		if ($cards.length <= currentlyVisible + showPerClick) {
			 // если все карточки загружены, скрываем кнопку
			 $('#loadMore').hide(); 
		}
  });
});