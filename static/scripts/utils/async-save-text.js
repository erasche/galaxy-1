define("utils/async-save-text",["exports","jquery"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(e){return e&&e.__esModule?e:{default:e}}(t).default;e.default=function(e,t,r,n,a,u,o,s,f){void 0===a&&(a=30),void 0===o&&(o=4),i("#"+e).off().click(function(){if(!(i("#renaming-active").length>0)){var e,l=i("#"+t),c=l.text();(e=u?i("<textarea></textarea>").attr({rows:o,cols:a}).text(i.trim(c)):i("<input type='text'></input>").attr({value:i.trim(c),size:a})).attr("id","renaming-active"),e.blur(function(){i(this).remove(),l.show(),f&&f(e)}),e.keyup(function(a){if(27===a.keyCode)i(this).trigger("blur");else if(13===a.keyCode){var u={};u[n]=i(this).val(),i(this).trigger("blur"),i.ajax({url:r,data:u,error:function(){alert("Text editing for elt "+t+" failed")},success:function(t){""!==t?l.text(t):l.html("<em>None</em>"),f&&f(e)}})}}),s&&s(e),l.hide(),e.insertAfter(l),e.focus(),e.select()}})}});