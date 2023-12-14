declare const _default: import("vue").DefineComponent<{
    dot: BooleanConstructor;
    type: StringConstructor;
    color: StringConstructor;
    title: StringConstructor;
    badge: (NumberConstructor | StringConstructor)[];
    isActive: BooleanConstructor;
    disabled: BooleanConstructor;
    scrollable: BooleanConstructor;
    activeColor: StringConstructor;
    renderTitle: FunctionConstructor;
    inactiveColor: StringConstructor;
    showZeroBadge: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("@vue/runtime-core").ComponentCustomProps, Readonly<{
    dot?: unknown;
    type?: unknown;
    color?: unknown;
    title?: unknown;
    badge?: unknown;
    isActive?: unknown;
    disabled?: unknown;
    scrollable?: unknown;
    activeColor?: unknown;
    renderTitle?: unknown;
    inactiveColor?: unknown;
    showZeroBadge?: unknown;
} & {
    dot: boolean;
    disabled: boolean;
    isActive: boolean;
    scrollable: boolean;
    showZeroBadge: boolean;
} & {
    type?: string | undefined;
    badge?: string | number | undefined;
    title?: string | undefined;
    color?: string | undefined;
    activeColor?: string | undefined;
    inactiveColor?: string | undefined;
    renderTitle?: Function | undefined;
}>, {
    dot: boolean;
    disabled: boolean;
    isActive: boolean;
    scrollable: boolean;
    showZeroBadge: boolean;
}>;
export default _default;
