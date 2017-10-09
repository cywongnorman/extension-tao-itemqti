define([
    'lodash',
    'taoQtiItem/qtiItem/core/Element',
    'taoQtiItem/qtiCreator/model/variables/ResponseDeclaration',
    'taoQtiItem/qtiCreator/model/helper/event',
    'taoQtiItem/qtiCreator/model/helper/response'
], function(_, Element, ResponseDeclaration, event, responseHelper){
    "use strict";
    var methods = {
        /**
         * Remove a choice from the interaction
         *
         * @param {string|choice} choice
         * @returns {object} this
         */
        removeChoice : function removeChoice(choice){

            var serial = '', c;
            if(typeof(choice) === 'string'){
                serial = choice;
            }else if(Element.isA(choice, 'choice')){
                serial = choice.getSerial();
            }
            if(this.choices[serial]){

                //remove choice
                c = this.choices[serial];
                delete this.choices[serial];

                //update the response
                responseHelper.removeChoice(this.getResponseDeclaration(), c);

                //trigger event
                event.deleted(c, this);
            }
            return this;
        },
        createResponse : function createResponse(attrs, template){

            var item,
                renderer,
                outcomeScore;
            var response = new ResponseDeclaration();
            if(attrs){
                response.attr(attrs);
            }

            //we assume in the context of edition, every element is created from the api so alwayd bound to an item:
            item = this.getRootElement();
            item.addResponseDeclaration(response);

            //assign responseIdentifier only after attaching it to the item to generate a unique id
            response.buildIdentifier('RESPONSE', false);
            response.setTemplate(template || 'MATCH_CORRECT');
            this.attr('responseIdentifier', response.id());

            //adding a response processing template require the outcome SCORE:
            outcomeScore = item.getOutcomeDeclaration('SCORE');
            if(!outcomeScore){
                outcomeScore = item.createOutcomeDeclaration({
                    cardinality : 'single',
                    baseType : 'float'
                });
                outcomeScore.buildIdentifier('SCORE', false);
            }

            //se the default value for the score default value
            response.mappingAttributes.defaultValue = 0;

            //set renderer
            renderer = this.getRenderer();
            if(renderer){
                response.setRenderer(renderer);
            }

            return response;
        },
        /**
         * To be called before deleting the interaction
         */
        deleteResponse : function deleteResponse(){

            var response = this.getResponseDeclaration();
            if(response){
                this.getRootElement().deleteResponseDeclaration(response);
            }
            this.removeAttr('responseIdentifier');
            return this;
        },
        beforeRemove : function beforeRemove(){

            var serial = this.serial,
                interactions = this.getRootElement().getInteractions();

            //delete its response
            this.deleteResponse();

            //when there is only one interaction remaining, its reponseIdentifier must be RESPONSE to be able to use one of the standard rp
            if(_.size(interactions) === 2){
                _.forEach(interactions, function(interaction){

                    var response = interaction.getResponseDeclaration();

                    //find the other interaction, which will be the last remaining one
                    if(response && interaction.serial !== serial && interaction.qtiClass !== 'endAttemptInteraction'){

                        interaction.attr('responseIdentifier', 'RESPONSE');
                        response.id('RESPONSE');
                    }
                });
            }
        }
    };

    return methods;
});
