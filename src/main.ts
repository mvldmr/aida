import './style.scss'
import { setupAnimation } from './setAnimation'
import {setupFixedAnimation} from "./fixedAnimation";

onPageLoaded(() => {
	setupAnimation(Array.prototype.slice.call(document.querySelectorAll('.anim')));
	setupFixedAnimation(Array.prototype.slice.call(document.querySelectorAll('.fix-anim-wrapper')));
})

function onPageLoaded(cb:Function) {
	document.readyState === 'complete' ? cb() : window.addEventListener('load', function() {cb()});
}
