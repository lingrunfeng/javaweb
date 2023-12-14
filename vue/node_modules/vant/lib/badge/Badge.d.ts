import { PropType, ExtractPropTypes } from 'vue';
declare const badgeProps: {
    dot: BooleanConstructor;
    max: (NumberConstructor | StringConstructor)[];
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    color: StringConstructor;
    offset: PropType<[string | number, string | number]>;
    content: (NumberConstructor | StringConstructor)[];
    showZero: {
        type: BooleanConstructor;
        default: true;
    };
};
export declare type BadgeProps = ExtractPropTypes<typeof badgeProps>;
declare const _default: import("vue").DefineComponent<{
    dot: BooleanConstructor;
    max: (NumberConstructor | StringConstructor)[];
    tag: {
        type: PropType<keyof HTMLElementTagNameMap>;
        default: keyof HTMLElementTagNameMap;
    };
    color: StringConstructor;
    offset: PropType<[string | number, string | number]>;
    content: (NumberConstructor | StringConstructor)[];
    showZero: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    dot?: unknown;
    max?: unknown;
    tag?: unknown;
    color?: unknown;
    offset?: unknown;
    content?: unknown;
    showZero?: unknown;
} & {
    dot: boolean;
    tag: keyof HTMLElementTagNameMap;
    showZero: boolean;
} & {
    max?: string | number | undefined;
    color?: string | undefined;
    offset?: [string | number, string | number] | undefined;
    content?: string | number | undefined;
}>, {
    dot: boolean;
    tag: keyof HTMLElementTagNameMap;
    showZero: boolean;
}>;
export default _default;
