define(['taoQtiItem/qtiCreator/renderers/Renderer', 'helpers', 'jquery'], function(Renderer, helpers, $){

    //configure and instanciate once only:
    var _creatorRenderer = null;

    var _singleton = function(){
        
        if(!_creatorRenderer 
            || !_creatorRenderer.getOption('interactionOptionForm') 
            || !$.contains(document, _creatorRenderer.getOption('interactionOptionForm')[0])){
            
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
                mediaManager : {
                    appendContainer : '#mediaManager',
                    browseUrl : helpers._url('files', 'ItemContent', 'taoItems'),
                    uploadUrl : helpers._url('upload', 'ItemContent', 'taoItems'),
                    deleteUrl : helpers._url('delete', 'ItemContent', 'taoItems'),
                    downloadUrl : helpers._url('download', 'ItemContent', 'taoItems'),
                }
            });
            
        }
        
        return _creatorRenderer;
    };


    return {
        get : function(){
            return _singleton();
        },
        setOption : function(name, value){
            _singleton().setOption(name, value);
        },
        setOptions : function(options){
            _singleton().setOptions(options);
        }
    };

});