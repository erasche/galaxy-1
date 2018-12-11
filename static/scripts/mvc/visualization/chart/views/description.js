define("mvc/visualization/chart/views/description",["exports","utils/utils"],function(t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){return t&&t.__esModule?t:{default:t}}(i);t.default=Backbone.View.extend({initialize:function(t){this.plugin=t.chart.plugin,this.setElement(this._template()),this.$title=this.$(".charts-description-title"),this.$image=this.$(".charts-description-image"),this.$text=this.$(".charts-description-text"),this.render()},render:function(){this.plugin.logo?(this.$image.attr("src",Galaxy.root+this.plugin.logo),this.$title.html(this.plugin.html||"Unavailable"),this.$text.html(e.default.linkify(this.plugin.description||"")),this.$el.show()):this.$el.hide()},_template:function(){return'<div class="charts-description">\n                    <table>\n                    <tr>\n                        <td class="charts-description-image-td">\n                            <img class="charts-description-image"/>\n                        </td>\n                        <td>\n                            <div class="charts-description-title ui-form-info"/>\n                        </td>\n                    </tr>\n                    </table>\n                    <div class="charts-description-text ui-form-info"/>\n                </div>'}})});