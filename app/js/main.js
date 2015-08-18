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
			value = container.find('.select__wrap-btn').find("p");

			value.text($this.text()).css("color", "#5c7b98");
			list.slideToggle();
	});

});
$(window).on('load', function () {

$(".callback__select").mCustomScrollbar({
		setHeight:240,
		setWidth:47,
	});
});