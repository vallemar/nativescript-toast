<script lang="ts" setup>
import { useRootLayout } from "~/useRootLayout";
import Message from "~/components/rootLayout/Message.vue";
import MessageGesture from "~/components/rootLayout/MessageGesture.vue";

const { showMessage, showPlayer } = useRootLayout();

const openMessage = () => showMessage(Message, {
  props: {
    hasTimer: true
  },
  rootLayoutOptions: {
    shadeCover: {
      opacity: 0,
      tapToClose: true,
    },
  }
})
const openMessageWithGesture = () => showMessage(MessageGesture);
const openPlayer = () => showPlayer();

</script>

<template>
  <Frame>
    <Page actionBarHidden="true" class="bg-[#202124]"
      androidStatusBarBackground="#202124">
      <RootLayout>
        <FlexboxLayout class="flex-col ">
          <FlexboxLayout class="h-[50%] items-center justify-center">
            <Label text="breakfast_dining" style="font-size: 68" class="m-icon-round text-[#19e68c] bg-[#19e68d27] p-14 rounded-full" />
          </FlexboxLayout>

          <FlexboxLayout class="px-4 flex-col justify-end h-[50%] mb-6">
            <FlexboxLayout class="btn" @tap="openPlayer">
                <Label text="Super Toast " />
                <Label text="bolt" class="m-icon-round text-black" />
              </FlexboxLayout>
              <FlexboxLayout class="btn" @tap="openMessageWithGesture">
                <Label text="Interactive Toast " />
                <Label text="swipe" class="m-icon-round text-black" />
              </FlexboxLayout>
              <FlexboxLayout class="btn" @tap="openMessage">
                <Label text="Toast with Timer " />
                <Label text="timer" class="m-icon-round text-black" />
              </FlexboxLayout>
            </FlexboxLayout>
        </FlexboxLayout>
      </RootLayout>
    </Page>
  </Frame>
</template>

<style lang="scss" scoped>
.btn {
  margin: 10;
  padding: 0 6;
  background-color: #19e68d27;
  border-radius: 50%;
  width: 100%;
  height: 50;
  text-align: center;
  justify-content: center;
  font-size: 18;
  color: #19e68c;
}
</style>
