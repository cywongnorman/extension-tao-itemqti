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
 * Copyright (c) 2014-2017 (original work) Open Assessment Technologies SA ;
 *
 */
define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/states/Active',
    'tpl!taoQtiItem/qtiCreator/tpl/forms/item',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement'
], function(stateFactory, Active, formTpl, formElement){
    
    'use strict';
    
    var ItemStateActive = stateFactory.create(Active, function(){

        this.initForm();

    }, function(){

    });

    ItemStateActive.prototype.initForm = function(){

        var _widget = this.widget,
            item = _widget.element,
            $form = _widget.$form,
            areaBroker = this.widget.getAreaBroker();

        //build form:
        $form.html(formTpl({
            serial : item.getSerial(),
            identifier : item.id(),
            title : item.attr('title'),
            timeDependent : !!item.attr('timeDependent')
        }));
        
        //init widget
        formElement.initWidget($form);

        //init data validation and binding
        formElement.setChangeCallbacks($form, item, {
            identifier : formElement.getAttributeChangeCallback(),
            title : function titleChange(i, title){
                item.attr('title', title);
                areaBroker.getTitleArea().html(title);
            },
            timeDependent : formElement.getAttributeChangeCallback()
        });
    };

    return ItemStateActive;
});