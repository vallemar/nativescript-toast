import { createApp } from 'nativescript-vue';
import Home from './components/Home.vue';

import { install } from "@nativescript-community/gesturehandler";
install();

createApp(Home).start();
