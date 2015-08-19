$(document).ready(function($) {
	if (!Modernizr.input.placeholder){
		$('input, textarea').placeholder();
	}

	$("body").on('click', '#js-pageTop', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});

	$(".slider__controls-button").on('click', function(e) {
		e.preventDefault();

		var $this = $(this),
			container = $this.closest('.slider'),
			list = container.find('.slider__list'),
			items = container.find('.slider__item'),
			activeSlide = items.filter('.active'),
			nextSlide = activeSlide.next(),
			prevSlide = activeSlide.prev(),
			firstSlide = items.first(),
			lastSlide = items.last(),
			sliderOffset = container.offset().left,
			reqPos = 0;

		if($this.hasClass('slider__controls-next')) {

			if(nextSlide.length) {
				findReqPos(nextSlide);
				removeActiveClass(nextSlide);
			} else {
				findReqPos(firstSlide);
				removeActiveClass(firstSlide);
			}
		} else {

			if(prevSlide.length) {
				findReqPos(prevSlide);
				removeActiveClass(prevSlide);
			} else {
				findReqPos(lastSlide);
				removeActiveClass(lastSlide);
			}
		}

		list.css('left', '-=' + reqPos + 'px');

		function removeActiveClass(reqSlide) {
			reqSlide.addClass('active').siblings().removeClass('active');
		}

		function findReqPos (slide) {
			reqPos = slide.offset().left - sliderOffset;
		}
	});

	$(".select__wrap-btn").on('click', function(e) {
		e.preventDefault();
		var $this = $(this),
			container = $this.closest('.selectFormWrap'),
			list = container.find('.select__wrap');

			list.slideToggle();

	});
	$(".callback__item").on('click', function(e) {
		e.preventDefault();
		var $this = $(this),
			container = $this.closest('.selectFormWrap'),
			list = container.find('.select__wrap'),
			value = container.find('.select__wrap-btn').find("p"),
			valueSelect = container.find('.valueSelect');

			value.text($this.text()).css("color", "#5c7b98");
			valueSelect.attr("value", $this.text());
			list.slideToggle();
	});

	if ($('.popup').length) {
		Popups.init();
	}

	$('#js-form').on('submit', function(e){
		e.preventDefault();

		var
			$this = $(this);

		if (validateThis($this)) {
			postFormData($this, function(data) {
				if (data.status) {
					Popups.open('#success');
				} else {
					Popups.open('#error');
				}
			});
		}
	});
	$('#js-form').on('reset', function(e) {
		e.preventDefault();
		var
			$this = $(this),
			container = $this.closest('#js-form'),
			namePost = container.find('[name]');

			$(namePost).each(function(index, el) {
				$(this).removeClass('error');
			});
	});

});
$(window).on('load', function () {

$(".callback__select").mCustomScrollbar({
		setHeight:240,
		setWidth:47,
	});
});

var Popups = (function(){

	var
		popups = $('.popup');

	function _close() {
		popups.hide();
	}

	return {
		init: function(){
			$('.popup__close, .popup__overlay').on('click', function(e){
				e.preventDefault();

				_close()
			});
		},

		open: function(id) {
			var
				reqPopup = popups.filter(id);

			_close();
			reqPopup.fadeIn(300);
		}
	}
}());

function postFormData(form, successCallback) {
	var
		host = form.attr('action'),
		reqFields = form.find('[name]'),
		dataObject = {};

	if (!host) {
		console.log('set action attribute to your form, you fool!!');
	}

	reqFields.each(function(){
		var
			$this = $(this),
			value = $this.val(),
			name = $this.attr('name');

		dataObject[name] = value;
	});

	$.post(host, dataObject, successCallback);
}

function validateThis(form) {
	var
		textType = form.find("[data-validation='text']"),
		mailType = form.find("[data-validation='mail']");

	textType.each(function(){
		var
			$this = $(this),
			emptyField = $this.val() == '';

		if (emptyField) {
			$this.tooltip({
				content     : 'Заполните поле',
				position    : 'left'
			});

			$this.addClass('error');
		} else {
			$this.removeClass('error');
		}
	});

	mailType.each(function(){
		var
			$this = $(this),
			regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
			isMail = regExp.test($this.val());

		if (isMail) {
			$this.removeClass('error');
		} else {
			$this.tooltip({
				content     : 'Невалидный e-mail',
				position    : 'top'
			});

			$this.addClass('error');
		}
	});


	return form.find('.error').length == 0;
}


$.fn.tooltip = function(options){

	options = {
		position: options.position || 'right',
		content : options.content || "i'am tooltip"
	};

	var
		markup = '<div class="tooltip tooltip_' + options.position + '">' +
					'<div class="tooltip__inner">' + options.content + '</div>' +
				'</div>';

	var
		$this = this,
		body = $('body');

	$this
		.addClass('tooltipstered')
		.attr('data-tooltip-position', options.position);

	body.append(markup);

	_positionIt($this, body.find('.tooltip').last(), options.position);

	$(document).on('click', function(){
		$('.tooltip').remove();
	});

	$(window).resize(function(){
		var
			tooltips = $('.tooltip');

		var
			tooltipsArray = [];

		tooltips.each(function(){
			tooltipsArray.push($(this));
		});

		$('.tooltipstered').each(function(index){
			var
				position = $(this).data('tooltip-position');

			_positionIt($(this), tooltipsArray[index], position);
		});
	});


	function _positionIt(elem, tooltip, position) {

		// измеряем элемент

		var
			elemWidth = elem.outerWidth(true),
			elemHeight = elem.outerHeight(true),
			topEdge = elem.offset().top,
			bottomEdge = topEdge + elemHeight,
			leftEdge = elem.offset().left,
			rigthEdge = leftEdge + elemWidth;

		// измеряем тултип

		var
			tooltipWidth = tooltip.outerWidth(true),
			tooltipHeight = elem.outerHeight(true),
			leftCentered = (elemWidth / 2) - (tooltipWidth / 2),
			topCentered = (elemHeight / 2) - (tooltipHeight / 2);

		var
			positions = {};

		switch(position) {
			case 'right' :
				positions = {
					left: rigthEdge,
					top : topEdge + topCentered
				};
				break;
			case 'top' :
				positions = {
					left: leftEdge + leftCentered,
					top : topEdge - tooltipHeight
				};
				break;
			case 'bottom' :
				positions = {
					left : leftEdge + leftCentered,
					top : bottomEdge
				};
				break;
			case 'left' :
				positions = {
					left : leftEdge - tooltipWidth,
					top : topEdge + topCentered
				};
				break;
		}

		tooltip
			.offset(positions)
			.css('opacity', '1');
	}
};