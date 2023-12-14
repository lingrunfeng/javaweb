import { createVNode as _createVNode } from "vue";
import { computed, watch, defineComponent } from 'vue';
import { BORDER, makeStringProp, makeNumberProp, makeNumericProp, createNamespace } from '../utils';
var [name, bem, t] = createNamespace('pagination');

var makePage = (number, text, active) => ({
  number,
  text,
  active
});

var paginationProps = {
  mode: makeStringProp('multi'),
  prevText: String,
  nextText: String,
  pageCount: makeNumericProp(0),
  modelValue: makeNumberProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: makeNumericProp(10),
  forceEllipses: Boolean
};
export default defineComponent({
  name,
  props: paginationProps,
  emits: ['change', 'update:modelValue'],

  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var count = computed(() => {
      var {
        pageCount,
        totalItems,
        itemsPerPage
      } = props;
      var count = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count);
    });
    var pages = computed(() => {
      var items = [];
      var pageCount = count.value;
      var showPageSize = +props.showPageSize;
      var {
        modelValue,
        forceEllipses
      } = props;

      if (props.mode !== 'multi') {
        return items;
      } // Default page limits


      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = showPageSize < pageCount; // recompute if showPageSize

      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1; // Adjust if limit is exceeded

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      } // Add page number links


      for (var number = startPage; number <= endPage; number++) {
        var page = makePage(number, number, number === modelValue);
        items.push(page);
      } // Add links to move between page sets


      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          var prevPages = makePage(startPage - 1, '...');
          items.unshift(prevPages);
        }

        if (endPage < pageCount) {
          var nextPages = makePage(endPage + 1, '...');
          items.push(nextPages);
        }
      }

      return items;
    });

    var select = (page, emitChange) => {
      page = Math.min(count.value, Math.max(1, page));

      if (props.modelValue !== page) {
        emit('update:modelValue', page);

        if (emitChange) {
          emit('change', page);
        }
      }
    };

    watch(() => props.modelValue, value => {
      select(value);
    }, {
      immediate: true
    });

    var renderDesc = () => {
      if (props.mode !== 'multi') {
        return _createVNode("li", {
          "class": bem('page-desc')
        }, [slots.pageDesc ? slots.pageDesc() : props.modelValue + "/" + count.value]);
      }
    };

    return () => {
      var value = props.modelValue;
      var simple = props.mode !== 'multi';

      var onSelect = value => () => select(value, true);

      return _createVNode("ul", {
        "class": bem({
          simple
        })
      }, [_createVNode("li", {
        "class": [bem('item', {
          disabled: value === 1
        }), bem('prev'), BORDER],
        "onClick": onSelect(value - 1)
      }, [slots['prev-text'] ? slots['prev-text']() : props.prevText || t('prev')]), pages.value.map(page => _createVNode("li", {
        "class": [bem('item', {
          active: page.active
        }), bem('page'), BORDER],
        "onClick": onSelect(page.number)
      }, [slots.page ? slots.page(page) : page.text])), renderDesc(), _createVNode("li", {
        "class": [bem('item', {
          disabled: value === count.value
        }), bem('next'), BORDER],
        "onClick": onSelect(value + 1)
      }, [slots['next-text'] ? slots['next-text']() : props.nextText || t('next')])]);
    };
  }

});