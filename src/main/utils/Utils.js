/**
 * Returns a function, that, as long
 * as it continues to be invoked will
 * not be triggered. The function will
 * be called after it stops being called
 * for N milliseconds. If `immediate` is
 * passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @author https://davidwalsh.name/javascript-debounce-function
 *
 *
 * @param {Function} func - function to be dounced
 * @param {Number} wait - time period to wait before debouncing in milliseconds
 * @param {Boolean} immediate - controller for whether to call the function before or after the timer
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
