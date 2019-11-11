$(function() {

// For video-banner
  var video_modal = $('.videoModalForm').remodal();
  $('#banner-video-play').click(function(){
    if (screen.width > 1024) { 
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $('#video-banner').get(0).play();
      $('.banner__shadow').addClass('active');
      $('.banner').addClass('active');
    }else{
      $(this).removeClass('active');
      $('#video-banner').get(0).pause(); 
      $('.banner__shadow').removeClass('active');
      $('.banner').removeClass('active');
    }}else{
      $('.videoModalForm video').attr('src', $('#video-banner source').attr('src'));
      video_modal.open(); 
    } 
  });
  $(document).on('closing', '.videoModalForm', function (e) {
    $(this).find('video').get(0).pause();
  });

// For header
$(window).scroll(function() {
  if ($(this).scrollTop() > $('header').height()) {$('header').addClass('active');}
  else{   
    $('header').removeClass('active');
  }
  if (screen.width < 767) { 
    if ($(this).scrollTop() > $('.header-mob').height()) {$('.header-mob').addClass('active');}
    else{$('.header-mob').removeClass('active');}
  }
  if ($(this).scrollTop() > $('.banner').height()) {
    if (screen.width > 1024) {   
    $('#banner-video-play').removeClass('active');
    $('.banner__shadow').removeClass('active');
    $('.banner').removeClass('active');   
    $('#video-banner').get(0).pause();}      
  } else {  
    
  }; 
});

// For menu
$('#header_menu_btn').click(function(){
    $('header').show().addClass('active');
  });
  $('nav a').click(function(){  
    $('header').hide().removeClass('active');
  });  
  $('.header__btn').click(function(){       
    $('header').hide().removeClass('active'); 
  });
  $('#menu_out').click(function(){
    $('header').hide().removeClass('active');
  });

// For smooth scrolling to anchors
$(document).ready(function() {
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if ( 
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        
        $('html, body').animate({ 
          scrollTop: target.offset().top - 10
        }, 700, function() {
          var $target = $(target); 
          if ($target.is(":focus")) { 
            return false;
          } else {
            $target.attr('tabindex','-1'); 
          };
        });
      }
    } 
  }); });

// Animations on scroll
  var $animation_elements = $('.animation-element');
  var $window = $(window);
  var check_if_in_view = function() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position - 100 <= window_bottom_position)) {
            $element.addClass('in-view');
      } else {
        // $element.removeClass('in-view');
      }
    });
  }
  check_if_in_view();
  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

// For banner callback
$('.banner__callback').click(function(){
  $(this).addClass('active');
  $('.banner__callback__form').slideDown();
});
$('.banner__callback__out').click(function(){
  $('.banner__callback').removeClass('active');
  $('.banner__callback__form').slideUp();
});

// For slider (reviews)  
$('.reviews__gallery').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  speed: 900,
  cssEase: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
  asNavFor: '.reviews__comments__list'
});
$('.reviews__comments__list').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  speed: 900,
  asNavFor: '.reviews__gallery',
  prevArrow: $('.reviews__btn.prev'),    
  nextArrow: $('.reviews__btn.next'),
  dots: true,
  cssEase: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)', 
  focusOnSelect: true
});

// For services list 
$('.services__item__heading').click(function(){
  if($(this).hasClass('active')){
    $(this).removeClass('active').parent().find('.services__item__content').slideUp();
  }else{
    $(this).addClass('active').parent().find('.services__item__content').slideDown();
  }
});

// For gallery rooms
var sliders = [];

$('.rooms__item__gallery.swiper-container').each(function(index, element){  
    $(this).addClass('s'+index);
    var slider = new Swiper('.s'+index, {
      loop: true,
  slidesPerView: 1, 
  pagination: {
    el: '.s'+index+' .swiper-pagination',
    clickable: true,
  },    
    }); 
    sliders.push(slider);
}); 


const breakpoint = window.matchMedia( '(max-width:1024px)' );
var mySwiper;
const breakpointChecker = function() {  
   if ( breakpoint.matches === true ) {
      $('.rooms__list .rooms-container').removeClass('swiper-container');
      $('.rooms__list .rooms-container .rooms-wrapper').removeClass('swiper-wrapper');  
      $('.rooms__item').removeClass('swiper-slide'); 
   return;   
     } else if ( breakpoint.matches === false ) {
       return enableSwiper(); 
     }     
};
const enableSwiper = function() {
  var swiper = new Swiper('.rooms__list .rooms-container', {    
  slidesPerView: 'auto', 
  loop: true,
  freeMode: true,     
  speed: 700, 
  navigation: {
    prevEl: '.rooms__nav__btn.prev',     
    nextEl: '.rooms__nav__btn.next',  
  },
  pagination: {      
    el: '.rooms .slider-nav-progress',
    clickable: true,
    type: 'progressbar',
  },
  breakpoints: {
    1024: {
      slidesPerView: 'auto', 
      spaceBetween: 'auto', 
    },
    768: {
      slidesPerView: 1,   
    },
  }
});
};
breakpoint.addListener(breakpointChecker);
breakpointChecker();
  var swiper = new Swiper('.about__gallery .swiper-container', {    
  slidesPerView: 'auto', 
  loop: true,
  slidesPerView: 1,     
  speed: 900,     
  navigation: {     
    prevEl: '.about__gallery .nav-btn.prev', 
    nextEl: '.about__gallery .nav-btn.next', 
  },
  pagination: {
    el: '.about__gallery .swiper-pagination', 
    clickable: true,  
  },
});
var gitem1 = [
  {"src": 'img/rooms/1/1.jpg','thumb': 'img/rooms/mini/1/1.jpg'},
  {"src": 'img/rooms/1/2.jpg','thumb': 'img/rooms/mini/1/2.jpg'},
  {"src": 'img/rooms/1/3.jpg','thumb': 'img/rooms/mini/1/3.jpg'},
  {"src": 'img/rooms/1/4.jpg','thumb': 'img/rooms/mini/1/4.jpg'},
  {"src": 'img/rooms/1/5.jpg','thumb': 'img/rooms/mini/1/5.jpg'},
  {"src": 'img/rooms/1/6.jpg','thumb': 'img/rooms/mini/1/6.jpg'},
  {"src": 'img/rooms/1/7.jpg','thumb': 'img/rooms/mini/1/7.jpg'},
  {"src": 'img/rooms/1/8.jpg','thumb': 'img/rooms/mini/1/8.jpg'},
  {"src": 'img/rooms/1/9.jpg','thumb': 'img/rooms/mini/1/9.jpg'},
  {"src": 'img/rooms/1/10.jpg','thumb': 'img/rooms/mini/1/10.jpg'},
  {"src": 'img/rooms/1/11.jpg','thumb': 'img/rooms/mini/1/11.jpg'},
];
var gitem2 = [
  {"src": 'img/rooms/2/1.jpg','thumb': 'img/rooms/mini/2/1.jpg'},
  {"src": 'img/rooms/2/2.jpg','thumb': 'img/rooms/mini/2/2.jpg'},
  {"src": 'img/rooms/2/3.jpg','thumb': 'img/rooms/mini/2/3.jpg'},
  {"src": 'img/rooms/2/4.jpg','thumb': 'img/rooms/mini/2/4.jpg'},
  {"src": 'img/rooms/2/5.jpg','thumb': 'img/rooms/mini/2/5.jpg'},
  {"src": 'img/rooms/2/6.jpg','thumb': 'img/rooms/mini/2/6.jpg'},
  {"src": 'img/rooms/2/7.jpg','thumb': 'img/rooms/mini/2/7.jpg'},
];
var gitem3 = [
  {"src": 'img/rooms/3/1.jpg','thumb': 'img/rooms/mini/3/1.jpg'},
  {"src": 'img/rooms/3/2.jpg','thumb': 'img/rooms/mini/3/2.jpg'},
  {"src": 'img/rooms/3/3.jpg','thumb': 'img/rooms/mini/3/3.jpg'},
  {"src": 'img/rooms/3/4.jpg','thumb': 'img/rooms/mini/3/4.jpg'},
  {"src": 'img/rooms/3/5.jpg','thumb': 'img/rooms/mini/3/5.jpg'},
  {"src": 'img/rooms/3/6.jpg','thumb': 'img/rooms/mini/3/6.jpg'},
  {"src": 'img/rooms/3/7.jpg','thumb': 'img/rooms/mini/3/7.jpg'},
  {"src": 'img/rooms/3/8.jpg','thumb': 'img/rooms/mini/3/8.jpg'},
  {"src": 'img/rooms/3/9.jpg','thumb': 'img/rooms/mini/3/9.jpg'},
  {"src": 'img/rooms/3/10.jpg','thumb': 'img/rooms/mini/3/10.jpg'},
]; 
var gitem4 = [
  {"src": 'img/rooms/4/1.jpg','thumb': 'img/rooms/mini/4/1.jpg'},
  {"src": 'img/rooms/4/2.jpg','thumb': 'img/rooms/mini/4/2.jpg'},
  {"src": 'img/rooms/4/3.jpg','thumb': 'img/rooms/mini/4/3.jpg'},
  {"src": 'img/rooms/4/4.jpg','thumb': 'img/rooms/mini/4/4.jpg'},
  {"src": 'img/rooms/4/5.jpg','thumb': 'img/rooms/mini/4/5.jpg'},
  {"src": 'img/rooms/4/6.jpg','thumb': 'img/rooms/mini/4/6.jpg'},
  {"src": 'img/rooms/4/7.jpg','thumb': 'img/rooms/mini/4/7.jpg'},
  {"src": 'img/rooms/4/8.jpg','thumb': 'img/rooms/mini/4/8.jpg'},
  {"src": 'img/rooms/4/9.jpg','thumb': 'img/rooms/mini/4/9.jpg'},
  {"src": 'img/rooms/4/10.jpg','thumb': 'img/rooms/mini/4/10.jpg'},
];   
var gitem5 = [
  {"src": 'img/rooms/5/1.jpg','thumb': 'img/rooms/mini/5/1.jpg'},
  {"src": 'img/rooms/5/2.jpg','thumb': 'img/rooms/mini/5/2.jpg'},
  {"src": 'img/rooms/5/3.jpg','thumb': 'img/rooms/mini/5/3.jpg'},
  {"src": 'img/rooms/5/4.jpg','thumb': 'img/rooms/mini/5/4.jpg'},
  {"src": 'img/rooms/5/5.jpg','thumb': 'img/rooms/mini/5/5.jpg'},
  {"src": 'img/rooms/5/6.jpg','thumb': 'img/rooms/mini/5/6.jpg'},
];
var gitem6 = [  
  {"src": 'img/rooms/6/1.jpg','thumb': 'img/rooms/mini/6/1.jpg'},
  {"src": 'img/rooms/6/2.jpg','thumb': 'img/rooms/mini/6/2.jpg'},
  {"src": 'img/rooms/6/3.jpg','thumb': 'img/rooms/mini/6/3.jpg'},
];
var gitem7 = [  
  {"src": 'img/rooms/7/1.jpg','thumb': 'img/rooms/mini/7/1.jpg'},
  {"src": 'img/rooms/7/2.jpg','thumb': 'img/rooms/mini/7/2.jpg'},
  {"src": 'img/rooms/7/3.jpg','thumb': 'img/rooms/mini/7/3.jpg'},
  {"src": 'img/rooms/7/4.jpg','thumb': 'img/rooms/mini/7/4.jpg'},
  {"src": 'img/rooms/7/5.jpg','thumb': 'img/rooms/mini/7/5.jpg'},
  {"src": 'img/rooms/7/6.jpg','thumb': 'img/rooms/mini/7/6.jpg'},
  {"src": 'img/rooms/7/7.jpg','thumb': 'img/rooms/mini/7/7.jpg'},
];
var gitem8 = [   
  {"src": 'img/rooms/8/1.jpg','thumb': 'img/rooms/mini/8/1.jpg'},
  {"src": 'img/rooms/8/2.jpg','thumb': 'img/rooms/mini/8/2.jpg'},
  {"src": 'img/rooms/8/3.jpg','thumb': 'img/rooms/mini/8/3.jpg'},
  {"src": 'img/rooms/8/4.jpg','thumb': 'img/rooms/mini/8/4.jpg'},
  {"src": 'img/rooms/8/5.jpg','thumb': 'img/rooms/mini/8/5.jpg'},
  {"src": 'img/rooms/8/6.jpg','thumb': 'img/rooms/mini/8/6.jpg'},
];

$(document).ready(function(){
  $('.rooms__item__gallery').on('click', function() {   
    let gall_ind = String($(this).parent().attr('gallery-index'));   
    $(this).lightGallery({      
        mode: 'lg-fade',  
        speed: 100,
        pager: false,
        share: false, 
        download: false,
        thumbMargin: 10,
        thumbWidth: 130, 
        thumbHeight: '80px',
        dynamic: true,
        dynamicEl: eval(gall_ind)
    })
});
});


// For mobile nav
function WindowResizeAddClass(parentelement, classelement){ 
$(window).resize(function() {   
  windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
  if (windowWidth > 767) {
    $(parentelement).removeClass(classelement);
  }else{
    $(parentelement).addClass(classelement);      
  }
});
$(document).ready(function(){
  windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
  if (windowWidth > 767) {
    $(parentelement).removeClass(classelement);
  }else{
    $(parentelement).addClass(classelement); 
  }
});
}

$(document).ready(function() {
  WindowResizeAddClass('header', 'headerMobMain');
});

$('.header-mob__burger').click(function(){
  $('header').show();
});
$('.header-out-btn').click(function(){
  $('header').hide();
});
$('.header__nav li').click(function(){
  $('.headerMobMain').hide();        
});  

// for forms
$('.searchAppBtn').bind('click', function () {   
  $('.mainSlide__heading').html('Для завершения, оставьте Ваши контакты, <br>на которые мы отправим точную <br>стоимость тура');
  gevent('button_pressed', 'Основная модалка', 'Поискбар');
  var text = "";
  text += 'Параметры запроса (поискбар):' + "\r\n";
  text += $('.date .searchbar__navitem__value').text() + "\r\n"; 
  text += $('.nights .searchbar__navitem__field').text() + "\r\n";      
  text += $('.adult .searchbar__navitem__field').text() + "\r\n";
  $('textarea[name=comment]').html(text);
}); 

$('.rooms__item__btn').click(function () {  
  mainFormBtnVal = $(this).val();
  gevent('button_pressed', 'Основная модалка', mainFormBtnVal);
  var parent = $(this).closest('.rooms__item__content');
  var text = "";
  text += 'Параметры запроса (выдача):' + "\r\n";
  text += parent.children('.rooms__item__name').text() + "\r\n"; 
  text += parent.find('.rooms__item__details span').text() + "\r\n";
  text += parent.find('.rooms__item__details p').text() + "\r\n";
  $('textarea[name=comment]').html(text);  
  $('.mainSlide__heading').html('Оставьте заявку на точный просчет стоимости <br>тура в номер '+parent.children('.rooms__item__name').text());
});

$('.banner__btn').click(function () {  
  $('.mainSlide__heading').html('Оставьте заявку на бесплатную консультацию <br>и точный просчет стоимости тура');
  gevent('button_pressed', 'Основная модалка', 'Баннер');  
  $('textarea[name=comment]').html('Кнопка в баннере'); 
});   
$('.header__btn').click(function () {  
  $('.mainSlide__heading').html('Оставьте заявку на бесплатную консультацию <br>и точный просчет стоимости тура');
  gevent('button_pressed', 'Основная модалка', 'Хедер(мобилка)');  
  $('textarea[name=comment]').html('Кнопка в хедере(мобилка)'); 
}); 

$('#banner__callback button').click(function () {
  gevent('button_pressed', 'Колбек', 'Баннер');  
  $('textarea[name=comment]').html('Обратный звонок - Баннер');
}); 

$("#mainForm").validate({ 
      rules: {
        'sender_phone': {
          minlength: 4
        },
      }
    });
$("#banner__callback").validate({
      rules: {
        'sender_phone': {    
          minlength: 4
        },
      }
    });
    $("#mainForm button").bind('click', function () {
      if ($("#mainForm").valid()) {
        gevent('request', 'Основная модалка', 'Отправить'); //отправка формы 
        sended($(this).attr('formid'));    
        $('.mainModal__wrapp__slOne').slideUp();
        $('.mainModal__wrapp__slTy').slideDown();
      } else {
        $("#mainForm input[name=sender_phone]").attr("placeholder", "Введите свой номер").focus(); 
      }
    });
    $("#banner__callback button").bind('click', function () {
      if ($("#banner__callback").valid()) {
        gevent('request', 'Колбек', 'Баннер'); //отправка формы 
        sended($(this).attr('formid'));
        $('.banner__callback__slOne').slideUp();
        $('.banner__callback__slTy').slideDown();
      } else {
        $("#banner__callback input[name=sender_phone]").attr("placeholder", "Введите свой номер").focus(); 
      }
    });

    function sended(idform) {
      AjaxFormRequest( /*'messegeResult',*/ idform, 'sendmessage.php');
    }
    function AjaxFormRequest(/*result_id,*/idform, url) {
       var tdata = jQuery("#"+idform).serialize();
       var turl = "url="+location.href;
       if (tdata !== '') {
           tdata += "&"+turl;
       } else {
           tdata = turl;
       }
       jQuery.ajax({
          url:     url,
          type:     "POST",
          dataType: "html",
          data: tdata,   
        success: function (response) {
        }
      });
    }
    function gevent(action, category='', label='', value=''){
        var params = {};
        if (category !=='') { params.event_category = category; }
        if (label !=='') { params.event_label = label; }
        if (value !=='') { params.value = value; }
        gtag('event', action, params);
    } 


// Disable sound after closing modal
$(document).on('closing', '.videoModal', function (e) {
  $('.videoModal iframe').each(function(index) {
  $(this).attr('src', $(this).attr('src'));
  return false;
  });  
});

// For searchbar
// Для подстветки/открытия блока с контентом
  $('.searchbar__navitem__field').click(function(){
    $(this).addClass('active');
    $(this).parent().find('.searchbar__navitem__content').show();
    $('#overlay').addClass('active');
  });
// Для закрытия блока с контентом
  jQuery(function($){
      $(document).mouseup(function (e){
          var block = $(".searchbar__navitem__field.active").parent().find('.searchbar__navitem__content');
          if (!block.is(e.target)
              && block.has(e.target).length === 0) {  
              block.hide();  
              block.parent().find('.searchbar__navitem__field').removeClass('active');  
              $('#overlay').removeClass('active');  
          }
      });
  });

// Для выбора кол-ва ночей
  $('.spinner-item.control').each(function () {
      var c = $(this);  
      if (!c.data('isInit')) {
          c.data('isInit', true);
          var val = c.data('value'), text = $('.text1', c), min = c.data('min'), max = c.data('max'), plus = $('.plus', c), minus = $('.minus', c);
          var input = $('input[name="' + c.data('name') + '"]', c);
          if (input.length == 0) var input = $('<input type="hidden" name="' + c.data('name') + '" value="' + val + '" />').appendTo(c);
          text.text(val);
          minus.click(function () {
              inc(-1);
          });
          plus.click(function () {
              inc(1);
          });
          var inc = function (d) {
              var val = c.data('value') + d;
              if (val < min) val = min;
              if (val > max) val = max;
              text.text(val);
              c.data('value', val);
              input.val(val);
              $('#nights_count').text(val);
          }
      }
  });

// Для выбора кол-ва туристов
$('.searchbar__navitem__nights__adults li').click(function(){
  $('.searchbar__navitem__nights__adults li span').removeClass('active');
  $(this).find('span').addClass('active');
  $('.adult .searchbar__navitem__field span').html($(this).text());  
});

// Для мобилки
$('.mainsearchbar__search__out-mob').click(function(){
  var block = $(".searchbar__navitem__field.active").parent().find('.searchbar__navitem__content'); 
  block.hide();  
  block.parent().find('.searchbar__navitem__field').removeClass('active');   
  $('#overlay').removeClass('active');  
  });
  $('.date .mainsearchbar__mobbuttons__apply').click(function(){
    var block = $(".searchbar__navitem__field.active").parent().find('.searchbar__navitem__content'); 
    block.hide();  
    block.parent().find('.searchbar__navitem__field').removeClass('active');
    $('.nights .searchbar__navitem__field').addClass('active');
    $('.nights .searchbar__navitem__content').show();  
  });
  $('.nights .mainsearchbar__mobbuttons__apply').click(function(){
    var block = $(".searchbar__navitem__field.active").parent().find('.searchbar__navitem__content'); 
    block.hide();  
    block.parent().find('.searchbar__navitem__field').removeClass('active');
    $('.adult .searchbar__navitem__field').addClass('active');
    $('.adult .searchbar__navitem__content').show();  
  });
  $('.adult .mainsearchbar__mobbuttons__apply').click(function(){
    var block = $(".searchbar__navitem__field.active").parent().find('.searchbar__navitem__content'); 
    block.hide();  
    block.parent().find('.searchbar__navitem__field').removeClass('active');     
  });

// Для выбора дат вылета
new Vue({
  el: '#app',
  data () {
    return {
      mode: 'range',
      selectedDate: {
        start: new Date(),
        end: new Date(),
        span: 7
      },
      formatted: '',
      };
    },   
});

function checkDateValue(){
  var items = $('.vc-highlights.vc-day-layer').closest('.vc-grid-cell');
  console.log(items);
  $('#searchbar_date_start').text($(items[0]).find('.vc-day-content').attr('aria-label'));
  $('#searchbar_date_end').text($(items.slice(-1)[0]).find('.vc-day-content').attr('aria-label'));
}
$('#app').click(function(){ 
  checkDateValue();
  //alert('true');
});
$(document).ready(function(){
  checkDateValue();
});
});  
 