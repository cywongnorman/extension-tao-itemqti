define(['taoQtiItem/portableLib/OAT/util/xml', 'taoQtiItem/portableLib/OAT/util/math'], function(xml, math){
    
    return {
        render : function render($container){
            
            var markup = $container.html();
            
            //remove xml ns (would break jquery selector otherwise)
            markup = xml.removeNamespace(markup);
            $container.html(markup);
            
            //render math
            math.render($container);
        }
    };
});