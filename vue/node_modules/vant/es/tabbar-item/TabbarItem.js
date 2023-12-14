import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
import { computed, defineComponent, getCurrentInstance } from 'vue'; // Utils

import { createNamespace, extend, isObject, numericProp } from '../utils';
import { TABBAR_KEY } from '../tabbar/Tabbar'; // Composables

import { useParent } from '@vant/use';
import { routeProps, useRoute } from '../composables/use-route'; // Components

import { Icon } from '../icon';
import { Badge } from '../badge';
var [name, bem] = createNamespace('tabbar-item');
var tabbarItemProps = extend({}, routeProps, {
  dot: Boolean,
  icon: String,
  name: numericProp,
  badge: numericProp,
  iconPrefix: String
});
export default defineComponent({
  name,
  props: tabbarItemProps,
  emits: ['click'],

  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var route = useRoute();
    var vm = getCurrentInstance().proxy;
    var {
      parent,
      index
    } = useParent(TABBAR_KEY);

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <TabbarItem> must be a child component of <Tabbar>.');
      }

      return;
    }

    var active = computed(() => {
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
        var config = isObject(to) ? to : {
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
        return _createVNode(Icon, {
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
      return _createVNode("div", {
        "class": bem({
          active: active.value
        }),
        "style": {
          color
        },
        "onClick": onClick
      }, [_createVNode(Badge, {
        "dot": dot,
        "content": badge,
        "class": bem('icon')
      }, {
        default: renderIcon
      }), _createVNode("div", {
        "class": bem('text')
      }, [slots.default == null ? void 0 : slots.default({
        active: active.value
      })])]);
    };
  }

});