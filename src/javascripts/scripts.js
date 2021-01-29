$(document).ready(function() {
  insertCurrentYear();

  function insertCurrentYear() {
    document.getElementById('js-current-year').innerHTML = new Date().getFullYear();
  }

  $('#info-trigger').fancybox({
    src: '#info',
    baseClass: "info-box",
  });

  // $('[data-fancybox]').fancybox({
  //   animationEffect: "fade",
  //   caption: function() {
  //     return $(this).find('aside').html();
  //   },
  //   afterLoad: function(instance, current) {

  //     // Tip: Each event passes useful information within the event object:

  //     // Object containing references to interface elements
  //     // (background, buttons, caption, etc)
  //     // console.info( instance.$refs );

  //     // Current slide options
  //     // console.info( current.opts );

  //     // Clicked element
  //     // console.info( current.opts.$orig );

  //     // Reference to DOM element of the slide
  //     // console.info( current.$slide );

  //     console.info(current.opts.btnTpl.arrowLeft);

  //     instance.opts.btnTpl.arrowLeft = current.opts.$orig.parent().prev().find('a > aside').html();

  //     console.info(instance.opts.btnTpl.arrowLeft);

  //     console.info(current.opts.$orig);
  //     console.info(current.opts.$orig.parent().prev().find('a > aside').html());

  //     // if ( instance.group.length > 1 && current.$content ) {
  //     //   current.$content.append('<a data-fancybox-next class="button-next" href="javascript:;">→</a><a data-fancybox-previous class="button-previous" href="javascript:;">←</a>');
  //     // }
  //   },
  //   // btnTpl: {
  //   //   arrowLeft: 'Previous'
  //   // },
  //   // arrows: false,
  //   infobar: false,
  //   smallBtn: true,
  //   toolbar: false,
  //   transitionEffect: "slide"
  // });
});

// $(".video").fancybox({
//   beforeLoad: function() {
//     this.title = $(this.element).children('aside').html();
//     this.tpl.prev = "<a title='Previous' class='fancybox-nav fancybox-prev'><em></em>" + $(this.element).parent().prev().find('a > aside').html() + "</a>";
//     this.tpl.next = "<a title='Next' class='fancybox-nav fancybox-next'><em></em>" + $(this.element).parent().next().find('a > aside').html() + "</a>";
//   },
//   aspectRatio: true,
//   height: 540,
//   loop: false,
//   margin: 86,
//   padding: 0,
//   width: 960,
//   helpers: {
//     overlay: {
//       opacity: 0.9
//     },
//     title: {
//       type: 'outside'
//     }
//   }
// });
