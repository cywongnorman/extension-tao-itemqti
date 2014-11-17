define([
    'taoQtiItem/qtiCreator/renderers/Renderer',
    'helpers',
    'jquery',
    'lodash',
    'util/dom'
], function(Renderer, helpers, $, _, dom){

    //configure and instanciate once only:
    var _creatorRenderer = null;
    
    /**
     * Get a preconfigured renderer singleton
     * 
     * @param {Boolean} reset
     * @returns {Object} - a configured instance of creatorRenderer
     */
    var get = function(reset){

        if(!_creatorRenderer || reset){

            var $bodyEltForm = _creatorRenderer ? _creatorRenderer.getOption('bodyElementOptionForm') : null;

            if(reset
                || !$bodyEltForm
                || !$bodyEltForm.length
                || !dom.contains($bodyEltForm)){

                _creatorRenderer = new Renderer({
                    baseUrl : '',
                    lang : '',
                    uri : '',
                    shuffleChoices : false,
                    itemOptionForm : $('#item-editor-item-property-bar .panel'),
                    interactionOptionForm : $('#item-editor-interaction-property-bar .panel'),
                    choiceOptionForm : $('#item-editor-choice-property-bar .panel'),
                    responseOptionForm : $('#item-editor-response-property-bar .panel'),
                    bodyElementOptionForm : $('#item-editor-body-element-property-bar .panel'),
                    textOptionForm : $('#item-editor-text-property-bar .panel'),
                    modalFeedbackOptionForm : $('#item-editor-modal-feedback-property-bar .panel'),
                    mediaManager : {
                        appendContainer : '#mediaManager',
                        browseUrl : helpers._url('files', 'ItemContent', 'taoItems'),
                        uploadUrl : helpers._url('upload', 'ItemContent', 'taoItems'),
                        deleteUrl : helpers._url('delete', 'ItemContent', 'taoItems'),
                        downloadUrl : helpers._url('download', 'ItemContent', 'taoItems'),
                        fileExistsUrl : helpers._url('fileExists', 'ItemContent', 'taoItems')
                    }
                });

            }
        }

        return _creatorRenderer;
    };


    return {
        get : function(reset){
            return get(reset);
        },
        setOption : function(name, value){
            get().setOption(name, value);
        },
        setOptions : function(options){
            get().setOptions(options);
        },
        load : function(qtiClasses, done){
            get().load(function(){
                if(_.isFunction(done)){
                    done.apply(this, arguments);
                }
            }, qtiClasses);
        }
    };

});
