import{S as L,i as y,s as R,e as k,k as F,w as P,c as j,a as b,m as W,x as D,d as p,b as m,F as z,g as A,G as v,y as M,H as ne,l as J,I as ae,q as d,o as w,B as N,J as K,t as q,h as C,K as oe,n as re,p as fe,L as O,M as Q,N as U,O as ie,P as ue,j as ce,Q as me,R as X,T as Y}from"../chunks/vendor-9c551f02.js";import"../chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js";import{T as _e}from"../chunks/TooltipWrapper-3e5457be.js";import{I as he}from"../chunks/IconButton-c8cc9811.js";/* empty css                                                      */import{p as pe}from"../chunks/stores-c96b2e8c.js";import{T as Z}from"../chunks/TextBlock-d5339f0f.js";/* empty css                      */const $e=a=>({}),x=a=>({});function ee(a,e,s){const t=a.slice();return t[4]=e[s].href,t[5]=e[s].name,t[6]=e[s].icon,t}function ge(a){let e;return{c(){e=q("ALPHA")},l(s){e=C(s,"ALPHA")},m(s,t){A(s,e,t)},d(s){s&&p(e)}}}function te(a){let e,s=a[6]+"",t;return{c(){e=new ne,t=J(),this.h()},l(n){e=ae(n),t=J(),this.h()},h(){e.a=t},m(n,i){e.m(s,n,i),A(n,t,i)},p(n,i){i&1&&s!==(s=n[6]+"")&&e.p(s)},d(n){n&&p(t),n&&e.d()}}}function ve(a){let e=a[5]+"",s;return{c(){s=q(e)},l(t){s=C(t,e)},m(t,n){A(t,s,n)},p(t,n){n&1&&e!==(e=t[5]+"")&&ce(s,e)},d(t){t&&p(s)}}}function se(a){let e,s,t,n,i,f,l=a[6]&&te(a);return t=new Z({props:{$$slots:{default:[ve]},$$scope:{ctx:a}}}),{c(){e=k("a"),l&&l.c(),s=F(),P(t.$$.fragment),n=F(),this.h()},l(o){e=j(o,"A",{href:!0,"sveltekit:prefetch":!0,class:!0});var u=b(e);l&&l.l(u),s=W(u),D(t.$$.fragment,u),n=W(u),u.forEach(p),this.h()},h(){m(e,"href",i=a[4]),m(e,"sveltekit:prefetch",""),m(e,"class","svelte-39ftwm"),z(e,"selected",a[1].url.pathname===a[4]||a[1].url.pathname.split("/").length>1&&a[4].split("/").length>1&&a[1].url.pathname.startsWith(a[4])&&!(a[4]===""||a[4]==="/")||a[4]==="/"&&a[1].url.pathname==="")},m(o,u){A(o,e,u),l&&l.m(e,null),v(e,s),M(t,e,null),v(e,n),f=!0},p(o,u){o[6]?l?l.p(o,u):(l=te(o),l.c(),l.m(e,s)):l&&(l.d(1),l=null);const I={};u&9&&(I.$$scope={dirty:u,ctx:o}),t.$set(I),(!f||u&1&&i!==(i=o[4]))&&m(e,"href",i),u&3&&z(e,"selected",o[1].url.pathname===o[4]||o[1].url.pathname.split("/").length>1&&o[4].split("/").length>1&&o[1].url.pathname.startsWith(o[4])&&!(o[4]===""||o[4]==="/")||o[4]==="/"&&o[1].url.pathname==="")},i(o){f||(d(t.$$.fragment,o),f=!0)},o(o){w(t.$$.fragment,o),f=!1},d(o){o&&p(e),l&&l.d(),N(t)}}}function de(a){let e,s,t,n,i,f,l,o,u,I,B,T;l=new Z({props:{variant:"caption",$$slots:{default:[ge]},$$scope:{ctx:a}}});let E=a[0],c=[];for(let r=0;r<E.length;r+=1)c[r]=se(ee(a,E,r));const le=r=>w(c[r],1,1,()=>{c[r]=null}),S=a[2].buttons,$=K(S,a,a[3],x);return{c(){e=k("header"),s=k("div"),t=k("a"),n=k("img"),f=q(`
			Former Fluent Svelte - ProjectWiki `),P(l.$$.fragment),o=F(),u=k("nav");for(let r=0;r<c.length;r+=1)c[r].c();I=F(),B=k("div"),$&&$.c(),this.h()},l(r){e=j(r,"HEADER",{class:!0});var h=b(e);s=j(h,"DIV",{class:!0});var g=b(s);t=j(g,"A",{class:!0,href:!0});var _=b(t);n=j(_,"IMG",{src:!0,width:!0,height:!0,alt:!0,class:!0}),f=C(_,`
			Former Fluent Svelte - ProjectWiki `),D(l.$$.fragment,_),_.forEach(p),o=W(g),u=j(g,"NAV",{class:!0});var H=b(u);for(let V=0;V<c.length;V+=1)c[V].l(H);H.forEach(p),I=W(g),B=j(g,"DIV",{class:!0});var G=b(B);$&&$.l(G),G.forEach(p),g.forEach(p),h.forEach(p),this.h()},h(){oe(n.src,i="/logo.svg")||m(n,"src",i),m(n,"width","32"),m(n,"height","32"),m(n,"alt","Fluent logo"),m(n,"class","svelte-39ftwm"),m(t,"class","logo svelte-39ftwm"),m(t,"href","/"),m(u,"class","svelte-39ftwm"),m(B,"class","buttons svelte-39ftwm"),m(s,"class","navbar-inner svelte-39ftwm"),m(e,"class","navbar svelte-39ftwm")},m(r,h){A(r,e,h),v(e,s),v(s,t),v(t,n),v(t,f),M(l,t,null),v(s,o),v(s,u);for(let g=0;g<c.length;g+=1)c[g].m(u,null);v(s,I),v(s,B),$&&$.m(B,null),T=!0},p(r,[h]){const g={};if(h&8&&(g.$$scope={dirty:h,ctx:r}),l.$set(g),h&3){E=r[0];let _;for(_=0;_<E.length;_+=1){const H=ee(r,E,_);c[_]?(c[_].p(H,h),d(c[_],1)):(c[_]=se(H),c[_].c(),d(c[_],1),c[_].m(u,null))}for(re(),_=E.length;_<c.length;_+=1)le(_);fe()}$&&$.p&&(!T||h&8)&&O($,S,r,r[3],T?U(S,r[3],h,$e):Q(r[3]),x)},i(r){if(!T){d(l.$$.fragment,r);for(let h=0;h<E.length;h+=1)d(c[h]);d($,r),T=!0}},o(r){w(l.$$.fragment,r),c=c.filter(Boolean);for(let h=0;h<c.length;h+=1)w(c[h]);w($,r),T=!1},d(r){r&&p(e),N(l),ie(c,r),$&&$.d(r)}}}function be(a,e,s){let t;ue(a,pe,l=>s(1,t=l));let{$$slots:n={},$$scope:i}=e,{items:f}=e;return a.$$set=l=>{"items"in l&&s(0,f=l.items),"$$scope"in l&&s(3,i=l.$$scope)},[f,t,n,i]}class we extends L{constructor(e){super();y(this,e,be,de,R,{items:0})}}function ke(a){let e,s;return{c(){e=X("svg"),s=X("path"),this.h()},l(t){e=Y(t,"svg",{xmlns:!0,viewBox:!0,width:!0,height:!0});var n=b(e);s=Y(n,"path",{"fill-rule":!0,d:!0}),b(s).forEach(p),n.forEach(p),this.h()},h(){m(s,"fill-rule","evenodd"),m(s,"d","M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"),m(e,"xmlns","http://www.w3.org/2000/svg"),m(e,"viewBox","0 0 16 16"),m(e,"width","16"),m(e,"height","16")},m(t,n){A(t,e,n),v(e,s)},d(t){t&&p(e)}}}function je(a){let e,s;return e=new he({props:{$$slots:{default:[ke]},$$scope:{ctx:a}}}),{c(){P(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,n){M(e,t,n),s=!0},p(t,n){const i={};n&4&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){s||(d(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){N(e,t)}}}function Ae(a){let e,s;return e=new _e({props:{slot:"buttons",placement:"left",offset:8,text:"View GitHub",$$slots:{default:[je]},$$scope:{ctx:a}}}),{c(){P(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,n){M(e,t,n),s=!0},p(t,n){const i={};n&4&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){s||(d(e.$$.fragment,t),s=!0)},o(t){w(e.$$.fragment,t),s=!1},d(t){N(e,t)}}}function Ee(a){let e,s,t,n;e=new we({props:{items:a[0],$$slots:{buttons:[Ae]},$$scope:{ctx:a}}});const i=a[1].default,f=K(i,a,a[2],null);return{c(){P(e.$$.fragment),s=F(),t=k("main"),f&&f.c()},l(l){D(e.$$.fragment,l),s=W(l),t=j(l,"MAIN",{});var o=b(t);f&&f.l(o),o.forEach(p)},m(l,o){M(e,l,o),A(l,s,o),A(l,t,o),f&&f.m(t,null),n=!0},p(l,[o]){const u={};o&1&&(u.items=l[0]),o&4&&(u.$$scope={dirty:o,ctx:l}),e.$set(u),f&&f.p&&(!n||o&4)&&O(f,i,l,l[2],n?U(i,l[2],o,null):Q(l[2]),null)},i(l){n||(d(e.$$.fragment,l),d(f,l),n=!0)},o(l){w(e.$$.fragment,l),w(f,l),n=!1},d(l){N(e,l),l&&p(s),l&&p(t),f&&f.d(l)}}}function Ie(a,e,s){let{$$slots:t={},$$scope:n}=e,i=[{name:"Docs",href:"/docs",icon:me}];return a.$$set=f=>{"$$scope"in f&&s(2,n=f.$$scope)},[i,t,n]}class Ne extends L{constructor(e){super();y(this,e,Ie,Ee,R,{})}}export{Ne as default};