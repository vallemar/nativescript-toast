import { CoreTypes, getRootLayout, View, Screen } from "@nativescript/core";
import { createApp, createNativeView } from "nativescript-vue";
import Player from "~/components/rootLayout/Player.vue";

const DEFAULT_ANIMATION_CURVE = CoreTypes.AnimationCurve.cubicBezier(0.17, 0.89, 0.24, 1.11);
const ROOT_LAYOUT_OPTIONS = {
    shadeCover: {
        color: '#282C34',
        opacity: 0.7,
        tapToClose: true,
    },

};

export const useRootLayout = () => {

    const showPlayer = (props?: any) => {
        const nsView = createNativeView(Player, props).mount()
        getRootLayout()
            .open(nsView, {
                ...ROOT_LAYOUT_OPTIONS, animation: {
                    enterFrom: {
                        translateY: -250,
                        duration: 500,
                        curve: DEFAULT_ANIMATION_CURVE,
                    },
                    exitTo: {
                        translateY: - Screen.mainScreen.heightDIPs / 1.2,
                        duration: 1000,
                        curve: DEFAULT_ANIMATION_CURVE,
                    },
                }
            })
    }

    const showMessage = (component: any, options?: { rootLayoutOptions?: any, props?: any }) => {
        const nsView = createNativeView(component, options?.props).mount()
        getRootLayout()
            .open(nsView, {
                ...options?.rootLayoutOptions, ...{
                    animation: {
                        enterFrom: {
                            translateX: -250,
                            duration: 600,
                            curve: DEFAULT_ANIMATION_CURVE,
                        },
                        exitTo: {
                            translateX: -Screen.mainScreen.widthPixels / 1.5,
                            duration: 600,
                            curve: DEFAULT_ANIMATION_CURVE,
                        },
                    }
                }
            })
    }

    return {
        showPlayer,
        showMessage
    }
}