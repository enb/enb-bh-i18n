var EOL = require('os').EOL,
    vow = require('vow'),
    keysets = require('enb-bem-i18n/lib/keysets'),
    compileI18N = require('enb-bem-i18n/lib/compile');

/**
 * @class BHCommonJSI18nTech
 * @augments {BHCommonJSTech}
 * @classdesc
 *
 * Compiles localized CommonJS module of BH with requires of core and source templates (`bh.js` files).<br/><br/>
 *
 * Localization is based on pre-built `?.keysets.{lang}.js` bundle files.<br/><br/>
 *
 * Use on server side only (Node.js). You can use `require` in templates.<br/><br/>
 *
 * Important: for correct apply the source files and files are specified in `requires` should be in file system.
 *
 * @param {Object}      options                                        Options.
 * @param {String}      [options.target='?.bh.{lang}.js']              Path to a target with compiled file.
 * @param {String}      options.lang                                   Language identifier.
 * @param {String}      [options.filesTarget='?.files']                Path to target with FileList.
 * @param {String[]}    [options.sourceSuffixes='bh.js']               Files with specified suffixes involved in the
 *                                                                     assembly.
 * @param {String[]}    [options.mimic]                                Names to export.
 * @param {Boolean}     [options.devMode=true]                         Drops cache for `require` of source templates.
 * @param {String}      [options.jsAttrName='data-bem']                Sets `jsAttrName` option for BH core.
 * @param {String}      [options.jsAttrScheme='json']                  Sets `jsAttrScheme` option for BH core.
 * @param {String}      [options.jsCls='i-bem']                        Sets `jsCls` option for BH core.
 * @param {Boolean}     [options.jsElem=true]                          Sets `jsElem` option for BH core.
 * @param {Boolean}     [options.escapeContent=false]                  Sets `escapeContent` option for BH core.
 * @param {Boolean}     [options.clsNobaseMods=false]                  Sets `clsNobaseMods` option for BH core.
 * @param {String}      [options.keysetsFie='?.keysets.{lang}.js']     Path to a source keysets file.
 *
 * @example
 * var BHCommonJSI18nTech = require('enb-bh-i18n/techs/bh-commonjs-i18n'),
 *     FileProvideTech = require('enb/techs/file-provider'),
 *     bemTechs = require('enb-bem-techs');
 *
 * module.exports = function(config) {
 *     config.node('bundle', function(node) {
 *         // get FileList
 *         node.addTechs([
 *             [FileProvideTech, { target: '?.bemdecl.js' }],
 *             [bemTechs.levels, { levels: ['blocks'] }],
 *             [bemTechs.deps],
 *             [bemTechs.files]
 *         ]);
 *
 *         // collect and merge keysets files into bundle
 *         node.addTechs([
 *            [ Keysets, { lang: '{lang}' } ]
 *         ]);
 *
 *         // build localized BH file for given {lang}
 *         node.addTech([ BHCommonJSI18nTech, { lang: '{lang}' } ]);
 *         node.addTarget('?.bh.{lang}.js');
 *     });
 * };
 */
module.exports = require('enb-bh/techs/bh-commonjs').buildFlow()
    .name('bh-commonjs-i18n')
    .target('target', '?.bh.{lang}.js')
    .defineRequiredOption('lang')
    .useFileList(['bh.js'])
    .useSourceFilename('keysetsFile', '?.keysets.{lang}.js')
    .builder(function (fileList, keysetsFilename) {
        return vow.all([
                this._compile(fileList),
                this._compileI18N(keysetsFilename)
            ], this)
            .spread(function (bhCode, i18nCode) {
                return [
                    bhCode,
                    'module.exports.lib.i18n = ' + i18nCode + ';'
                ].join(EOL);
            });
    })
    .methods({
        /**
         * Compiles i18n module.
         *
         * Wraps compiled code for usage with different modular systems.
         *
         * @param {String} keysetsFilename — path to file with keysets..
         * @returns {Promise}
         * @private
         */
        _compileI18N: function (keysetsFilename) {
            return this._readKeysetsFile(keysetsFilename)
                .then(function (keysetsSource) {
                    var parsed = keysets.parse(keysetsSource),
                        opts = {
                            version: parsed.version,
                            language: this._lang
                        };

                    return compileI18N(parsed.core, parsed.keysets, opts);
                });
        },
        /**
         * Reads file with keysets.
         *
         * @param {String} filename — path to file with keysets.
         * @returns {Promise}
         * @private
         */
        _readKeysetsFile: function (filename) {
            var node = this.node,
                root = node.getRootDir(),
                cache = node.getNodeCache(this._target);

            return keysets.read(filename, cache, root);
        }
    })
    .createTech();
