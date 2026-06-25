import{E as e,O as t,U as n,_ as r,ct as i,ft as a}from"./vue.runtime.esm-bundler-C5KGi-Jj.js";import{B as o,F as s,L as c,P as l,R as u,c as d,l as f,o as p,p as m,r as h,t as g,z as _}from"./light-0W8G4X_Y.js";import{r as v}from"./css-CmmnTnJ6.js";import{a as y}from"./warn-CDw-QQMW.js";import{n as b}from"./use-style-ZyQpLKU3.js";import{a as x,s as S}from"./resolve-slot-x2-pFq3y.js";import{t as C}from"./Close-DDqqVq4m.js";var w={closeIconSizeTiny:`12px`,closeIconSizeSmall:`12px`,closeIconSizeMedium:`14px`,closeIconSizeLarge:`14px`,closeSizeTiny:`16px`,closeSizeSmall:`16px`,closeSizeMedium:`18px`,closeSizeLarge:`18px`,padding:`0 7px`,closeMargin:`0 0 0 4px`};function T(e){let{textColor2:t,primaryColorHover:n,primaryColorPressed:r,primaryColor:i,infoColor:a,successColor:o,warningColor:s,errorColor:c,baseColor:l,borderColor:u,opacityDisabled:d,tagColor:f,closeIconColor:p,closeIconColorHover:h,closeIconColorPressed:g,borderRadiusSmall:_,fontSizeMini:v,fontSizeTiny:y,fontSizeSmall:b,fontSizeMedium:x,heightMini:S,heightTiny:C,heightSmall:T,heightMedium:E,closeColorHover:D,closeColorPressed:O,buttonColor2Hover:k,buttonColor2Pressed:A,fontWeightStrong:j}=e;return Object.assign(Object.assign({},w),{closeBorderRadius:_,heightTiny:S,heightSmall:C,heightMedium:T,heightLarge:E,borderRadius:_,opacityDisabled:d,fontSizeTiny:v,fontSizeSmall:y,fontSizeMedium:b,fontSizeLarge:x,fontWeightStrong:j,textColorCheckable:t,textColorHoverCheckable:t,textColorPressedCheckable:t,textColorChecked:l,colorCheckable:`#0000`,colorHoverCheckable:k,colorPressedCheckable:A,colorChecked:i,colorCheckedHover:n,colorCheckedPressed:r,border:`1px solid ${u}`,textColor:t,color:f,colorBordered:`rgb(250, 250, 252)`,closeIconColor:p,closeIconColorHover:h,closeIconColorPressed:g,closeColorHover:D,closeColorPressed:O,borderPrimary:`1px solid ${m(i,{alpha:.3})}`,textColorPrimary:i,colorPrimary:m(i,{alpha:.12}),colorBorderedPrimary:m(i,{alpha:.1}),closeIconColorPrimary:i,closeIconColorHoverPrimary:i,closeIconColorPressedPrimary:i,closeColorHoverPrimary:m(i,{alpha:.12}),closeColorPressedPrimary:m(i,{alpha:.18}),borderInfo:`1px solid ${m(a,{alpha:.3})}`,textColorInfo:a,colorInfo:m(a,{alpha:.12}),colorBorderedInfo:m(a,{alpha:.1}),closeIconColorInfo:a,closeIconColorHoverInfo:a,closeIconColorPressedInfo:a,closeColorHoverInfo:m(a,{alpha:.12}),closeColorPressedInfo:m(a,{alpha:.18}),borderSuccess:`1px solid ${m(o,{alpha:.3})}`,textColorSuccess:o,colorSuccess:m(o,{alpha:.12}),colorBorderedSuccess:m(o,{alpha:.1}),closeIconColorSuccess:o,closeIconColorHoverSuccess:o,closeIconColorPressedSuccess:o,closeColorHoverSuccess:m(o,{alpha:.12}),closeColorPressedSuccess:m(o,{alpha:.18}),borderWarning:`1px solid ${m(s,{alpha:.35})}`,textColorWarning:s,colorWarning:m(s,{alpha:.15}),colorBorderedWarning:m(s,{alpha:.12}),closeIconColorWarning:s,closeIconColorHoverWarning:s,closeIconColorPressedWarning:s,closeColorHoverWarning:m(s,{alpha:.12}),closeColorPressedWarning:m(s,{alpha:.18}),borderError:`1px solid ${m(c,{alpha:.23})}`,textColorError:c,colorError:m(c,{alpha:.1}),colorBorderedError:m(c,{alpha:.08}),closeIconColorError:c,closeIconColorHoverError:c,closeIconColorPressedError:c,closeColorHoverError:m(c,{alpha:.12}),closeColorPressedError:m(c,{alpha:.18})})}var E={name:`Tag`,common:g,self:T},D={color:Object,type:{type:String,default:`default`},round:Boolean,size:String,closable:Boolean,disabled:{type:Boolean,default:void 0}},O=s(`tag`,`
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`,[u(`strong`,`
 font-weight: var(--n-font-weight-strong);
 `),c(`border`,`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `),c(`icon`,`
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `),c(`avatar`,`
 display: flex;
 margin: 0 6px 0 0;
 `),c(`close`,`
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),u(`round`,`
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `,[c(`icon`,`
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `),c(`avatar`,`
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `),u(`closable`,`
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]),u(`icon, avatar`,[u(`round`,`
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]),u(`disabled`,`
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `),u(`checkable`,`
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `,[_(`disabled`,[l(`&:hover`,`background-color: var(--n-color-hover-checkable);`,[_(`checked`,`color: var(--n-text-color-hover-checkable);`)]),l(`&:active`,`background-color: var(--n-color-pressed-checkable);`,[_(`checked`,`color: var(--n-text-color-pressed-checkable);`)])]),u(`checked`,`
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `,[_(`disabled`,[l(`&:hover`,`background-color: var(--n-color-checked-hover);`),l(`&:active`,`background-color: var(--n-color-checked-pressed);`)])])])]),k=Object.assign(Object.assign(Object.assign({},h.props),D),{bordered:{type:Boolean,default:void 0},checked:Boolean,checkable:Boolean,strong:Boolean,triggerClickOnClose:Boolean,onClose:[Array,Function],onMouseenter:Function,onMouseleave:Function,"onUpdate:checked":Function,onUpdateChecked:Function,internalCloseFocusable:{type:Boolean,default:!0},internalCloseIsButtonTag:{type:Boolean,default:!0},onCheckedChange:Function}),A=y(`n-tag`),j=e({name:`Tag`,props:k,slots:Object,setup(e){let t=i(null),{mergedBorderedRef:s,mergedClsPrefixRef:c,inlineThemeDisabled:l,mergedRtlRef:u,mergedComponentPropsRef:m}=f(e),g=r(()=>e.size||m?.value?.Tag?.size||`medium`),_=h(`Tag`,`-tag`,O,E,e,c);n(A,{roundRef:a(e,`round`)});function y(){if(!e.disabled&&e.checkable){let{checked:t,onCheckedChange:n,onUpdateChecked:r,"onUpdate:checked":i}=e;r&&r(!t),i&&i(!t),n&&n(!t)}}function x(t){if(e.triggerClickOnClose||t.stopPropagation(),!e.disabled){let{onClose:n}=e;n&&S(n,t)}}let C={setTextContent(e){let{value:n}=t;n&&(n.textContent=e)}},w=p(`Tag`,u,c),T=r(()=>{let{type:t,color:{color:n,textColor:r}={}}=e,i=g.value,{common:{cubicBezierEaseInOut:a},self:{padding:c,closeMargin:l,borderRadius:u,opacityDisabled:d,textColorCheckable:f,textColorHoverCheckable:p,textColorPressedCheckable:m,textColorChecked:h,colorCheckable:y,colorHoverCheckable:b,colorPressedCheckable:x,colorChecked:S,colorCheckedHover:C,colorCheckedPressed:w,closeBorderRadius:T,fontWeightStrong:E,[o(`colorBordered`,t)]:D,[o(`closeSize`,i)]:O,[o(`closeIconSize`,i)]:k,[o(`fontSize`,i)]:A,[o(`height`,i)]:j,[o(`color`,t)]:M,[o(`textColor`,t)]:N,[o(`border`,t)]:P,[o(`closeIconColor`,t)]:F,[o(`closeIconColorHover`,t)]:I,[o(`closeIconColorPressed`,t)]:L,[o(`closeColorHover`,t)]:R,[o(`closeColorPressed`,t)]:z}}=_.value,B=v(l);return{"--n-font-weight-strong":E,"--n-avatar-size-override":`calc(${j} - 8px)`,"--n-bezier":a,"--n-border-radius":u,"--n-border":P,"--n-close-icon-size":k,"--n-close-color-pressed":z,"--n-close-color-hover":R,"--n-close-border-radius":T,"--n-close-icon-color":F,"--n-close-icon-color-hover":I,"--n-close-icon-color-pressed":L,"--n-close-icon-color-disabled":F,"--n-close-margin-top":B.top,"--n-close-margin-right":B.right,"--n-close-margin-bottom":B.bottom,"--n-close-margin-left":B.left,"--n-close-size":O,"--n-color":n||(s.value?D:M),"--n-color-checkable":y,"--n-color-checked":S,"--n-color-checked-hover":C,"--n-color-checked-pressed":w,"--n-color-hover-checkable":b,"--n-color-pressed-checkable":x,"--n-font-size":A,"--n-height":j,"--n-opacity-disabled":d,"--n-padding":c,"--n-text-color":r||N,"--n-text-color-checkable":f,"--n-text-color-checked":h,"--n-text-color-hover-checkable":p,"--n-text-color-pressed-checkable":m}}),D=l?d(`tag`,r(()=>{let t=``,{type:n,color:{color:r,textColor:i}={}}=e;return t+=n[0],t+=g.value[0],r&&(t+=`a${b(r)}`),i&&(t+=`b${b(i)}`),s.value&&(t+=`c`),t}),T,e):void 0;return Object.assign(Object.assign({},C),{rtlEnabled:w,mergedClsPrefix:c,contentRef:t,mergedBordered:s,handleClick:y,handleCloseClick:x,cssVars:l?void 0:T,themeClass:D?.themeClass,onRender:D?.onRender})},render(){var e;let{mergedClsPrefix:n,rtlEnabled:r,closable:i,color:{borderColor:a}={},round:o,onRender:s,$slots:c}=this;s?.();let l=x(c.avatar,e=>e&&t(`div`,{class:`${n}-tag__avatar`},e)),u=x(c.icon,e=>e&&t(`div`,{class:`${n}-tag__icon`},e));return t(`div`,{class:[`${n}-tag`,this.themeClass,{[`${n}-tag--rtl`]:r,[`${n}-tag--strong`]:this.strong,[`${n}-tag--disabled`]:this.disabled,[`${n}-tag--checkable`]:this.checkable,[`${n}-tag--checked`]:this.checkable&&this.checked,[`${n}-tag--round`]:o,[`${n}-tag--avatar`]:l,[`${n}-tag--icon`]:u,[`${n}-tag--closable`]:i}],style:this.cssVars,onClick:this.handleClick,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},u||l,t(`span`,{class:`${n}-tag__content`,ref:`contentRef`},(e=this.$slots).default?.call(e)),!this.checkable&&i?t(C,{clsPrefix:n,class:`${n}-tag__close`,disabled:this.disabled,onClick:this.handleCloseClick,focusable:this.internalCloseFocusable,round:o,isButtonTag:this.internalCloseIsButtonTag,absolute:!0}):null,!this.checkable&&this.mergedBordered?t(`div`,{class:`${n}-tag__border`,style:{borderColor:a}}):null)}});export{E as a,D as i,A as n,w as o,k as r,j as t};