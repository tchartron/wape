(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

    var editor = {
        init(arg) {
            console.log(arg);
        }
    };

    editor.init('hello world');

})));
