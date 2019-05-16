$(document).ready(function() {
  insertCurrentYear();

  $('[data-fancybox]').fancybox({
    animationEffect: "fade",
    caption: function(instance, item) {
      return $(this).find('aside').html();
    },
    infobar: false,
    smallBtn: true,
    toolbar: false,
    transitionEffect: "slide"
  });
});

function insertCurrentYear() {
  document.getElementById('js-current-year').innerHTML = new Date().getFullYear();
}
