/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Anime v1.1.3
 * http://anime-js.com
 * JavaScript animation engine
 * Copyright (c) 2016 Julian Garnier
 * http://juliangarnier.com
 * Released under the MIT license
 */

(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.anime = factory();
  }
}(this, function () {

  var version = '1.1.3';

  // Defaults

  var defaultSettings = {
    duration: 1000,
    delay: 0,
    loop: false,
    autoplay: true,
    direction: 'normal',
    easing: 'easeOutElastic',
    elasticity: 400,
    round: false,
    begin: undefined,
    update: undefined,
    complete: undefined
  }

  // Transforms

  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
  var transform, transformStr = 'transform';

  // Utils

  var is = {
    arr: function(a) { return Array.isArray(a) },
    obj: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
    svg: function(a) { return a instanceof SVGElement },
    dom: function(a) { return a.nodeType || is.svg(a) },
    num: function(a) { return !isNaN(parseInt(a)) },
    str: function(a) { return typeof a === 'string' },
    fnc: function(a) { return typeof a === 'function' },
    und: function(a) { return typeof a === 'undefined' },
    nul: function(a) { return typeof a === 'null' },
    hex: function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
    rgb: function(a) { return /^rgb/.test(a) },
    hsl: function(a) { return /^hsl/.test(a) },
    col: function(a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)) }
  }

  // Easings functions adapted from http://jqueryui.com/

  var easings = (function() {
    var eases = {};
    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
    var functions = {
      Sine: function(t) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
      Elastic: function(t, m) {
        if( t === 0 || t === 1 ) return t;
        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
      },
      Back: function(t) { return t * t * ( 3 * t - 2 ); },
      Bounce: function(t) {
        var pow2, bounce = 4;
        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
      }
    }
    names.forEach(function(name, i) {
      functions[name] = function(t) {
        return Math.pow( t, i + 2 );
      }
    });
    Object.keys(functions).forEach(function(name) {
      var easeIn = functions[name];
      eases['easeIn' + name] = easeIn;
      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
      eases['easeOutIn' + name] = function(t, m) { return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2; };
    });
    eases.linear = function(t) { return t; };
    return eases;
  })();

  // Strings

  var numberToString = function(val) {
    return (is.str(val)) ? val : val + '';
  }

  var stringToHyphens = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  var selectString = function(str) {
    if (is.col(str)) return false;
    try {
      var nodes = document.querySelectorAll(str);
      return nodes;
    } catch(e) {
      return false;
    }
  }

  // Numbers

  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Arrays

  var flattenArray = function(arr) {
    return arr.reduce(function(a, b) {
      return a.concat(is.arr(b) ? flattenArray(b) : b);
    }, []);
  }

  var toArray = function(o) {
    if (is.arr(o)) return o;
    if (is.str(o)) o = selectString(o) || o;
    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
    return [o];
  }

  var arrayContains = function(arr, val) {
    return arr.some(function(a) { return a === val; });
  }

  var groupArrayByProps = function(arr, propsArr) {
    var groups = {};
    arr.forEach(function(o) {
      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }

  var removeArrayDuplicates = function(arr) {
    return arr.filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    });
  }

  // Objects

  var cloneObject = function(o) {
    var newObject = {};
    for (var p in o) newObject[p] = o[p];
    return newObject;
  }

  var mergeObjects = function(o1, o2) {
    for (var p in o2) o1[p] = !is.und(o1[p]) ? o1[p] : o2[p];
    return o1;
  }

  // Colors

  var hexToRgb = function(hex) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  var hslToRgb = function(hsl) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
    var h = parseInt(hsl[1]) / 360;
    var s = parseInt(hsl[2]) / 100;
    var l = parseInt(hsl[3]) / 100;
    var hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
  }

  var colorToRgb = function(val) {
    if (is.rgb(val)) return val;
    if (is.hex(val)) return hexToRgb(val);
    if (is.hsl(val)) return hslToRgb(val);
  }

  // Units

  var getUnit = function(val) {
    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
  }

  var addDefaultTransformUnit = function(prop, val, intialVal) {
    if (getUnit(val)) return val;
    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
    return val;
  }

  // Values

  var getCSSValue = function(el, prop) {
    // First check if prop is a valid CSS property
    if (prop in el.style) {
      // Then return the property value or fallback to '0' when getPropertyValue fails
      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
    }
  }

  var getTransformValue = function(el, prop) {
    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
    var str = el.style.transform;
    if (!str) return defaultVal;
    var rgx = /(\w+)\((.+?)\)/g;
    var match = [];
    var props = [];
    var values = [];
    while (match = rgx.exec(str)) {
      props.push(match[1]);
      values.push(match[2]);
    }
    var val = values.filter(function(f, i) { return props[i] === prop; });
    return val.length ? val[0] : defaultVal;
  }

  var getAnimationType = function(el, prop) {
    if ( is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
    if ( is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
    if ( is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
    if (!is.nul(el[prop]) && !is.und(el[prop])) return 'object';
  }

  var getInitialTargetValue = function(target, prop) {
    switch (getAnimationType(target, prop)) {
      case 'transform': return getTransformValue(target, prop);
      case 'css': return getCSSValue(target, prop);
      case 'attribute': return target.getAttribute(prop);
    }
    return target[prop] || 0;
  }

  var getValidValue = function(values, val, originalCSS) {
    if (is.col(val)) return colorToRgb(val);
    if (getUnit(val)) return val;
    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
    if (!unit && originalCSS) unit = getUnit(originalCSS);
    return unit ? val + unit : val;
  }

  var decomposeValue = function(val) {
    var rgx = /-?\d*\.?\d+/g;
    return {
      original: val,
      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
      strings: numberToString(val).split(rgx)
    }
  }

  var recomposeValue = function(numbers, strings, initialStrings) {
    return strings.reduce(function(a, b, i) {
      var b = (b ? b : initialStrings[i - 1]);
      return a + numbers[i - 1] + b;
    });
  }

  // Animatables

  var getAnimatables = function(targets) {
    var targets = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
    return targets.map(function(t, i) {
      return { target: t, id: i };
    });
  }

  // Properties

  var getProperties = function(params, settings) {
    var props = [];
    for (var p in params) {
      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
        var prop = is.obj(params[p]) ? cloneObject(params[p]) : {value: params[p]};
        prop.name = p;
        props.push(mergeObjects(prop, settings));
      }
    }
    return props;
  }

  var getPropertiesValues = function(target, prop, value, i) {
    var values = toArray( is.fnc(value) ? value(target, i) : value);
    return {
      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
      to: (values.length > 1) ? values[1] : values[0]
    }
  }

  // Tweens

  var getTweenValues = function(prop, values, type, target) {
    var valid = {};
    if (type === 'transform') {
      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
    } else {
      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
      valid.from = getValidValue(values, values.from, originalCSS);
      valid.to = getValidValue(values, values.to, originalCSS);
    }
    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
  }

  var getTweensProps = function(animatables, props) {
    var tweensProps = [];
    animatables.forEach(function(animatable, i) {
      var target = animatable.target;
      return props.forEach(function(prop) {
        var animType = getAnimationType(target, prop.name);
        if (animType) {
          var values = getPropertiesValues(target, prop.name, prop.value, i);
          var tween = cloneObject(prop);
          tween.animatables = animatable;
          tween.type = animType;
          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
          tween.round = (is.col(values.from) || tween.round) ? 1 : 0;
          tween.delay = (is.fnc(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
          tween.duration = (is.fnc(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
          tweensProps.push(tween);
        }
      });
    });
    return tweensProps;
  }

  var getTweens = function(animatables, props) {
    var tweensProps = getTweensProps(animatables, props);
    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
    return splittedProps.map(function(tweenProps) {
      var tween = cloneObject(tweenProps[0]);
      tween.animatables = tweenProps.map(function(p) { return p.animatables });
      tween.totalDuration = tween.delay + tween.duration;
      return tween;
    });
  }

  var reverseTweens = function(anim, delays) {
    anim.tweens.forEach(function(tween) {
      var toVal = tween.to;
      var fromVal = tween.from;
      var delayVal = anim.duration - (tween.delay + tween.duration);
      tween.from = toVal;
      tween.to = fromVal;
      if (delays) tween.delay = delayVal;
    });
    anim.reversed = anim.reversed ? false : true;
  }

  var getTweensDuration = function(tweens) {
    return Math.max.apply(Math, tweens.map(function(tween){ return tween.totalDuration; }));
  }

  var getTweensDelay = function(tweens) {
    return Math.min.apply(Math, tweens.map(function(tween){ return tween.delay; }));
  }

  // will-change

  var getWillChange = function(anim) {
    var props = [];
    var els = [];
    anim.tweens.forEach(function(tween) {
      if (tween.type === 'css' || tween.type === 'transform' ) {
        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
      }
    });
    return {
      properties: removeArrayDuplicates(props).join(', '),
      elements: removeArrayDuplicates(els)
    }
  }

  var setWillChange = function(anim) {
    var willChange = getWillChange(anim);
    willChange.elements.forEach(function(element) {
      element.style.willChange = willChange.properties;
    });
  }

  var removeWillChange = function(anim) {
    var willChange = getWillChange(anim);
    willChange.elements.forEach(function(element) {
      element.style.removeProperty('will-change');
    });
  }

  /* Svg path */

  var getPathProps = function(path) {
    var el = is.str(path) ? selectString(path)[0] : path;
    return {
      path: el,
      value: el.getTotalLength()
    }
  }

  var snapProgressToPath = function(tween, progress) {
    var pathEl = tween.path;
    var pathProgress = tween.value * progress;
    var point = function(offset) {
      var o = offset || 0;
      var p = progress > 1 ? tween.value + o : pathProgress + o;
      return pathEl.getPointAtLength(p);
    }
    var p = point();
    var p0 = point(-1);
    var p1 = point(+1);
    switch (tween.name) {
      case 'translateX': return p.x;
      case 'translateY': return p.y;
      case 'rotate': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    }
  }

  // Progress

  var getTweenProgress = function(tween, time) {
    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
    var percent = elapsed / tween.duration;
    var progress = tween.to.numbers.map(function(number, p) {
      var start = tween.from.numbers[p];
      var eased = easings[tween.easing](percent, tween.elasticity);
      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
      val = tween.round ? Math.round(val * tween.round) / tween.round : val;
      return val;
    });
    return recomposeValue(progress, tween.to.strings, tween.from.strings);
  }

  var setAnimationProgress = function(anim, time) {
    var transforms;
    anim.currentTime = time;
    anim.progress = (time / anim.duration) * 100;
    for (var t = 0; t < anim.tweens.length; t++) {
      var tween = anim.tweens[t];
      tween.currentValue = getTweenProgress(tween, time);
      var progress = tween.currentValue;
      for (var a = 0; a < tween.animatables.length; a++) {
        var animatable = tween.animatables[a];
        var id = animatable.id;
        var target = animatable.target;
        var name = tween.name;
        switch (tween.type) {
          case 'css': target.style[name] = progress; break;
          case 'attribute': target.setAttribute(name, progress); break;
          case 'object': target[name] = progress; break;
          case 'transform':
          if (!transforms) transforms = {};
          if (!transforms[id]) transforms[id] = [];
          transforms[id].push(progress);
          break;
        }
      }
    }
    if (transforms) {
      if (!transform) transform = (getCSSValue(document.body, transformStr) ? '' : '-webkit-') + transformStr;
      for (var t in transforms) {
        anim.animatables[t].target.style[transform] = transforms[t].join(' ');
      }
    }
  }

  // Animation

  var createAnimation = function(params) {
    var anim = {};
    anim.animatables = getAnimatables(params.targets);
    anim.settings = mergeObjects(params, defaultSettings);
    anim.properties = getProperties(params, anim.settings);
    anim.tweens = getTweens(anim.animatables, anim.properties);
    anim.duration = anim.tweens.length ? getTweensDuration(anim.tweens) : params.duration;
    anim.delay = anim.tweens.length ? getTweensDelay(anim.tweens) : params.delay;
    anim.currentTime = 0;
    anim.progress = 0;
    anim.ended = false;
    return anim;
  }

  // Public

  var animations = [];
  var raf = 0;

  var engine = (function() {
    var play = function() { raf = requestAnimationFrame(step); };
    var step = function(t) {
      if (animations.length) {
        for (var i = 0; i < animations.length; i++) animations[i].tick(t);
        play();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }
    return play;
  })();

  var animation = function(params) {

    var anim = createAnimation(params);
    var time = {};

    anim.tick = function(now) {
      anim.ended = false;
      if (!time.start) time.start = now;
      time.current = Math.min(Math.max(time.last + now - time.start, 0), anim.duration);
      setAnimationProgress(anim, time.current);
      var s = anim.settings;
      if (time.current >= anim.delay) {
        if (s.begin) s.begin(anim); s.begin = undefined;
        if (s.update) s.update(anim);
      }
      if (time.current >= anim.duration) {
        if (s.loop) {
          time.start = now;
          if (s.direction === 'alternate') reverseTweens(anim, true);
          if (is.num(s.loop)) s.loop--;
        } else {
          anim.ended = true;
          anim.pause();
          if (s.complete) s.complete(anim);
        }
        time.last = 0;
      }
    }

    anim.seek = function(progress) {
      setAnimationProgress(anim, (progress / 100) * anim.duration);
    }

    anim.pause = function() {
      removeWillChange(anim);
      var i = animations.indexOf(anim);
      if (i > -1) animations.splice(i, 1);
    }

    anim.play = function(params) {
      anim.pause();
      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
      time.start = 0;
      time.last = anim.ended ? 0 : anim.currentTime;
      var s = anim.settings;
      if (s.direction === 'reverse') reverseTweens(anim);
      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
      setWillChange(anim);
      animations.push(anim);
      if (!raf) engine();
    }

    anim.restart = function() {
      if (anim.reversed) reverseTweens(anim);
      anim.pause();
      anim.seek(0);
      anim.play();
    }

    if (anim.settings.autoplay) anim.play();

    return anim;

  }

  // Remove one or multiple targets from all active animations.

  var remove = function(elements) {
    var targets = flattenArray(is.arr(elements) ? elements.map(toArray) : toArray(elements));
    for (var i = animations.length-1; i >= 0; i--) {
      var animation = animations[i];
      var tweens = animation.tweens;
      for (var t = tweens.length-1; t >= 0; t--) {
        var animatables = tweens[t].animatables;
        for (var a = animatables.length-1; a >= 0; a--) {
          if (arrayContains(targets, animatables[a].target)) {
            animatables.splice(a, 1);
            if (!animatables.length) tweens.splice(t, 1);
            if (!tweens.length) animation.pause();
          }
        }
      }
    }
  }

  animation.version = version;
  animation.speed = 1;
  animation.list = animations;
  animation.remove = remove;
  animation.easings = easings;
  animation.getValue = getInitialTargetValue;
  animation.path = getPathProps;
  animation.random = random;

  return animation;

}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const anime = __webpack_require__(0);
const Circle = __webpack_require__(3);
const Dot = __webpack_require__(4);
const dotOptions = __webpack_require__(2);

const Explosions = (function (canvas, ctx) {
  const animations = [];

  const setCanvasSize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const distance = canvas.width;

  const createDots = function (x, y, options) {
    const dots = [];
    for (let i = 0; i < options.numDots; i++) {
      const p = new Dot(x, y, options);
      dots.push(p);
    }
    return dots;
  };

  const removeAnimation = function (animation) {
    const index = animations.indexOf(animation);
    if (index > -1) { animations.splice(index, 1); }
  };

  const animateDots = function (options) {
    setCanvasSize();
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dots = createDots(x, y, options);
    const circle = new Circle(x, y);
    const dotsAnimation = anime({
      targets: dots,
      x: function(p) { return p.x + anime.random(-distance, distance); },
      y: function(p) { return p.y + anime.random(-distance, distance); },
      radius: options.endRadius,
      duration: function () { return anime.random(...options.duration); },
      easing: 'easeOutExpo',
      complete: removeAnimation,
    });
    const circleAnimation = anime({
      targets: circle,
      radius: function () { return canvas.width + 200; },
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: function () { return 80000; },
      },
      duration: function () { return anime.random(5000, 8000); },
      easing: 'easeOutExpo',
      complete: removeAnimation,
    });
    animations.push(dotsAnimation);
    animations.push(circleAnimation);
  };

  const mainLoop = anime({
    duration: Infinity,
    update: function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach(function (anim) {
        anim.animatables.forEach(function (animatable) {
          animatable.target.draw(ctx);
        });
      });
    },
  });

  document.addEventListener('keydown', function (e) {
    const key = (e.key);
    if (Object.keys(dotOptions).indexOf(key) > -1) {
      animateDots(dotOptions[key]);
    }
  }, false);

  window.addEventListener('resize', setCanvasSize, false);
});

module.exports = Explosions;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  // big
  z: {
    color: '#baecf0',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  x: {
    color: '#ed6e2f',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  c: {
    color: '#f6c7df',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  v: {
    color: '#f4de70',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  b: {
    color: '#fbfbf4',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  n: {
    color: '#222121',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  m: {
    color: '#baecf0',
    radius: [175, 200],
    endRadius: 200,
    duration: [500, 1000],
    numDots: 1,
  },
  // mid
  // f: {
  //   color: '#f4de70',
  //   radius: [25, 50],
  //   duration: [500, 1000],
  //   endRadius: 35,
  //   numDots: 10,
  // },
  // medium large
  a: {
    color: '#baecf0',
    radius: [50, 100],
    duration: [500, 1000],
    endRadius: 100,
    numDots: 10,
  },
  s: {
    color: '#f6c7df',
    radius: [50, 100],
    duration: [500, 1000],
    endRadius: 100,
    numDots: 10,
  },
  d: {
    color: '#ed6e2f',
    radius: [50, 100],
    duration: [500, 1000],
    endRadius: 100,
    numDots: 10,
  },
  f: {
    color: '#f4de70',
    radius: [50, 100],
    duration: [500, 1000],
    endRadius: 100,
    numDots: 10,
  },
  // small
  h: {
    color: '#fbfbf4',
    radius: [15, 25],
    duration: [1000, 2000],
    endRadius: 0,
    numDots: 25,
  },
  j: {
    color: '#222121',
    radius: [10, 15],
    duration: [1000, 2000],
    endRadius: 0,
    numDots: 30,
  },
  k: {
    color: '#f6c7df',
    radius: [10, 15],
    duration: [500, 1000],
    endRadius: 0,
    numDots: 30,
  },
  l: {
    color: '#f4de70',
    radius: [10, 15],
    duration: [500, 1000],
    endRadius: 0,
    numDots: 30,
  },
  // TBD
  // w: {
  //   color: '#ed6e2f',
  //   radius: [125, 150],
  //   duration: [8000, 10000],
  //   endRadius: 0,
  //   numDots: 5,
  // },
  // e: {
  //   color: '#f6c7df',
  //   radius: [100, 120],
  //   duration: [6000, 8000],
  //   endRadius: 0,
  //   numDots: 5,
  // },
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Circle = function (x, y) {
  this.x = x;
  this.y = y;
  this.alpha = 1;
  this.radius = 0;
  this.lineWidth = 6;
  this.color = '#FFF';
};

Circle.prototype.draw = function (ctx) {
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  ctx.lindeWidth = this.lineWidth;
  ctx.strokeStyle = this.color;
  ctx.stroke();
};

module.exports = Circle;

// const createCircle = function (x, y) {
//   const p = {};
//   p.x = x;
//   p.y = y;
//   p.color = '#FFF';
//   p.radius = 0;
//   p.alpha = 1;
//   p.lineWidth = 6;
//   p.draw = function () {
//     ctx.globalAlpha = p.alpha;
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.lindeWidth = p.lineWidth;
//     ctx.strokeStyle = p.color;
//     ctx.stroke();
//   };
//   return p;
// };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const anime = __webpack_require__(0);

const Dot = function (x, y, options) {
  this.x = x;
  this.y = y;
  this.color = options.color; // TODO: This gets customized later
  this.radius = anime.random(...options.radius); // TODO: This gets customized later
};

Dot.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = this.color;
  ctx.fill();
};

module.exports = Dot;

// const createDot = function (x, y) {
//   const p = {};
//   p.x = x;
//   p.y = y;
//   p.color = '#ffec6a'; // TODO: This gets customized later
//   p.radius = 50; // TODO: This gets customized later
//   p.draw = function () {
//     ctx.beginPath();
//     ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
//     ctx.fillStyle = p.color;
//     ctx.fill();
//   };
//   return p;
// };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Explosions = __webpack_require__(1);

const canvas = document.querySelector('.dots');
const ctx = canvas.getContext('2d');

const explosion = new Explosions(canvas, ctx);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map