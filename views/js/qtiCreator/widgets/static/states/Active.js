define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/states/Active'
], function(stateFactory, Active){
    
    return stateFactory.extend(Active, function(){
        
        var _widget = this.widget,
            $container = _widget.$container;
        
        _widget.beforeStateInit(function(e, element, state){
            
            var serial = element.getSerial();
            if(state.name === 'active' && serial !== _widget.serial){
                //call sleep whenever other widget is active
                _widget.changeState('sleep');
            }
            
        }, 'otherActive');
        
        $container.on('mouseenter.sleep', function(e){
            $container.parent().trigger('mouseleave.sleep');
        }).on('mouseleave.sleep', function(){
            $container.parent().trigger('mouseenter.sleep');
        });
        
    }, function(){
        
        this.widget.$container.off('.active');
        $('#item-editor-panel').off('.active');
        
        this.widget.offEvents('otherActive');
    });
    
});