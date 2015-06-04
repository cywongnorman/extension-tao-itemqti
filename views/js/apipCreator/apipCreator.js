/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA ;
 *
 */
define([
    'taoQtiItem/apipCreator/helper/parser',
    'taoQtiItem/apipCreator/helper/serializer',
    'taoQtiItem/apipCreator/editor/inclusionOrderSelector'
], function(parser, serializer, inclusionOrderSelector){

    function init(config){
        
        var $container = $('#apip-creator-scope');
        var $actionBar = $container.find('.item-editor-action-bar');
        var xmlDoc = parser.parse(config.properties.xml);
        console.log(config);
        console.log(config.properties.xml);
        console.log(xmlDoc);
        console.log(serializer.serialize(xmlDoc));
        
        inclusionOrderSelector.render($actionBar);
        
        initEvents($container);
    }
    
    function initEvents($container){
        
        $container.on('inclusionorderactivated', function(e, inclusionOrderType){
           console.log('activated', inclusionOrderType); 
        });
    }
    
    return {
        init : init
    };
});