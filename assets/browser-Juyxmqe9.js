import{A as e,E as t,I as n,O as r,U as i,_ as a,ft as o,n as s}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";import{F as c,L as l,P as u,a as d}from"./light-0W8G4X_Y.js";import{n as f}from"./format-length-qKueeI8s.js";import{a as p}from"./warn-CDw-QQMW.js";import{t as m}from"./is-browser-SyEDb2mQ.js";import{t as h}from"./use-style-ZyQpLKU3.js";var g=p(`n-form-item`);function _(t,{defaultSize:r=`medium`,mergedSize:o,mergedDisabled:s}={}){let c=e(g,null);i(g,null);let l=a(o?()=>o(c):()=>{let{size:e}=t;if(e)return e;if(c){let{mergedSize:e}=c;if(e.value!==void 0)return e.value}return r}),u=a(s?()=>s(c):()=>{let{disabled:e}=t;return e===void 0?c?c.disabled.value:!1:e}),d=a(()=>{let{status:e}=t;return e||c?.mergedValidationStatus.value});return n(()=>{c&&c.restoreValidation()}),{mergedSizeRef:l,mergedDisabledRef:u,mergedStatusRef:d,nTriggerFormBlur(){c&&c.handleContentBlur()},nTriggerFormChange(){c&&c.handleContentChange()},nTriggerFormFocus(){c&&c.handleContentFocus()},nTriggerFormInput(){c&&c.handleContentInput()}}}var v=t({name:`BaseIconSwitchTransition`,setup(e,{slots:t}){let n=f();return()=>r(s,{name:`icon-switch-transition`,appear:n.value},t)}}),{cubicBezierEaseInOut:y}=d;function b({originalTransform:e=``,left:t=0,top:n=0,transition:r=`all .3s ${y} !important`}={}){return[u(`&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to`,{transform:`${e} scale(0.75)`,left:t,top:n,opacity:0}),u(`&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from`,{transform:`scale(1) ${e}`,left:t,top:n,opacity:1}),u(`&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active`,{transformOrigin:`center`,position:`absolute`,left:t,top:n,transition:r})]}var x=u([u(`@keyframes rotator`,`
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`),c(`base-loading`,`
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `,[l(`transition-wrapper`,`
 position: absolute;
 width: 100%;
 height: 100%;
 `,[b()]),l(`placeholder`,`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[b({left:`50%`,top:`50%`,originalTransform:`translateX(-50%) translateY(-50%)`})]),l(`container`,`
 animation: rotator 3s linear infinite both;
 `,[l(`icon`,`
 height: 1em;
 width: 1em;
 `)])])]),S=`1.6s`,C={strokeWidth:{type:Number,default:28},stroke:{type:String,default:void 0},scale:{type:Number,default:1},radius:{type:Number,default:100}},w=t({name:`BaseLoading`,props:Object.assign({clsPrefix:{type:String,required:!0},show:{type:Boolean,default:!0}},C),setup(e){h(`-base-loading`,x,o(e,`clsPrefix`))},render(){let{clsPrefix:e,radius:t,strokeWidth:n,stroke:i,scale:a}=this,o=t/a;return r(`div`,{class:`${e}-base-loading`,role:`img`,"aria-label":`loading`},r(v,null,{default:()=>this.show?r(`div`,{key:`icon`,class:`${e}-base-loading__transition-wrapper`},r(`div`,{class:`${e}-base-loading__container`},r(`svg`,{class:`${e}-base-loading__icon`,viewBox:`0 0 ${2*o} ${2*o}`,xmlns:`http://www.w3.org/2000/svg`,style:{color:i}},r(`g`,null,r(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${o} ${o};270 ${o} ${o}`,begin:`0s`,dur:S,fill:`freeze`,repeatCount:`indefinite`}),r(`circle`,{class:`${e}-base-loading__icon`,fill:`none`,stroke:`currentColor`,"stroke-width":n,"stroke-linecap":`round`,cx:o,cy:o,r:t-n/2,"stroke-dasharray":5.67*t,"stroke-dashoffset":18.48*t},r(`animateTransform`,{attributeName:`transform`,type:`rotate`,values:`0 ${o} ${o};135 ${o} ${o};450 ${o} ${o}`,begin:`0s`,dur:S,fill:`freeze`,repeatCount:`indefinite`}),r(`animate`,{attributeName:`stroke-dashoffset`,values:`${5.67*t};${1.42*t};${5.67*t}`,begin:`0s`,dur:S,fill:`freeze`,repeatCount:`indefinite`})))))):r(`div`,{key:`placeholder`,class:`${e}-base-loading__placeholder`},this.$slots)}))}}),T=m&&`chrome`in window;m&&navigator.userAgent.includes(`Firefox`);var E=m&&navigator.userAgent.includes(`Safari`)&&!T;export{v as a,b as i,w as n,g as o,C as r,_ as s,E as t};