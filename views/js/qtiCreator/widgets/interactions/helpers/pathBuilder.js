define([
    'jquery', 'lodash', 
    'taoQtiItem/qtiCommonRenderer/helpers/Graphic'
], function($, _, graphicHelper){


    var pathBuilder = function(paper){

        var path = {

            _path : null,

            closed : false,

            set : null,

            points : [],

            getPath : function(){
                return this._path;
            },

            start : function(point){
                this.points = [];
                return this.add(point);
            },

            add : function(point){
                var self = this;
                var stop; 
                var closeMe = false;
                if(this.points.length === 0){

                    this.set = paper.set();

                    this._path = paper.path('M' + point.x + ',' + point.y).attr(graphicHelper._style.active).attr('opacity', 0.3); 
                    this.set.push(this._path);
                }
            
                this.points.push(point);

                stop = paper.circle(point.x, point.y, 3)
                            .attr({'stroke' : 'black', 'stroke-width': 1, 'fill' : 'white', 'opacity' : 0.7, 'cursor' : 'pointer'})
                            .click(function(event){
                                event.preventDefault();
                                if(self.points.length > 2){
                                    self.close();
                                }
                            });

                this.set.push(stop);
                this._path.animate({ path : this._path.attr('path') + 'L' +  point.x + ',' + point.y});
     
                return this;
            },

            close : function(){
                this._path.attr({ path : this._path.attr('path') + 'Z', opacity : 0.7});
                this.set.forEach(function(elt){
                    if(elt.type === 'circle'){
                        elt.remove();         
                    }
                });
                this.closed = true;
                if(_.isFunction(this.closeCb)){
                    this.closeCb();
                }
                
                return this;
            },

            onClose : function(closeCb){
                this.closeCb = closeCb;
                return this;
            }
        };
        return path;
    };

    return pathBuilder;
});
