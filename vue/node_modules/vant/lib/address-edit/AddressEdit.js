"use strict";

exports.__esModule = true;
exports.default = void 0;

var _vue = require("vue");

var _utils = require("../utils");

var _useExpose = require("../composables/use-expose");

var _area = require("../area");

var _cell = require("../cell");

var _field = require("../field");

var _popup = require("../popup");

var _toast = require("../toast");

var _button = require("../button");

var _switch = require("../switch");

var _AddressEditDetail = _interopRequireDefault(require("./AddressEditDetail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utils
// Composables
// Components
var [name, bem, t] = (0, _utils.createNamespace)('address-edit');
var DEFAULT_DATA = {
  name: '',
  tel: '',
  city: '',
  county: '',
  country: '',
  province: '',
  areaCode: '',
  isDefault: false,
  postalCode: '',
  addressDetail: ''
};

var isPostal = value => /^\d{6}$/.test(value);

var addressEditProps = {
  areaList: Object,
  isSaving: Boolean,
  isDeleting: Boolean,
  validator: Function,
  showArea: _utils.truthProp,
  showDetail: _utils.truthProp,
  showDelete: Boolean,
  showPostal: Boolean,
  disableArea: Boolean,
  searchResult: Array,
  telMaxlength: _utils.numericProp,
  showSetDefault: Boolean,
  saveButtonText: String,
  areaPlaceholder: String,
  deleteButtonText: String,
  showSearchResult: Boolean,
  detailRows: (0, _utils.makeNumericProp)(1),
  detailMaxlength: (0, _utils.makeNumericProp)(200),
  areaColumnsPlaceholder: (0, _utils.makeArrayProp)(),
  addressInfo: {
    type: Object,
    default: () => (0, _utils.extend)({}, DEFAULT_DATA)
  },
  telValidator: {
    type: Function,
    default: _utils.isMobile
  },
  postalValidator: {
    type: Function,
    default: isPostal
  }
};

var _default = (0, _vue.defineComponent)({
  name,
  props: addressEditProps,
  emits: ['save', 'focus', 'delete', 'click-area', 'change-area', 'change-detail', 'select-search', 'change-default'],

  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var areaRef = (0, _vue.ref)();
    var state = (0, _vue.reactive)({
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: '',
        name: '',
        areaCode: '',
        postalCode: '',
        addressDetail: ''
      }
    });
    var areaListLoaded = (0, _vue.computed)(() => (0, _utils.isObject)(props.areaList) && Object.keys(props.areaList).length);
    var areaText = (0, _vue.computed)(() => {
      var {
        country,
        province,
        city,
        county,
        areaCode
      } = state.data;

      if (areaCode) {
        var arr = [country, province, city, county];

        if (province && province === city) {
          arr.splice(1, 1);
        }

        return arr.filter(Boolean).join('/');
      }

      return '';
    }); // hide bottom field when use search && detail get focused

    var hideBottomFields = (0, _vue.computed)(() => {
      var _props$searchResult;

      return ((_props$searchResult = props.searchResult) == null ? void 0 : _props$searchResult.length) && state.detailFocused;
    });

    var assignAreaValues = () => {
      if (areaRef.value) {
        var detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        (0, _utils.extend)(state.data, detail);
      }
    };

    var onFocus = key => {
      state.errorInfo[key] = '';
      state.detailFocused = key === 'addressDetail';
      emit('focus', key);
    };

    var getErrorMessage = key => {
      var value = String(state.data[key] || '').trim();

      if (props.validator) {
        var message = props.validator(key, value);

        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : t('nameEmpty');

        case 'tel':
          return props.telValidator(value) ? '' : t('telInvalid');

        case 'areaCode':
          return value ? '' : t('areaEmpty');

        case 'addressDetail':
          return value ? '' : t('addressEmpty');

        case 'postalCode':
          return value && !props.postalValidator(value) ? t('postalEmpty') : '';
      }
    };

    var onSave = () => {
      var items = ['name', 'tel'];

      if (props.showArea) {
        items.push('areaCode');
      }

      if (props.showDetail) {
        items.push('addressDetail');
      }

      if (props.showPostal) {
        items.push('postalCode');
      }

      var isValid = items.every(item => {
        var msg = getErrorMessage(item);

        if (msg) {
          state.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !props.isSaving) {
        emit('save', state.data);
      }
    };

    var onChangeDetail = val => {
      state.data.addressDetail = val;
      emit('change-detail', val);
    };

    var onAreaConfirm = values => {
      values = values.filter(Boolean);

      if (values.some(value => !value.code)) {
        (0, _toast.Toast)(t('areaEmpty'));
        return;
      }

      state.showAreaPopup = false;
      assignAreaValues();
      emit('change-area', values);
    };

    var onDelete = () => emit('delete', state.data); // get values of area component


    var getArea = () => areaRef.value ? areaRef.value.getValues() : []; // set area code to area component


    var setAreaCode = code => {
      state.data.areaCode = code || '';

      if (code) {
        (0, _vue.nextTick)(assignAreaValues);
      }
    };

    var onDetailBlur = () => {
      // await for click search event
      setTimeout(() => {
        state.detailFocused = false;
      });
    };

    var setAddressDetail = value => {
      state.data.addressDetail = value;
    };

    var renderSetDefaultCell = () => {
      if (props.showSetDefault) {
        var _slots = {
          'right-icon': () => (0, _vue.createVNode)(_switch.Switch, {
            "modelValue": state.data.isDefault,
            "onUpdate:modelValue": $event => state.data.isDefault = $event,
            "size": "24",
            "onChange": event => emit('change-default', event)
          }, null)
        };
        return (0, _vue.withDirectives)((0, _vue.createVNode)(_cell.Cell, {
          "center": true,
          "title": t('defaultAddress'),
          "class": bem('default')
        }, _slots), [[_vue.vShow, !hideBottomFields.value]]);
      }

      return null;
    };

    (0, _useExpose.useExpose)({
      getArea,
      setAreaCode,
      setAddressDetail
    });
    (0, _vue.watch)(() => props.areaList, () => setAreaCode(state.data.areaCode));
    (0, _vue.watch)(() => props.addressInfo, value => {
      state.data = (0, _utils.extend)({}, DEFAULT_DATA, value);
      setAreaCode(value.areaCode);
    }, {
      deep: true,
      immediate: true
    });
    return () => {
      var {
        data,
        errorInfo
      } = state;
      var {
        disableArea
      } = props;
      return (0, _vue.createVNode)("div", {
        "class": bem()
      }, [(0, _vue.createVNode)("div", {
        "class": bem('fields')
      }, [(0, _vue.createVNode)(_field.Field, {
        "modelValue": data.name,
        "onUpdate:modelValue": $event => data.name = $event,
        "clearable": true,
        "label": t('name'),
        "placeholder": t('name'),
        "errorMessage": errorInfo.name,
        "onFocus": () => onFocus('name')
      }, null), (0, _vue.createVNode)(_field.Field, {
        "modelValue": data.tel,
        "onUpdate:modelValue": $event => data.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": t('tel'),
        "maxlength": props.telMaxlength,
        "placeholder": t('tel'),
        "errorMessage": errorInfo.tel,
        "onFocus": () => onFocus('tel')
      }, null), (0, _vue.withDirectives)((0, _vue.createVNode)(_field.Field, {
        "readonly": true,
        "label": t('area'),
        "is-link": !disableArea,
        "modelValue": areaText.value,
        "placeholder": props.areaPlaceholder || t('area'),
        "errorMessage": errorInfo.areaCode,
        "onFocus": () => onFocus('areaCode'),
        "onClick": () => {
          emit('click-area');
          state.showAreaPopup = !disableArea;
        }
      }, null), [[_vue.vShow, props.showArea]]), (0, _vue.createVNode)(_AddressEditDetail.default, {
        "show": props.showDetail,
        "value": data.addressDetail,
        "focused": state.detailFocused,
        "detailRows": props.detailRows,
        "errorMessage": errorInfo.addressDetail,
        "searchResult": props.searchResult,
        "detailMaxlength": props.detailMaxlength,
        "showSearchResult": props.showSearchResult,
        "onBlur": onDetailBlur,
        "onFocus": () => onFocus('addressDetail'),
        "onInput": onChangeDetail,
        "onSelect-search": event => emit('select-search', event)
      }, null), props.showPostal && (0, _vue.withDirectives)((0, _vue.createVNode)(_field.Field, {
        "modelValue": data.postalCode,
        "onUpdate:modelValue": $event => data.postalCode = $event,
        "type": "tel",
        "label": t('postal'),
        "maxlength": "6",
        "placeholder": t('postal'),
        "errorMessage": errorInfo.postalCode,
        "onFocus": () => onFocus('postalCode')
      }, null), [[_vue.vShow, !hideBottomFields.value]]), slots.default == null ? void 0 : slots.default()]), renderSetDefaultCell(), (0, _vue.withDirectives)((0, _vue.createVNode)("div", {
        "class": bem('buttons')
      }, [(0, _vue.createVNode)(_button.Button, {
        "block": true,
        "round": true,
        "type": "danger",
        "text": props.saveButtonText || t('save'),
        "class": bem('button'),
        "loading": props.isSaving,
        "onClick": onSave
      }, null), props.showDelete && (0, _vue.createVNode)(_button.Button, {
        "block": true,
        "round": true,
        "class": bem('button'),
        "loading": props.isDeleting,
        "text": props.deleteButtonText || t('delete'),
        "onClick": onDelete
      }, null)]), [[_vue.vShow, !hideBottomFields.value]]), (0, _vue.createVNode)(_popup.Popup, {
        "show": state.showAreaPopup,
        "onUpdate:show": $event => state.showAreaPopup = $event,
        "round": true,
        "teleport": "body",
        "position": "bottom",
        "lazyRender": false
      }, {
        default: () => [(0, _vue.createVNode)(_area.Area, {
          "ref": areaRef,
          "value": data.areaCode,
          "loading": !areaListLoaded.value,
          "areaList": props.areaList,
          "columnsPlaceholder": props.areaColumnsPlaceholder,
          "onConfirm": onAreaConfirm,
          "onCancel": () => {
            state.showAreaPopup = false;
          }
        }, null)]
      })]);
    };
  }

});

exports.default = _default;