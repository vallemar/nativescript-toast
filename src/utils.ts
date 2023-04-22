import { Utils, Image, isIOS, isAndroid } from "@nativescript/core";


export function renderBlur(image: Image, value: number) {
    if (isIOS) {
        const uiView: UIView = image.ios;
        const effect = UIBlurEffect.effectWithStyle(UIBlurEffectStyle.Dark);
        const effectView = UIVisualEffectView.alloc().initWithEffect(effect);
        effectView.frame = uiView.bounds;
        effectView.autoresizingMask =
            UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        effectView.alpha = value / 100;
        Utils.ios.collections
            .nsArrayToJSArray(uiView.subviews)
            .forEach(
                (blur) =>
                    blur instanceof UIVisualEffectView && blur.removeFromSuperview()
            );
        uiView.addSubview(effectView);
    } else if (isAndroid) {
        const imageView: android.widget.ImageView = image.android;
        //@ts-ignore
        const blurEffect = android.graphics.RenderEffect.createBlurEffect(
            value,
            value,
            android.graphics.Shader.TileMode.CLAMP
        );
        //@ts-ignore
        imageView.setRenderEffect(blurEffect);
    }
}