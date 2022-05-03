import {
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM,
  require_react,
  require_react_dom,
  require_react_is
} from "./chunk-E3PEE53M.js";

// node_modules/izitoast/dist/js/iziToast.js
var require_iziToast = __commonJS({
  "node_modules/izitoast/dist/js/iziToast.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory(root));
      } else if (typeof exports === "object") {
        module.exports = factory(root);
      } else {
        root.iziToast = factory(root);
      }
    })(typeof global !== "undefined" ? global : window || exports.window || exports.global, function(root) {
      "use strict";
      var $iziToast = {}, PLUGIN_NAME = "iziToast", BODY = document.querySelector("body"), ISMOBILE = /Mobi/.test(navigator.userAgent) ? true : false, ISCHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor), ISFIREFOX = typeof InstallTrigger !== "undefined", ACCEPTSTOUCH = "ontouchstart" in document.documentElement, POSITIONS = ["bottomRight", "bottomLeft", "bottomCenter", "topRight", "topLeft", "topCenter", "center"], THEMES = {
        info: {
          color: "blue",
          icon: "ico-info"
        },
        success: {
          color: "green",
          icon: "ico-success"
        },
        warning: {
          color: "orange",
          icon: "ico-warning"
        },
        error: {
          color: "red",
          icon: "ico-error"
        },
        question: {
          color: "yellow",
          icon: "ico-question"
        }
      }, MOBILEWIDTH = 568, CONFIG = {};
      $iziToast.children = {};
      var defaults = {
        id: null,
        class: "",
        title: "",
        titleColor: "",
        titleSize: "",
        titleLineHeight: "",
        message: "",
        messageColor: "",
        messageSize: "",
        messageLineHeight: "",
        backgroundColor: "",
        theme: "light",
        color: "",
        icon: "",
        iconText: "",
        iconColor: "",
        iconUrl: null,
        image: "",
        imageWidth: 50,
        maxWidth: null,
        zindex: null,
        layout: 1,
        balloon: false,
        close: true,
        closeOnEscape: false,
        closeOnClick: false,
        displayMode: 0,
        position: "bottomRight",
        target: "",
        targetFirst: true,
        timeout: 5e3,
        rtl: false,
        animateInside: true,
        drag: true,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: true,
        progressBarColor: "",
        progressBarEasing: "linear",
        overlay: false,
        overlayClose: false,
        overlayColor: "rgba(0, 0, 0, 0.6)",
        transitionIn: "fadeInUp",
        transitionOut: "fadeOut",
        transitionInMobile: "fadeInUp",
        transitionOutMobile: "fadeOutDown",
        buttons: {},
        inputs: {},
        onOpening: function() {
        },
        onOpened: function() {
        },
        onClosing: function() {
        },
        onClosed: function() {
        }
      };
      if (!("remove" in Element.prototype)) {
        Element.prototype.remove = function() {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        };
      }
      if (typeof window.CustomEvent !== "function") {
        var CustomEventPolyfill = function(event, params) {
          params = params || { bubbles: false, cancelable: false, detail: void 0 };
          var evt = document.createEvent("CustomEvent");
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEventPolyfill.prototype = window.Event.prototype;
        window.CustomEvent = CustomEventPolyfill;
      }
      var forEach = function(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === "[object Object]") {
          for (var prop in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, prop)) {
              callback.call(scope, collection[prop], prop, collection);
            }
          }
        } else {
          if (collection) {
            for (var i = 0, len = collection.length; i < len; i++) {
              callback.call(scope, collection[i], i, collection);
            }
          }
        }
      };
      var extend = function(defaults2, options) {
        var extended = {};
        forEach(defaults2, function(value, prop) {
          extended[prop] = defaults2[prop];
        });
        forEach(options, function(value, prop) {
          extended[prop] = options[prop];
        });
        return extended;
      };
      var createFragElem = function(htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement("div");
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
          frag.appendChild(temp.firstChild);
        }
        return frag;
      };
      var generateId = function(params) {
        var newId = btoa(encodeURIComponent(params));
        return newId.replace(/=/g, "");
      };
      var isColor = function(color) {
        if (color.substring(0, 1) == "#" || color.substring(0, 3) == "rgb" || color.substring(0, 3) == "hsl") {
          return true;
        } else {
          return false;
        }
      };
      var isBase64 = function(str) {
        try {
          return btoa(atob(str)) == str;
        } catch (err) {
          return false;
        }
      };
      var drag = function() {
        return {
          move: function(toast, instance, settings, xpos) {
            var opacity, opacityRange = 0.3, distance = 180;
            if (xpos !== 0) {
              toast.classList.add(PLUGIN_NAME + "-dragged");
              toast.style.transform = "translateX(" + xpos + "px)";
              if (xpos > 0) {
                opacity = (distance - xpos) / distance;
                if (opacity < opacityRange) {
                  instance.hide(extend(settings, { transitionOut: "fadeOutRight", transitionOutMobile: "fadeOutRight" }), toast, "drag");
                }
              } else {
                opacity = (distance + xpos) / distance;
                if (opacity < opacityRange) {
                  instance.hide(extend(settings, { transitionOut: "fadeOutLeft", transitionOutMobile: "fadeOutLeft" }), toast, "drag");
                }
              }
              toast.style.opacity = opacity;
              if (opacity < opacityRange) {
                if (ISCHROME || ISFIREFOX)
                  toast.style.left = xpos + "px";
                toast.parentNode.style.opacity = opacityRange;
                this.stopMoving(toast, null);
              }
            }
          },
          startMoving: function(toast, instance, settings, e) {
            e = e || window.event;
            var posX = ACCEPTSTOUCH ? e.touches[0].clientX : e.clientX, toastLeft = toast.style.transform.replace("px)", "");
            toastLeft = toastLeft.replace("translateX(", "");
            var offsetX = posX - toastLeft;
            if (settings.transitionIn) {
              toast.classList.remove(settings.transitionIn);
            }
            if (settings.transitionInMobile) {
              toast.classList.remove(settings.transitionInMobile);
            }
            toast.style.transition = "";
            if (ACCEPTSTOUCH) {
              document.ontouchmove = function(e2) {
                e2.preventDefault();
                e2 = e2 || window.event;
                var posX2 = e2.touches[0].clientX, finalX = posX2 - offsetX;
                drag.move(toast, instance, settings, finalX);
              };
            } else {
              document.onmousemove = function(e2) {
                e2.preventDefault();
                e2 = e2 || window.event;
                var posX2 = e2.clientX, finalX = posX2 - offsetX;
                drag.move(toast, instance, settings, finalX);
              };
            }
          },
          stopMoving: function(toast, e) {
            if (ACCEPTSTOUCH) {
              document.ontouchmove = function() {
              };
            } else {
              document.onmousemove = function() {
              };
            }
            toast.style.opacity = "";
            toast.style.transform = "";
            if (toast.classList.contains(PLUGIN_NAME + "-dragged")) {
              toast.classList.remove(PLUGIN_NAME + "-dragged");
              toast.style.transition = "transform 0.4s ease, opacity 0.4s ease";
              setTimeout(function() {
                toast.style.transition = "";
              }, 400);
            }
          }
        };
      }();
      $iziToast.setSetting = function(ref, option, value) {
        $iziToast.children[ref][option] = value;
      };
      $iziToast.getSetting = function(ref, option) {
        return $iziToast.children[ref][option];
      };
      $iziToast.destroy = function() {
        forEach(document.querySelectorAll("." + PLUGIN_NAME + "-overlay"), function(element, index) {
          element.remove();
        });
        forEach(document.querySelectorAll("." + PLUGIN_NAME + "-wrapper"), function(element, index) {
          element.remove();
        });
        forEach(document.querySelectorAll("." + PLUGIN_NAME), function(element, index) {
          element.remove();
        });
        this.children = {};
        document.removeEventListener(PLUGIN_NAME + "-opened", {}, false);
        document.removeEventListener(PLUGIN_NAME + "-opening", {}, false);
        document.removeEventListener(PLUGIN_NAME + "-closing", {}, false);
        document.removeEventListener(PLUGIN_NAME + "-closed", {}, false);
        document.removeEventListener("keyup", {}, false);
        CONFIG = {};
      };
      $iziToast.settings = function(options) {
        $iziToast.destroy();
        CONFIG = options;
        defaults = extend(defaults, options || {});
      };
      forEach(THEMES, function(theme, name) {
        $iziToast[name] = function(options) {
          var settings = extend(CONFIG, options || {});
          settings = extend(theme, settings || {});
          this.show(settings);
        };
      });
      $iziToast.progress = function(options, $toast, callback) {
        var that = this, ref = $toast.getAttribute("data-iziToast-ref"), settings = extend(this.children[ref], options || {}), $elem = $toast.querySelector("." + PLUGIN_NAME + "-progressbar div");
        return {
          start: function() {
            if (typeof settings.time.REMAINING == "undefined") {
              $toast.classList.remove(PLUGIN_NAME + "-reseted");
              if ($elem !== null) {
                $elem.style.transition = "width " + settings.timeout + "ms " + settings.progressBarEasing;
                $elem.style.width = "0%";
              }
              settings.time.START = new Date().getTime();
              settings.time.END = settings.time.START + settings.timeout;
              settings.time.TIMER = setTimeout(function() {
                clearTimeout(settings.time.TIMER);
                if (!$toast.classList.contains(PLUGIN_NAME + "-closing")) {
                  that.hide(settings, $toast, "timeout");
                  if (typeof callback === "function") {
                    callback.apply(that);
                  }
                }
              }, settings.timeout);
              that.setSetting(ref, "time", settings.time);
            }
          },
          pause: function() {
            if (typeof settings.time.START !== "undefined" && !$toast.classList.contains(PLUGIN_NAME + "-paused") && !$toast.classList.contains(PLUGIN_NAME + "-reseted")) {
              $toast.classList.add(PLUGIN_NAME + "-paused");
              settings.time.REMAINING = settings.time.END - new Date().getTime();
              clearTimeout(settings.time.TIMER);
              that.setSetting(ref, "time", settings.time);
              if ($elem !== null) {
                var computedStyle = window.getComputedStyle($elem), propertyWidth = computedStyle.getPropertyValue("width");
                $elem.style.transition = "none";
                $elem.style.width = propertyWidth;
              }
              if (typeof callback === "function") {
                setTimeout(function() {
                  callback.apply(that);
                }, 10);
              }
            }
          },
          resume: function() {
            if (typeof settings.time.REMAINING !== "undefined") {
              $toast.classList.remove(PLUGIN_NAME + "-paused");
              if ($elem !== null) {
                $elem.style.transition = "width " + settings.time.REMAINING + "ms " + settings.progressBarEasing;
                $elem.style.width = "0%";
              }
              settings.time.END = new Date().getTime() + settings.time.REMAINING;
              settings.time.TIMER = setTimeout(function() {
                clearTimeout(settings.time.TIMER);
                if (!$toast.classList.contains(PLUGIN_NAME + "-closing")) {
                  that.hide(settings, $toast, "timeout");
                  if (typeof callback === "function") {
                    callback.apply(that);
                  }
                }
              }, settings.time.REMAINING);
              that.setSetting(ref, "time", settings.time);
            } else {
              this.start();
            }
          },
          reset: function() {
            clearTimeout(settings.time.TIMER);
            delete settings.time.REMAINING;
            that.setSetting(ref, "time", settings.time);
            $toast.classList.add(PLUGIN_NAME + "-reseted");
            $toast.classList.remove(PLUGIN_NAME + "-paused");
            if ($elem !== null) {
              $elem.style.transition = "none";
              $elem.style.width = "100%";
            }
            if (typeof callback === "function") {
              setTimeout(function() {
                callback.apply(that);
              }, 10);
            }
          }
        };
      };
      $iziToast.hide = function(options, $toast, closedBy) {
        if (typeof $toast != "object") {
          $toast = document.querySelector($toast);
        }
        var that = this, settings = extend(this.children[$toast.getAttribute("data-iziToast-ref")], options || {});
        settings.closedBy = closedBy || null;
        delete settings.time.REMAINING;
        $toast.classList.add(PLUGIN_NAME + "-closing");
        (function() {
          var $overlay = document.querySelector("." + PLUGIN_NAME + "-overlay");
          if ($overlay !== null) {
            var refs = $overlay.getAttribute("data-iziToast-ref");
            refs = refs.split(",");
            var index = refs.indexOf(String(settings.ref));
            if (index !== -1) {
              refs.splice(index, 1);
            }
            $overlay.setAttribute("data-iziToast-ref", refs.join());
            if (refs.length === 0) {
              $overlay.classList.remove("fadeIn");
              $overlay.classList.add("fadeOut");
              setTimeout(function() {
                $overlay.remove();
              }, 700);
            }
          }
        })();
        if (settings.transitionIn) {
          $toast.classList.remove(settings.transitionIn);
        }
        if (settings.transitionInMobile) {
          $toast.classList.remove(settings.transitionInMobile);
        }
        if (ISMOBILE || window.innerWidth <= MOBILEWIDTH) {
          if (settings.transitionOutMobile)
            $toast.classList.add(settings.transitionOutMobile);
        } else {
          if (settings.transitionOut)
            $toast.classList.add(settings.transitionOut);
        }
        var H = $toast.parentNode.offsetHeight;
        $toast.parentNode.style.height = H + "px";
        $toast.style.pointerEvents = "none";
        if (!ISMOBILE || window.innerWidth > MOBILEWIDTH) {
          $toast.parentNode.style.transitionDelay = "0.2s";
        }
        try {
          var event = new CustomEvent(PLUGIN_NAME + "-closing", { detail: settings, bubbles: true, cancelable: true });
          document.dispatchEvent(event);
        } catch (ex) {
          console.warn(ex);
        }
        setTimeout(function() {
          $toast.parentNode.style.height = "0px";
          $toast.parentNode.style.overflow = "";
          setTimeout(function() {
            delete that.children[settings.ref];
            $toast.parentNode.remove();
            try {
              var event2 = new CustomEvent(PLUGIN_NAME + "-closed", { detail: settings, bubbles: true, cancelable: true });
              document.dispatchEvent(event2);
            } catch (ex) {
              console.warn(ex);
            }
            if (typeof settings.onClosed !== "undefined") {
              settings.onClosed.apply(null, [settings, $toast, closedBy]);
            }
          }, 1e3);
        }, 200);
        if (typeof settings.onClosing !== "undefined") {
          settings.onClosing.apply(null, [settings, $toast, closedBy]);
        }
      };
      $iziToast.show = function(options) {
        var that = this;
        var settings = extend(CONFIG, options || {});
        settings = extend(defaults, settings);
        settings.time = {};
        if (settings.id === null) {
          settings.id = generateId(settings.title + settings.message + settings.color);
        }
        if (settings.displayMode === 1 || settings.displayMode == "once") {
          try {
            if (document.querySelectorAll("." + PLUGIN_NAME + "#" + settings.id).length > 0) {
              return false;
            }
          } catch (exc) {
            console.warn("[" + PLUGIN_NAME + "] Could not find an element with this selector: #" + settings.id + ". Try to set an valid id.");
          }
        }
        if (settings.displayMode === 2 || settings.displayMode == "replace") {
          try {
            forEach(document.querySelectorAll("." + PLUGIN_NAME + "#" + settings.id), function(element, index) {
              that.hide(settings, element, "replaced");
            });
          } catch (exc) {
            console.warn("[" + PLUGIN_NAME + "] Could not find an element with this selector: #" + settings.id + ". Try to set an valid id.");
          }
        }
        settings.ref = new Date().getTime() + Math.floor(Math.random() * 1e7 + 1);
        $iziToast.children[settings.ref] = settings;
        var $DOM = {
          body: document.querySelector("body"),
          overlay: document.createElement("div"),
          toast: document.createElement("div"),
          toastBody: document.createElement("div"),
          toastTexts: document.createElement("div"),
          toastCapsule: document.createElement("div"),
          cover: document.createElement("div"),
          buttons: document.createElement("div"),
          inputs: document.createElement("div"),
          icon: !settings.iconUrl ? document.createElement("i") : document.createElement("img"),
          wrapper: null
        };
        $DOM.toast.setAttribute("data-iziToast-ref", settings.ref);
        $DOM.toast.appendChild($DOM.toastBody);
        $DOM.toastCapsule.appendChild($DOM.toast);
        (function() {
          $DOM.toast.classList.add(PLUGIN_NAME);
          $DOM.toast.classList.add(PLUGIN_NAME + "-opening");
          $DOM.toastCapsule.classList.add(PLUGIN_NAME + "-capsule");
          $DOM.toastBody.classList.add(PLUGIN_NAME + "-body");
          $DOM.toastTexts.classList.add(PLUGIN_NAME + "-texts");
          if (ISMOBILE || window.innerWidth <= MOBILEWIDTH) {
            if (settings.transitionInMobile)
              $DOM.toast.classList.add(settings.transitionInMobile);
          } else {
            if (settings.transitionIn)
              $DOM.toast.classList.add(settings.transitionIn);
          }
          if (settings.class) {
            var classes = settings.class.split(" ");
            forEach(classes, function(value, index) {
              $DOM.toast.classList.add(value);
            });
          }
          if (settings.id) {
            $DOM.toast.id = settings.id;
          }
          if (settings.rtl) {
            $DOM.toast.classList.add(PLUGIN_NAME + "-rtl");
            $DOM.toast.setAttribute("dir", "rtl");
          }
          if (settings.layout > 1) {
            $DOM.toast.classList.add(PLUGIN_NAME + "-layout" + settings.layout);
          }
          if (settings.balloon) {
            $DOM.toast.classList.add(PLUGIN_NAME + "-balloon");
          }
          if (settings.maxWidth) {
            if (!isNaN(settings.maxWidth)) {
              $DOM.toast.style.maxWidth = settings.maxWidth + "px";
            } else {
              $DOM.toast.style.maxWidth = settings.maxWidth;
            }
          }
          if (settings.theme !== "" || settings.theme !== "light") {
            $DOM.toast.classList.add(PLUGIN_NAME + "-theme-" + settings.theme);
          }
          if (settings.color) {
            if (isColor(settings.color)) {
              $DOM.toast.style.background = settings.color;
            } else {
              $DOM.toast.classList.add(PLUGIN_NAME + "-color-" + settings.color);
            }
          }
          if (settings.backgroundColor) {
            $DOM.toast.style.background = settings.backgroundColor;
            if (settings.balloon) {
              $DOM.toast.style.borderColor = settings.backgroundColor;
            }
          }
        })();
        (function() {
          if (settings.image) {
            $DOM.cover.classList.add(PLUGIN_NAME + "-cover");
            $DOM.cover.style.width = settings.imageWidth + "px";
            if (isBase64(settings.image.replace(/ /g, ""))) {
              $DOM.cover.style.backgroundImage = "url(data:image/png;base64," + settings.image.replace(/ /g, "") + ")";
            } else {
              $DOM.cover.style.backgroundImage = "url(" + settings.image + ")";
            }
            if (settings.rtl) {
              $DOM.toastBody.style.marginRight = settings.imageWidth + 10 + "px";
            } else {
              $DOM.toastBody.style.marginLeft = settings.imageWidth + 10 + "px";
            }
            $DOM.toast.appendChild($DOM.cover);
          }
        })();
        (function() {
          if (settings.close) {
            $DOM.buttonClose = document.createElement("button");
            $DOM.buttonClose.type = "button";
            $DOM.buttonClose.classList.add(PLUGIN_NAME + "-close");
            $DOM.buttonClose.addEventListener("click", function(e) {
              var button = e.target;
              that.hide(settings, $DOM.toast, "button");
            });
            $DOM.toast.appendChild($DOM.buttonClose);
          } else {
            if (settings.rtl) {
              $DOM.toast.style.paddingLeft = "18px";
            } else {
              $DOM.toast.style.paddingRight = "18px";
            }
          }
        })();
        (function() {
          if (settings.progressBar) {
            $DOM.progressBar = document.createElement("div");
            $DOM.progressBarDiv = document.createElement("div");
            $DOM.progressBar.classList.add(PLUGIN_NAME + "-progressbar");
            $DOM.progressBarDiv.style.background = settings.progressBarColor;
            $DOM.progressBar.appendChild($DOM.progressBarDiv);
            $DOM.toast.appendChild($DOM.progressBar);
          }
          if (settings.timeout) {
            if (settings.pauseOnHover && !settings.resetOnHover) {
              $DOM.toast.addEventListener("mouseenter", function(e) {
                that.progress(settings, $DOM.toast).pause();
              });
              $DOM.toast.addEventListener("mouseleave", function(e) {
                that.progress(settings, $DOM.toast).resume();
              });
            }
            if (settings.resetOnHover) {
              $DOM.toast.addEventListener("mouseenter", function(e) {
                that.progress(settings, $DOM.toast).reset();
              });
              $DOM.toast.addEventListener("mouseleave", function(e) {
                that.progress(settings, $DOM.toast).start();
              });
            }
          }
        })();
        (function() {
          if (settings.iconUrl) {
            $DOM.icon.setAttribute("class", PLUGIN_NAME + "-icon");
            $DOM.icon.setAttribute("src", settings.iconUrl);
          } else if (settings.icon) {
            $DOM.icon.setAttribute("class", PLUGIN_NAME + "-icon " + settings.icon);
            if (settings.iconText) {
              $DOM.icon.appendChild(document.createTextNode(settings.iconText));
            }
            if (settings.iconColor) {
              $DOM.icon.style.color = settings.iconColor;
            }
          }
          if (settings.icon || settings.iconUrl) {
            if (settings.rtl) {
              $DOM.toastBody.style.paddingRight = "33px";
            } else {
              $DOM.toastBody.style.paddingLeft = "33px";
            }
            $DOM.toastBody.appendChild($DOM.icon);
          }
        })();
        (function() {
          if (settings.title.length > 0) {
            $DOM.strong = document.createElement("strong");
            $DOM.strong.classList.add(PLUGIN_NAME + "-title");
            $DOM.strong.appendChild(createFragElem(settings.title));
            $DOM.toastTexts.appendChild($DOM.strong);
            if (settings.titleColor) {
              $DOM.strong.style.color = settings.titleColor;
            }
            if (settings.titleSize) {
              if (!isNaN(settings.titleSize)) {
                $DOM.strong.style.fontSize = settings.titleSize + "px";
              } else {
                $DOM.strong.style.fontSize = settings.titleSize;
              }
            }
            if (settings.titleLineHeight) {
              if (!isNaN(settings.titleSize)) {
                $DOM.strong.style.lineHeight = settings.titleLineHeight + "px";
              } else {
                $DOM.strong.style.lineHeight = settings.titleLineHeight;
              }
            }
          }
          if (settings.message.length > 0) {
            $DOM.p = document.createElement("p");
            $DOM.p.classList.add(PLUGIN_NAME + "-message");
            $DOM.p.appendChild(createFragElem(settings.message));
            $DOM.toastTexts.appendChild($DOM.p);
            if (settings.messageColor) {
              $DOM.p.style.color = settings.messageColor;
            }
            if (settings.messageSize) {
              if (!isNaN(settings.titleSize)) {
                $DOM.p.style.fontSize = settings.messageSize + "px";
              } else {
                $DOM.p.style.fontSize = settings.messageSize;
              }
            }
            if (settings.messageLineHeight) {
              if (!isNaN(settings.titleSize)) {
                $DOM.p.style.lineHeight = settings.messageLineHeight + "px";
              } else {
                $DOM.p.style.lineHeight = settings.messageLineHeight;
              }
            }
          }
          if (settings.title.length > 0 && settings.message.length > 0) {
            if (settings.rtl) {
              $DOM.strong.style.marginLeft = "10px";
            } else if (settings.layout !== 2 && !settings.rtl) {
              $DOM.strong.style.marginRight = "10px";
            }
          }
        })();
        $DOM.toastBody.appendChild($DOM.toastTexts);
        var $inputs;
        (function() {
          if (settings.inputs.length > 0) {
            $DOM.inputs.classList.add(PLUGIN_NAME + "-inputs");
            forEach(settings.inputs, function(value, index) {
              $DOM.inputs.appendChild(createFragElem(value[0]));
              $inputs = $DOM.inputs.childNodes;
              $inputs[index].classList.add(PLUGIN_NAME + "-inputs-child");
              if (value[3]) {
                setTimeout(function() {
                  $inputs[index].focus();
                }, 300);
              }
              $inputs[index].addEventListener(value[1], function(e) {
                var ts = value[2];
                return ts(that, $DOM.toast, this, e);
              });
            });
            $DOM.toastBody.appendChild($DOM.inputs);
          }
        })();
        (function() {
          if (settings.buttons.length > 0) {
            $DOM.buttons.classList.add(PLUGIN_NAME + "-buttons");
            forEach(settings.buttons, function(value, index) {
              $DOM.buttons.appendChild(createFragElem(value[0]));
              var $btns = $DOM.buttons.childNodes;
              $btns[index].classList.add(PLUGIN_NAME + "-buttons-child");
              if (value[2]) {
                setTimeout(function() {
                  $btns[index].focus();
                }, 300);
              }
              $btns[index].addEventListener("click", function(e) {
                e.preventDefault();
                var ts = value[1];
                return ts(that, $DOM.toast, this, e, $inputs);
              });
            });
          }
          $DOM.toastBody.appendChild($DOM.buttons);
        })();
        if (settings.message.length > 0 && (settings.inputs.length > 0 || settings.buttons.length > 0)) {
          $DOM.p.style.marginBottom = "0";
        }
        if (settings.inputs.length > 0 || settings.buttons.length > 0) {
          if (settings.rtl) {
            $DOM.toastTexts.style.marginLeft = "10px";
          } else {
            $DOM.toastTexts.style.marginRight = "10px";
          }
          if (settings.inputs.length > 0 && settings.buttons.length > 0) {
            if (settings.rtl) {
              $DOM.inputs.style.marginLeft = "8px";
            } else {
              $DOM.inputs.style.marginRight = "8px";
            }
          }
        }
        (function() {
          $DOM.toastCapsule.style.visibility = "hidden";
          setTimeout(function() {
            var H = $DOM.toast.offsetHeight;
            var style2 = $DOM.toast.currentStyle || window.getComputedStyle($DOM.toast);
            var marginTop = style2.marginTop;
            marginTop = marginTop.split("px");
            marginTop = parseInt(marginTop[0]);
            var marginBottom = style2.marginBottom;
            marginBottom = marginBottom.split("px");
            marginBottom = parseInt(marginBottom[0]);
            $DOM.toastCapsule.style.visibility = "";
            $DOM.toastCapsule.style.height = H + marginBottom + marginTop + "px";
            setTimeout(function() {
              $DOM.toastCapsule.style.height = "auto";
              if (settings.target) {
                $DOM.toastCapsule.style.overflow = "visible";
              }
            }, 500);
            if (settings.timeout) {
              that.progress(settings, $DOM.toast).start();
            }
          }, 100);
        })();
        (function() {
          var position = settings.position;
          if (settings.target) {
            $DOM.wrapper = document.querySelector(settings.target);
            $DOM.wrapper.classList.add(PLUGIN_NAME + "-target");
            if (settings.targetFirst) {
              $DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
            } else {
              $DOM.wrapper.appendChild($DOM.toastCapsule);
            }
          } else {
            if (POSITIONS.indexOf(settings.position) == -1) {
              console.warn("[" + PLUGIN_NAME + "] Incorrect position.\nIt can be \u203A " + POSITIONS);
              return;
            }
            if (ISMOBILE || window.innerWidth <= MOBILEWIDTH) {
              if (settings.position == "bottomLeft" || settings.position == "bottomRight" || settings.position == "bottomCenter") {
                position = PLUGIN_NAME + "-wrapper-bottomCenter";
              } else if (settings.position == "topLeft" || settings.position == "topRight" || settings.position == "topCenter") {
                position = PLUGIN_NAME + "-wrapper-topCenter";
              } else {
                position = PLUGIN_NAME + "-wrapper-center";
              }
            } else {
              position = PLUGIN_NAME + "-wrapper-" + position;
            }
            $DOM.wrapper = document.querySelector("." + PLUGIN_NAME + "-wrapper." + position);
            if (!$DOM.wrapper) {
              $DOM.wrapper = document.createElement("div");
              $DOM.wrapper.classList.add(PLUGIN_NAME + "-wrapper");
              $DOM.wrapper.classList.add(position);
              document.body.appendChild($DOM.wrapper);
            }
            if (settings.position == "topLeft" || settings.position == "topCenter" || settings.position == "topRight") {
              $DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
            } else {
              $DOM.wrapper.appendChild($DOM.toastCapsule);
            }
          }
          if (!isNaN(settings.zindex)) {
            $DOM.wrapper.style.zIndex = settings.zindex;
          } else {
            console.warn("[" + PLUGIN_NAME + "] Invalid zIndex.");
          }
        })();
        (function() {
          if (settings.overlay) {
            if (document.querySelector("." + PLUGIN_NAME + "-overlay.fadeIn") !== null) {
              $DOM.overlay = document.querySelector("." + PLUGIN_NAME + "-overlay");
              $DOM.overlay.setAttribute("data-iziToast-ref", $DOM.overlay.getAttribute("data-iziToast-ref") + "," + settings.ref);
              if (!isNaN(settings.zindex) && settings.zindex !== null) {
                $DOM.overlay.style.zIndex = settings.zindex - 1;
              }
            } else {
              $DOM.overlay.classList.add(PLUGIN_NAME + "-overlay");
              $DOM.overlay.classList.add("fadeIn");
              $DOM.overlay.style.background = settings.overlayColor;
              $DOM.overlay.setAttribute("data-iziToast-ref", settings.ref);
              if (!isNaN(settings.zindex) && settings.zindex !== null) {
                $DOM.overlay.style.zIndex = settings.zindex - 1;
              }
              document.querySelector("body").appendChild($DOM.overlay);
            }
            if (settings.overlayClose) {
              $DOM.overlay.removeEventListener("click", {});
              $DOM.overlay.addEventListener("click", function(e) {
                that.hide(settings, $DOM.toast, "overlay");
              });
            } else {
              $DOM.overlay.removeEventListener("click", {});
            }
          }
        })();
        (function() {
          if (settings.animateInside) {
            $DOM.toast.classList.add(PLUGIN_NAME + "-animateInside");
            var animationTimes = [200, 100, 300];
            if (settings.transitionIn == "bounceInLeft" || settings.transitionIn == "bounceInRight") {
              animationTimes = [400, 200, 400];
            }
            if (settings.title.length > 0) {
              setTimeout(function() {
                $DOM.strong.classList.add("slideIn");
              }, animationTimes[0]);
            }
            if (settings.message.length > 0) {
              setTimeout(function() {
                $DOM.p.classList.add("slideIn");
              }, animationTimes[1]);
            }
            if (settings.icon || settings.iconUrl) {
              setTimeout(function() {
                $DOM.icon.classList.add("revealIn");
              }, animationTimes[2]);
            }
            var counter = 150;
            if (settings.buttons.length > 0 && $DOM.buttons) {
              setTimeout(function() {
                forEach($DOM.buttons.childNodes, function(element, index) {
                  setTimeout(function() {
                    element.classList.add("revealIn");
                  }, counter);
                  counter = counter + 150;
                });
              }, settings.inputs.length > 0 ? 150 : 0);
            }
            if (settings.inputs.length > 0 && $DOM.inputs) {
              counter = 150;
              forEach($DOM.inputs.childNodes, function(element, index) {
                setTimeout(function() {
                  element.classList.add("revealIn");
                }, counter);
                counter = counter + 150;
              });
            }
          }
        })();
        settings.onOpening.apply(null, [settings, $DOM.toast]);
        try {
          var event = new CustomEvent(PLUGIN_NAME + "-opening", { detail: settings, bubbles: true, cancelable: true });
          document.dispatchEvent(event);
        } catch (ex) {
          console.warn(ex);
        }
        setTimeout(function() {
          $DOM.toast.classList.remove(PLUGIN_NAME + "-opening");
          $DOM.toast.classList.add(PLUGIN_NAME + "-opened");
          try {
            var event2 = new CustomEvent(PLUGIN_NAME + "-opened", { detail: settings, bubbles: true, cancelable: true });
            document.dispatchEvent(event2);
          } catch (ex) {
            console.warn(ex);
          }
          settings.onOpened.apply(null, [settings, $DOM.toast]);
        }, 1e3);
        if (settings.drag) {
          if (ACCEPTSTOUCH) {
            $DOM.toast.addEventListener("touchstart", function(e) {
              drag.startMoving(this, that, settings, e);
            }, false);
            $DOM.toast.addEventListener("touchend", function(e) {
              drag.stopMoving(this, e);
            }, false);
          } else {
            $DOM.toast.addEventListener("mousedown", function(e) {
              e.preventDefault();
              drag.startMoving(this, that, settings, e);
            }, false);
            $DOM.toast.addEventListener("mouseup", function(e) {
              e.preventDefault();
              drag.stopMoving(this, e);
            }, false);
          }
        }
        if (settings.closeOnEscape) {
          document.addEventListener("keyup", function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
              that.hide(settings, $DOM.toast, "esc");
            }
          });
        }
        if (settings.closeOnClick) {
          $DOM.toast.addEventListener("click", function(evt) {
            that.hide(settings, $DOM.toast, "toast");
          });
        }
        that.toast = $DOM.toast;
      };
      return $iziToast;
    });
  }
});

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames8() {
        var classes = [];
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg)
            continue;
          var argType = typeof arg;
          if (argType === "string" || argType === "number") {
            classes.push(arg);
          } else if (Array.isArray(arg)) {
            if (arg.length) {
              var inner = classNames8.apply(null, arg);
              if (inner) {
                classes.push(inner);
              }
            }
          } else if (argType === "object") {
            if (arg.toString === Object.prototype.toString) {
              for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
                }
              }
            } else {
              classes.push(arg.toString());
            }
          }
        }
        return classes.join(" ");
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames8.default = classNames8;
        module.exports = classNames8;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames8;
        });
      } else {
        window.classNames = classNames8;
      }
    })();
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React15 = require_react();
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React15.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps6 = type.defaultProps;
              for (propName in defaultProps6) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps6[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes2;
            if (typeof type === "function") {
              propTypes2 = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes2 = type.propTypes;
            } else {
              return;
            }
            if (propTypes2) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes2, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx = jsxWithValidationDynamic;
        var jsxs = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx;
        exports.jsxs = jsxs;
      })();
    }
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.");
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."), { expectedType });
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).");
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + ".");
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError((componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// web/js/utils/functions.js
var import_izitoast = __toESM(require_iziToast());
var hasItemLocalStorage = (key) => localStorage.getItem(key) !== null;
var getItemLocalStorage = (key) => localStorage.getItem(key);
var setItemLocalStorage = (key, value) => localStorage.setItem(key, value);
var totalCurrency = (total) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(total);

// node_modules/react-bootstrap/esm/Modal.js
var import_classnames7 = __toESM(require_classnames());

// node_modules/dom-helpers/esm/canUseDOM.js
var canUseDOM_default = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// node_modules/dom-helpers/esm/addEventListener.js
var optionsSupported = false;
var onceSupported = false;
try {
  options = {
    get passive() {
      return optionsSupported = true;
    },
    get once() {
      return onceSupported = optionsSupported = true;
    }
  };
  if (canUseDOM_default) {
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, true);
  }
} catch (e) {
}
var options;
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== "boolean" && !onceSupported) {
    var once = options.once, capture = options.capture;
    var wrappedHandler = handler;
    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };
      handler.__once = wrappedHandler;
    }
    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }
  node.addEventListener(eventName, handler, options);
}
var addEventListener_default = addEventListener;

// node_modules/dom-helpers/esm/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// node_modules/dom-helpers/esm/removeEventListener.js
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== "boolean" ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}
var removeEventListener_default = removeEventListener;

// node_modules/dom-helpers/esm/scrollbarSize.js
var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM_default) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}

// node_modules/@restart/hooks/esm/useCallbackRef.js
var import_react = __toESM(require_react());
function useCallbackRef() {
  return (0, import_react.useState)(null);
}

// node_modules/@restart/hooks/esm/useEventCallback.js
var import_react3 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react2 = __toESM(require_react());
function useCommittedRef(value) {
  var ref = (0, import_react2.useRef)(value);
  (0, import_react2.useEffect)(function() {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn) {
  var ref = useCommittedRef_default(fn);
  return (0, import_react3.useCallback)(function() {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}

// node_modules/@restart/hooks/esm/useMergedRefs.js
var import_react4 = __toESM(require_react());
var toFnRef = function toFnRef2(ref) {
  return !ref || typeof ref === "function" ? ref : function(value) {
    ref.current = value;
  };
};
function mergeRefs(refA, refB) {
  var a = toFnRef(refA);
  var b = toFnRef(refB);
  return function(value) {
    if (a)
      a(value);
    if (b)
      b(value);
  };
}
function useMergedRefs(refA, refB) {
  return (0, import_react4.useMemo)(function() {
    return mergeRefs(refA, refB);
  }, [refA, refB]);
}
var useMergedRefs_default = useMergedRefs;

// node_modules/@restart/hooks/esm/useUpdatedRef.js
var import_react5 = __toESM(require_react());
function useUpdatedRef(value) {
  var valueRef = (0, import_react5.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

// node_modules/@restart/hooks/esm/useWillUnmount.js
var import_react6 = __toESM(require_react());
function useWillUnmount(fn) {
  var onUnmount = useUpdatedRef(fn);
  (0, import_react6.useEffect)(function() {
    return function() {
      return onUnmount.current();
    };
  }, []);
}

// node_modules/dom-helpers/esm/ownerWindow.js
function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}

// node_modules/dom-helpers/esm/getComputedStyle.js
function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}

// node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, "-$1").toLowerCase();
}

// node_modules/dom-helpers/esm/hyphenateStyle.js
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
}

// node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}

// node_modules/dom-helpers/esm/css.js
function style(node, property) {
  var css = "";
  var transforms = "";
  if (typeof property === "string") {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
  }
  Object.keys(property).forEach(function(key) {
    var value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css;
}
var css_default = style;

// node_modules/dom-helpers/esm/listen.js
function listen(node, eventName, handler, options) {
  addEventListener_default(node, eventName, handler, options);
  return function() {
    removeEventListener_default(node, eventName, handler, options);
  };
}
var listen_default = listen;

// node_modules/dom-helpers/esm/triggerEvent.js
function triggerEvent(node, eventName, bubbles, cancelable) {
  if (bubbles === void 0) {
    bubbles = false;
  }
  if (cancelable === void 0) {
    cancelable = true;
  }
  if (node) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}

// node_modules/dom-helpers/esm/transitionEnd.js
function parseDuration(node) {
  var str = css_default(node, "transitionDuration") || "";
  var mult = str.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(str) * mult;
}
function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }
  var called = false;
  var handle = setTimeout(function() {
    if (!called)
      triggerEvent(element, "transitionend", true);
  }, duration + padding);
  var remove = listen_default(element, "transitionend", function() {
    called = true;
  }, {
    once: true
  });
  return function() {
    clearTimeout(handle);
    remove();
  };
}
function transitionEnd(element, handler, duration, padding) {
  if (duration == null)
    duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = listen_default(element, "transitionend", handler);
  return function() {
    removeEmulate();
    remove();
  };
}

// node_modules/react-bootstrap/esm/Modal.js
var React14 = __toESM(require_react());
var import_react18 = __toESM(require_react());

// node_modules/dom-helpers/esm/activeElement.js
function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }
  try {
    var active = doc.activeElement;
    if (!active || !active.nodeName)
      return null;
    return active;
  } catch (e) {
    return doc.body;
  }
}

// node_modules/dom-helpers/esm/contains.js
function contains(context, node) {
  if (context.contains)
    return context.contains(node);
  if (context.compareDocumentPosition)
    return context === node || !!(context.compareDocumentPosition(node) & 16);
}

// node_modules/@restart/ui/esm/Modal.js
var import_react11 = __toESM(require_react());
var React = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@restart/hooks/esm/useMounted.js
var import_react7 = __toESM(require_react());
function useMounted() {
  var mounted = (0, import_react7.useRef)(true);
  var isMounted = (0, import_react7.useRef)(function() {
    return mounted.current;
  });
  (0, import_react7.useEffect)(function() {
    mounted.current = true;
    return function() {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react8 = __toESM(require_react());
function usePrevious(value) {
  var ref = (0, import_react8.useRef)(null);
  (0, import_react8.useEffect)(function() {
    ref.current = value;
  });
  return ref.current;
}

// node_modules/@restart/ui/esm/DataKey.js
var ATTRIBUTE_PREFIX = `data-rr-ui-`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}

// node_modules/@restart/ui/esm/getScrollbarWidth.js
function getBodyScrollbarWidth(ownerDocument2 = document) {
  const window2 = ownerDocument2.defaultView;
  return Math.abs(window2.innerWidth - ownerDocument2.documentElement.clientWidth);
}

// node_modules/@restart/ui/esm/ModalManager.js
var OPEN_DATA_ATTRIBUTE = dataAttr("modal-open");
var ModalManager = class {
  constructor({
    ownerDocument: ownerDocument2,
    handleContainerOverflow = true,
    isRTL = false
  } = {}) {
    this.handleContainerOverflow = handleContainerOverflow;
    this.isRTL = isRTL;
    this.modals = [];
    this.ownerDocument = ownerDocument2;
  }
  getScrollbarWidth() {
    return getBodyScrollbarWidth(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(_modal) {
  }
  removeModalAttributes(_modal) {
  }
  setContainerStyle(containerState) {
    const style2 = {
      overflow: "hidden"
    };
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const container = this.getElement();
    containerState.style = {
      overflow: container.style.overflow,
      [paddingProp]: container.style[paddingProp]
    };
    if (containerState.scrollBarWidth) {
      style2[paddingProp] = `${parseInt(css_default(container, paddingProp) || "0", 10) + containerState.scrollBarWidth}px`;
    }
    container.setAttribute(OPEN_DATA_ATTRIBUTE, "");
    css_default(container, style2);
  }
  reset() {
    [...this.modals].forEach((m) => this.remove(m));
  }
  removeContainerStyle(containerState) {
    const container = this.getElement();
    container.removeAttribute(OPEN_DATA_ATTRIBUTE);
    Object.assign(container.style, containerState.style);
  }
  add(modal) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    this.setModalAttributes(modal);
    if (modalIdx !== 0) {
      return modalIdx;
    }
    this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(this.state);
    }
    return modalIdx;
  }
  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    this.modals.splice(modalIdx, 1);
    if (!this.modals.length && this.handleContainerOverflow) {
      this.removeContainerStyle(this.state);
    }
    this.removeModalAttributes(modal);
  }
  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
};
var ModalManager_default = ModalManager;

// node_modules/@restart/ui/esm/useWaitForDOMRef.js
var import_react10 = __toESM(require_react());

// node_modules/@restart/ui/esm/useWindow.js
var import_react9 = __toESM(require_react());
var Context = /* @__PURE__ */ (0, import_react9.createContext)(canUseDOM_default ? window : void 0);
var WindowProvider = Context.Provider;
function useWindow() {
  return (0, import_react9.useContext)(Context);
}

// node_modules/@restart/ui/esm/useWaitForDOMRef.js
var resolveContainerRef = (ref, document2) => {
  var _ref;
  if (!canUseDOM_default)
    return null;
  if (ref == null)
    return (document2 || ownerDocument()).body;
  if (typeof ref === "function")
    ref = ref();
  if (ref && "current" in ref)
    ref = ref.current;
  if ((_ref = ref) != null && _ref.nodeType)
    return ref || null;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  const window2 = useWindow();
  const [resolvedRef, setRef] = (0, import_react10.useState)(() => resolveContainerRef(ref, window2 == null ? void 0 : window2.document));
  if (!resolvedRef) {
    const earlyRef = resolveContainerRef(ref);
    if (earlyRef)
      setRef(earlyRef);
  }
  (0, import_react10.useEffect)(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0, import_react10.useEffect)(() => {
    const nextRef = resolveContainerRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

// node_modules/@restart/ui/esm/Modal.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded = ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"];
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var manager;
function getManager(window2) {
  if (!manager)
    manager = new ModalManager_default({
      ownerDocument: window2 == null ? void 0 : window2.document
    });
  return manager;
}
function useModalManager(provided) {
  const window2 = useWindow();
  const modalManager = provided || getManager(window2);
  const modal = (0, import_react11.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: () => modalManager.add(modal.current),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: (0, import_react11.useCallback)((ref) => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0, import_react11.useCallback)((ref) => {
      modal.current.backdrop = ref;
    }, [])
  });
}
var Modal = /* @__PURE__ */ (0, import_react11.forwardRef)((_ref, ref) => {
  let {
    show = false,
    role = "dialog",
    className,
    style: style2,
    children,
    backdrop = true,
    keyboard = true,
    onBackdropClick,
    onEscapeKeyDown,
    transition,
    backdropTransition,
    autoFocus = true,
    enforceFocus = true,
    restoreFocus = true,
    restoreFocusOptions,
    renderDialog,
    renderBackdrop = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", Object.assign({}, props)),
    manager: providedManager,
    container: containerRef,
    onShow,
    onHide = () => {
    },
    onExit,
    onExited,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = _ref, rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  const container = useWaitForDOMRef(containerRef);
  const modal = useModalManager(providedManager);
  const isMounted = useMounted();
  const prevShow = usePrevious(show);
  const [exited, setExited] = (0, import_react11.useState)(!show);
  const lastFocusRef = (0, import_react11.useRef)(null);
  (0, import_react11.useImperativeHandle)(ref, () => modal, [modal]);
  if (canUseDOM_default && !prevShow && show) {
    lastFocusRef.current = activeElement();
  }
  if (!transition && !show && !exited) {
    setExited(true);
  } else if (show && exited) {
    setExited(false);
  }
  const handleShow = useEventCallback(() => {
    modal.add();
    removeKeydownListenerRef.current = listen_default(document, "keydown", handleDocumentKeyDown);
    removeFocusListenerRef.current = listen_default(document, "focus", () => setTimeout(handleEnforceFocus), true);
    if (onShow) {
      onShow();
    }
    if (autoFocus) {
      const currentActiveElement = activeElement(document);
      if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  const handleHide = useEventCallback(() => {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
    if (restoreFocus) {
      var _lastFocusRef$current;
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  });
  (0, import_react11.useEffect)(() => {
    if (!show || !container)
      return;
    handleShow();
  }, [
    show,
    container,
    handleShow
  ]);
  (0, import_react11.useEffect)(() => {
    if (!exited)
      return;
    handleHide();
  }, [exited, handleHide]);
  useWillUnmount(() => {
    handleHide();
  });
  const handleEnforceFocus = useEventCallback(() => {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    const currentActiveElement = activeElement();
    if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  const handleBackdropClick = useEventCallback((e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onBackdropClick == null ? void 0 : onBackdropClick(e);
    if (backdrop === true) {
      onHide();
    }
  });
  const handleDocumentKeyDown = useEventCallback((e) => {
    if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  const removeFocusListenerRef = (0, import_react11.useRef)();
  const removeKeydownListenerRef = (0, import_react11.useRef)();
  const handleHidden = (...args) => {
    setExited(true);
    onExited == null ? void 0 : onExited(...args);
  };
  const Transition2 = transition;
  if (!container || !(show || Transition2 && !exited)) {
    return null;
  }
  const dialogProps = Object.assign({
    role,
    ref: modal.setDialogRef,
    "aria-modal": role === "dialog" ? true : void 0
  }, rest, {
    style: style2,
    className,
    tabIndex: -1
  });
  let dialog = renderDialog ? renderDialog(dialogProps) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", Object.assign({}, dialogProps, {
    children: /* @__PURE__ */ React.cloneElement(children, {
      role: "document"
    })
  }));
  if (Transition2) {
    dialog = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition2, {
      appear: true,
      unmountOnExit: true,
      in: !!show,
      onExit,
      onExiting,
      onExited: handleHidden,
      onEnter,
      onEntering,
      onEntered,
      children: dialog
    });
  }
  let backdropElement = null;
  if (backdrop) {
    const BackdropTransition2 = backdropTransition;
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });
    if (BackdropTransition2) {
      backdropElement = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackdropTransition2, {
        appear: true,
        in: !!show,
        children: backdropElement
      });
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime2.Fragment, {
    children: /* @__PURE__ */ import_react_dom.default.createPortal(/* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime2.Fragment, {
      children: [backdropElement, dialog]
    }), container)
  });
});
Modal.displayName = "Modal";
var Modal_default = Object.assign(Modal, {
  Manager: ModalManager_default
});

// node_modules/dom-helpers/esm/hasClass.js
function hasClass(element, className) {
  if (element.classList)
    return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

// node_modules/dom-helpers/esm/addClass.js
function addClass(element, className) {
  if (element.classList)
    element.classList.add(className);
  else if (!hasClass(element, className))
    if (typeof element.className === "string")
      element.className = element.className + " " + className;
    else
      element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}

// node_modules/dom-helpers/esm/querySelectorAll.js
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

// node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}

// node_modules/react-bootstrap/esm/BootstrapModalManager.js
var Selector = {
  FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  STICKY_CONTENT: ".sticky-top",
  NAVBAR_TOGGLER: ".navbar-toggler"
};
var BootstrapModalManager = class extends ModalManager_default {
  adjustAndStore(prop, element, adjust) {
    const actual = element.style[prop];
    element.dataset[prop] = actual;
    css_default(element, {
      [prop]: `${parseFloat(css_default(element, prop)) + adjust}px`
    });
  }
  restore(prop, element) {
    const value = element.dataset[prop];
    if (value !== void 0) {
      delete element.dataset[prop];
      css_default(element, {
        [prop]: value
      });
    }
  }
  setContainerStyle(containerState) {
    super.setContainerStyle(containerState);
    const container = this.getElement();
    addClass(container, "modal-open");
    if (!containerState.scrollBarWidth)
      return;
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
    qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
  }
  removeContainerStyle(containerState) {
    super.removeContainerStyle(containerState);
    const container = this.getElement();
    removeClass(container, "modal-open");
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el));
    qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.restore(marginProp, el));
    qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.restore(marginProp, el));
  }
};
var sharedManager;
function getSharedManager(options) {
  if (!sharedManager)
    sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}

// node_modules/react-bootstrap/esm/Fade.js
var import_classnames = __toESM(require_classnames());
var React5 = __toESM(require_react());
var import_react15 = __toESM(require_react());

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

// node_modules/react-transition-group/esm/Transition.js
var import_prop_types2 = __toESM(require_prop_types());
var import_react13 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());

// node_modules/react-transition-group/esm/config.js
var config_default = {
  disabled: false
};

// node_modules/react-transition-group/esm/utils/PropTypes.js
var import_prop_types = __toESM(require_prop_types());
var timeoutsShape = true ? import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
  enter: import_prop_types.default.number,
  exit: import_prop_types.default.number,
  appear: import_prop_types.default.number
}).isRequired]) : null;
var classNamesShape = true ? import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.shape({
  enter: import_prop_types.default.string,
  exit: import_prop_types.default.string,
  active: import_prop_types.default.string
}), import_prop_types.default.shape({
  enter: import_prop_types.default.string,
  enterDone: import_prop_types.default.string,
  enterActive: import_prop_types.default.string,
  exit: import_prop_types.default.string,
  exitDone: import_prop_types.default.string,
  exitActive: import_prop_types.default.string
})]) : null;

// node_modules/react-transition-group/esm/TransitionGroupContext.js
var import_react12 = __toESM(require_react());
var TransitionGroupContext_default = import_react12.default.createContext(null);

// node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom2.default.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config_default.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : import_react_dom2.default.findDOMNode(this);
    if (!exit || config_default.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom2.default.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children, _in = _this$props.in, _mountOnEnter = _this$props.mountOnEnter, _unmountOnExit = _this$props.unmountOnExit, _appear = _this$props.appear, _enter = _this$props.enter, _exit = _this$props.exit, _timeout = _this$props.timeout, _addEndListener = _this$props.addEndListener, _onEnter = _this$props.onEnter, _onEntering = _this$props.onEntering, _onEntered = _this$props.onEntered, _onExit = _this$props.onExit, _onExiting = _this$props.onExiting, _onExited = _this$props.onExited, _nodeRef = _this$props.nodeRef, childProps = _objectWithoutPropertiesLoose2(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return /* @__PURE__ */ import_react13.default.createElement(TransitionGroupContext_default.Provider, {
      value: null
    }, typeof children === "function" ? children(status, childProps) : import_react13.default.cloneElement(import_react13.default.Children.only(children), childProps));
  };
  return Transition2;
}(import_react13.default.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = true ? {
  nodeRef: import_prop_types2.default.shape({
    current: typeof Element === "undefined" ? import_prop_types2.default.any : function(propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return import_prop_types2.default.instanceOf(value && "ownerDocument" in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),
  children: import_prop_types2.default.oneOfType([import_prop_types2.default.func.isRequired, import_prop_types2.default.element.isRequired]).isRequired,
  in: import_prop_types2.default.bool,
  mountOnEnter: import_prop_types2.default.bool,
  unmountOnExit: import_prop_types2.default.bool,
  appear: import_prop_types2.default.bool,
  enter: import_prop_types2.default.bool,
  exit: import_prop_types2.default.bool,
  timeout: function timeout(props) {
    var pt = timeoutsShape;
    if (!props.addEndListener)
      pt = pt.isRequired;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return pt.apply(void 0, [props].concat(args));
  },
  addEndListener: import_prop_types2.default.func,
  onEnter: import_prop_types2.default.func,
  onEntering: import_prop_types2.default.func,
  onEntered: import_prop_types2.default.func,
  onExit: import_prop_types2.default.func,
  onExiting: import_prop_types2.default.func,
  onExited: import_prop_types2.default.func
} : {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition_default = Transition;

// node_modules/react-bootstrap/esm/transitionEndListener.js
function parseDuration2(node, property) {
  const str = css_default(node, property) || "";
  const mult = str.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
  const duration = parseDuration2(element, "transitionDuration");
  const delay = parseDuration2(element, "transitionDelay");
  const remove = transitionEnd(element, (e) => {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}

// node_modules/react-bootstrap/esm/triggerBrowserReflow.js
function triggerBrowserReflow(node) {
  node.offsetHeight;
}

// node_modules/react-bootstrap/esm/TransitionWrapper.js
var import_react14 = __toESM(require_react());

// node_modules/react-bootstrap/esm/safeFindDOMNode.js
var import_react_dom3 = __toESM(require_react_dom());
function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && "setState" in componentOrElement) {
    return import_react_dom3.default.findDOMNode(componentOrElement);
  }
  return componentOrElement != null ? componentOrElement : null;
}

// node_modules/react-bootstrap/esm/TransitionWrapper.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var TransitionWrapper = /* @__PURE__ */ import_react14.default.forwardRef((_a, ref) => {
  var _b = _a, {
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    addEndListener,
    children,
    childRef
  } = _b, props = __objRest(_b, [
    "onEnter",
    "onEntering",
    "onEntered",
    "onExit",
    "onExiting",
    "onExited",
    "addEndListener",
    "children",
    "childRef"
  ]);
  const nodeRef = (0, import_react14.useRef)(null);
  const mergedRef = useMergedRefs_default(nodeRef, childRef);
  const attachRef = (r) => {
    mergedRef(safeFindDOMNode(r));
  };
  const normalize = (callback) => (param) => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };
  const handleEnter = (0, import_react14.useCallback)(normalize(onEnter), [onEnter]);
  const handleEntering = (0, import_react14.useCallback)(normalize(onEntering), [onEntering]);
  const handleEntered = (0, import_react14.useCallback)(normalize(onEntered), [onEntered]);
  const handleExit = (0, import_react14.useCallback)(normalize(onExit), [onExit]);
  const handleExiting = (0, import_react14.useCallback)(normalize(onExiting), [onExiting]);
  const handleExited = (0, import_react14.useCallback)(normalize(onExited), [onExited]);
  const handleAddEndListener = (0, import_react14.useCallback)(normalize(addEndListener), [addEndListener]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Transition_default, __spreadProps(__spreadValues({
    ref
  }, props), {
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef,
    children: typeof children === "function" ? (status, innerProps) => children(status, __spreadProps(__spreadValues({}, innerProps), {
      ref: attachRef
    })) : /* @__PURE__ */ import_react14.default.cloneElement(children, {
      ref: attachRef
    })
  }));
});
var TransitionWrapper_default = TransitionWrapper;

// node_modules/react-bootstrap/esm/Fade.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = {
  [ENTERING]: "show",
  [ENTERED]: "show"
};
var Fade = /* @__PURE__ */ React5.forwardRef((_a, ref) => {
  var _b = _a, {
    className,
    children,
    transitionClasses = {}
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "transitionClasses"
  ]);
  const handleEnter = (0, import_react15.useCallback)((node, isAppearing) => {
    triggerBrowserReflow(node);
    props.onEnter == null ? void 0 : props.onEnter(node, isAppearing);
  }, [props]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TransitionWrapper_default, __spreadProps(__spreadValues({
    ref,
    addEndListener: transitionEndListener
  }, props), {
    onEnter: handleEnter,
    childRef: children.ref,
    children: (status, innerProps) => /* @__PURE__ */ React5.cloneElement(children, __spreadProps(__spreadValues({}, innerProps), {
      className: (0, import_classnames.default)("fade", className, children.props.className, fadeStyles[status], transitionClasses[status])
    }))
  }));
});
Fade.defaultProps = defaultProps;
Fade.displayName = "Fade";
var Fade_default = Fade;

// node_modules/react-bootstrap/esm/createWithBsPrefix.js
var import_classnames2 = __toESM(require_classnames());

// node_modules/dom-helpers/esm/camelize.js
var rHyphen = /-(.)/g;
function camelize(string) {
  return string.replace(rHyphen, function(_, chr) {
    return chr.toUpperCase();
  });
}

// node_modules/react-bootstrap/esm/createWithBsPrefix.js
var React7 = __toESM(require_react());

// node_modules/react-bootstrap/esm/ThemeProvider.js
var React6 = __toESM(require_react());
var import_react16 = __toESM(require_react());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var DEFAULT_BREAKPOINTS = ["xxl", "xl", "lg", "md", "sm", "xs"];
var ThemeContext = /* @__PURE__ */ React6.createContext({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS
});
var {
  Consumer,
  Provider
} = ThemeContext;
function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = (0, import_react16.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useIsRTL() {
  const {
    dir
  } = (0, import_react16.useContext)(ThemeContext);
  return dir === "rtl";
}

// node_modules/react-bootstrap/esm/createWithBsPrefix.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);
function createWithBsPrefix(prefix, {
  displayName = pascalCase(prefix),
  Component,
  defaultProps: defaultProps6
} = {}) {
  const BsComponent = /* @__PURE__ */ React7.forwardRef((_a, ref) => {
    var _b = _a, {
      className,
      bsPrefix,
      as: Tag = Component || "div"
    } = _b, props = __objRest(_b, [
      "className",
      "bsPrefix",
      "as"
    ]);
    const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Tag, __spreadValues({
      ref,
      className: (0, import_classnames2.default)(className, resolvedPrefix)
    }, props));
  });
  BsComponent.defaultProps = defaultProps6;
  BsComponent.displayName = displayName;
  return BsComponent;
}

// node_modules/react-bootstrap/esm/ModalBody.js
var ModalBody_default = createWithBsPrefix("modal-body");

// node_modules/react-bootstrap/esm/ModalContext.js
var React8 = __toESM(require_react());
var ModalContext = /* @__PURE__ */ React8.createContext({
  onHide() {
  }
});
var ModalContext_default = ModalContext;

// node_modules/react-bootstrap/esm/ModalDialog.js
var import_classnames3 = __toESM(require_classnames());
var React9 = __toESM(require_react());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var ModalDialog = /* @__PURE__ */ React9.forwardRef((_a, ref) => {
  var _b = _a, {
    bsPrefix,
    className,
    contentClassName,
    centered,
    size: size2,
    fullscreen,
    children,
    scrollable
  } = _b, props = __objRest(_b, [
    "bsPrefix",
    "className",
    "contentClassName",
    "centered",
    "size",
    "fullscreen",
    "children",
    "scrollable"
  ]);
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof fullscreen === "string" ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", __spreadProps(__spreadValues({}, props), {
    ref,
    className: (0, import_classnames3.default)(dialogClass, className, size2 && `${bsPrefix}-${size2}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
    children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", {
      className: (0, import_classnames3.default)(`${bsPrefix}-content`, contentClassName),
      children
    })
  }));
});
ModalDialog.displayName = "ModalDialog";
var ModalDialog_default = ModalDialog;

// node_modules/react-bootstrap/esm/ModalFooter.js
var ModalFooter_default = createWithBsPrefix("modal-footer");

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_classnames5 = __toESM(require_classnames());
var React12 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AbstractModalHeader.js
var React11 = __toESM(require_react());
var import_react17 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CloseButton.js
var import_prop_types3 = __toESM(require_prop_types());
var React10 = __toESM(require_react());
var import_classnames4 = __toESM(require_classnames());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var propTypes = {
  "aria-label": import_prop_types3.default.string,
  onClick: import_prop_types3.default.func,
  variant: import_prop_types3.default.oneOf(["white"])
};
var defaultProps2 = {
  "aria-label": "Close"
};
var CloseButton = /* @__PURE__ */ React10.forwardRef((_a, ref) => {
  var _b = _a, {
    className,
    variant
  } = _b, props = __objRest(_b, [
    "className",
    "variant"
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", __spreadValues({
    ref,
    type: "button",
    className: (0, import_classnames4.default)("btn-close", variant && `btn-close-${variant}`, className)
  }, props));
});
CloseButton.displayName = "CloseButton";
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps2;
var CloseButton_default = CloseButton;

// node_modules/react-bootstrap/esm/AbstractModalHeader.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var defaultProps3 = {
  closeLabel: "Close",
  closeButton: false
};
var AbstractModalHeader = /* @__PURE__ */ React11.forwardRef((_a, ref) => {
  var _b = _a, {
    closeLabel,
    closeVariant,
    closeButton,
    onHide,
    children
  } = _b, props = __objRest(_b, [
    "closeLabel",
    "closeVariant",
    "closeButton",
    "onHide",
    "children"
  ]);
  const context = (0, import_react17.useContext)(ModalContext_default);
  const handleClick = useEventCallback(() => {
    context == null ? void 0 : context.onHide();
    onHide == null ? void 0 : onHide();
  });
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", __spreadProps(__spreadValues({
    ref
  }, props), {
    children: [children, closeButton && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(CloseButton_default, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick
    })]
  }));
});
AbstractModalHeader.defaultProps = defaultProps3;
var AbstractModalHeader_default = AbstractModalHeader;

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var defaultProps4 = {
  closeLabel: "Close",
  closeButton: false
};
var ModalHeader = /* @__PURE__ */ React12.forwardRef((_a, ref) => {
  var _b = _a, {
    bsPrefix,
    className
  } = _b, props = __objRest(_b, [
    "bsPrefix",
    "className"
  ]);
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AbstractModalHeader_default, __spreadProps(__spreadValues({
    ref
  }, props), {
    className: (0, import_classnames5.default)(className, bsPrefix)
  }));
});
ModalHeader.displayName = "ModalHeader";
ModalHeader.defaultProps = defaultProps4;
var ModalHeader_default = ModalHeader;

// node_modules/react-bootstrap/esm/divWithClassName.js
var React13 = __toESM(require_react());
var import_classnames6 = __toESM(require_classnames());
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var divWithClassName_default = (className) => /* @__PURE__ */ React13.forwardRef((p, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", __spreadProps(__spreadValues({}, p), {
  ref,
  className: (0, import_classnames6.default)(p.className, className)
})));

// node_modules/react-bootstrap/esm/ModalTitle.js
var DivStyledAsH4 = divWithClassName_default("h4");
var ModalTitle_default = createWithBsPrefix("modal-title", {
  Component: DivStyledAsH4
});

// node_modules/react-bootstrap/esm/Modal.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var defaultProps5 = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog_default
};
function DialogTransition(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Fade_default, __spreadProps(__spreadValues({}, props), {
    timeout: null
  }));
}
function BackdropTransition(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Fade_default, __spreadProps(__spreadValues({}, props), {
    timeout: null
  }));
}
var Modal2 = /* @__PURE__ */ React14.forwardRef((_a, ref) => {
  var _b = _a, {
    bsPrefix,
    className,
    style: style2,
    dialogClassName,
    contentClassName,
    children,
    dialogAs: Dialog,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    show,
    animation,
    backdrop,
    keyboard,
    onEscapeKeyDown,
    onShow,
    onHide,
    container,
    autoFocus,
    enforceFocus,
    restoreFocus,
    restoreFocusOptions,
    onEntered,
    onExit,
    onExiting,
    onEnter,
    onEntering,
    onExited,
    backdropClassName,
    manager: propsManager
  } = _b, props = __objRest(_b, [
    "bsPrefix",
    "className",
    "style",
    "dialogClassName",
    "contentClassName",
    "children",
    "dialogAs",
    "aria-labelledby",
    "aria-describedby",
    "aria-label",
    "show",
    "animation",
    "backdrop",
    "keyboard",
    "onEscapeKeyDown",
    "onShow",
    "onHide",
    "container",
    "autoFocus",
    "enforceFocus",
    "restoreFocus",
    "restoreFocusOptions",
    "onEntered",
    "onExit",
    "onExiting",
    "onEnter",
    "onEntering",
    "onExited",
    "backdropClassName",
    "manager"
  ]);
  const [modalStyle, setStyle] = (0, import_react18.useState)({});
  const [animateStaticModal, setAnimateStaticModal] = (0, import_react18.useState)(false);
  const waitingForMouseUpRef = (0, import_react18.useRef)(false);
  const ignoreBackdropClickRef = (0, import_react18.useRef)(false);
  const removeStaticModalAnimationRef = (0, import_react18.useRef)(null);
  const [modal, setModalRef] = useCallbackRef();
  const mergedRef = useMergedRefs_default(ref, setModalRef);
  const handleHide = useEventCallback(onHide);
  const isRTL = useIsRTL();
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const modalContext = (0, import_react18.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager)
      return propsManager;
    return getSharedManager({
      isRTL
    });
  }
  function updateDialogStyle(node) {
    if (!canUseDOM_default)
      return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
    });
  }
  const handleWindowResize = useEventCallback(() => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  useWillUnmount(() => {
    removeEventListener_default(window, "resize", handleWindowResize);
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
  });
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };
  const handleMouseUp = (e) => {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = (e) => {
    if (backdrop === "static") {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    onHide == null ? void 0 : onHide();
  };
  const handleEscapeKeyDown = (e) => {
    if (!keyboard && backdrop === "static") {
      e.preventDefault();
      handleStaticModalAnimation();
    } else if (keyboard && onEscapeKeyDown) {
      onEscapeKeyDown(e);
    }
  };
  const handleEnter = (node, isAppearing) => {
    if (node) {
      updateDialogStyle(node);
    }
    onEnter == null ? void 0 : onEnter(node, isAppearing);
  };
  const handleExit = (node) => {
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
    onExit == null ? void 0 : onExit(node);
  };
  const handleEntering = (node, isAppearing) => {
    onEntering == null ? void 0 : onEntering(node, isAppearing);
    addEventListener_default(window, "resize", handleWindowResize);
  };
  const handleExited = (node) => {
    if (node)
      node.style.display = "";
    onExited == null ? void 0 : onExited(node);
    removeEventListener_default(window, "resize", handleWindowResize);
  };
  const renderBackdrop = (0, import_react18.useCallback)((backdropProps) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", __spreadProps(__spreadValues({}, backdropProps), {
    className: (0, import_classnames7.default)(`${bsPrefix}-backdrop`, backdropClassName, !animation && "show")
  })), [animation, backdropClassName, bsPrefix]);
  const baseModalStyle = __spreadValues(__spreadValues({}, style2), modalStyle);
  baseModalStyle.display = "block";
  const renderDialog = (dialogProps) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", __spreadProps(__spreadValues({
    role: "dialog"
  }, dialogProps), {
    style: baseModalStyle,
    className: (0, import_classnames7.default)(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`),
    onClick: backdrop ? handleClick : void 0,
    onMouseUp: handleMouseUp,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Dialog, __spreadProps(__spreadValues({}, props), {
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName,
      children
    }))
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ModalContext_default.Provider, {
    value: modalContext,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Modal_default, {
      show,
      ref: mergedRef,
      backdrop,
      container,
      keyboard: true,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow,
      onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered,
      onExit: handleExit,
      onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      transition: animation ? DialogTransition : void 0,
      backdropTransition: animation ? BackdropTransition : void 0,
      renderBackdrop,
      renderDialog
    })
  });
});
Modal2.displayName = "Modal";
Modal2.defaultProps = defaultProps5;
var Modal_default2 = Object.assign(Modal2, {
  Body: ModalBody_default,
  Header: ModalHeader_default,
  Title: ModalTitle_default,
  Footer: ModalFooter_default,
  Dialog: ModalDialog_default,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
});

export {
  hasItemLocalStorage,
  getItemLocalStorage,
  setItemLocalStorage,
  totalCurrency,
  Modal_default2 as Modal_default
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=chunk-YKEZ7GIB.js.map
