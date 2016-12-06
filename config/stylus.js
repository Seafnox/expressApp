/** Stylus implementation
 * Options:
 *    `force`     Always re-compile
 *    `src`       Source directory used to find .styl files, a string or function accepting `(path)` of request.
 *    `dest`      Destination directory used to output .css files, a string or function accepting `(path)` of request, when undefined defaults to `src`.
 *    `compile`   Custom compile function, accepting the arguments `(str, path)`.
 *    `compress`  Whether the output .css files should be compressed
 *    `firebug`   Emits debug infos in the generated CSS that can be used by the FireStylus Firebug plugin
 *    `linenos`   Emits comments in the generated CSS indicating the corresponding Stylus line
 *    'sourcemap' Generates a sourcemap in sourcemaps v3 format
 */

const nib = require('nib');
const path = require('path');

module.exports = {
  force: true,
  src: path.join(__dirname, 'public/stylesheets'),
  use: [nib()],
  import: ['nib'],
};