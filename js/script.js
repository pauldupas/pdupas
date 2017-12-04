/* ______________________________________________
-------------- Smooth scroll bro --------------
______________________________________________ */
$(document).ready(function() {
  $('.scroll').on('click', function() { // Au clic sur un élément
    var page = $(this).attr('href'); // Page cible
    var speed = 1000; // Durée de l'animation (en ms)
    $('html, body').animate( { scrollTop: $(page).offset().top }, speed );
    return false;
  });
});



/* ______________________________________________
-------------- Toggle menu mobile --------------
______________________________________________ */
function MonDD() {
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


/* ______________________________________________
------------- HEADROOM When scroll -------------
______________________________________________ */
var scrollTimeOut = true,
    lastYPos = 0,
    yPos = 0,
    yPosDelta = 5,
    nav = $('section.navbar'),
    navHeight = nav.outerHeight(),
    setNavClass = function() {
        scrollTimeOut = false;
        yPos = $(window).scrollTop();

        if(Math.abs(lastYPos - yPos) >= yPosDelta) {
            if (yPos > lastYPos && yPos > navHeight){
                nav.addClass('hide-nav');
            } else {
                nav.removeClass('hide-nav');
            }
            lastYPos = yPos;
        }
    };

$(window).scroll(function(e){
    scrollTimeOut = true;
});

setInterval(function() {
    if (scrollTimeOut) {
        setNavClass();
    }

}, 250);



/* ______________________________________________
--- Ayy lemme count all dem checkboxes my dudes ---
______________________________________________ */

window.up1 = function() {
    var x = $(".c1:checked").length;
    document.getElementById("y").innerHTML = x;
};

window.up2 = function() {
    var x = $(".c2:checked").length;
    document.getElementById("b").innerHTML = x;
};

window.tot = function() {
    var x = $(".chk:checked").length;
    document.getElementById("score").innerHTML = x;
};



/* ______________________________________________
--------------- Menu optimisation --------------
______________________________________________ */
jQuery(document).ready(function($){
	var articlesWrapper = $('.cd-articles');

	if( articlesWrapper.length > 0 ) {
		// cache jQuery objects
		var windowHeight = $(window).height(),
			articles = articlesWrapper.find('article'),
			aside = $('.cd-read-more'),
			articleSidebarLinks = aside.find('li');
		// initialize variables
		var	scrolling = false,
			sidebarAnimation = false,
			resizing = false,
			mq = checkMQ(),
			svgCircleLength = parseInt(Math.PI*(articleSidebarLinks.eq(0).find('circle').attr('r')*2));

		// check media query and bind corresponding events
		if( mq == 'desktop' ) {
			$(window).on('scroll', checkRead);
			$(window).on('scroll', checkSidebar);
		}

		$(window).on('resize', resetScroll);

		updateArticle();
		updateSidebarPosition();

		aside.on('click', 'a', function(event){
			event.preventDefault();
			var selectedArticle = articles.eq($(this).parent('li').index()),
				selectedArticleTop = selectedArticle.offset().top;

			$(window).off('scroll', checkRead);

			$('body,html').animate(
				{'scrollTop': selectedArticleTop + 2},
				300, function(){
					checkRead();
					$(window).on('scroll', checkRead);
				}
			);
	    });
	}

	function checkRead() {
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(updateArticle, 300) : window.requestAnimationFrame(updateArticle);
		}
	}

	function checkSidebar() {
		if( !sidebarAnimation ) {
			sidebarAnimation = true;
			(!window.requestAnimationFrame) ? setTimeout(updateSidebarPosition, 300) : window.requestAnimationFrame(updateSidebarPosition);
		}
	}

	function resetScroll() {
		if( !resizing ) {
			resizing = true;
			(!window.requestAnimationFrame) ? setTimeout(updateParams, 300) : window.requestAnimationFrame(updateParams);
		}
	}

	function updateParams() {
		windowHeight = $(window).height();
		mq = checkMQ();
		$(window).off('scroll', checkRead);
		$(window).off('scroll', checkSidebar);

		if( mq == 'desktop') {
			$(window).on('scroll', checkRead);
			$(window).on('scroll', checkSidebar);
		}
		resizing = false;
	}

	function updateArticle() {
		var scrollTop = $(window).scrollTop();

		articles.each(function(){
			var article = $(this),
				articleTop = article.offset().top,
				articleHeight = article.outerHeight(),
				articleSidebarLink = articleSidebarLinks.eq(article.index()).children('a');

			if( article.is(':last-of-type') ) articleHeight = articleHeight - windowHeight;

			if( articleTop > scrollTop) {
				articleSidebarLink.removeClass('read reading');
			} else if( scrollTop >= articleTop && articleTop + articleHeight > scrollTop) {
				var dashoffsetValue = svgCircleLength*( 1 - (scrollTop - articleTop)/articleHeight);
				articleSidebarLink.addClass('reading').removeClass('read').find('circle').attr({ 'stroke-dashoffset': dashoffsetValue });
				changeUrl(articleSidebarLink.attr('href'));
			} else {
				articleSidebarLink.removeClass('reading').addClass('read');
			}
		});
		scrolling = false;
	}

	function updateSidebarPosition() {
		var articlesWrapperTop = articlesWrapper.offset().top,
			articlesWrapperHeight = articlesWrapper.outerHeight(),
			scrollTop = $(window).scrollTop();

		if( scrollTop < articlesWrapperTop) {
			aside.addClass('fixed').attr('style', '');
		} else if( scrollTop >= articlesWrapperTop && scrollTop < articlesWrapperTop + articlesWrapperHeight - windowHeight) {
			aside.addClass('fixed').attr('style', '');
		} else {
			var articlePaddingTop = Number(articles.eq(1).css('padding-top').replace('px', ''));
			if( aside.hasClass('fixed') ) aside.addClass('fixed').css('top', articlesWrapperHeight + articlePaddingTop - windowHeight + 'px');
		}
		sidebarAnimation =  false;
	}

	function changeUrl(link) {
		var pageArray = location.pathname.split('/'),
        	actualPage = pageArray[pageArray.length - 1] ;
        if( actualPage != link && history.pushState ) window.history.pushState({path: link},'',link);
	}

	function checkMQ() {
		return window.getComputedStyle(articlesWrapper.get(0), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});


/* ______________________________________________
----------- Cacher scroll indicator -----------
______________________________________________ */
$(window).scroll(function(){
  var sticky = $('.scroll-wrap'),
      scroll = $(window).scrollTop();

  if (scroll >= 300) sticky.addClass('scroll-wrap-hidden');
  else sticky.removeClass('scroll-wrap-hidden');
});
