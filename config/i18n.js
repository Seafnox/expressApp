/** I18N implementation
 * Options
 *     devMode: false
 *     defaultLocale: "en"
 *     extension: ".js"
 *     directory: "./locales"
 *     useCookie: false
 *     cookieName: "lang"
 *     sessionVarName: "locale"
 *     indent: "\t"
 *     locales: []
 */

module.exports = {
  // setup some locales - other locales default to en silently
  locales: ['ru'],
  extension: ".json",
  devMode: true,
  directory: "./config/locales",
};
