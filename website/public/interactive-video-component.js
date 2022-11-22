(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(e)}function r(t){var e="function"==typeof Map?new Map:void 0;return r=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,o)}function o(){return i(t,arguments,a(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),u(o,t)},r(t)}function i(t,e,n){return i=c()?Reflect.construct.bind():function(t,e,n){var o=[null];o.push.apply(o,e);var r=new(Function.bind.apply(t,o));return n&&u(r,n.prototype),r},i.apply(null,arguments)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function u(t,e){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},u(t,e)}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}var l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&u(t,e)}(p,t);var r,i,l,f,s=(r=p,i=c(),function(){var t,e=a(r);if(i){var n=a(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return o(this,t)});function p(){return e(this,p),s.apply(this,arguments)}return l=p,(f=[{key:"timestamp",get:function(){return this.getAttribute("timestamp")}}])&&n(l.prototype,f),Object.defineProperty(l,"prototype",{writable:!1}),p}(r(HTMLElement));function f(t){var e=t.querySelector(":scope > video");return e instanceof HTMLVideoElement?e:null}function s(t){var e={};return t.querySelectorAll(":scope > interactive-element").forEach((function(t){if(t instanceof l){var n=(o=t.timestamp,(r=Date.parse("1970-01-01T"+o+"Z"))?parseInt(new Date(r).getTime()/1e3):NaN);n&&(e[n]=t)}var o,r})),e}function p(t){var e=[];return t.querySelectorAll(":scope > interactive-element").forEach((function(t){t instanceof l&&e.push(t.id)})),e}function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t,e){if(e&&("object"===y(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return h(t)}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t){var e="function"==typeof Map?new Map:void 0;return v=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,o)}function o(){return w(t,arguments,j(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),O(o,t)},v(t)}function w(t,e,n){return w=g()?Reflect.construct.bind():function(t,e,n){var o=[null];o.push.apply(o,e);var r=new(Function.bind.apply(t,o));return n&&O(r,n.prototype),r},w.apply(null,arguments)}function g(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}function S(t,e,n){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,n)}function E(t,e){var n=function(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}(t,e);return function(t,e){return e.get?e.get.call(t):e.value}(t,n)}function x(t){return t.toString(16).padStart(2,"0")}function T(t){var e,n,o=t.getBoundingClientRect().width;t.style.height="".concat((e=o,n=Math.min(500,e-32),Math.round(5*n/6)+144),"px")}var P=new WeakMap,R=new WeakMap,_=new WeakMap,M=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(c,t);var e,n,o,r,i=(e=c,n=g(),function(){var t,o=j(e);if(n){var r=j(this).constructor;t=Reflect.construct(o,arguments,r)}else t=o.apply(this,arguments);return m(this,t)});function c(){var t;d(this,c);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return S(h(t=i.call.apply(i,[this].concat(n))),P,{writable:!0,value:f(h(t))}),S(h(t),R,{writable:!0,value:s(h(t))}),S(h(t),_,{writable:!0,value:p(h(t))}),t}return o=c,(r=[{key:"connectedCallback",value:function(){var t,e=E(this,P),n=(t=new Uint8Array(20),window.crypto.getRandomValues(t),Array.from(t,x).join("")),o=E(this,R),r=Object.keys(o),i=E(this,_),c=this.attachShadow({mode:"closed"});c.innerHTML="<slot></slot>";var u=document.createElement("iframe");u.style.border="none",u.style.width="100%",T(u),u.setAttribute("loading","eager"),u.setAttribute("sandbox","allow-scripts allow-same-origin allow-popups allow-modals allow-forms"),c.appendChild(u),window.addEventListener("message",(function(t){var o=t.data;"sessionID"in o&&o.sessionID==n&&o.continueVideo&&(e.scrollIntoView({behavior:"smooth"}),e.controls=!0,e.play(),"timeStamp"in o&&setTimeout((function(){r.push(o.timeStamp)}),1500))}),!1),requestAnimationFrame((function(){T(u),u.src=function(t){var e=t.join("&prompts=");return"http://localhost:3000/embed?prompts=".concat(e)}(i)}));var a,l,f=(l="?t=",(a=window.location.href).indexOf(l)>0?a.substring(a.indexOf(l)+l.length):null),s=!1;u.onload=function(){s=!0};var p=!1;e.oncanplay=function(){f&&!p&&(e.currentTime=f,p=!0)},e.ontimeupdate=function(){var t=Math.floor(this.currentTime).toString();if(r.includes(t)){e.pause(),window.location.href.includes("?t=")||(e.controls=!1),u.scrollIntoView({behavior:"smooth"});try{window.document.exitFullscreen()}catch(t){console.log(t)}var i=o[t].id,c=window.location.href,a=function(){var t,e=document.querySelector("meta[property='og:site_name']");if(e)t=e.getAttribute("content");else{var n=window.location.href;t=n.slice(n.indexOf("://")+3,n.lastIndexOf("/"))}return t}(),l={promptID:i,contact:c,sessionID:n,context:"ContextURL not implemented yet",timeStamp:t,contextName:a};r.splice(r.indexOf(t),1),s&&u.contentWindow.postMessage(l,u.src);var f=setInterval((function(){u.contentWindow.postMessage(l,u.src)}),500);s&&clearInterval(f)}}}}])&&b(o.prototype,r),Object.defineProperty(o,"prototype",{writable:!1}),c}(v(HTMLElement));window.customElements.define("interactive-element",l),window.customElements.define("interactive-video",M)})();