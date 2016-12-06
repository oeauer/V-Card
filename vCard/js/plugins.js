/*
Kibo 
keyboard events
https://github.com/marquete/kibo
*/

var Kibo=function(a){this.element=a||window.document,this.initialize()};Kibo.KEY_NAMES_BY_CODE={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"caps_lock",27:"esc",32:"space",33:"page_up",34:"page_down",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"num_lock"},Kibo.KEY_CODES_BY_NAME={},function(){for(var a in Kibo.KEY_NAMES_BY_CODE)Object.prototype.hasOwnProperty.call(Kibo.KEY_NAMES_BY_CODE,a)&&(Kibo.KEY_CODES_BY_NAME[Kibo.KEY_NAMES_BY_CODE[a]]=+a)}(),Kibo.MODIFIERS=["shift","ctrl","alt"],Kibo.WILDCARD_TYPES=["arrow","number","letter","f"],Kibo.WILDCARDS={arrow:[37,38,39,40],number:[48,49,50,51,52,53,54,55,56,57],letter:[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],f:[112,113,114,115,116,117,118,119,120,121,122,123]},Kibo.registerEvent=function(){return document.addEventListener?function(a,b,c){a.addEventListener(b,c,!1)}:document.attachEvent?function(a,b,c){a.attachEvent("on"+b,c)}:void 0}(),Kibo.unregisterEvent=function(){return document.removeEventListener?function(a,b,c){a.removeEventListener(b,c,!1)}:document.detachEvent?function(a,b,c){a.detachEvent("on"+b,c)}:void 0}(),Kibo.stringContains=function(a,b){return-1!==a.indexOf(b)},Kibo.neatString=function(a){return a.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ")},Kibo.capitalize=function(a){return a.toLowerCase().replace(/^./,function(a){return a.toUpperCase()})},Kibo.isString=function(a){return Kibo.stringContains(Object.prototype.toString.call(a),"String")},Kibo.arrayIncludes=function(){return Array.prototype.indexOf?function(a,b){return-1!==a.indexOf(b)}:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1}}(),Kibo.extractModifiers=function(a){var b,c;for(b=[],c=0;c<Kibo.MODIFIERS.length;c++)Kibo.stringContains(a,Kibo.MODIFIERS[c])&&b.push(Kibo.MODIFIERS[c]);return b},Kibo.extractKey=function(a){var b,c;for(b=Kibo.neatString(a).split(" "),c=0;c<b.length;c++)if(!Kibo.arrayIncludes(Kibo.MODIFIERS,b[c]))return b[c]},Kibo.modifiersAndKey=function(a){var b,c;return Kibo.stringContains(a,"any")?Kibo.neatString(a).split(" ").slice(0,2).join(" "):(b=Kibo.extractModifiers(a),c=Kibo.extractKey(a),c&&!Kibo.arrayIncludes(Kibo.MODIFIERS,c)&&b.push(c),b.join(" "))},Kibo.keyName=function(a){return Kibo.KEY_NAMES_BY_CODE[a+""]},Kibo.keyCode=function(a){return+Kibo.KEY_CODES_BY_NAME[a]},Kibo.prototype.initialize=function(){var a,b=this;for(this.lastKeyCode=-1,this.lastModifiers={},a=0;a<Kibo.MODIFIERS.length;a++)this.lastModifiers[Kibo.MODIFIERS[a]]=!1;for(this.keysDown={any:[]},this.keysUp={any:[]},a=0;a<Kibo.WILDCARD_TYPES.length;a++)this.keysDown["any "+Kibo.WILDCARD_TYPES[a]]=[],this.keysUp["any "+Kibo.WILDCARD_TYPES[a]]=[];this.downHandler=this.handler("down"),this.upHandler=this.handler("up"),Kibo.registerEvent(this.element,"keydown",this.downHandler),Kibo.registerEvent(this.element,"keyup",this.upHandler),Kibo.registerEvent(window,"unload",function c(){Kibo.unregisterEvent(b.element,"keydown",b.downHandler),Kibo.unregisterEvent(b.element,"keyup",b.upHandler),Kibo.unregisterEvent(window,"unload",c)})},Kibo.prototype.handler=function(a){var b=this;return function(c){var d,e,f,g;for(c=c||window.event,b.lastKeyCode=c.keyCode,d=0;d<Kibo.MODIFIERS.length;d++)b.lastModifiers[Kibo.MODIFIERS[d]]=c[Kibo.MODIFIERS[d]+"Key"];for(Kibo.arrayIncludes(Kibo.MODIFIERS,Kibo.keyName(b.lastKeyCode))&&(b.lastModifiers[Kibo.keyName(b.lastKeyCode)]=!0),f=b["keys"+Kibo.capitalize(a)],d=0;d<f.any.length;d++)f.any[d](c)===!1&&c.preventDefault&&c.preventDefault();for(d=0;d<Kibo.WILDCARD_TYPES.length;d++)if(Kibo.arrayIncludes(Kibo.WILDCARDS[Kibo.WILDCARD_TYPES[d]],b.lastKeyCode))for(e=0;e<f["any "+Kibo.WILDCARD_TYPES[d]].length;e++)f["any "+Kibo.WILDCARD_TYPES[d]][e](c)===!1&&c.preventDefault&&c.preventDefault();if(g=b.lastModifiersAndKey(),f[g])for(d=0;d<f[g].length;d++)f[g][d](c)===!1&&c.preventDefault&&c.preventDefault()}},Kibo.prototype.registerKeys=function(a,b,c){var d,e,f=this["keys"+Kibo.capitalize(a)];for(Kibo.isString(b)&&(b=[b]),d=0;d<b.length;d++)e=b[d],e=Kibo.modifiersAndKey(e+""),f[e]?f[e].push(c):f[e]=[c];return this},Kibo.prototype.unregisterKeys=function(a,b,c){var d,e,f,g=this["keys"+Kibo.capitalize(a)];for(Kibo.isString(b)&&(b=[b]),d=0;d<b.length;d++)if(f=b[d],f=Kibo.modifiersAndKey(f+""),null===c)delete g[f];else if(g[f])for(e=0;e<g[f].length;e++)if(String(g[f][e])===String(c)){g[f].splice(e,1);break}return this},Kibo.prototype.delegate=function(a,b,c){return null!==c?this.registerKeys(a,b,c):this.unregisterKeys(a,b,c)},Kibo.prototype.down=function(a,b){return this.delegate("down",a,b)},Kibo.prototype.up=function(a,b){return this.delegate("up",a,b)},Kibo.prototype.lastKey=function(a){return a?this.lastModifiers[a]:Kibo.keyName(this.lastKeyCode)},Kibo.prototype.lastModifiersAndKey=function(){var a,b;for(a=[],b=0;b<Kibo.MODIFIERS.length;b++)this.lastKey(Kibo.MODIFIERS[b])&&a.push(Kibo.MODIFIERS[b]);return Kibo.arrayIncludes(a,this.lastKey())||a.push(this.lastKey()),a.join(" ")};


/*
 * Konami-JS ~ 
 * :: Now with support for touch events and multiple instances for 
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var Konami = function (callback) {
	var konami = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				}
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		pattern: "38384040373937396665",
		load: function (link) {
			this.addEvent(document, "keydown", function (e, ref_obj) {
				if (ref_obj) konami = ref_obj; // IE
				konami.input += e ? e.keyCode : event.keyCode;
				if (konami.input.length > konami.pattern.length)
					konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
				if (konami.input == konami.pattern) {
					konami.code(link);
					konami.input = "";
					e.preventDefault();
					return false;
				}
			}, this);
			this.iphone.load(link);
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: "",
			keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
			code: function (link) {
				konami.code(link);
			},
			load: function (link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, "touchmove", function (e) {
					if (e.touches.length == 1 && konami.iphone.capture == true) {
						var touch = e.touches[0];
						konami.iphone.stop_x = touch.pageX;
						konami.iphone.stop_y = touch.pageY;
						konami.iphone.tap = false;
						konami.iphone.capture = false;
						konami.iphone.check_direction();
					}
				});
				konami.addEvent(document, "touchend", function (evt) {
					if (konami.iphone.tap == true) konami.iphone.check_direction(link);
				}, false);
				konami.addEvent(document, "touchstart", function (evt) {
					konami.iphone.start_x = evt.changedTouches[0].pageX;
					konami.iphone.start_y = evt.changedTouches[0].pageY;
					konami.iphone.tap = true;
					konami.iphone.capture = true;
				});
			},
			check_direction: function (link) {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
				y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap == true) ? "TAP" : result;

				if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
				if (this.keys.length == 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}

	typeof callback === "string" && konami.load(callback);
	if (typeof callback === "function") {
		konami.code = callback;
		konami.load();
	}

	return konami;
};



/*
jRumble v1.3 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com

MIT License
-----------------------------------------------------------------------------
Copyright (c) 2012 Jack Rugile, http://jackrugile.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
	$.fn.jrumble = function(options){
		
		/*========================================================*/
		/* Options
		/*========================================================*/
		var defaults = {
			x: 2,
			y: 2,
			rotation: 1,
			speed: 15,
			opacity: false,
			opacityMin: .5
		},
		opt = $.extend(defaults, options);	
				
		return this.each(function(){
								  
			/*========================================================*/
			/* Variables
			/*========================================================*/
			var $this = $(this),				
				x = opt.x*2,
				y = opt.y*2,
				rot = opt.rotation*2,
				speed = (opt.speed === 0) ? 1 : opt.speed,			
				opac = opt.opacity,
				opacm = opt.opacityMin,
				inline,
				interval;
			
			/*========================================================*/
			/* Rumble Function
			/*========================================================*/		
			var rumbler = function(){				
				var rx = Math.floor(Math.random() * (x+1)) -x/2,
					ry = Math.floor(Math.random() * (y+1)) -y/2,
					rrot = Math.floor(Math.random() * (rot+1)) -rot/2,
					ropac = opac ? Math.random() + opacm : 1;
					
				/*========================================================*/
				/* Ensure Movement From Original Position
				/*========================================================*/				
				rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;
				ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;	
				
				/*========================================================*/
				/* Check Inline
				/*========================================================*/
				if($this.css('display') === 'inline'){
					inline = true;
					$this.css('display', 'inline-block');
				}
				
				/*========================================================*/
				/* Rumble Element
				/*========================================================*/			
				$this.css({
					'position':'relative',
					'left':rx+'px',
					'top':ry+'px',
					'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',
					'filter':'alpha(opacity='+ropac*100+')',					
					'-moz-opacity':ropac,					
					'-khtml-opacity':ropac,					
					'opacity':ropac,
					'-webkit-transform':'rotate('+rrot+'deg)', 
					'-moz-transform':'rotate('+rrot+'deg)', 
					'-ms-transform':'rotate('+rrot+'deg)',
					'-o-transform':'rotate('+rrot+'deg)', 
					'transform':'rotate('+rrot+'deg)'
				});
			};
			
			/*========================================================*/
			/* Rumble CSS Reset
			/*========================================================*/
			var reset = {
				'left':0,
				'top':0,
				'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
				'filter':'alpha(opacity=100)',					
				'-moz-opacity':1,					
				'-khtml-opacity':1,					
				'opacity':1,
				'-webkit-transform':'rotate(0deg)',
				'-moz-transform':'rotate(0deg)',
				'-ms-transform':'rotate(0deg)',
				'-o-transform':'rotate(0deg)',
				'transform':'rotate(0deg)'
			};
			
			/*========================================================*/
			/* Rumble Start/Stop Trigger
			/*========================================================*/
			$this.bind({
				'startRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					interval = setInterval(rumbler, speed)
				},
				'stopRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					if(inline){
						$this.css('display', 'inline');
					}
					$this.css(reset);
				}
			});		
			
		});// End return this.each
	};// End $.fn.jrumble
})(jQuery);