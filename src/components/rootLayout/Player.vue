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
import { View, Screen, getRootLayout, isAndroid } from '@nativescript/core';
import { ref, toRaw } from 'nativescript-vue';
import { renderBlur } from "@/utils"

const viewRef = ref();
const snackRef = ref();
const modalRef = ref();
const imgRef = ref();

const loaded = (args: { object: View }) => {
   const manager = NSManager.getInstance();
   const gestureHandler = manager.createGestureHandler(NSHandlerType.PAN, Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
   gestureHandler.on(NSGestureHandlerTouchEvent, onGestureTouch as () => void);
   gestureHandler.on(NSGestureHandlerStateEvent, onGestureState as () => void);
   gestureHandler.attachToView(args.object)

   args.object.on("unloaded", () => {
      gestureHandler.detachFromView();
   })
   renderBlur(toRaw(imgRef.value.nativeView), isAndroid ? 15 : 80)
};

function onGestureTouch(args: NSGestureTouchEventData) {
   const { state, extraData, view } = args.data;
   if (view && state !== GestureState.END) {
      view.translateY = extraData.translationY;
   }
}

function onGestureState(args: NSGestureStateEventData) {
   const { state, prevState, extraData, view } = args.data;
   if (state === GestureState.END) {
      const view: View = toRaw(viewRef.value.nativeView);
      const viewModal: View = toRaw(modalRef.value.nativeView);
      const viewSnack: View = toRaw(snackRef.value.nativeView);
      const limitOffset = Screen.mainScreen.heightDIPs / 3;
      if (
         extraData.translationY >= limitOffset ||
         extraData.translationY <= -limitOffset
      ) {
         // Open
         const duration = 300;
         viewModal.hidden = false;
         viewSnack.height = 0;
         viewModal.animate({ opacity: 1, duration });
         view.animate({
            translate: {
               y: 100, x: 0
            },
            height: 700,
            duration
         }).then(() => {
            view.height = "auto";
         });
      } else if (extraData.translationY != 0 && extraData.translationY <= (view.getActualSize().height / 2)) {
         // Close
         getRootLayout().close(view)
      } else if (extraData.translationY != 0) {
         // Reset
         view.animate({ translate: { y: 0, x: 0 } });
      }
   }
}
</script>
<template>
   <StackLayout verticalAlignment="top" class="p-2 " ref="viewRef" @loaded="loaded">
      <FlexboxLayout class=" rounded-lg  flex-col" background="linear-gradient(to bottom, #800f1a, #bc1c2c, #540e15)">

         <GridLayout ref="snackRef" height="135" class="rounded-xl">
            <Image ref="imgRef" src="~/assets/Album.jpg" class="rounded-xl" stretch="aspectFill" width="200%" height="200%"
               ios:boxShadow="0 0 3 3 rgba(0,0,0,.7)" />
            <StackLayout class="ml-4 p-2">
               <Label text="Staroy" class="text-xl font-bold text-white"></Label>
               <Label text="The Weeknd, Daft Punk" class="text-lg text-white mt-1"></Label>
               <FlexboxLayout class="justify-center mt-4 items-center">
                  <Image src="~/assets/PreviousSong.png" class="h-[15]"></Image>
                  <Image src="~/assets/PlayButton.png" class="h-[40] mx-6"></Image>
                  <Image src="~/assets/NextSong.png" class="h-[15]"></Image>
               </FlexboxLayout>
            </StackLayout>
         </GridLayout>

         <FlexboxLayout ref="modalRef" class=" flex-col px-3 py-4" hidden="true" opacity="0">
            <FlexboxLayout class="justify-center">
               <ContentView class="rounded-lg">
                  <Image src="~/assets/Album.jpg" class="rounded-lg" ios:boxShadow="0 0 3 3 rgba(0,0,0,.7)"></Image>
               </ContentView>
            </FlexboxLayout>
            <Label text="Staroy" class="text-2xl text-white mt-2"></Label>
            <Label text="The Weeknd, Daft Punk" class="text-xl text-white mt-1"></Label>
            <Slider backgroundColor="white" color="white" value="10" minValue="0" maxValue="100" class="mt-3" />
            <FlexboxLayout class="justify-center mt-4 items-center">
               <Image src="~/assets/PreviousSong.png" class="h-[20]"></Image>
               <Image src="~/assets/PlayButton.png" class="h-[50] mx-6"></Image>
               <Image src="~/assets/NextSong.png" class="h-[20]"></Image>
            </FlexboxLayout>
         </FlexboxLayout>
      </FlexboxLayout>
   </StackLayout>
</template>