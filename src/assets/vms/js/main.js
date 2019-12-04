/*--------------------------------------
		CUSTOM FUNCTION WRITE HERE		
--------------------------------------*/
"use strict";
jQuery(function() {	
	/*--------------------------------------
			MOBILE MENU						
	--------------------------------------*/
	function collapseMenu(){
		jQuery('.jf-navigation ul li.menu-item-has-children, .jf-navigation ul li.page_item_has_children, .jf-dashboardnav ul li.menu-item-has-children, .jf-dashboardnav ul li.page_item_has_children, .jf-navigation ul li.menu-item-has-mega-menu').prepend('<span class="jf-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
		
		jQuery('.jf-navigation ul li.menu-item-has-children span, .jf-navigation ul li.page_item_has_children span, .jf-navigation ul li.menu-item-has-mega-menu span').on('click', function() {
			jQuery(this).parent('li').toggleClass('jf-open');
			jQuery(this).next().next().slideToggle(300);
		});
		
		jQuery('.jf-dashboardnav ul li.menu-item-has-children, .jf-dashboardnav ul li.page_item_has_children').on('click', function() {
			jQuery(this).parent('li').toggleClass('jf-open');
			jQuery(this).find('.children').slideToggle(300);
		});
	}
	collapseMenu();
	/* FIXED SIDEBAR */
		function fixedNav(){			
			$(window).scroll(function () {			
			var $pscroll = $(window).scrollTop();						
				if($pscroll > 76){
				 $('.jf-dashboardheader').addClass('jf-fixednav');
				}else{
				 $('.jf-dashboardheader').removeClass('jf-fixednav');
				}
			});
		}
		fixedNav();
	/*--------------------------------------
			DASHBOARD MENU					
	--------------------------------------*/
	if(jQuery('#jf-btnmenutoggle').length > 0){
		jQuery("#jf-btnmenutoggle").on('click', function(event) {
			event.preventDefault();
			jQuery('#jf-wrapper').toggleClass('jf-openmenu');
			jQuery('body').toggleClass('jf-noscroll');
			jQuery('.jf-dashboardnav ul.sub-menu').hide();
		});
	}
	/*--------------------------------------
			COUNTER							
	--------------------------------------*/
	if(jQuery('#jf-counters').length > 0){
		var _jf_counters = jQuery('#jf-counters');
		_jf_counters.appear(function () {
			jQuery('.jf-timer').countTo()
		});
	}
	/*--------------------------------------
			THEME ACCORDION 				
	--------------------------------------*/
	if(jQuery('.jf-panelheading').length > 0){
		var _jf_panelheading = jQuery('.jf-panelheading');
		_jf_panelheading.on('click',function () {
			jQuery('.panel-heading').removeClass('active');
			jQuery(this).parents('.panel-heading').addClass('active');
			jQuery('.panel').removeClass('active');
			jQuery(this).parent().addClass('active');
		});
	}
	/* -------------------------------------
			HOME SLIDER V ONE
	-------------------------------------- */
	var _jf_homeslidervone = jQuery('#jf-homeslidervone');
	if(_jf_homeslidervone.hasClass('jf-homeslidervone')){
		_jf_homeslidervone.owlCarousel({
			items: 1,
			nav:false,
			loop:true,
			dots: false,
			autoplay:false,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			dotsClass: 'jf-sliderdots',
		});
	}
	/* -------------------------------------
			HOME SLIDER V two
	-------------------------------------- */
	var _jf_successstory = jQuery('#jf-successstory');
	if(_jf_successstory.hasClass('jf-successstory')){
		_jf_successstory.owlCarousel({
			items: 1,
			nav:true,
			loop:true,
			dots: false,
			autoplay: false,
			navClass: ['jf-prev', 'jf-next'],
			navContainerClass: 'jf-slidernav',
			navText: ['<span class="fas fa-chevron-left"></span>', '<span class="fas fa-chevron-right"></span>']
		});
	}
	/* -------------------------------------
			TOP COMPANIES SLIDER
	-------------------------------------- */
	var _jf_topcompaniesslider = jQuery('#jf-topcompaniesslider');
	if(_jf_topcompaniesslider.hasClass('jf-topcompanies')){
		_jf_topcompaniesslider.owlCarousel({
			items: 6,
			nav:true,
			loop:true,
			dots: false,
			autoplay: true,
			dotsClass: 'jf-sliderdots',
			navClass: ['jf-prev', 'jf-next'],
			navContainerClass: 'jf-slidernav',
			navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
			responsiveClass:true,
				responsive:{
					0:{
						items:2,
					},
					480:{
						items:3,
					},
					768:{
						items:4,
					},
					992:{
						items:6,
					}
				}
		});
	}
	/* -------------------------------------
			STATISTICS CIRCLE
	-------------------------------------- */
	jQuery('#jf-circleone').circleProgress({
		value: 0.90,
		size: 80,
		fill: {
		gradient: ["#f06292", "#f06292"]
	}
	});
	jQuery('#jf-circletwo').circleProgress({
		value: 0.80,
		size: 80,
		fill: {
		gradient: ["#9575cd", "#9575cd"]
	}
	});
	jQuery('#jf-circlethree').circleProgress({
		value:1,
		size: 80,
		fill: {
		gradient: ["#c6c252", "#c6c252"]
	}
	});
	/* -------------------------------------
			DASHBOARD BOOSTING SLIDER
	-------------------------------------- */
	var _jf_boostingslider = jQuery('#jf-boostingslider');
	if(_jf_boostingslider.hasClass('jf-boostingslider')){
		_jf_boostingslider.owlCarousel({
			items: 1,
			nav:false,
			loop:true,
			dots: false,
			autoplay: true,
		});
	}
	/*--------------------------------------
			THEME VERTICAL SCROLLBAR		
	--------------------------------------*/
	if(jQuery('.jf-verticalscrollbar').length > 0){
		var _jf_verticalscrollbar = jQuery('.jf-verticalscrollbar');
		_jf_verticalscrollbar.mCustomScrollbar({
			axis:"y",
		});
	}
	if(jQuery('.jf-horizontalthemescrollbar').length > 0){
		var _jf_horizontalthemescrollbar = jQuery('.jf-horizontalthemescrollbar');
		_jf_horizontalthemescrollbar.mCustomScrollbar({
			axis:"x",
			advanced:{autoExpandHorizontalScroll:true},
		});
	}
	/* -------------------------------------
			SEARCH CHOSEN
	-------------------------------------- */
	var config = {
		'.chosen-select'           : {},
		'.chosen-select-deselect'  : {allow_single_deselect:true},
		'.chosen-select-no-single' : {disable_search_threshold:10},
		'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
		'.chosen-select-width'     : {width:"95%"}
		}
		for (var selector in config) {
			jQuery(selector).chosen(config[selector]);
	}
	/*--------------------------------------
			Google Map
	--------------------------------------*/
	if(jQuery('#jf-thememap').length > 0){
		var center = [45.7772, 3.0870];
		jQuery('#jf-thememap, #jf-thememapvtwo, #jf-thememapvthree, #jf-thememapbb')
			.gmap3({
				address: 'Clermont-Ferrand, France',
				zoom: 5,
				center: center,
				
		})
		.marker({
			position: center,
			icon: 'images/map-marker.png'
		});
	}
	/* -------------------------------------
			PRETTY PHOTO GALLERY
	-------------------------------------- */
	jQuery("a[data-rel]").each(function () {
		jQuery(this).attr("rel", jQuery(this).data("rel"));
	});
	jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'normal',
		theme: 'dark_square',
		slideshow: 3000,
		autoplay_slideshow: false,
		social_tools: false
	});
	/* -------------------------------------
			THEME ACCORDION
	-------------------------------------- */
	function themeAccordion() {
		jQuery('.jf-panelcontent').hide();
		jQuery('.jf-accordion .jf-paneldetails:first').addClass('active').next().slideDown('slow');
		jQuery('.jf-accordion .jf-paneldetails').on('click',function() {
			if(jQuery(this).next().is(':hidden')) {
				jQuery('.jf-accordion .jf-paneldetails').removeClass('active').next().slideUp('slow');
				jQuery(this).toggleClass('active').next().slideDown('slow');
			}
		});
	}
	themeAccordion();
	/* -------------------------------------
			SCROLL TO TOP
	-------------------------------------- */
	var _jf_btnscrolltop = jQuery(".jf-btnscrolltop");
	_jf_btnscrolltop.on('click', function(){
		var _scrollUp = jQuery('html, body');
		_scrollUp.animate({ scrollTop: 0 }, 'slow');
	});
	/* -------------------------------------
			PROGRESS BAR
	-------------------------------------- */
	appear({
		init: function init(){
			jQuery('.jf-ourskill .jf-skill').each(function(){
				jQuery(this).find('.jf-skillbar').animate({
					width: jQuery(this).find('.jf-skillholder').attr('data-percent')
				}, 2500);
			});
			
		},
	});
	/*--------------------------------------
			THEME COLLAPSE					
	--------------------------------------*/
	jQuery('#jf-narrowsearchcollapse').collapse({
		open: function() {this.slideDown(300);},
		close: function() {this.slideUp(300);},
	});
	jQuery('#jf-narrowsearchcollapse').trigger('close');
	$("#jf-narrowsearchcollapse .jf-themecollapsetitle .jf-widgettitle h3").first().trigger("open")
	/*--------------------------------------
			THEME SIDE BAR COLLAPSE			
	--------------------------------------*/
	jQuery('#jf-narrowsearchcollapsesidebar').collapse({
		open: function() {this.slideDown(300);},
		close: function() {this.slideUp(300);},
	});
	jQuery('#jf-narrowsearchcollapsesidebar').trigger('close');
	$("#jf-narrowsearchcollapsesidebar .jf-themecollapsetitle .jf-widgettitle h3").first().trigger("open")
	/*--------------------------------------
			MAGNIFIC POPUP GALLERY			
	--------------------------------------*/
	if(jQuery('#jf-tabgalleryimgs').length > 0){
		jQuery('#jf-tabgalleryimgs').magnificPopup({
			gallery: {
				enabled: true,
			},
			mainClass: 'mfp-with-zoom',
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			},
			delegate:'a',
			type:'image',
			midClick: true,
			removalDelay: 300,
			mainClass: 'mfp-fade',
		});
	}
	
	/*------------------------------------------
			SIDE NAVIGATION
	------------------------------------------*/
	var _jf_btnopenclose = jQuery('.jf-btnopenclose');
	_jf_btnopenclose.on('click', function () {
		jQuery('#jf-wrapper').toggleClass('jf-sidenavshow');
		if( jQuery('#jf-wrapper').hasClass('jf-sidenavshow') ){
			jQuery('body').addClass('spread-overlay');
			return true;
		}
		jQuery('body').removeClass('spread-overlay');
	});
	var _jf_close = jQuery('.jf-close');
	_jf_close.on('click', function () {
		jQuery('#jf-wrapper').toggleClass('jf-sidenavshow');
		if( jQuery('#jf-wrapper').hasClass('jf-sidenavshow') ){
			jQuery('body').addClass('spread-overlay');
			return true;
		}
		jQuery('body').removeClass('spread-overlay');
	});
    /*-------------------------------------
    		 NAV FUNCTION
     --------------------------------------*/
    function navFunction() {
        $('#jf-closebar').on('click', function (event) {
            event.preventDefault();
            $('#jf-formsearchbar').slideToggle();
        });
    }
    navFunction();
	/* -------------------------------------
					OPEN CLOSE
	-------------------------------------- */
	jQuery('.jf-advancedlink').on('click', function(event){
		var _this = jQuery(this);
		event.preventDefault();
		_this.siblings('.jf-formsearch').slideToggle();
	});		
	/* -------------------------------------
			Delete Rewards Functionality
	-------------------------------------- */
	$(document).on('click', '.delete-btn', function(e){
		e.preventDefault();
		var _this = $(this);
		_this.parents('.jf-jobskill').remove();
	});
	/* -------------------------------------
			PRELOADER
	-------------------------------------- */
	jQuery(document).ready( function($){	   
	    jQuery(".preloader-outer").delay(500).fadeOut();
		jQuery(".loader").delay(1000).fadeOut("slow");		
	});
});	
	/* -------------------------------------
			Testominal Slider
	-------------------------------------- */
	function customerFeedback(){
		var sync1 = jQuery('#jf-feebbackslider');
		var sync2 = jQuery('#jf-authorpicslider');
		var slidesPerPage = 4;
		var syncedSecondary = true;
		sync1.owlCarousel({
			items : 1,
			loop: true,
			nav: true,
			dots: false,
			autoplay: false,
			slideSpeed : 2000,
			responsiveRefreshRate : 200,
			navClass: ['jf-prev', 'jf-next'],
			navContainerClass: 'jf-slidernav',
			navText: ['<span class="lnr lnr-chevron-left"></span>', '<span class="lnr lnr-chevron-right"></span>'],
		}).on('changed.owl.carousel', syncPosition);
		sync2.on('initialized.owl.carousel', function () {
			sync2.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items : slidesPerPage,
			dots: false,
			nav: false,
			margin: 10,
			smartSpeed: 200,
			slideSpeed : 500,
			slideBy: slidesPerPage,
			responsiveRefreshRate : 100,
		}).on('changed.owl.carousel', syncPosition2);
		function syncPosition(el) {
			var count = el.item.count-1;
			var current = Math.round(el.item.index - (el.item.count/2) - .5);
			if(current < 0) {
				current = count;
			}
			if(current > count) {
				current = 0;
			}
			sync2
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current")
			var onscreen = sync2.find('.owl-item.active').length - 1;
			var start = sync2.find('.owl-item.active').first().index();
			var end = sync2.find('.owl-item.active').last().index();
			if (current > end) {
				sync2.data('owl.carousel').to(current, 100, true);
			}
			if (current < start) {
				sync2.data('owl.carousel').to(current - onscreen, 100, true);
			}
		}
		function syncPosition2(el) {
			if(syncedSecondary) {
				var number = el.item.index;
				sync1.data('owl.carousel').to(number, 100, true);
			}
		}
		sync2.on("click", ".owl-item", function(e){
			e.preventDefault();
			var number = jQuery(this).index();
			sync1.data('owl.carousel').to(number, 300, true);
		});
	}
	customerFeedback();
     jQuery(document).on('ready', function(){    
             jQuery(".jf-searchoptions").on('click','.jf-search-type',function(){
				var _this = jQuery(this);
				var _class = _this.data('class');	
			 	_this.parents('.jf-searchoptions').removeClass('js-employer js-candidate js-job').addClass(_class);
		  	 });
		});
	/* -------------------------------------
			SORTABLE
	-------------------------------------- */
	jQuery(function() {
		jQuery('.sortable').sortable();
	});
	/* -------------------------------------
			Responsive Table
	-------------------------------------- */
	jQuery('#table').basictable({
		breakpoint: 800
	});