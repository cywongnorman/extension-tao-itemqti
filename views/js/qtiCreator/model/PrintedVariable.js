/**
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
 * Copyright (c) 2017 (original work) Open Assessment Technologies SA;
 */
/**
 * @author Christophe Noël <christophe@taotesting.com>
 */
define([
    'lodash',
    'taoQtiItem/qtiCreator/model/mixin/editable',
    'taoQtiItem/qtiItem/core/PrintedVariable'
], function(_, editable, PrintedVariable){
    "use strict";

    var methods = {};
    _.extend(methods, editable);
    _.extend(methods, {
        getDefaultAttributes : function(){
            return {
                format:           '%2g',
                powerForm:        false,
                base:             10,
                index:            -1,
                delimiter:        ';',
                field:            '',
                mappingIndicator: '='
            };
        },

        isEmpty: function isEmpty() {
            return !this.attr('identifier');
        }
    });
    return PrintedVariable.extend(methods);
});