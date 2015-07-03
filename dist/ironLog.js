'use strict';

(function () {
    /*defaults styles*/
    var color_red = 'color : red';
    var color_blue = 'color : blue';
    var color_white = 'color : white';
    var color_green = 'color : green';
    var bg_red = 'background-color : red';
    var bg_blue = 'background-color : rgb(21, 134, 233)';
    var bg_green = 'background-color : green';
    var bg_white = 'background-color : white';
    var bg_gray = 'background-color : #d1d1d1';
    var font_large = 'font-size : 16px; padding : 0px 5px';

    var ms = function ms(styles) {
        return styles.join(';');
    };

    var cx = function cx(obj) {
        var styles = [];
        Object.keys(obj).forEach(function (key) {
            styles.push(key + ':' + obj[key]);
        });return styles.join(';');
    };

    /* default flag values */
    var privateProps = {
        active: true,
        activeError: true,
        timePath: []
    };

    var standLog = this.log;
    var standWarn = this.warn;
    var standError = this.error;
    var standInfo = this.info;
    var standDebug = this.debug;

    var checkOn = (function (func, flag) {
        flag = flag || 'active';
        return (function () {
            if (privateProps[flag]) {
                func.apply(this, arguments);
                return this;
            }
        }).bind(this);
    }).bind(this);

    this.log = checkOn(standLog);
    this.debug = checkOn(standDebug);
    this.info = checkOn(standInfo);
    this.warn = checkOn(standWarn);
    this.error = checkOn(standError, 'activeError');

    this.ok = checkOn((function () {
        var argsStr = Array.prototype.slice.call(arguments).join(' ');
        argsStr = '%c' + argsStr;
        this.log.call(this, argsStr, ms([color_green]));
    }).bind(this));

    this.fail = checkOn(function () {
        var argsStr = Array.prototype.slice.call(arguments).join(' ');
        argsStr = '%c' + argsStr;
        this.log.call(this, argsStr, ms([color_red]));
    });

    this.openBlock = checkOn(function (title) {
        privateProps.timePath.push(title);
        console.group('%c' + title, ms([color_white, bg_blue, font_large]));
        console.time(title);
    });

    this.closeBlock = checkOn(function () {
        if (privateProps.timePath.length > 0) {
            console.timeEnd(privateProps.timePath[privateProps.timePath.length - 1]);
            console.groupEnd(privateProps.timePath[privateProps.timePath.length - 1]);
            privateProps.timePath.length = privateProps.timePath.length - 1;
        }
    });

    this.off = function (options) {
        options = options || {};
        privateProps.activeError = options.error ? false : privateProps.activeError;
        privateProps.active = false;
        return this;
    };

    this.progressBar = function (_complete, total) {
        total = total || 100;
        _complete = _complete || 0;
        if (typeof _complete !== 'number' || typeof total !== 'number') return;
        _complete = _complete > total ? total : _complete;
        var args = [''];
        for (var i = 1; i <= _complete; i++) {
            args[0] += '%c ';
            args.push(ms([bg_blue]));
        }
        if (_complete < total) {
            args[0] += '%c';
            args.push(ms([bg_gray]));
            for (var i = _complete + 1; i <= total; i++) {
                args[0] += ' ';
            }
        }
        args.push('(' + _complete + ' of ' + total + ')');
        console.log.apply(this, args);
        return {
            add: function add(num) {
                if (typeof num === 'number') {
                    _complete = num + _complete < total ? num + _complete : total;
                }
                return this;
            },
            log: function log() {
                console.progressBar(_complete, total);
                return this;
            },
            complete: function complete() {
                _complete = total;
                return this;
            }
        };
    };

    this.on = function () {
        privateProps.active = true;
        privateProps.activeError = true;
        return this;
    };

    this.styleCmd = function (name, styles) {
        this[name] = checkOn(function () {
            var argsStr = Array.prototype.slice.call(arguments).join(' ');
            argsStr = '%c' + argsStr;
            this.log.call(this, argsStr, cx(styles));
        });
    };
}).bind(console)();
//# sourceMappingURL=IronLog.js.map
