import{d as m,m as b,u as c,c as g,a as e,w as u,v as p,b as x,o as h,e as w,r as v,f as M,g as _,h as y,i as d,j as k}from"./index-A_yiFLSU.js";const C={class:"flex flex-col md:flex-row h-screen items-center"},j=e("div",{class:"hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"},[e("img",{src:"https://images.unsplash.com/photo-1444313431167-e7921088a9d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1441&q=100",alt:"",class:"w-full h-full object-cover"})],-1),B={class:"bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"},z={class:"w-full h-100"},L=e("h1",{class:"text-xl font-bold"},"登录",-1),V=e("h1",{class:"text-xl md:text-2xl font-bold leading-tight mt-12"},"登录到您的帐户",-1),U={class:"mt-6",action:"#",method:"POST"},q=e("label",{class:"block text-gray-700"},"电子邮件地址",-1),A={class:"mt-4"},H=e("label",{class:"block text-gray-700"},"密码",-1),P=e("div",{class:"text-right mt-2"},[e("a",{href:"javascript:;",class:"text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"},"忘记密码?")],-1),E=x('<hr class="my-6 border-gray-300 w-full"><button type="button" class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"><div class="flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path></svg><span class="ml-4"> 已有谷歌账号进行登录</span></div></button><p class="mt-8">需要帐户吗？ <a href="#" class="text-blue-500 hover:text-blue-700 font-semibold">创建账户</a></p><p class="text-sm text-gray-500 mt-12">© 2024 Abstract UI - All Rights Reserved.</p>',4),R=m({__name:"LoginPage",props:{emailModel:{},emailModelModifiers:{},passwordModel:{},passwordModelModifiers:{}},emits:b(["loginClick"],["update:emailModel","update:passwordModel"]),setup(i,{emit:r}){const s=c(i,"emailModel"),a=c(i,"passwordModel"),t=r,n=()=>{t("loginClick")};return(f,l)=>(h(),g("section",C,[j,e("div",B,[e("div",z,[L,V,e("form",U,[e("div",null,[q,u(e("input",{"onUpdate:modelValue":l[0]||(l[0]=o=>s.value=o),type:"email",name:"",id:"email",placeholder:"请输入电子邮件地址",class:"w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none",autofocus:"",autocomplete:"true",required:""},null,512),[[p,s.value]])]),e("div",A,[H,u(e("input",{type:"password",name:"",id:"password",placeholder:"请输入密码",minlength:"6","onUpdate:modelValue":l[1]||(l[1]=o=>a.value=o),autocomplete:"off",class:"w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none",required:""},null,512),[[p,a.value]])]),P,e("div",{class:"w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg text-center px-4 py-3 mt-6",onClick:n},"登录")]),E])])]))}}),D=m({__name:"Login",setup(i){const r=k(),s=w(),a=v("abcdefghijklmnopqrstuvwxyz"),t=M({emailModel:"admin",passwordModel:"admin",login:()=>{}}),n=()=>{console.log(t),s.token=a.value,r.push("/")};return _(()=>{}),(f,l)=>(h(),y(R,{"email-model":d(t).emailModel,"onUpdate:emailModel":l[0]||(l[0]=o=>d(t).emailModel=o),"password-model":d(t).passwordModel,"onUpdate:passwordModel":l[1]||(l[1]=o=>d(t).passwordModel=o),onLoginClick:n},null,8,["email-model","password-model"]))}});export{D as default};
