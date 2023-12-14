import { withDirectives as _withDirectives, vShow as _vShow, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
import { ref, watch, computed, nextTick, reactive, defineComponent } from 'vue'; // Utils

import { extend, isObject, isMobile, truthProp, numericProp, makeArrayProp, makeNumericProp, createNamespace } from '../utils'; // Composables

import { useExpose } from '../composables/use-expose'; // Components

import { Area } from '../area';
import { Cell } from '../cell';
import { Field } from '../field';
import { Popup } from '../popup';
import { Toast } from '../toast';
import { Button } from '../button';
import { Switch } from '../switch';
import AddressEditDetail from './AddressEditDetail'; // Types

var [name, bem, t] = createNamespace('address-edit');
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
  showArea: truthProp,
  showDetail: truthProp,
  showDelete: Boolean,
  showPostal: Boolean,
  disableArea: Boolean,
  searchResult: Array,
  telMaxlength: numericProp,
  showSetDefault: Boolean,
  saveButtonText: String,
  areaPlaceholder: String,
  deleteButtonText: String,
  showSearchResult: Boolean,
  detailRows: makeNumericProp(1),
  detailMaxlength: makeNumericProp(200),
  areaColumnsPlaceholder: makeArrayProp(),
  addressInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_DATA)
  },
  telValidator: {
    type: Function,
    default: isMobile
  },
  postalValidator: {
    type: Function,
    default: isPostal
  }
};
export default defineComponent({
  name,
  props: addressEditProps,
  emits: ['save', 'focus', 'delete', 'click-area', 'change-area', 'change-detail', 'select-search', 'change-default'],

  setup(props, _ref) {
    var {
      emit,
      slots
    } = _ref;
    var areaRef = ref();
    var state = reactive({
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
    var areaListLoaded = computed(() => isObject(props.areaList) && Object.keys(props.areaList).length);
    var areaText = computed(() => {
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

    var hideBottomFields = computed(() => {
      var _props$searchResult;

      return ((_props$searchResult = props.searchResult) == null ? void 0 : _props$searchResult.length) && state.detailFocused;
    });

    var assignAreaValues = () => {
      if (areaRef.value) {
        var detail = areaRef.value.getArea();
        detail.areaCode = detail.code;
        delete detail.code;
        extend(state.data, detail);
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
        Toast(t('areaEmpty'));
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
        nextTick(assignAreaValues);
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
          'right-icon': () => _createVNode(Switch, {
            "modelValue": state.data.isDefault,
            "onUpdate:modelValue": $event => state.data.isDefault = $event,
            "size": "24",
            "onChange": event => emit('change-default', event)
          }, null)
        };
        return _withDirectives(_createVNode(Cell, {
          "center": true,
          "title": t('defaultAddress'),
          "class": bem('default')
        }, _slots), [[_vShow, !hideBottomFields.value]]);
      }

      return null;
    };

    useExpose({
      getArea,
      setAreaCode,
      setAddressDetail
    });
    watch(() => props.areaList, () => setAreaCode(state.data.areaCode));
    watch(() => props.addressInfo, value => {
      state.data = extend({}, DEFAULT_DATA, value);
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
      return _createVNode("div", {
        "class": bem()
      }, [_createVNode("div", {
        "class": bem('fields')
      }, [_createVNode(Field, {
        "modelValue": data.name,
        "onUpdate:modelValue": $event => data.name = $event,
        "clearable": true,
        "label": t('name'),
        "placeholder": t('name'),
        "errorMessage": errorInfo.name,
        "onFocus": () => onFocus('name')
      }, null), _createVNode(Field, {
        "modelValue": data.tel,
        "onUpdate:modelValue": $event => data.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": t('tel'),
        "maxlength": props.telMaxlength,
        "placeholder": t('tel'),
        "errorMessage": errorInfo.tel,
        "onFocus": () => onFocus('tel')
      }, null), _withDirectives(_createVNode(Field, {
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
      }, null), [[_vShow, props.showArea]]), _createVNode(AddressEditDetail, {
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
      }, null), props.showPostal && _withDirectives(_createVNode(Field, {
        "modelValue": data.postalCode,
        "onUpdate:modelValue": $event => data.postalCode = $event,
        "type": "tel",
        "label": t('postal'),
        "maxlength": "6",
        "placeholder": t('postal'),
        "errorMessage": errorInfo.postalCode,
        "onFocus": () => onFocus('postalCode')
      }, null), [[_vShow, !hideBottomFields.value]]), slots.default == null ? void 0 : slots.default()]), renderSetDefaultCell(), _withDirectives(_createVNode("div", {
        "class": bem('buttons')
      }, [_createVNode(Button, {
        "block": true,
        "round": true,
        "type": "danger",
        "text": props.saveButtonText || t('save'),
        "class": bem('button'),
        "loading": props.isSaving,
        "onClick": onSave
      }, null), props.showDelete && _createVNode(Button, {
        "block": true,
        "round": true,
        "class": bem('button'),
        "loading": props.isDeleting,
        "text": props.deleteButtonText || t('delete'),
        "onClick": onDelete
      }, null)]), [[_vShow, !hideBottomFields.value]]), _createVNode(Popup, {
        "show": state.showAreaPopup,
        "onUpdate:show": $event => state.showAreaPopup = $event,
        "round": true,
        "teleport": "body",
        "position": "bottom",
        "lazyRender": false
      }, {
        default: () => [_createVNode(Area, {
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