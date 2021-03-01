'use strict';

var server = require('server');

server.get('Test', function (req, res, next) {
    try {
        var Vue = require('*/cartridge/scripts/lib/vue/index');
        var vueServerRenderer = require('*/cartridge/scripts/lib/vue-server-renderer/index');

        vueServerRenderer(
            new Vue({
                template:
                    '<div><p class="hi">yoyo</p><div id="ho" :class="{ red: isRed }"></div><span>{{ test }}</span><input :value="test">          <img :src="imageUrl">          <test></test>          <test-async></test-async>        </div>',
                data: {
                    test: 'hi',
                    isRed: true,
                    imageUrl: 'https://vuejs.org/images/logo.png'
                },
                components: {
                    test: {
                        render: function render() {
                            return this.$createElement(
                                'div',
                                {
                                    class: ['a']
                                },
                                'test'
                            );
                        }
                    },
                    testAsync: function testAsync(resolve) {
                        resolve({
                            render: function render() {
                                return this.$createElement(
                                    'span',
                                    {
                                        class: ['b']
                                    },
                                    'testAsync'
                                );
                            }
                        });
                    }
                }
            }),
            function (err, result) {
                res.serveFile({
                    type: 'text/html',
                    file: result
                });
            }
        );
    } catch (e) {
        var error = e;
        var Logger = require('dw/system/Logger');
        Logger.error('Unexpected error ' + e.message);
    }
    next();
});

module.exports = server.exports();
