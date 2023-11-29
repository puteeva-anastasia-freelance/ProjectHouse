$(window).on('load', function () {
	$('a.main-header__link[href*="#"], a.main-footer__link[href*="#"], .first a[href*="#"]').click(function () {
		let headerHeight = 0;

		if ($(window).width() >= 992) {
			headerHeight = $('.main-header__menu').outerHeight();
		} else {
			headerHeight = $('.main-header').outerHeight();
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - headerHeight - 25
		}, 'slow', 'swing');
		return false;
	});

	$('.to-top').click(function () {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 'slow', 'swing');
	});

	$('html').on('submit', '.form-application', function (e) {
		e.preventDefault();
		let form = $(this);
		$.ajax({
			url: '/form-application.php',
			type: 'POST',
			data: form.serialize(),
			dataType: 'html',
			success: function (data) {
				$(".pop-up__close").trigger("click");
				$("#accepted-hidden").trigger("click");
			}
		});
	});

	$('html').on('submit', '.form-calculator', function (e) {
		e.preventDefault();
		var form = $(this);
		$.ajax({
			url: '/form-calculator.php',
			type: 'POST',
			data: form.serialize(),
			dataType: 'html',
			success: function (data) {
				$("#accepted-hidden").trigger("click");
			}
		});
	});
});