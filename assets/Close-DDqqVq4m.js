import{A as e,E as t,O as n,ft as r}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";import{F as i,P as a,R as o,d as s,z as c}from"./light-0W8G4X_Y.js";import{t as l}from"./use-style-ZyQpLKU3.js";import{t as u}from"./toString-CpwAXpnz.js";import{t as d}from"./_hasUnicode-CIoN4jo-.js";function f(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),n=n>i?i:n,n<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var a=Array(i);++r<i;)a[r]=e[r+t];return a}function p(e,t,n){var r=e.length;return n=n===void 0?r:n,!t&&n>=r?e:f(e,t,n)}function m(e){return e.split(``)}var h=`\\ud800-\\udfff`,g=`\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff`,_=`\\ufe0e\\ufe0f`,v=`[`+h+`]`,y=`[`+g+`]`,b=`\\ud83c[\\udffb-\\udfff]`,x=`(?:`+y+`|`+b+`)`,S=`[^`+h+`]`,C=`(?:\\ud83c[\\udde6-\\uddff]){2}`,w=`[\\ud800-\\udbff][\\udc00-\\udfff]`,T=`\\u200d`,E=x+`?`,D=`[`+_+`]?`,O=`(?:`+T+`(?:`+[S,C,w].join(`|`)+`)`+D+E+`)*`,k=D+E+O,A=`(?:`+[S+y+`?`,y,C,w,v].join(`|`)+`)`,j=RegExp(b+`(?=`+b+`)|`+A+k,`g`);function M(e){return e.match(j)||[]}function N(e){return d(e)?M(e):m(e)}function P(e){return function(t){t=u(t);var n=d(t)?N(t):void 0,r=n?n[0]:t.charAt(0),i=n?p(n,1).join(``):t.slice(1);return r[e]()+i}}var F=P(`toUpperCase`),I=i(`base-icon`,`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[a(`svg`,`
 height: 1em;
 width: 1em;
 `)]),L=t({name:`BaseIcon`,props:{role:String,ariaLabel:String,ariaDisabled:{type:Boolean,default:void 0},ariaHidden:{type:Boolean,default:void 0},clsPrefix:{type:String,required:!0},onClick:Function,onMousedown:Function,onMouseup:Function},setup(e){l(`-base-icon`,I,r(e,`clsPrefix`))},render(){return n(`i`,{class:`${this.clsPrefix}-base-icon`,onClick:this.onClick,onMousedown:this.onMousedown,onMouseup:this.onMouseup,role:this.role,"aria-label":this.ariaLabel,"aria-hidden":this.ariaHidden,"aria-disabled":this.ariaDisabled},this.$slots)}});function R(r,i){let a=t({render(){return i()}});return t({name:F(r),setup(){let t=e(s,null)?.mergedIconsRef;return()=>{let e=t?.value?.[r];return e?e():n(a,null)}}})}var z=R(`close`,()=>n(`svg`,{viewBox:`0 0 12 12`,version:`1.1`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":!0},n(`g`,{stroke:`none`,"stroke-width":`1`,fill:`none`,"fill-rule":`evenodd`},n(`g`,{fill:`currentColor`,"fill-rule":`nonzero`},n(`path`,{d:`M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z`}))))),B=i(`base-close`,`
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`,[o(`absolute`,`
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `),a(`&::before`,`
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `),c(`disabled`,[a(`&:hover`,`
 color: var(--n-close-icon-color-hover);
 `),a(`&:hover::before`,`
 background-color: var(--n-close-color-hover);
 `),a(`&:focus::before`,`
 background-color: var(--n-close-color-hover);
 `),a(`&:active`,`
 color: var(--n-close-icon-color-pressed);
 `),a(`&:active::before`,`
 background-color: var(--n-close-color-pressed);
 `)]),o(`disabled`,`
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `),o(`round`,[a(`&::before`,`
 border-radius: 50%;
 `)])]),V=t({name:`BaseClose`,props:{isButtonTag:{type:Boolean,default:!0},clsPrefix:{type:String,required:!0},disabled:{type:Boolean,default:void 0},focusable:{type:Boolean,default:!0},round:Boolean,onClick:Function,absolute:Boolean},setup(e){return l(`-base-close`,B,r(e,`clsPrefix`)),()=>{let{clsPrefix:t,disabled:r,absolute:i,round:a,isButtonTag:o}=e;return n(o?`button`:`div`,{type:o?`button`:void 0,tabindex:r||!e.focusable?-1:0,"aria-disabled":r,"aria-label":`close`,role:o?void 0:`button`,disabled:r,class:[`${t}-base-close`,i&&`${t}-base-close--absolute`,r&&`${t}-base-close--disabled`,a&&`${t}-base-close--round`],onMousedown:t=>{e.focusable||t.preventDefault()},onClick:e.onClick},n(L,{clsPrefix:t},{default:()=>n(z,null)}))}}});export{F as a,L as i,z as n,R as r,V as t};