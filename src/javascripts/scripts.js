$(document).ready(function() {
  insertCurrentYear();
});

function insertCurrentYear() {
  document.getElementById('js-current-year').innerHTML = new Date().getFullYear();
}
