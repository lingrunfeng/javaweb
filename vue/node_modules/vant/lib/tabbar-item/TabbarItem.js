"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _Tabbar = require("../tabbar/Tabbar");

var _use = require("@vant/use");

var _useRoute = require("../composables/use-route");

var _icon = require("../icon");

var _badge = require("../badge");

// Utils
// Composables
// Components
var [name, bem] = (0, _utils.createNamespace)('tabbar-item');
var tabbarItemProps = (0, _utils.extend)({}, _useRoute.routeProps, {
  dot: Boolean,
  icon: String,
  name: _utils.numericProp,
  badge: _utils.numericProp,
  iconPrefix: String
});

var _default = (0, _vue.defineComponent)({
  name,
  props: tabbarItemProps,
  emits: ['click'],

  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var route = (0, _useRoute.useRoute)();
    var vm = (0, _vue.getCurrentInstance)().proxy;
    var {
      parent,
      index
    } = (0, _use.useParent)(_Tabbar.TABBAR_KEY);

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <TabbarItem> must be a child component of <Tabbar>.');
      }

      return;
    }

    var active = (0, _vue.computed)(() => {
      var {
        route,
        modelValue
      } = parent.props;

      if (route && '$route' in vm) {
        var {
          $route
        } = vm;
        var {
          to
        } = props;
        var config = (0, _utils.isObject)(to) ? to : {
          path: to
        };
        var pathMatched = 'path' in config && config.path === $route.path;
        var nameMatched = 'name' in config && config.name === $route.name;
        return pathMatched || nameMatched;
      }

      return (props.name || index.value) === modelValue;
    });

    var onClick = event => {
      var _props$name;

      parent.setActive((_props$name = props.name) != null ? _props$name : index.value);
      emit('click', event);
      route();
    };

    var renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }

      if (props.icon) {
        return (0, _vue.createVNode)(_icon.Icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };

    return () => {
      var {
        dot,
        badge
      } = props;
      var {
        activeColor,
        inactiveColor
      } = parent.props;
      var color = active.value ? activeColor : inactiveColor;
      return (0, _vue.createVNode)("div", {
        "class": bem({
          active: active.value
        }),
        "style": {
          color
        },
        "onClick": onClick
      }, [(0, _vue.createVNode)(_badge.Badge, {
        "dot": dot,
        "content": badge,
        "class": bem('icon')
      }, {
        default: renderIcon
      }), (0, _vue.createVNode)("div", {
        "class": bem('text')
      }, [slots.default == null ? void 0 : slots.default({
        active: active.value
      })])]);
    };
  }

});

exports.default = _default;