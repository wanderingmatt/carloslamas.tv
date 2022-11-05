import { Fancybox } from "@fancyapps/ui";

document.addEventListener('DOMContentLoaded', function () {

  function insertCurrentYear() {
    document.getElementById('js-current-year').innerHTML = new Date().getFullYear();
  }

  insertCurrentYear();

  Fancybox.bind("[data-fancybox]", {
    closeButton: 'outside',
    // caption: function (fancybox, carousel, slide) {
    //   return slide.$trigger.querySelector('aside').innerHTML;
    // },
  });
});
