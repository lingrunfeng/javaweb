/**
 * Vue Router support
 */
import { PropType, ExtractPropTypes, ComponentPublicInstance } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
export declare const routeProps: {
    to: PropType<RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
};
export declare type RouteProps = ExtractPropTypes<typeof routeProps>;
export declare function route(vm: ComponentPublicInstance<RouteProps>): void;
export declare function useRoute(): () => void;
