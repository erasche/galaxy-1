!function(){var n="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this||{},r=n._,t=Array.prototype,e=Object.prototype,u="undefined"!=typeof Symbol?Symbol.prototype:null,i=t.push,o=t.slice,a=e.toString,c=e.hasOwnProperty,l=Array.isArray,f=Object.keys,s=Object.create,p=function(){},v=function(n){return n instanceof v?n:this instanceof v?void(this._wrapped=n):new v(n)};"undefined"==typeof exports||exports.nodeType?n._=v:("undefined"!=typeof module&&!module.nodeType&&module.exports&&(exports=module.exports=v),exports._=v),v.VERSION="1.9.1";var h,y=function(n,r,t){if(void 0===r)return n;switch(null==t?3:t){case 1:return function(t){return n.call(r,t)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,i){return n.call(r,t,e,u,i)}}return function(){return n.apply(r,arguments)}},d=function(n,r,t){return v.iteratee!==h?v.iteratee(n,r):null==n?v.identity:v.isFunction(n)?y(n,r,t):v.isObject(n)&&!v.isArray(n)?v.matcher(n):v.property(n)};v.iteratee=h=function(n,r){return d(n,r,1/0)};var g=function(n,r){return r=null==r?n.length-1:+r,function(){for(var t=Math.max(arguments.length-r,0),e=Array(t),u=0;u<t;u++)e[u]=arguments[u+r];switch(r){case 0:return n.call(this,e);case 1:return n.call(this,arguments[0],e);case 2:return n.call(this,arguments[0],arguments[1],e)}var i=Array(r+1);for(u=0;u<r;u++)i[u]=arguments[u];return i[r]=e,n.apply(this,i)}},m=function(n){if(!v.isObject(n))return{};if(s)return s(n);p.prototype=n;var r=new p;return p.prototype=null,r},b=function(n){return function(r){return null==r?void 0:r[n]}},j=function(n,r){return null!=n&&c.call(n,r)},x=function(n,r){for(var t=r.length,e=0;e<t;e++){if(null==n)return;n=n[r[e]]}return t?n:void 0},_=Math.pow(2,53)-1,A=b("length"),w=function(n){var r=A(n);return"number"==typeof r&&r>=0&&r<=_};v.each=v.forEach=function(n,r,t){r=y(r,t);var e,u;if(w(n))for(e=0,u=n.length;e<u;e++)r(n[e],e,n);else{var i=v.keys(n);for(e=0,u=i.length;e<u;e++)r(n[i[e]],i[e],n)}return n},v.map=v.collect=function(n,r,t){r=d(r,t);for(var e=!w(n)&&v.keys(n),u=(e||n).length,i=Array(u),o=0;o<u;o++){var a=e?e[o]:o;i[o]=r(n[a],a,n)}return i};var O=function(n){var r=function(r,t,e,u){var i=!w(r)&&v.keys(r),o=(i||r).length,a=n>0?0:o-1;for(u||(e=r[i?i[a]:a],a+=n);a>=0&&a<o;a+=n){var c=i?i[a]:a;e=t(e,r[c],c,r)}return e};return function(n,t,e,u){var i=arguments.length>=3;return r(n,y(t,u,4),e,i)}};v.reduce=v.foldl=v.inject=O(1),v.reduceRight=v.foldr=O(-1),v.find=v.detect=function(n,r,t){var e=(w(n)?v.findIndex:v.findKey)(n,r,t);if(void 0!==e&&-1!==e)return n[e]},v.filter=v.select=function(n,r,t){var e=[];return r=d(r,t),v.each(n,function(n,t,u){r(n,t,u)&&e.push(n)}),e},v.reject=function(n,r,t){return v.filter(n,v.negate(d(r)),t)},v.every=v.all=function(n,r,t){r=d(r,t);for(var e=!w(n)&&v.keys(n),u=(e||n).length,i=0;i<u;i++){var o=e?e[i]:i;if(!r(n[o],o,n))return!1}return!0},v.some=v.any=function(n,r,t){r=d(r,t);for(var e=!w(n)&&v.keys(n),u=(e||n).length,i=0;i<u;i++){var o=e?e[i]:i;if(r(n[o],o,n))return!0}return!1},v.contains=v.includes=v.include=function(n,r,t,e){return w(n)||(n=v.values(n)),("number"!=typeof t||e)&&(t=0),v.indexOf(n,r,t)>=0},v.invoke=g(function(n,r,t){var e,u;return v.isFunction(r)?u=r:v.isArray(r)&&(e=r.slice(0,-1),r=r[r.length-1]),v.map(n,function(n){var i=u;if(!i){if(e&&e.length&&(n=x(n,e)),null==n)return;i=n[r]}return null==i?i:i.apply(n,t)})}),v.pluck=function(n,r){return v.map(n,v.property(r))},v.where=function(n,r){return v.filter(n,v.matcher(r))},v.findWhere=function(n,r){return v.find(n,v.matcher(r))},v.max=function(n,r,t){var e,u,i=-1/0,o=-1/0;if(null==r||"number"==typeof r&&"object"!=typeof n[0]&&null!=n)for(var a=0,c=(n=w(n)?n:v.values(n)).length;a<c;a++)null!=(e=n[a])&&e>i&&(i=e);else r=d(r,t),v.each(n,function(n,t,e){((u=r(n,t,e))>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},v.min=function(n,r,t){var e,u,i=1/0,o=1/0;if(null==r||"number"==typeof r&&"object"!=typeof n[0]&&null!=n)for(var a=0,c=(n=w(n)?n:v.values(n)).length;a<c;a++)null!=(e=n[a])&&e<i&&(i=e);else r=d(r,t),v.each(n,function(n,t,e){((u=r(n,t,e))<o||u===1/0&&i===1/0)&&(i=n,o=u)});return i},v.shuffle=function(n){return v.sample(n,1/0)},v.sample=function(n,r,t){if(null==r||t)return w(n)||(n=v.values(n)),n[v.random(n.length-1)];var e=w(n)?v.clone(n):v.values(n),u=A(e);r=Math.max(Math.min(r,u),0);for(var i=u-1,o=0;o<r;o++){var a=v.random(o,i),c=e[o];e[o]=e[a],e[a]=c}return e.slice(0,r)},v.sortBy=function(n,r,t){var e=0;return r=d(r,t),v.pluck(v.map(n,function(n,t,u){return{value:n,index:e++,criteria:r(n,t,u)}}).sort(function(n,r){var t=n.criteria,e=r.criteria;if(t!==e){if(t>e||void 0===t)return 1;if(t<e||void 0===e)return-1}return n.index-r.index}),"value")};var k=function(n,r){return function(t,e,u){var i=r?[[],[]]:{};return e=d(e,u),v.each(t,function(r,u){var o=e(r,u,t);n(i,r,o)}),i}};v.groupBy=k(function(n,r,t){j(n,t)?n[t].push(r):n[t]=[r]}),v.indexBy=k(function(n,r,t){n[t]=r}),v.countBy=k(function(n,r,t){j(n,t)?n[t]++:n[t]=1});var S=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;v.toArray=function(n){return n?v.isArray(n)?o.call(n):v.isString(n)?n.match(S):w(n)?v.map(n,v.identity):v.values(n):[]},v.size=function(n){return null==n?0:w(n)?n.length:v.keys(n).length},v.partition=k(function(n,r,t){n[t?0:1].push(r)},!0),v.first=v.head=v.take=function(n,r,t){return null==n||n.length<1?null==r?void 0:[]:null==r||t?n[0]:v.initial(n,n.length-r)},v.initial=function(n,r,t){return o.call(n,0,Math.max(0,n.length-(null==r||t?1:r)))},v.last=function(n,r,t){return null==n||n.length<1?null==r?void 0:[]:null==r||t?n[n.length-1]:v.rest(n,Math.max(0,n.length-r))},v.rest=v.tail=v.drop=function(n,r,t){return o.call(n,null==r||t?1:r)},v.compact=function(n){return v.filter(n,Boolean)};var M=function(n,r,t,e){for(var u=(e=e||[]).length,i=0,o=A(n);i<o;i++){var a=n[i];if(w(a)&&(v.isArray(a)||v.isArguments(a)))if(r)for(var c=0,l=a.length;c<l;)e[u++]=a[c++];else M(a,r,t,e),u=e.length;else t||(e[u++]=a)}return e};v.flatten=function(n,r){return M(n,r,!1)},v.without=g(function(n,r){return v.difference(n,r)}),v.uniq=v.unique=function(n,r,t,e){v.isBoolean(r)||(e=t,t=r,r=!1),null!=t&&(t=d(t,e));for(var u=[],i=[],o=0,a=A(n);o<a;o++){var c=n[o],l=t?t(c,o,n):c;r&&!t?(o&&i===l||u.push(c),i=l):t?v.contains(i,l)||(i.push(l),u.push(c)):v.contains(u,c)||u.push(c)}return u},v.union=g(function(n){return v.uniq(M(n,!0,!0))}),v.intersection=function(n){for(var r=[],t=arguments.length,e=0,u=A(n);e<u;e++){var i=n[e];if(!v.contains(r,i)){var o;for(o=1;o<t&&v.contains(arguments[o],i);o++);o===t&&r.push(i)}}return r},v.difference=g(function(n,r){return r=M(r,!0,!0),v.filter(n,function(n){return!v.contains(r,n)})}),v.unzip=function(n){for(var r=n&&v.max(n,A).length||0,t=Array(r),e=0;e<r;e++)t[e]=v.pluck(n,e);return t},v.zip=g(v.unzip),v.object=function(n,r){for(var t={},e=0,u=A(n);e<u;e++)r?t[n[e]]=r[e]:t[n[e][0]]=n[e][1];return t};var F=function(n){return function(r,t,e){t=d(t,e);for(var u=A(r),i=n>0?0:u-1;i>=0&&i<u;i+=n)if(t(r[i],i,r))return i;return-1}};v.findIndex=F(1),v.findLastIndex=F(-1),v.sortedIndex=function(n,r,t,e){for(var u=(t=d(t,e,1))(r),i=0,o=A(n);i<o;){var a=Math.floor((i+o)/2);t(n[a])<u?i=a+1:o=a}return i};var E=function(n,r,t){return function(e,u,i){var a=0,c=A(e);if("number"==typeof i)n>0?a=i>=0?i:Math.max(i+c,a):c=i>=0?Math.min(i+1,c):i+c+1;else if(t&&i&&c)return i=t(e,u),e[i]===u?i:-1;if(u!==u)return(i=r(o.call(e,a,c),v.isNaN))>=0?i+a:-1;for(i=n>0?a:c-1;i>=0&&i<c;i+=n)if(e[i]===u)return i;return-1}};v.indexOf=E(1,v.findIndex,v.sortedIndex),v.lastIndexOf=E(-1,v.findLastIndex),v.range=function(n,r,t){null==r&&(r=n||0,n=0),t||(t=r<n?-1:1);for(var e=Math.max(Math.ceil((r-n)/t),0),u=Array(e),i=0;i<e;i++,n+=t)u[i]=n;return u},v.chunk=function(n,r){if(null==r||r<1)return[];for(var t=[],e=0,u=n.length;e<u;)t.push(o.call(n,e,e+=r));return t};var N=function(n,r,t,e,u){if(!(e instanceof r))return n.apply(t,u);var i=m(n.prototype),o=n.apply(i,u);return v.isObject(o)?o:i};v.bind=g(function(n,r,t){if(!v.isFunction(n))throw new TypeError("Bind must be called on a function");var e=g(function(u){return N(n,e,r,this,t.concat(u))});return e}),v.partial=g(function(n,r){var t=v.partial.placeholder,e=function(){for(var u=0,i=r.length,o=Array(i),a=0;a<i;a++)o[a]=r[a]===t?arguments[u++]:r[a];for(;u<arguments.length;)o.push(arguments[u++]);return N(n,e,this,this,o)};return e}),v.partial.placeholder=v,v.bindAll=g(function(n,r){var t=(r=M(r,!1,!1)).length;if(t<1)throw new Error("bindAll must be passed function names");for(;t--;){var e=r[t];n[e]=v.bind(n[e],n)}}),v.memoize=function(n,r){var t=function(e){var u=t.cache,i=""+(r?r.apply(this,arguments):e);return j(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return t.cache={},t},v.delay=g(function(n,r,t){return setTimeout(function(){return n.apply(null,t)},r)}),v.defer=v.partial(v.delay,v,1),v.throttle=function(n,r,t){var e,u,i,o,a=0;t||(t={});var c=function(){a=!1===t.leading?0:v.now(),e=null,o=n.apply(u,i),e||(u=i=null)},l=function(){var l=v.now();a||!1!==t.leading||(a=l);var f=r-(l-a);return u=this,i=arguments,f<=0||f>r?(e&&(clearTimeout(e),e=null),a=l,o=n.apply(u,i),e||(u=i=null)):e||!1===t.trailing||(e=setTimeout(c,f)),o};return l.cancel=function(){clearTimeout(e),a=0,e=u=i=null},l},v.debounce=function(n,r,t){var e,u,i=function(r,t){e=null,t&&(u=n.apply(r,t))},o=g(function(o){if(e&&clearTimeout(e),t){var a=!e;e=setTimeout(i,r),a&&(u=n.apply(this,o))}else e=v.delay(i,r,this,o);return u});return o.cancel=function(){clearTimeout(e),e=null},o},v.wrap=function(n,r){return v.partial(r,n)},v.negate=function(n){return function(){return!n.apply(this,arguments)}},v.compose=function(){var n=arguments,r=n.length-1;return function(){for(var t=r,e=n[r].apply(this,arguments);t--;)e=n[t].call(this,e);return e}},v.after=function(n,r){return function(){if(--n<1)return r.apply(this,arguments)}},v.before=function(n,r){var t;return function(){return--n>0&&(t=r.apply(this,arguments)),n<=1&&(r=null),t}},v.once=v.partial(v.before,2),v.restArguments=g;var I=!{toString:null}.propertyIsEnumerable("toString"),T=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],B=function(n,r){var t=T.length,u=n.constructor,i=v.isFunction(u)&&u.prototype||e,o="constructor";for(j(n,o)&&!v.contains(r,o)&&r.push(o);t--;)(o=T[t])in n&&n[o]!==i[o]&&!v.contains(r,o)&&r.push(o)};v.keys=function(n){if(!v.isObject(n))return[];if(f)return f(n);var r=[];for(var t in n)j(n,t)&&r.push(t);return I&&B(n,r),r},v.allKeys=function(n){if(!v.isObject(n))return[];var r=[];for(var t in n)r.push(t);return I&&B(n,r),r},v.values=function(n){for(var r=v.keys(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=n[r[u]];return e},v.mapObject=function(n,r,t){r=d(r,t);for(var e=v.keys(n),u=e.length,i={},o=0;o<u;o++){var a=e[o];i[a]=r(n[a],a,n)}return i},v.pairs=function(n){for(var r=v.keys(n),t=r.length,e=Array(t),u=0;u<t;u++)e[u]=[r[u],n[r[u]]];return e},v.invert=function(n){for(var r={},t=v.keys(n),e=0,u=t.length;e<u;e++)r[n[t[e]]]=t[e];return r},v.functions=v.methods=function(n){var r=[];for(var t in n)v.isFunction(n[t])&&r.push(t);return r.sort()};var R=function(n,r){return function(t){var e=arguments.length;if(r&&(t=Object(t)),e<2||null==t)return t;for(var u=1;u<e;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;c<a;c++){var l=o[c];r&&void 0!==t[l]||(t[l]=i[l])}return t}};v.extend=R(v.allKeys),v.extendOwn=v.assign=R(v.keys),v.findKey=function(n,r,t){r=d(r,t);for(var e,u=v.keys(n),i=0,o=u.length;i<o;i++)if(e=u[i],r(n[e],e,n))return e};var q=function(n,r,t){return r in t};v.pick=g(function(n,r){var t={},e=r[0];if(null==n)return t;v.isFunction(e)?(r.length>1&&(e=y(e,r[1])),r=v.allKeys(n)):(e=q,r=M(r,!1,!1),n=Object(n));for(var u=0,i=r.length;u<i;u++){var o=r[u],a=n[o];e(a,o,n)&&(t[o]=a)}return t}),v.omit=g(function(n,r){var t,e=r[0];return v.isFunction(e)?(e=v.negate(e),r.length>1&&(t=r[1])):(r=v.map(M(r,!1,!1),String),e=function(n,t){return!v.contains(r,t)}),v.pick(n,e,t)}),v.defaults=R(v.allKeys,!0),v.create=function(n,r){var t=m(n);return r&&v.extendOwn(t,r),t},v.clone=function(n){return v.isObject(n)?v.isArray(n)?n.slice():v.extend({},n):n},v.tap=function(n,r){return r(n),n},v.isMatch=function(n,r){var t=v.keys(r),e=t.length;if(null==n)return!e;for(var u=Object(n),i=0;i<e;i++){var o=t[i];if(r[o]!==u[o]||!(o in u))return!1}return!0};var K,z;K=function(n,r,t,e){if(n===r)return 0!==n||1/n==1/r;if(null==n||null==r)return!1;if(n!==n)return r!==r;var u=typeof n;return("function"===u||"object"===u||"object"==typeof r)&&z(n,r,t,e)},z=function(n,r,t,e){n instanceof v&&(n=n._wrapped),r instanceof v&&(r=r._wrapped);var i=a.call(n);if(i!==a.call(r))return!1;switch(i){case"[object RegExp]":case"[object String]":return""+n==""+r;case"[object Number]":return+n!=+n?+r!=+r:0==+n?1/+n==1/r:+n==+r;case"[object Date]":case"[object Boolean]":return+n==+r;case"[object Symbol]":return u.valueOf.call(n)===u.valueOf.call(r)}var o="[object Array]"===i;if(!o){if("object"!=typeof n||"object"!=typeof r)return!1;var c=n.constructor,l=r.constructor;if(c!==l&&!(v.isFunction(c)&&c instanceof c&&v.isFunction(l)&&l instanceof l)&&"constructor"in n&&"constructor"in r)return!1}t=t||[],e=e||[];for(var f=t.length;f--;)if(t[f]===n)return e[f]===r;if(t.push(n),e.push(r),o){if((f=n.length)!==r.length)return!1;for(;f--;)if(!K(n[f],r[f],t,e))return!1}else{var s,p=v.keys(n);if(f=p.length,v.keys(r).length!==f)return!1;for(;f--;)if(s=p[f],!j(r,s)||!K(n[s],r[s],t,e))return!1}return t.pop(),e.pop(),!0},v.isEqual=function(n,r){return K(n,r)},v.isEmpty=function(n){return null==n||(w(n)&&(v.isArray(n)||v.isString(n)||v.isArguments(n))?0===n.length:0===v.keys(n).length)},v.isElement=function(n){return!(!n||1!==n.nodeType)},v.isArray=l||function(n){return"[object Array]"===a.call(n)},v.isObject=function(n){var r=typeof n;return"function"===r||"object"===r&&!!n},v.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(n){v["is"+n]=function(r){return a.call(r)==="[object "+n+"]"}}),v.isArguments(arguments)||(v.isArguments=function(n){return j(n,"callee")});var D=n.document&&n.document.childNodes;"function"!=typeof/./&&"object"!=typeof Int8Array&&"function"!=typeof D&&(v.isFunction=function(n){return"function"==typeof n||!1}),v.isFinite=function(n){return!v.isSymbol(n)&&isFinite(n)&&!isNaN(parseFloat(n))},v.isNaN=function(n){return v.isNumber(n)&&isNaN(n)},v.isBoolean=function(n){return!0===n||!1===n||"[object Boolean]"===a.call(n)},v.isNull=function(n){return null===n},v.isUndefined=function(n){return void 0===n},v.has=function(n,r){if(!v.isArray(r))return j(n,r);for(var t=r.length,e=0;e<t;e++){var u=r[e];if(null==n||!c.call(n,u))return!1;n=n[u]}return!!t},v.noConflict=function(){return n._=r,this},v.identity=function(n){return n},v.constant=function(n){return function(){return n}},v.noop=function(){},v.property=function(n){return v.isArray(n)?function(r){return x(r,n)}:b(n)},v.propertyOf=function(n){return null==n?function(){}:function(r){return v.isArray(r)?x(n,r):n[r]}},v.matcher=v.matches=function(n){return n=v.extendOwn({},n),function(r){return v.isMatch(r,n)}},v.times=function(n,r,t){var e=Array(Math.max(0,n));r=y(r,t,1);for(var u=0;u<n;u++)e[u]=r(u);return e},v.random=function(n,r){return null==r&&(r=n,n=0),n+Math.floor(Math.random()*(r-n+1))},v.now=Date.now||function(){return(new Date).getTime()};var L={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},P=v.invert(L),W=function(n){var r=function(r){return n[r]},t="(?:"+v.keys(n).join("|")+")",e=RegExp(t),u=RegExp(t,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,r):n}};v.escape=W(L),v.unescape=W(P),v.result=function(n,r,t){v.isArray(r)||(r=[r]);var e=r.length;if(!e)return v.isFunction(t)?t.call(n):t;for(var u=0;u<e;u++){var i=null==n?void 0:n[r[u]];void 0===i&&(i=t,u=e),n=v.isFunction(i)?i.call(n):i}return n};var C=0;v.uniqueId=function(n){var r=++C+"";return n?n+r:r},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var J=/(.)^/,U={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},V=/\\|'|\r|\n|\u2028|\u2029/g,$=function(n){return"\\"+U[n]};v.template=function(n,r,t){!r&&t&&(r=t),r=v.defaults({},r,v.templateSettings);var e=RegExp([(r.escape||J).source,(r.interpolate||J).source,(r.evaluate||J).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(r,t,e,o,a){return i+=n.slice(u,a).replace(V,$),u=a+r.length,t?i+="'+\n((__t=("+t+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),r}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";var o;try{o=new Function(r.variable||"obj","_",i)}catch(n){throw n.source=i,n}var a=function(n){return o.call(this,n,v)},c=r.variable||"obj";return a.source="function("+c+"){\n"+i+"}",a},v.chain=function(n){var r=v(n);return r._chain=!0,r};var G=function(n,r){return n._chain?v(r).chain():r};v.mixin=function(n){return v.each(v.functions(n),function(r){var t=v[r]=n[r];v.prototype[r]=function(){var n=[this._wrapped];return i.apply(n,arguments),G(this,t.apply(v,n))}}),v},v.mixin(v),v.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var r=t[n];v.prototype[n]=function(){var t=this._wrapped;return r.apply(t,arguments),"shift"!==n&&"splice"!==n||0!==t.length||delete t[0],G(this,t)}}),v.each(["concat","join","slice"],function(n){var r=t[n];v.prototype[n]=function(){return G(this,r.apply(this._wrapped,arguments))}}),v.prototype.value=function(){return this._wrapped},v.prototype.valueOf=v.prototype.toJSON=v.prototype.value,v.prototype.toString=function(){return String(this._wrapped)},"function"==typeof define&&define.amd&&define("underscore",[],function(){return v})}();