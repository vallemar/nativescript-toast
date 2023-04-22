
<script lang="ts" setup>
import { View, getRootLayout } from '@nativescript/core';
import { onMounted, ref, toRaw } from 'nativescript-vue';

const props = defineProps({ hasTimer: Boolean });
const timer = ref(0);
const viewRef = ref();
let interval: any = null;

if (props.hasTimer) {
   onMounted(() => {
      const view: View = toRaw(viewRef.value.nativeView);
      view.on("unloaded", () => {
         clearInterval(interval);
      })
   })
   setTimeout(() => {
      interval = setInterval(() => {
         timer.value = timer.value + 0.8;
         if (timer.value > 100) {
            getRootLayout().close(toRaw(viewRef.value.nativeView) as View);
         }
      }, 10)
   }, 500);
}
</script>
<template>
   <StackLayout verticalAlignment="top" class="p-2" ref="viewRef">
      <StackLayout class="rounded-lg items-center bg-white">
         <GridLayout rows="auto, auto" columns="55, *" class="p-3">
            <ContentView col="0" rowSpan="2">
               <Image
                  src="https://images.unsplash.com/photo-1492681290082-e932832941e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                  class="h-[55] w-[55] rounded-full" stretch="aspectFill"></Image>
            </ContentView>

            <Label col="1" text="New Message" class=" text-sm text-black text-right"></Label>
            <Label col="1" text="Vallemar" class="text-xl text-black ml-2"></Label>
            <Label col="1" row="1" text="Yes! NativeScript is amazing! ⚡" class="text-lg mt-1  ml-2"></Label>
         </GridLayout>
         <StackLayout colSpan="2" row="1" verticalAlignment="bottom" horizontalAlignment="left" :width="`${timer}%`"
            height="5" backgroundColor="#19e68c" class="rounded-full"></StackLayout>
      </StackLayout>
   </StackLayout>
</template>