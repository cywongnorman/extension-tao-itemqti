define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/containerInteraction/states/states',
    'taoQtiItem/qtiCreator/widgets/interactions/gapMatchInteraction/states/Question',
    'taoQtiItem/qtiCreator/widgets/interactions/gapMatchInteraction/states/Correct',
    'taoQtiItem/qtiCreator/widgets/interactions/gapMatchInteraction/states/Map'
], function(factory, states){
    'use strict';
    return factory.createBundle(states, arguments);
});