/**
 * @author Bertrand Chevrier <bertrand@taotesting.com>
 */
define([
    'jquery', 'lodash',
    'taoQtiItem/qtiCreator/widgets/interactions/Widget',
    'taoQtiItem/qtiCreator/widgets/interactions/selectPointInteraction/states/states',
    'taoQtiItem/qtiCommonRenderer/helpers/Graphic',
], function($, _, Widget, states, graphic){

    /**
     * The Widget that provides components used by the QTI Creator for the SelectPoint Interaction
     * @extends taoQtiItem/qtiCreator/widgets/interactions/Widget
     * @exports taoQtiItem/qtiCreator/widgets/interactions/selectPointInteraction/Widget
     */      
    var SelectPointInteractionWidget = _.extend(Widget.clone(), {

        /**
         * Set up the widget
         * @param {Object} options - extra options 
         * @param {String} options.baseUrl - the resource base url
         * @param {jQueryElement} options.choiceForm = a reference to the form of the choices
         */
        initCreator : function(options){
            this.baseUrl = options.baseUrl;
            this.choiceForm = options.choiceForm;
            
            this.registerStates(states);
            
            //call parent initCreator
            Widget.initCreator.call(this);
           
            this.createPaper(); 
        },
   
        /**
         * Create a basic Raphael paper with the interaction choices 
         */ 
        createPaper : function(){

            var $container = this.$original;
            var background = this.element.object.attributes;
            this.element.paper = graphic.responsivePaper( 'graphic-paper-' + this.element.serial, {
                width       : background.width, 
                height      : background.height,
                img         : this.baseUrl + background.data,
                imgId       : 'bg-image-' + this.element.serial,
                diff        : $('.image-editor', $container).outerWidth() - $('.main-image-box', $container).outerWidth(),
                container   : $container
            });
        },

        
        /**
         * Create shapes for the response mapping areas
         * @param {String} shapeType - the QTI shape type 
         * @param {String} coords - the QTI shape coords
         * @returns {Raphael.Element} the shape
         */ 
        createResponseArea : function(shapeType, coords){
            return graphic.createElement(this.element.paper, shapeType, coords, {
                touchEffect : false
            });
        }

   });

    return SelectPointInteractionWidget;
});
