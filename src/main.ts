import './style.scss'
import { setupAnimation } from './setAnimation'
import {setupFixedAnimation} from "./fixedAnimation";

setupAnimation(Array.prototype.slice.call(document.querySelectorAll('.anim')));
setupFixedAnimation(Array.prototype.slice.call(document.querySelectorAll('.fix-anim-wrapper')));
