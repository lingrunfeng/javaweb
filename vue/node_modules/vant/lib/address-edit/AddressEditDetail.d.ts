import { PropType } from 'vue';
import type { AddressEditSearchItem } from './types';
declare const _default: import("vue").DefineComponent<{
    show: BooleanConstructor;
    value: StringConstructor;
    focused: BooleanConstructor;
    detailRows: (NumberConstructor | StringConstructor)[];
    searchResult: PropType<AddressEditSearchItem[]>;
    errorMessage: StringConstructor;
    detailMaxlength: (NumberConstructor | StringConstructor)[];
    showSearchResult: BooleanConstructor;
}, () => JSX.Element | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "focus" | "blur" | "select-search")[], "input" | "focus" | "blur" | "select-search", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    show?: unknown;
    value?: unknown;
    focused?: unknown;
    detailRows?: unknown;
    searchResult?: unknown;
    errorMessage?: unknown;
    detailMaxlength?: unknown;
    showSearchResult?: unknown;
} & {
    focused: boolean;
    show: boolean;
    showSearchResult: boolean;
} & {
    value?: string | undefined;
    errorMessage?: string | undefined;
    searchResult?: AddressEditSearchItem[] | undefined;
    detailRows?: string | number | undefined;
    detailMaxlength?: string | number | undefined;
}> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    "onSelect-search"?: ((...args: any[]) => any) | undefined;
}, {
    focused: boolean;
    show: boolean;
    showSearchResult: boolean;
}>;
export default _default;
