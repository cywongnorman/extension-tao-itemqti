define([
    'jquery',
    'lodash',
    'taoQtiItem/runner/qtiItemRunner',
    'json!taoQtiItem/test/samples/json/postcard.json',
    'json!taoQtiItem/test/samples/json/formated-card.json',
    'lib/simulator/jquery.keystroker',
    'taoQtiItem/qtiCommonRenderer/helpers/container',
    'ckeditor'
], function($, _, qtiItemRunner, itemDataPlain, itemDataXhtml, keystroker, containerHelper, ckEditor){
    'use strict';

    var fixtureContainerId = 'item-container-';

    var showErrors = true;

    var logError = function(err) {
        if (showErrors) {
            console.log('Error#', err);
        }
    };

/** PLAIN **/

    QUnit.module('Extended Text Interaction - plain format');


    QUnit.asyncTest('renders correctly', function(assert){
        QUnit.expect(10);

        var $container = $('#' + fixtureContainerId + '0');

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataPlain)
            .on('error', logError)
            .on('render', function(){

                //check DOM
                assert.equal($container.children().length, 1, 'the container a elements');
                assert.equal($container.children('.qti-item').length, 1, 'the container contains a the root element .qti-item');
                assert.equal($container.find('.qti-itemBody').length, 1, 'the container contains a the body element .qti-itemBody');
                assert.equal($container.find('.qti-interaction').length, 1, 'the container contains an interaction .qti-interaction');
                assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');
                assert.equal($container.find('.qti-extendedTextInteraction .qti-prompt-container').length, 1, 'the interaction contains a prompt');
                assert.equal($container.find('.qti-extendedTextInteraction .instruction-container').length, 1, 'the interaction contains a instruction box');

                //check DOM data
                assert.equal($container.children('.qti-item').data('identifier'), 'extendedText', 'the .qti-item node has the right identifier');

                QUnit.start();
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('enables to input a response', function(assert){
        QUnit.expect(16);

        var $container = $('#' + fixtureContainerId + '1');
        var responsesStack = [
            { response : { base  : { string : 't' } } },
            { response : { base  : { string : 'te' } } },
            { response : { base  : { string : 'tes' } } },
            { response : { base  : { string : 'test' } } }
        ];
        var stackPtr = 0;

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataPlain)
            .on('error', logError)
            .on('render', function(){
                assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                keystroker.puts($container.find('textarea'), 'test');
            })
            .on('statechange', function(state){
                assert.ok(typeof state === 'object', 'The state is an object');
                assert.ok(typeof state.RESPONSE === 'object', 'The state has a response object');
                assert.deepEqual(state.RESPONSE, responsesStack[stackPtr ++], 'A text is entered');
                if (stackPtr === responsesStack.length) {
                    assert.ok(true, 'A text is fully entered');
                    QUnit.start();
                }
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('enables to load a response', function(assert){
        QUnit.expect(5);

        var $container = $('#' + fixtureContainerId + '2');
        var response = { base  : { string : 'test' } };

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataPlain)
            .on('error', logError)
            .on('render', function(){
                assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                var interaction = this._item.getInteractions()[0];
                interaction.renderer.setResponse(interaction, response);

                assert.deepEqual(this.getState(), {'RESPONSE': { response : response } }, 'the response state is equal to the loaded response');

                assert.equal($container.find('textarea').val(), response.base.string, 'the textarea displays the loaded response');

                QUnit.start();
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('destroys', function(assert){
        QUnit.expect(5);

        var $container = $('#' + fixtureContainerId + '3');

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataPlain)
            .on('error', logError)
            .on('render', function(){
                var self = this;

                //call destroy manually
                var interaction = this._item.getInteractions()[0];
                interaction.renderer.destroy(interaction);

                assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                keystroker.puts($container.find('textarea'), 'test');

                _.delay(function(){

                    assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : 'test' } } } }, 'The response state is still related to text content');
                    assert.equal($container.find('.qti-extendedTextInteraction .instruction-container').children().length, 0, 'there is no instructions anymore');

                    QUnit.start();
                }, 100);
            })
            .on('statechange', function(){
                assert.ok(false, 'Text input does not trigger response once destroyed');
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('resets the response', function(assert){
        QUnit.expect(5);

        var $container = $('#' + fixtureContainerId + '4');

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataPlain)
            .on('error', logError)
            .on('render', function(){
                var self = this;

                assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                keystroker.puts($container.find('textarea'), 'test');

                _.delay(function(){

                    assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : 'test' } } } }, 'A response is set');

                    //call destroy manually
                    var interaction = self._item.getInteractions()[0];
                    interaction.renderer.resetResponse(interaction);

                    _.delay(function(){

                        assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : '' } } } }, 'The response is cleared');

                        QUnit.start();
                    }, 100);
                }, 100);

            })
            .init()
            .render($container);
    });

/** XHTML **/

    QUnit.module('Extended Text Interaction - XHTML format');


    QUnit.asyncTest('renders correctly', function(assert){
        QUnit.expect(10);

        var $container = $('#' + fixtureContainerId + '5');

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataXhtml)
            .on('error', logError)
            .on('render', function(){
                _.delay(function() {
                    //check DOM
                    assert.equal($container.children().length, 1, 'the container a elements');
                    assert.equal($container.children('.qti-item').length, 1, 'the container contains a the root element .qti-item');
                    assert.equal($container.find('.qti-itemBody').length, 1, 'the container contains a the body element .qti-itemBody');
                    assert.equal($container.find('.qti-interaction').length, 1, 'the container contains an interaction .qti-interaction');
                    assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');
                    assert.equal($container.find('.qti-extendedTextInteraction .qti-prompt-container').length, 1, 'the interaction contains a prompt');
                    assert.equal($container.find('.qti-extendedTextInteraction .instruction-container').length, 1, 'the interaction contains a instruction box');

                    //check DOM data
                    assert.equal($container.children('.qti-item').data('identifier'), 'extendedText', 'the .qti-item node has the right identifier');

                    QUnit.start();

                    // remove the container to avoid CKEditor error on the next test
                    $container.remove();
                }, 100);
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('enables to input a response', function(assert){
        QUnit.expect(5);

        var $container = $('#' + fixtureContainerId + '6');
        var response = 'test';

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataXhtml)
            .on('error', logError)
            .on('render', function(){
                var self = this;
                _.delay(function() {
                    assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                    var interaction = self._item.getInteractions()[0];
                    var editor = ckEditor.instances[containerHelper.get(interaction).data('editor')];

                    editor.setData(response);

                    assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : response } } } }, 'the response state is equal to the loaded response');

                    assert.equal(editor.getData(), response, 'the editor displays the loaded response');

                    QUnit.start();

                    // remove the container to avoid CKEditor error on the next test
                    $container.remove();
                }, 100);
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('enables to load a response', function(assert){
        QUnit.expect(20);

        var $container = $('#' + fixtureContainerId + '7');
        var response = { base  : { string : '<strong>test</strong>' } };

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        var cpt = 0;

        var runner = qtiItemRunner('qti', itemDataXhtml)
            .on('error', logError)
            .on('render', function(){
                var self = this;
                _.delay(function() {
                    assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                    var interaction = self._item.getInteractions()[0];
                    var editor = ckEditor.instances[containerHelper.get(interaction).data('editor')];
                    runner.setState({'RESPONSE': { response : response } });

                    _.delay(function() {
                        assert.deepEqual(self.getState(), {'RESPONSE': { response : response } }, 'the response state is equal to the loaded response');

                        assert.equal(editor.getData(), response.base.string, 'the editor displays the loaded response');

                        QUnit.start();

                        // remove the container to avoid CKEditor error on the next test
                        $container.remove();
                    }, 100);

                }, 100);
            })
            .on('statechange', function(state){
                assert.ok(true, 'A statechange event has been fired #' + (cpt++));
                assert.ok(typeof state === 'object', 'The state is an object');
                assert.ok(typeof state.RESPONSE === 'object', 'The state has a response object');
                assert.deepEqual(state.RESPONSE, { response : response }, 'A text is entered');

                var interaction = this._item.getInteractions()[0];
                var editor = ckEditor.instances[containerHelper.get(interaction).data('editor')];
                assert.equal(editor.getData(), response.base.string, 'the editor displays the loaded response');
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('destroys', function(assert){
        QUnit.expect(5);

        var $container = $('#' + fixtureContainerId + '8');

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataXhtml)
            .on('error', logError)
            .on('render', function(){
                var self = this;
                _.delay(function() {
                    //call destroy manually
                    var interaction = self._item.getInteractions()[0];
                    interaction.renderer.destroy(interaction);

                    assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                    _.delay(function(){

                        assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : '' } } } }, 'The response state is cleared');
                        assert.equal($container.find('.qti-extendedTextInteraction .instruction-container').children().length, 0, 'there is no instructions anymore');

                        QUnit.start();

                        // remove the container to avoid CKEditor error on the next test
                        $container.remove();
                    }, 100);
                }, 100);
            })
            .init()
            .render($container);
    });


    QUnit.asyncTest('resets the response', function(assert){
        QUnit.expect(6);

        var $container = $('#' + fixtureContainerId + '9');
        var response = 'test';

        assert.equal($container.length, 1, 'the item container exists');
        assert.equal($container.children().length, 0, 'the container has no children');

        qtiItemRunner('qti', itemDataXhtml)
            .on('error', logError)
            .on('render', function(){
                var self = this;

                _.delay(function() {
                    assert.equal($container.find('.qti-interaction.qti-extendedTextInteraction').length, 1, 'the container contains a text interaction .qti-extendedTextInteraction');

                    var interaction = self._item.getInteractions()[0];
                    var editor = ckEditor.instances[containerHelper.get(interaction).data('editor')];

                    editor.setData(response);

                    _.delay(function(){

                        assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : response } } } }, 'A response is set');

                        var interaction = self._item.getInteractions()[0];
                        interaction.renderer.resetResponse(interaction);

                        _.delay(function(){

                            assert.deepEqual(self.getState(), {'RESPONSE': { response : { base  : { string : '' } } } }, 'The response is cleared');

                            assert.equal(editor.getData(), '', 'the editor is cleared');

                            QUnit.start();

                            // remove the container to avoid CKEditor error on the next test
                            $container.remove();
                        }, 100);
                    }, 100);
                }, 100);
            })
            .init()
            .render($container);
    });

});

