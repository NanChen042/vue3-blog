import{d as F,f as Y,g as v,am as J,o as S,c as w,a as p,J as E,n as U,s as q,G as k,an as R,H as y,h as O}from"./index-TYQYnJod.js";function P(c,A){return Math.floor(Math.random()*(A-c)+c)}function T(c,A){const l=parseInt((Math.random()*A).toString())+c,o=2e4,g=1e3;let m="",u=0;for(;u<l;){u++;const f=parseInt((Math.random()*g).toString());m+=String.fromCharCode(o+f)}return m}function b(){const c={};let A={},l=g();function o(e){let i="";for(const s in e)i+=`&${s}=${e[s]}`;return i?`?${i.slice(1)}`:""}function g(){const e=location.href.split("#");if(e.length>1){const i=e[1].split("?");return A=i.length>1?u(i[1]):{},i[0]}else return""}function m(e){const i=e.split("?");return{path:i[0],params:i.length>1?u(i[1]):{}}}function u(e){const i={},s=e.split("&");for(let n=0;n<s.length;n++){const t=s[n],a=t.split("=");a.length>1&&(i[a[0]]=t.replace(`${a[0]}=`,""))}return i}function f(e,i){const s=e.data||{},n=e.title||"";let t=typeof e=="string"?e:e.path,a=e.params||{};const r=m(t);if(t=r.path,a={...a,...r.params},l==t&&JSON.stringify(A)==JSON.stringify(a))return console.warn("重复的路由路径和参数，不作任何处理");history[i](s,n,"#"+t+o(a)),h()}function h(){l=g();const e=c[l];typeof e=="function"&&e()}return window.addEventListener("load",h,!1),window.addEventListener("hashchange",h,!1),window.addEventListener("popstate",h,!1),{get data(){return history.state},get params(){return A},get path(){return l},replace(e){f(e,"replaceState")},push(e){f(e,"pushState")},onchange(e,i){c[e]=i}}}b();const K="data:image/png;base64,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";let I=0;const W="https://game.gtimg.cn/images/lol/act/img",D=["/champion/Talon.png","/champion/Quinn.png","/champion/Vladimir.png","/champion/Sona.png","/champion/Zed.png","/champion/MissFortune.png","/champion/Lux.png"],H=["/skinloading/106000.jpg","/skinloading/107000.jpg","/skinloading/110000.jpg","/skinloading/111000.jpg","/skinloading/112000.jpg","/skinloading/113000.jpg","/skinloading/114000.jpg"],N=()=>Math.round(Math.random())?H:D;function L(c=1e3){function A(o){return new Promise(function(g,m){const u=[];for(let f=0;f<o;f++){I++;const h=N();u.push({id:I,title:"卡片标题-"+I,text:T(4,58),photo:W+h[P(0,h.length-1)]})}setTimeout(function(){g({code:1,data:u})},P(100,c))})}return{getList:A,defaultPic:{data:K,width:200,height:200}}}const V={class:"top fvc"},X=["disabled"],x=["disabled"],Z=p("a",{class:"link",href:"#/"},"基础版",-1),z=p("a",{class:"link",href:"#/best"},"最佳版(css-grid)",-1),G=["src"],_={class:"title"},$={class:"content ellipsis_2"},tt=F({__name:"WaterListBetter",setup(c){const{getList:A,defaultPic:l}=L(),o=Y({loading:!1,column:4,move:!0,columnList:[]});let g=[];function m(s,n=!1){let t=JSON.parse(JSON.stringify(o.columnList));n&&(t=new Array(o.column).fill(0).map((a,r)=>({index:r,list:[],height:0})),g=[]),s.forEach(function(a){t.sort((d,C)=>d.height-C.height);const r=t[0];r.height+=a.height,a.currentColumnHeight=r.height,r.list.push(a)}),g=g.concat(s),t.sort((a,r)=>a.index-r.index),o.columnList=t}function u(s,n){return Math.round(+s+"e"+n)/Math.pow(10,n)}async function f(s){const n=s.length;let t=0;return new Promise(function(a){function r(d){const C=new Image;C.src=d.photo;function B(M){t++;const j=100,Q=M.width/j;d.width=j,d.height=u(M.height/Q,2),t>=n&&a(s)}C.onload=()=>B(C),C.onerror=function(){d.photo=l.data,B(l)}}for(let d=0;d<n;d++)r(s[d])})}async function h(s=!1){o.loading=!0;const n=await A(20);if(n.code===1){const t=await f(n.data);o.loading=!1,m(t,s)}}function e(){h(!0)}let i;return v(function(){e(),i=new ResizeObserver(function(s){const n=s[0].contentRect;let t=o.column;n.width>1200?t=4:n.width>900?t=3:n.width>600&&(t=2),o.column!==t&&(o.column=t,m(g,!0))}),i.observe(document.querySelector(".water-list"))}),J(function(){i.disconnect()}),(s,n)=>(S(),w(k,null,[p("div",V,[p("button",{disabled:o.loading,onClick:n[0]||(n[0]=t=>h(!1))},E(o.loading?"加载中..":"加载更多"),9,X),p("button",{disabled:o.loading,onClick:e},E(o.loading?"加载中..":"重新获取"),9,x),p("button",{onClick:n[1]||(n[1]=t=>o.move=!o.move)},E(o.move?"关闭动画":"开启动画"),1),Z,z]),U(R,{name:o.move?"group":"",tag:"div",class:"water-list flex",ref:"wrapEl"},{default:q(()=>[(S(!0),w(k,null,y(o.columnList,t=>(S(),O(R,{name:o.move?"group":"",tag:"div",class:"water-list-column",key:"col-"+t.index,"data-height":t.height,"data-index":t.index},{default:q(()=>[(S(!0),w(k,null,y(t.list,a=>(S(),w("div",{class:"water-list-item",key:a.id},[p("img",{class:"pic",src:a.photo,alt:""},null,8,G),p("div",_,E(a.title),1),p("div",$,E(a.text),1)]))),128))]),_:2},1032,["name","data-height","data-index"]))),128))]),_:1},8,["name"])],64))}}),nt=F({__name:"Anli",setup(c){return(A,l)=>(S(),O(tt))}});export{nt as default};
