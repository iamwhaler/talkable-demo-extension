if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
    if (this === void 0 || this === null) { throw TypeError(); }

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) { return -1; }

    var n = 0;
    if (arguments.length > 0) {
      n = Number(arguments[1]);
      if (isNaN(n)) {
        n = 0;
      } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    if (n >= len) { return -1; }

    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

String.prototype.trim || (
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    });

// encoder
window.btoa || (
    window.btoa = function(input) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var str = String(input);
      for (
          var block, charCode, idx = 0, map = chars, output = '';
          str.charAt(idx | 0) || (map = '=', idx % 1);
          output += map.charAt(63 & block >> 8 - idx % 1 * 8)
      ) {
        charCode = str.charCodeAt(idx += 3/4);
        if (charCode > 0xFF) {
          window.console && window.console.error && console.error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
      }
      return output;
    });

Array.isArray || (
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    });

Object.isObject || (
    Object.isObject = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Object]';
    });

/*! talkable-integration v4.2.3 | (c) Talkable | talkable.com */
(function (window, document, JSON, Object) {
// DO NOT MOVE ALL CODE 2 SPACES RIGHT - IT WILL BREAK ALL HISTORY
  var talkable = window.talkable = function() {
    var customerData = {};
    var UUID_KEY = 'tkbl_cvuuid';
    // We send something to backend
    // To track that no placements were matched
    var EMPTY_PLACEMENTS = ["0"];
    // Need to be kept in sync with the VisitorUserAgent model of the main app
    var IOS_REGEXP = /(iPad|iPhone|iPod)/i;
    var ANDROID_REGEXP = /Android/i;
    var MOBILE_PLATFORM_REGEXP = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
    var MOBILE_DEVICE_REGEXP = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;


    var config = {
      testing: false,
      debug: false,
      verify_integration: false,
      site_id: '',
      server: 'https://www.talkable.com',
      version: '%VERSION%',
      queue_check_interval: 200,
      async: false,
      url_length_limit: 2000, // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url
      timeout: 15
    };

    var utils = {
      lastLoadedIframeName: [],
      gleamRewardCallback: undefined,

      log: function(message, source) {
        if (typeof window.console !== "undefined" && config.debug) {
          source = source || 'all-' + config.version;
          console.log(source + ' >> ' + message);
        }
      },

      serialize: function(object, prefix) {
        var i, key;
        if (!object) {
          return "";
        }
        if (!prefix && !Object.isObject(object)) {
          throw new Error("Url parameters should be a javascript hash");
        }
        var s = [];
        if (Array.isArray(object)) {
          for (i = 0, object.length; i < object.length; ++i) {
            s.push(this.serialize(object[i], prefix + "[]"));
          }
        } else if (Object.isObject(object)) {
          for (key in object) {
            if (!this.hasProperty(object, key)) continue;
            var prop = object[key];
            if (!(prop != null)) { // jshint ignore:line
              continue;
            }
            if (prop === 0) {
              prop = prop.toString();
            }
            if (prefix != null) { // jshint ignore:line
              key = "" + prefix + "[" + key + "]";
            }
            var fragment = this.serialize(prop, key);
            if (fragment) {
              s.push(this.serialize(prop, key));
            }
          }
        } else {
          if (object) {
            s.push("" + (encodeURIComponent(prefix.toString())) + "=" + (encodeURIComponent(object.toString())));
          }
        }
        return s.length ? s.join("&") : "";
      },

      merge: function(target, src) {
        if (typeof target !== 'object') return;
        var dst = {};

        for (var key in target) {
          dst[key] = target[key];
        }

        for (var key in src) {
          if (typeof src[key] !== 'object' || !src[key]) {
            dst[key] = src[key];
          } else {
            if (!target[key]) {
              dst[key] = src[key];
            } else {
              dst[key] = utils.merge(target[key], src[key]);
            }
          }
        }
        return dst;
      },

      clone: function(object) {
        // WARNING: this is not a deep clone!
        return utils.merge(object, {});
      },

      postmessage: {
        send: function(json, target, targetElement) {
          // some validation
          if (typeof target === "undefined") {
            throw new Error('You must supply a target as a string');
          }

          if (typeof targetElement === 'undefined') {
            targetElement = window.parent;
          }

          targetElement.postMessage(JSON.stringify(json), target);
        },

        listen: function(callback) {
          var receiveMessage = function(message) {
            try {
              var o = JSON.parse(message.data);
              if (o && typeof o === "object" && o !== null) {
                callback(o);
              }
            } catch(ex) {
              // Handle non-exception-throwing cases:
              // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
              // but... JSON.parse(null) returns 'null', and typeof null === "object",
              // so we must check for that, too.
            }
          };

          // add the listener
          if (window.addEventListener) {
            window.addEventListener('message', receiveMessage, false);
          } else {
            // IE 8
            window.attachEvent('onmessage', receiveMessage);
          }
        }
      },

      event_list: [],

      subscribe: function(event_name, iframe_name, callback) {
        if (!callback) {
          utils.log('Subscribe: callback is required');
          return;
        }

        var found = false;
        for (var i = 0; i < utils.event_list.length; i++) {
          if (utils.event_list[i].event_name == event_name &&
              utils.event_list[i].iframe_name == iframe_name &&
              utils.event_list[i].callback.toString() == callback.toString()) {

            // override callback
            utils.event_list[i].callback = callback;
            // skip duplicates
            found = true;
            break;
          }
        }
        // add new event to list
        if (!found) {
          utils.event_list.push({ event_name: event_name, iframe_name: iframe_name, callback: callback });
        }
      },

      startListening: function() {
        utils.postmessage.listen(function(message) {
          if (!message || !utils.event_list.length) return;
          for (var i = 0; i < utils.event_list.length; i++) {
            // check all required parameters
            if (message.type != utils.event_list[i].event_name || !message.iframe_name || !utils.event_list[i].callback)
              continue;
            // get iframe
            var iframe = document.querySelector("#" + utils.event_list[i].iframe_name + " iframe") ||
                document.querySelector('iframe[name="' + utils.event_list[i].iframe_name + '"]');
            // execute callback
            if (iframe && iframe.name == message.iframe_name)
              utils.event_list[i].callback.call(talkable, message.data, iframe);
          }
        });
      },

      publish: function (name, iframe_name, data, is_global) {
        var server = config.server,
            msg_data = {
              type: name,
              iframe_name: iframe_name,
              data: data || {}
            };

        if (typeof is_global !== "undefined" && is_global)
          server = "*";

        if (utils.lastLoadedIframeName.indexOf(iframe_name) !== -1 && window.frames[iframe_name])
          utils.postmessage.send(msg_data, server, window.frames[iframe_name]);
        else
          this.subscribe('offer_loaded', iframe_name, function(data, iframe_data) {
            if (iframe_data.name == iframe_name)
              utils.postmessage.send(msg_data, server, window.frames[iframe_name]);
          });
      },

      notifyIntegrationError: function(message, dev) {
        utils.addImage(
            // In case occurred conflict
            // Taking namespace from previous version of library
            // Because it has site_id in configuration
            utils.namespace(window.talkable.config.server, window.talkable.config.site_id) + '/notify_integration_error.gif?' +
            utils.serialize({
              message: message,
              dev: dev
            })
        );
      },

      isBrowserSupported: function() {
        return !((window.navigator.userAgent.indexOf("MSIE 6.0") > -1) || (window.navigator.userAgent.indexOf("MSIE 7.0") > -1));
      },

      getIframeCreationExtension: function() {
        return this.isBrowserSupported() ? 'html' : 'gif';
      },

      isGenerated: function(el) {
        return el.getAttribute("data-talkable-generated") == "true";
      },

      hasProperty: function(options, key) {
        return options.hasOwnProperty(key);
      },

      setAttributes: function(element, attrs) {
        for (var key in attrs) {
          element.setAttribute(key, attrs[key]);
        }
      },

      location_parameter: function(name) {
        var vars = {};
        var current_location = window.location.href.split('#')[0];
        var hashes = current_location.slice(current_location.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++) {
          var hash = hashes[i].split('=');
          if (typeof hash[1] !== 'undefined') vars[hash[0]] = decodeURIComponent(hash[1]);
        }
        return vars[name];
      },

      callbacks: {},

      before: function(method_name, callback) {
        utils.callbacks[method_name] = callback;
      },

      matches: function(matcher) {
        if (!matcher || matcher.blank) {
          return true;
        } else if (matcher.regexp) {
          return window.location.href.match(RegExp(matcher.regexp));
        } else {
          if (matcher.host_pattern && matcher.host_pattern !== window.location.hostname)
            return false;

          for (var name in matcher.query_pattern) {
            if (window.location.search.indexOf(name + '=' + matcher.query_pattern[name]) == -1)
              return false;
          }

          if (matcher.path_pattern) {
            if (talkablePlacementsConfig.site_url) {
              var site_url = document.createElement('a');
              site_url.href = talkablePlacementsConfig.site_url + matcher.path_pattern;
              matcher.path_pattern = site_url.pathname.replace(/(^\/*)/g, '/');
            }

            if (matcher.path_pattern !== window.location.pathname)
              return false;
          }

          return true;
        }
      },

      device_type: function(){
        var agent = window.navigator.userAgent;
        //The logic needs to be kept in sync with VisitorUserAgent#device_type
        if (agent.match(IOS_REGEXP) || agent.match(ANDROID_REGEXP)) {
          return agent.match(MOBILE_PLATFORM_REGEXP) || agent.substr(0, 4).match(MOBILE_DEVICE_REGEXP) ?
              'mobile' : 'tablet';
        }
        return 'desktop';
      },

      match_placements: function(event_category) {
        var matched = [];

        for (var i = 0; i < talkablePlacementsConfig.placements.length; i++) {
          var placement = talkablePlacementsConfig.placements[i],
              exclusion_matched = false;

          var device_type = this.device_type();
          if (
              (!placement.event_category || placement.event_category == event_category) &&
              (!placement.device_types || !device_type || placement.device_types.indexOf(device_type) >= 0)
          ) {
            if (placement.exclusion_matchers) {
              for (var k = 0; k < placement.exclusion_matchers.length && !exclusion_matched; k++)
                exclusion_matched = this.matches(placement.exclusion_matchers[k]);
            }

            if (!exclusion_matched) {
              var matchers = placement.inclusion_matchers || [placement.inclusion_matcher];
              for (var j = 0; j < matchers.length; j++) {
                if (this.matches(matchers[j])) {
                  matched.push(placement.id);
                  break;
                }
              }
            }
          }
        }

        return matched.length ? matched : EMPTY_PLACEMENTS;
      },

      ensureInitialized: function() {
        if (!window.talkable.initialized) {
          throw new Error("You need to call 'init' first");
        }
      },

      namespace: function(server, site_id) {
        return (server || config.server) + '/public/' + encodeURIComponent(site_id || config.site_id);
      },

      addImage: function(url) {
        utils.log('addImage: ' + url);

        if (document.images) {
          (new Image()).src=url;
        }
      },

      defaultIframeOptions: function(name) {
        name = name || 'talkable-offer';
        return {
          container: name,
          name: name + '-iframe'
        }
      },

      insertIframeIntoContainer: function(iframe, containerId) {
        var containerEl = document.getElementById(containerId.replace("#", ""));
        if (containerEl) {
          containerEl.innerHTML = "";
          containerEl.appendChild(iframe);
          //clear other containers
          var cs = document.querySelectorAll("#" + containerId);
          for (var i = 1; i < cs.length; i++) cs[i].remove();
        } else {
          this.domReady(function() {
            containerEl = document.getElementById(containerId.replace("#", ""));
            if (containerEl) {
              containerEl.innerHTML = "";
            } else {
              containerEl = document.createElement("div");
              containerEl.setAttribute("data-talkable-generated", true);
              containerEl.setAttribute("id", containerId);

              document.body.appendChild(containerEl);
            }
            containerEl.appendChild(iframe);
          });
        }
      },

      setIntegrationCss: function(data) {
        if (!data || !data.css) return;
        styleTag = document.createElement('style');
        styleTag.id = data.attribute_value;
        styleTag.dataset.talkableIntegrationCss = true;
        styleTag.type = 'text/css';

        if (styleTag.styleSheet) {
          styleTag.styleSheet.cssText = data.css;
        } else {
          styleTag.appendChild(document.createTextNode(data.css));
        }

        var styleTagNode = document.getElementById(data.attribute_value);
        styleTagNode && styleTagNode.remove();

        document.body && document.body.appendChild(styleTag);
      },

      addIframeElement: function(url, options) {
        utils.log('addIframeElement: ' + url);

        options = utils.clone(options || {});
        options.frameBorder = "0";
        options.allowTransparency = true;
        options.src = url;
        var container = options.container || utils.generateRandomIframeName();
        delete options.container;
        utils.addRandomIframeName(options);

        var iframe = null;
        var styleTag = null;
        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.style.opacity = "0";
        this.setAttributes(iframe, options);
        this.insertIframeIntoContainer(iframe, container);

        utils.subscribe('responsive_iframe_height', iframe.name, function(data, iframe) {
          iframe.style.height = data.height + "px";
        });

        utils.subscribe('change_offer_state', iframe.name, function(data, iframe) {
          if (data.campaign_appearance === "inline" && iframe.parentNode && utils.isGenerated(iframe.parentNode)) return;
          if (!data) return;
          if (!data.offer_state) return;
          if (!data.offer_state_attribute) return;
          if (data.width) iframe.style.width = data.width;
          if (data.height) iframe.style.height = data.height;

          if (data.integration_css) utils.setIntegrationCss(data.integration_css);
          currentAttribute = document.body.getAttribute(data.offer_state_attribute) || "";
          if (data.action == "add" && currentAttribute.indexOf(data.offer_state) == -1) {
            document.body.setAttribute(data.offer_state_attribute, (data.offer_state + " " + currentAttribute).trim());
          } else if (data.action == "remove") {
            document.body.setAttribute(data.offer_state_attribute, currentAttribute.replace(data.offer_state, "").trim());
          } else if (data.action == "set") {
            document.body.setAttribute(data.offer_state_attribute, data.offer_state);
          }

          setTimeout(function() {
            if (document.all && !window.atob) {
              // need to update DOM to apply styles in IE <= 9
              document.body.className = document.body.className;
            }
          }, 0);
        });

        utils.subscribe('set_location', iframe.name, function(data, iframe) {
          if (!data) return;
          if (data.href && data.href.indexOf("javascript:") == -1) {
            window.location.href = data.href;
          }
        });

        utils.subscribe('scroll_to', iframe.name, function(data, iframe) {
          if (data.selector) {
            var matches = document.querySelectorAll(data.selector);
            if (matches.length > 0) data.y = matches[0].offsetTop;
          }
          window.scrollTo(data.x, data.y || iframe.offsetTop);
        });

        utils.subscribe('offer_close', iframe.name, function(data, iframe) {
          //reset iframe load state
          var index = utils.lastLoadedIframeName.indexOf(iframe.name);
          if (index != -1) {
            utils.lastLoadedIframeName.splice(index, 1);
          }

          iframe.style.display = 'none';
          styleTag && styleTag.remove();
          styleTag = null;

          // Otherwise it causes a never-ending tab window spinner in Chrome
          // Yes, the delay should be that big, otherwise it won’t fix the issue
          setTimeout(function() {
            iframe.remove();
            iframe = null;
          }, 1000);
        });

        utils.subscribe('offer_loaded', iframe.name, function(data) {
          utils.lastLoadedIframeName.push(iframe.name);
          data.current_visitor_uuid ? utils.setUUID(data.current_visitor_uuid) : utils.deleteUUID();

          if (data.perform_snapshot) utils.scrapeDOM();

          if (utils.gleamRewardCallback && data.gleam_reward) {
            try {
              utils.gleamRewardCallback(data.gleam_reward)
            } catch (ex) {
              utils.log(ex)
            }
          }

          if (data.campaign_appearance === "inline" && iframe.parentNode && utils.isGenerated(iframe.parentNode)) return;
          if (!data.integration_css && !data.integration_css.css) return;
          styleTag = document.createElement('style');
          styleTag.id = data.integration_css.attribute_value;
          styleTag.dataset.talkableIntegrationCss = true;
          styleTag.type = 'text/css';

          if (styleTag.styleSheet) {
            styleTag.styleSheet.cssText = data.integration_css.css;
          } else {
            styleTag.appendChild(document.createTextNode(data.integration_css.css));
          }

          if (!document.getElementById(data.integration_css.attribute_value)) {
            document.body && document.body.appendChild(styleTag);
          }

          if (data.integration_css.attribute_name && data.integration_css.attribute_value) {
            iframe.setAttribute(data.integration_css.attribute_name, data.integration_css.attribute_value);
          }
        });

        return iframe;
      },

      buildJs: function(url) {
        var result = document.createElement('script');
        result.type = 'text/javascript';
        result.async = config.async;
        result.src = url;
        return result;
      },

      addJs: function(url) {
        utils.log('addJs: ' + url);
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(utils.buildJs(url), s);
      },

      createUrl: function(path, parameters) {
        var create_url = utils.namespace() + path;
        var items = null;
        parameters = utils.merge({v: config.version}, parameters);
        if (parameters.o && parameters.o.i) {
          items = parameters.o.i;
          delete parameters.o.i;
        }
        create_url = create_url + "?" + utils.serialize(parameters);

        if (items) {
          for(var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemsParams = "&" + utils.serialize(
                { product_id: item.product_id, price: item.price, quantity: item.quantity },
                "o[i]["+i+"]"
            );
            if ((create_url + itemsParams).length < config.url_length_limit) {
              create_url += itemsParams;
            }
          }
        }

        return create_url;
      },

      formIframe: function(options, url_path, url_parameters) {
        if (options.iframe.container && options.iframe.container == options.trigger_widget.container)
          throw new Error("`trigger_widget` container should be different from `iframe` container.");

        this.fetchInternalIPIfNeeded(!options.iframe.container, function(internal_ip) {
          url_path = url_path + '.' + utils.getIframeCreationExtension();

          if (internal_ip && url_parameters.o) url_parameters.o.internal_ip_address = internal_ip;
          if (url_parameters.o && url_parameters.o.email) url_parameters.o.email = btoa(url_parameters.o.email);
          if (utils.getUUID()) url_parameters.cvuuid = utils.getUUID();

          var create_url = utils.createUrl(url_path, url_parameters);
          utils.showOffer(utils.merge(options, {url: create_url}));
        });
      },

      showOffer: function(options) {
        if (utils.isBrowserSupported()) {
          var iframe_options = utils.merge(utils.defaultIframeOptions(), options.iframe),
              popupName = iframe_options.name + "-popup";

          var triggered_iframe_options = {
            container: popupName,
            name: popupName
          };

          if (options.trigger_widget && options.trigger_widget.container) {
            iframe_options = utils.merge(utils.defaultIframeOptions(), options.trigger_widget);
            triggered_iframe_options = utils.merge(triggered_iframe_options, options.iframe);
          }

          var iframe = utils.addIframeElement(options.url, iframe_options);

          utils.subscribe('offer_triggered', iframe.name, function(data) {
            utils.addIframeElement(config.server + data.offer_share_path, triggered_iframe_options);
          });

        } else {
          utils.addImage(options.url);
        }
      },

      cleanupRegisterData: function(data) {
        delete data.campaign_tags;
        delete data.device; // deprecated parameter
        delete data.iframe;
        delete data.campaign_template; // deprecated parameter
        delete data.trigger_widget;
        delete data.tkbl_expand;
        delete data.custom_properties;
      },

      extractOriginData: function(data, key) {
        var result;
        if (this.hasProperty(data, key)) {
          // Support for subhashes
          result = utils.merge(data.customer || {}, data[key]);
          delete data.customer;
        } else {
          result = data;
        }

        return result;
      },

      doubleIntegrationCheck: function() {
        var another_integration = window.curebit || window.talkable;
        if (!another_integration || parseInt(config.version) == parseInt(another_integration.version)) return;

        utils.notifyIntegrationError(
            'Another integration.js with version ' +
            another_integration.config.version + ' conflicts with current ' + config.version + ' on ' + window.location.href
        );
      },

      internalIP: null,

      fetchInternalIPIfNeeded: function(skip_async, callback) {
        // Do not try to collect internal IP address
        // Implementation is left to use it when more browsers will support this feature
        if (callback) callback(null);
        return;

        if (skip_async || utils.internalIP) {
          if (callback) callback(utils.internalIP);
          return;
        }

        //compatibility for firefox and chrome
        var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var useWebKit = !!window.webkitRTCPeerConnection;

        if (!RTCPeerConnection) {
          if (callback) callback(utils.internalIP);
          return;
        }

        //minimal requirements for data connection
        var mediaConstraints = {
          optional: [{RtpDataChannels: true}]
        };

        var servers;
        if (useWebKit) servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

        var pc = null;
        try { pc = new RTCPeerConnection(servers, mediaConstraints); } catch(e) {}

        if (!pc) {
          if (callback) callback(utils.internalIP);
          return;
        }

        var callback_executed = false;

        function handleCandidate(candidate) {
          var ipv4_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
          var ipv4_matches = ipv4_regex.exec(candidate);
          var ip_addr = ipv4_matches && ipv4_matches[1];

          if (!ip_addr) {
            var ipv6_regex = /([\da-fA-F]{1,4}(:[\da-fA-F]{1,4}){7})/;
            var ipv6_matches = ipv6_regex.exec(candidate);
            ip_addr = ipv6_matches && ipv6_matches[1];
          }

          if (!ip_addr) return;

          // RegEx according to https://en.wikipedia.org/wiki/Private_network
          if (!utils.internalIP && ip_addr.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01])\.|[fF][cCdD])/)) {
            utils.internalIP = ip_addr;
          }

          if (utils.internalIP && callback && !callback_executed) {
            callback_executed = true;
            callback(utils.internalIP);
          }
        }

        // async detection
        pc.onicecandidate = function(ice) {
          if (ice.candidate) handleCandidate(ice.candidate.candidate);
        };

        pc.createDataChannel("");
        pc.createOffer(function(result){
          //trigger the stun server request
          pc.setLocalDescription(result, function(){}, function(){});
        }, function(){});

        //make sure callback will be executed in case no ip detected
        setTimeout(function() {
          if (!callback_executed && callback) {
            callback_executed = true;
            callback(utils.internalIP);
          }
        }, 500);
      },

      generateRandomIframeName: function(callback) {
        // only if iframe.name specified as null
        return 'talkable_integration_' + Math.random().toString(36).substring(2);
      },

      addRandomIframeName: function(params) {
        var name = this.generateRandomIframeName();
        if (params && !params.name) {
          params.name = name;
        }
        return name;
      },

      scrapeDOM: function () {
        var iframeName = utils.lastLoadedIframeName[utils.lastLoadedIframeName.length - 1];

        if (document.documentElement) {
          var doctypeNode = document.doctype;
          var doctypeString = "<!DOCTYPE " +
              doctypeNode.name +
              (doctypeNode.publicId ? ' PUBLIC "' + doctypeNode.publicId + '"' : '') +
              (!doctypeNode.publicId && doctypeNode.systemId ? ' SYSTEM' : '') +
              (doctypeNode.systemId ? ' "' + doctypeNode.systemId + '"' : '') +
              '>';
          var domString = doctypeString;
          domString += "<html>";
          domString += document.documentElement.innerHTML;
          domString += "</html>";

          this.publish('dom_capture', iframeName, {dom: domString, url: document.location.href});
        }
      },

      domReady: function(callback) {
        var ready = false;

        var detach = function() {
          if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
          } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
          }
        };

        var completed = function() {
          if (!ready && (document.addEventListener || event.type === "load" || document.readyState === "complete")) {
            ready = true;
            detach();
            callback();
          }
        };

        if (document.readyState === "complete") {
          callback();
        } else if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", completed);
          window.addEventListener("load", completed);
        } else {
          document.attachEvent("onreadystatechange", completed);
          window.attachEvent("onload", completed);

          var top = false;

          try {
            top = window.frameElement == null && document.documentElement; // jshint ignore:line
          } catch(e) {}

          if (top && top.doScroll) {
            (function scrollCheck() {
              if (ready) return;

              try {
                top.doScroll("left");
              } catch(e) {
                return setTimeout(scrollCheck, 50);
              }

              ready = true;
              detach();
              callback();
            })();
          }
        }
      },

      getCookie: function(name) {
        var query = '(^|; )'+ name +'=([^;]*)';
        return (document.cookie.match(query) || []).pop();
      },

      setCookie: function(name, value) {
        if (!name || !value) return;
        var date = new Date();
        date.setTime(date.getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
      },

      deleteCookie: function(name) {
        document.cookie = name +'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      },

      getUUID: function() {
        return this.getCookie(UUID_KEY);
      },

      setUUID: function(current_visitor_uuid) {
        this.setCookie(UUID_KEY, current_visitor_uuid);
      },

      deleteUUID: function() {
        this.deleteCookie(UUID_KEY);
      }
    };

    utils.doubleIntegrationCheck();
    utils.startListening();

    var methods = {
      init: function(options) {
        for (var key in options) {
          if (!utils.hasProperty(options, key)) continue;
          config[key] = options[key];
        }
        if (!config.site_id) {
          throw new Error('site_id must be specified!');
        }
        talkable.initialized = true;
      },

      authenticate_customer: function(data) {
        var registerData = utils.clone(data || {});
        var customer = registerData.customer ? utils.clone(registerData.customer) : registerData;
        if (Object.isObject(customer)) customerData = customer;
      },

      register_affiliate: function(data) {
        utils.ensureInitialized();
        var registerData = utils.clone(data || {});

        var affiliate_member = registerData.customer || registerData.affiliate_member || {};
        var options = {
          iframe: registerData.iframe || {},
          trigger_widget: registerData.trigger_widget || {}
        };
        var verify_integration = utils.location_parameter('tkbl_verify_integration') || config.verify_integration;
        var url_parameters = ['email', 'first_name', 'last_name', 'traffic_source'];
        for (var i = 0; i < url_parameters.length; i++) {
          var parameter = url_parameters[i];
          if (utils.location_parameter(parameter)) {
            affiliate_member[parameter] = utils.location_parameter(parameter);
          }
        }

        var matched_placement_ids = utils.match_placements('affiliate_member');
        // Avoid query completely when no placements matched for affiliate member
        if (matched_placement_ids != EMPTY_PLACEMENTS) {
          var parameters = {
            o: utils.merge(customerData, affiliate_member),
            campaign_tags: utils.location_parameter('campaign_tags') || registerData.campaign_tags,
            affiliate_campaign_id: utils.location_parameter('tkbl_campaign_id'),
            custom_properties: registerData.custom_properties,
            tkbl_expand: utils.location_parameter('tkbl_expand') || registerData.expand_trigger_widget,
            matched_placement_ids: matched_placement_ids,
            ts: talkablePlacementsConfig.timestamp,
            ii: talkablePlacementsConfig.integration_id,
            vi: verify_integration
          };

          utils.formIframe(options, '/affiliate_members/create', parameters);
        } else {
          utils.log("No campaign placements matched. Ignoring affiliate_member origin.")
        }
      },

      register_purchase: function(data) {
        utils.ensureInitialized();
        var registerData = utils.clone(data || {});
        var purchase = utils.extractOriginData(registerData, "purchase");

        if (purchase.customer_email) {
          purchase.email = purchase.customer_email;
          delete purchase.customer_email;
        }

        var items = purchase.items;
        delete purchase.items;

        var options = {
          iframe: registerData.iframe || {},
          trigger_widget: registerData.trigger_widget || {}
        };
        var campaign_tags       = utils.location_parameter('campaign_tags') || registerData.campaign_tags;
        var custom_properties   = registerData.custom_properties;
        var verification_digest = registerData.verification_digest;
        var verify_integration = utils.location_parameter('tkbl_verify_integration') || config.verify_integration;

        utils.cleanupRegisterData(registerData);

        var parameters = {
          o: utils.merge(customerData, purchase),
          campaign_tags: campaign_tags,
          affiliate_campaign_id: utils.location_parameter('tkbl_campaign_id'),
          custom_properties: custom_properties,
          matched_placement_ids: utils.match_placements('purchase'),
          ts: talkablePlacementsConfig.timestamp,
          ii: talkablePlacementsConfig.integration_id,
          vi: verify_integration
        };

        if (items) {
          parameters.o.i = [];
          for(var i = 0; i < items.length; i++) {
            var item = items[i];
            parameters.o.i.push({
              product_id: item.product_id,
              price: item.price,
              quantity: item.quantity
            });
            // Also register the products if the vars are specified
            if (item.url || item.image_url || item.title) {
              methods._register_products([{
                product_id: item.product_id,
                url: item.url,
                image_url: item.image_url,
                title: item.title,
                price: item.price
              }]);
            }
          }
        }

        utils.formIframe(options, '/purchases/create', parameters);
      },

      register_event: function(data) {
        utils.ensureInitialized();
        var registerData = utils.clone(data || {});

        var options = {
          iframe: registerData.iframe || {},
          trigger_widget: registerData.trigger_widget || {}
        };
        var campaign_tags       = utils.location_parameter('campaign_tags') || registerData.campaign_tags;
        var custom_properties   = registerData.custom_properties;
        var verify_integration = utils.location_parameter('tkbl_verify_integration') || config.verify_integration;

        utils.cleanupRegisterData(registerData);

        var event = utils.extractOriginData(registerData, "event");

        var parameters = {
          o: utils.merge(customerData, event),
          campaign_tags: campaign_tags,
          affiliate_campaign_id: utils.location_parameter('tkbl_campaign_id'),
          custom_properties: custom_properties,
          matched_placement_ids: utils.match_placements(event.event_category),
          ts: talkablePlacementsConfig.timestamp,
          ii: talkablePlacementsConfig.integration_id,
          vi: verify_integration
        };

        utils.formIframe(options, '/events/create', parameters);
      },

      show_offer: function(options) {
        utils.showOffer(options);
      },

      gleam_reward: function (data) {
        utils.gleamRewardCallback = data.callback;
      },

      _register_products: function(products) {
        utils.ensureInitialized();
        for(var i = 0; i < products.length; i++) {
          utils.addImage(utils.createUrl('/products/create.gif', {p: products[i]}));
        }
      },

      talkable_loaded: function(callback) {
        if (typeof callback === "function") callback();
      }
    };

    return {
      initialized: false,
      config: config,
      before: utils.before,
      methods: methods,
      domReady: utils.domReady,
      subscribe: utils.subscribe,
      publish: utils.publish,
      scrapeDOM: utils.scrapeDOM,

      check: function() {
        if (typeof _talkableq === 'undefined' || !Array.isArray(_talkableq)) return;
        while (_talkableq.length > 0) {
          var action = _talkableq.shift();
          var method = action[0],
              params = action[1];

          //apply callbacks
          if (utils.callbacks[method]) {
            params = utils.callbacks[method].call(talkable, params);
          }

          params && methods[method].call(talkable, params);
        }
      },

      run: function() {
        talkable.check();
        talkable._timer = setInterval(talkable.check, config.queue_check_interval);
      },

      _timer: null
    };
  }();

// %OVERRIDES%

  talkable.run();

// DO NOT MOVE ALL CODE 2 SPACES RIGHT - IT WILL BREAK ALL HISTORY
}(window, document, JSON, Object));
//# sourceMappingURL=talkable-4.2.3.min.map
window.talkablePlacementsConfig = {
  "placements": [{
    "id": 146399,
    "inclusion_matcher": {
      "blank": true
    },
    "inclusion_matchers": [{
      "blank": true
    }],
    "exclusion_matchers": [],
    "event_category": "purchase",
    "device_types": ["desktop", "tablet", "mobile"]
  }, {
    "id": 146400,
    "inclusion_matcher": {
      "host_pattern": null,
      "query_pattern": {},
      "path_pattern": "/pages/share"
    },
    "inclusion_matchers": [{
      "host_pattern": null,
      "query_pattern": {},
      "path_pattern": "/pages/share"
    }],
    "exclusion_matchers": [],
    "event_category": "affiliate_member",
    "device_types": ["desktop", "tablet", "mobile"]
  }, {
    "id": 173257,
    "inclusion_matcher": {
      "host_pattern": null,
      "query_pattern": {},
      "path_pattern": "/account"
    },
    "inclusion_matchers": [{
      "host_pattern": null,
      "query_pattern": {},
      "path_pattern": "/account"
    }],
    "exclusion_matchers": [],
    "event_category": "affiliate_member",
    "device_types": ["desktop", "tablet", "mobile"]
  }, {
    "id": 189968,
    "inclusion_matcher": {
      "host_pattern": null,
      "query_pattern": {},
      "path_pattern": "/cart"
    },
    "inclusion_matchers": [{
      "host_pattern": null,
      "query_pattern": {},
      "path_pattern": "/cart"
    }],
    "exclusion_matchers": [],
    "event_category": "affiliate_member",
    "device_types": ["desktop", "tablet", "mobile"]
  }, {
    "id": 146401,
    "inclusion_matcher": {
      "blank": true
    },
    "inclusion_matchers": [{
      "blank": true
    }],
    "exclusion_matchers": [],
    "event_category": "affiliate_member",
    "device_types": ["tablet", "mobile"]
  }, {
    "id": 146402,
    "inclusion_matcher": {
      "blank": true
    },
    "inclusion_matchers": [{
      "blank": true
    }],
    "exclusion_matchers": [],
    "event_category": "affiliate_member",
    "device_types": ["desktop", "tablet", "mobile"]
  }],
  "integration_id": "maxim",
  "site_url": "http://maxim-talkable.myshopify.com",
  "timestamp": 1562183328
};