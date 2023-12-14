import { extend } from '../utils';
import { pickerSharedProps } from '../picker/Picker';
export var sharedProps = extend({}, pickerSharedProps, {
  filter: Function,
  columnsOrder: Array,
  formatter: {
    type: Function,
    default: (type, value) => value
  }
});
export var pickerInheritKeys = Object.keys(pickerSharedProps);
export function times(n, iteratee) {
  var index = -1;
  var result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
export function getTrueValue(value) {
  if (!value) {
    return 0;
  }

  while (Number.isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }

  return parseInt(value, 10);
}
export var getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();