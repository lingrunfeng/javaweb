import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from 'vue';
import { isDef, truthProp, numericProp, createNamespace } from '../utils';
import { Badge } from '../badge';
var [name, bem] = createNamespace('tab');
export default defineComponent({
  name,
  props: {
    dot: Boolean,
    type: String,
    color: String,
    title: String,
    badge: numericProp,
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    renderTitle: Function,
    inactiveColor: String,
    showZeroBadge: truthProp
  },

  setup(props) {
    var style = computed(() => {
      var style = {};
      var {
        type,
        color,
        disabled,
        isActive,
        activeColor,
        inactiveColor
      } = props;
      var isCard = type === 'card'; // card theme color

      if (color && isCard) {
        style.borderColor = color;

        if (!disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      var titleColor = isActive ? activeColor : inactiveColor;

      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    });

    var renderText = () => {
      var Text = _createVNode("span", {
        "class": bem('text', {
          ellipsis: !props.scrollable
        })
      }, [props.renderTitle ? props.renderTitle() : props.title]);

      if (props.dot || isDef(props.badge) && props.badge !== '') {
        return _createVNode(Badge, {
          "dot": props.dot,
          "content": props.badge,
          "showZero": props.showZeroBadge
        }, {
          default: () => [Text]
        });
      }

      return Text;
    };

    return () => _createVNode("div", {
      "role": "tab",
      "class": [bem({
        active: props.isActive,
        disabled: props.disabled
      })],
      "style": style.value,
      "aria-selected": props.isActive
    }, [renderText()]);
  }

});