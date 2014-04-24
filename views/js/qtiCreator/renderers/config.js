define(['lodash', 'taoQtiItem/qtiCommonRenderer/renderers/config'], function(_, commonRenderConfig){
    var locations = _.extend(_.clone(commonRenderConfig.locations), {
        '_container' : 'taoQtiItem/qtiCreator/renderers/Container',
        'assessmentItem' : 'taoQtiItem/qtiCreator/renderers/Item',
        'rubricBlock' : 'taoQtiItem/qtiCreator/renderers/RubricBlock',
        'img' : 'taoQtiItem/qtiCreator/renderers/Img',
        'modalFeedback' : 'taoQtiItem/qtiCreator/renderers/ModalFeedback',
        'choiceInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/ChoiceInteraction',
        'orderInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/OrderInteraction',
        'matchInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/MatchInteraction',
        'associateInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/AssociateInteraction',
        'inlineChoiceInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/InlineChoiceInteraction',
        'textEntryInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/TextEntryInteraction',
        'hotspotInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/HotspotInteraction',
        'mediaInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/MediaInteraction',
        'uploadInteraction' : 'taoQtiItem/qtiCreator/renderers/interactions/UploadInteraction',
        'simpleChoice.choiceInteraction' : 'taoQtiItem/qtiCreator/renderers/choices/SimpleChoice.ChoiceInteraction',
        'simpleChoice.orderInteraction' : 'taoQtiItem/qtiCreator/renderers/choices/SimpleChoice.OrderInteraction',
        'simpleAssociableChoice.associateInteraction' : 'taoQtiItem/qtiCreator/renderers/choices/SimpleAssociableChoice.AssociateInteraction',
        'simpleAssociableChoice.matchInteraction' : 'taoQtiItem/qtiCreator/renderers/choices/SimpleAssociableChoice.MatchInteraction'
    });

    return {
        name: 'creatorRenderer',
        locations : locations
    };
});
