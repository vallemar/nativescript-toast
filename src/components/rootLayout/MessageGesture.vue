<script lang="ts" setup>
import {
   GestureHandlerStateEvent as NSGestureHandlerStateEvent,
   GestureHandlerTouchEvent as NSGestureHandlerTouchEvent,
   GestureStateEventData as NSGestureStateEventData,
   GestureTouchEventData as NSGestureTouchEventData,
   HandlerType as NSHandlerType,
   Manager as NSManager,
   GestureState
} from '@nativescript-community/gesturehandler';
import { View, Screen, getRootLayout } from '@nativescript/core';
import { ref, toRaw } from 'nativescript-vue';
import Message from "./Message.vue"

const viewRef = ref();

const loaded = (args: { object: View }) => {
   const manager = NSManager.getInstance();
   const gestureHandler = manager.createGestureHandler(NSHandlerType.PAN, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
   gestureHandler.on(NSGestureHandlerTouchEvent, onGestureTouch as () => void);
   gestureHandler.on(NSGestureHandlerStateEvent, onGestureState as () => void);
   gestureHandler.attachToView(args.object)

   args.object.on("unloaded", () => {
      gestureHandler.detachFromView();
   })
};

function onGestureTouch(args: NSGestureTouchEventData) {
   const { state, extraData, view } = args.data;
   if (view && state !== GestureState.END) {
      view.translateX = extraData.translationX;
   }
}

function onGestureState(args: NSGestureStateEventData) {
   const { state, prevState, extraData, view } = args.data;
   if (state === GestureState.END) {
      const view: View = toRaw(viewRef.value.nativeView);
      const limitOffset = Screen.mainScreen.widthDIPs / 2;
      if (
         extraData.translationX >= limitOffset ||
         extraData.translationX <= -limitOffset
      ) {
         getRootLayout().close(view)
      } else {
         view.animate({
            translate: {
               y: 0, x: 0
            }
         })
      }
   }
}

</script>
<template>
   <StackLayout verticalAlignment="top" ref="viewRef" @loaded="loaded">
      <Message>
      </Message>
   </StackLayout>
</template>