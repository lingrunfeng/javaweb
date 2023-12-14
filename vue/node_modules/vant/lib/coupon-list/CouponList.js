"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _useRefs = require("../composables/use-refs");

var _tab = require("../tab");

var _tabs = require("../tabs");

var _field = require("../field");

var _button = require("../button");

var _coupon = require("../coupon");

// Utils
// Composables
// Components
var [name, bem, t] = (0, _utils.createNamespace)('coupon-list');
var EMPTY_IMAGE = 'https://img.yzcdn.cn/vant/coupon-empty.png';
var couponListProps = {
  code: (0, _utils.makeStringProp)(''),
  coupons: (0, _utils.makeArrayProp)(),
  currency: (0, _utils.makeStringProp)('¥'),
  showCount: _utils.truthProp,
  emptyImage: (0, _utils.makeStringProp)(EMPTY_IMAGE),
  chosenCoupon: (0, _utils.makeNumberProp)(-1),
  enabledTitle: String,
  disabledTitle: String,
  disabledCoupons: (0, _utils.makeArrayProp)(),
  showExchangeBar: _utils.truthProp,
  showCloseButton: _utils.truthProp,
  closeButtonText: String,
  inputPlaceholder: String,
  exchangeMinLength: (0, _utils.makeNumberProp)(1),
  exchangeButtonText: String,
  displayedCouponIndex: (0, _utils.makeNumberProp)(-1),
  exchangeButtonLoading: Boolean,
  exchangeButtonDisabled: Boolean
};

var _default = (0, _vue.defineComponent)({
  name,
  props: couponListProps,
  emits: ['change', 'exchange', 'update:code'],

  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var [couponRefs, setCouponRefs] = (0, _useRefs.useRefs)();
    var state = (0, _vue.reactive)({
      tab: 0,
      code: props.code
    });
    var buttonDisabled = (0, _vue.computed)(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !state.code || state.code.length < props.exchangeMinLength));

    var onExchange = () => {
      emit('exchange', state.code); // auto clear currentCode when not use v-model

      if (!props.code) {
        state.code = '';
      }
    };

    var scrollToCoupon = index => {
      (0, _vue.nextTick)(() => {
        if (couponRefs.value[index]) {
          couponRefs.value[index].scrollIntoView();
        }
      });
    };

    var renderEmpty = () => (0, _vue.createVNode)("div", {
      "class": bem('empty')
    }, [(0, _vue.createVNode)("img", {
      "src": props.emptyImage
    }, null), (0, _vue.createVNode)("p", null, [t('noCoupon')])]);

    var renderExchangeBar = () => {
      if (props.showExchangeBar) {
        return (0, _vue.createVNode)("div", {
          "class": bem('exchange-bar')
        }, [(0, _vue.createVNode)(_field.Field, {
          "modelValue": state.code,
          "onUpdate:modelValue": $event => state.code = $event,
          "clearable": true,
          "border": false,
          "class": bem('field'),
          "placeholder": props.inputPlaceholder || t('placeholder'),
          "maxlength": "20"
        }, null), (0, _vue.createVNode)(_button.Button, {
          "plain": true,
          "type": "danger",
          "class": bem('exchange'),
          "text": props.exchangeButtonText || t('exchange'),
          "loading": props.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };

    var renderCouponTab = () => {
      var _slots$listFooter;

      var {
        coupons
      } = props;
      var count = props.showCount ? " (" + coupons.length + ")" : '';
      var title = (props.enabledTitle || t('enable')) + count;
      return (0, _vue.createVNode)(_tab.Tab, {
        "title": title
      }, {
        default: () => [(0, _vue.createVNode)("div", {
          "class": bem('list', {
            'with-bar': props.showExchangeBar,
            'with-bottom': props.showCloseButton
          })
        }, [coupons.map((coupon, index) => (0, _vue.createVNode)(_coupon.Coupon, {
          "key": coupon.id,
          "ref": setCouponRefs(index),
          "coupon": coupon,
          "chosen": index === props.chosenCoupon,
          "currency": props.currency,
          "onClick": () => emit('change', index)
        }, null)), !coupons.length && renderEmpty(), (_slots$listFooter = slots['list-footer']) == null ? void 0 : _slots$listFooter.call(slots)])]
      });
    };

    var renderDisabledTab = () => {
      var _slots$disabledList;

      var {
        disabledCoupons
      } = props;
      var count = props.showCount ? " (" + disabledCoupons.length + ")" : '';
      var title = (props.disabledTitle || t('disabled')) + count;
      return (0, _vue.createVNode)(_tab.Tab, {
        "title": title
      }, {
        default: () => [(0, _vue.createVNode)("div", {
          "class": bem('list', {
            'with-bar': props.showExchangeBar,
            'with-bottom': props.showCloseButton
          })
        }, [disabledCoupons.map(coupon => (0, _vue.createVNode)(_coupon.Coupon, {
          "disabled": true,
          "key": coupon.id,
          "coupon": coupon,
          "currency": props.currency
        }, null)), !disabledCoupons.length && renderEmpty(), (_slots$disabledList = slots['disabled-list-footer']) == null ? void 0 : _slots$disabledList.call(slots)])]
      });
    };

    (0, _vue.watch)(() => props.code, value => {
      state.code = value;
    });
    (0, _vue.watch)(() => state.code, value => emit('update:code', value));
    (0, _vue.watch)(() => props.displayedCouponIndex, scrollToCoupon);
    (0, _vue.onMounted)(() => {
      scrollToCoupon(props.displayedCouponIndex);
    });
    return () => (0, _vue.createVNode)("div", {
      "class": bem()
    }, [renderExchangeBar(), (0, _vue.createVNode)(_tabs.Tabs, {
      "active": state.tab,
      "onUpdate:active": $event => state.tab = $event,
      "class": bem('tab'),
      "border": false
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), (0, _vue.createVNode)("div", {
      "class": bem('bottom')
    }, [(0, _vue.withDirectives)((0, _vue.createVNode)(_button.Button, {
      "round": true,
      "block": true,
      "type": "danger",
      "class": bem('close'),
      "text": props.closeButtonText || t('close'),
      "onClick": () => emit('change', -1)
    }, null), [[_vue.vShow, props.showCloseButton]])])]);
  }

});

exports.default = _default;