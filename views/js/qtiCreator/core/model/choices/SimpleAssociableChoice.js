define(['lodash', 'taoQtiItem/qtiCreator/core/model/mixin/editable', 'taoQtiItem/qtiItem/core/choices/SimpleAssociableChoice'], function(_, editable, Choice){
    var methods = {};
    _.extend(methods, editable);
    _.extend(methods, {
        getDefaultAttributes : function(){
            return {
                'fixed' : false,
                'showHide' : 'show',
                'matchMax' : 0,
                'matchMin' : 0
            };
        }
    });
    return Choice.extend(methods);
});