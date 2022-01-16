import{S as Fe,i as Se,s as je,e as c,t as l,k as h,w as Z,c as r,a as u,h as o,d as e,m as k,x as J,b as L,g as p,G as s,y as K,q as N,o as Q,B as X,f as qe,H as Be,l as xe,I as Ye,as as Ge,a9 as Ue}from"../../../chunks/vendor-9c551f02.js";import"../../../chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js";import{L as Dt}from"../../../chunks/ListItem-3fe40cc9.js";/* empty css                                                            */import{S as Ve}from"../../../chunks/Showcase-188efe60.js";import{A as ze}from"../../../chunks/APIDocs-0423bc85.js";import"../../../chunks/TextBlock-d5339f0f.js";import"../../../chunks/TooltipWrapper-3e5457be.js";import"../../../chunks/IconButton-c8cc9811.js";import"../../../chunks/Button-a7276b10.js";import"../../../chunks/InfoBar-c9f740b0.js";var We={props:[{name:"selected",kind:"let",description:"Controls whether the item is selected or not.",type:"boolean",value:"false",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"disabled",kind:"let",description:"Controls whether the item is intended for user interaction, and styles it accordingly.",type:"boolean",value:"false",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"href",kind:"let",description:"Sets an href value and converts the list element into an anchor.",type:"string",value:'""',isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"role",kind:"let",description:"Specifies an ARIA role for the item.",type:"string",value:'"listitem"',isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"element",kind:"let",description:"Obtains a bound DOM reference to the item's element.",type:"null | HTMLAnchorElement | HTMLLIElement",value:"null",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0}],slots:[{name:"__default__",default:!0,slot_props:"{}"},{name:"icon",default:!1,slot_props:"{}"}],events:[{type:"dispatched",name:"select"}],typedefs:[],rest_props:{type:"Element",name:"button | a"}};function Ze(b){let a;return{c(){a=l("ListItem")},l(i){a=o(i,"ListItem")},m(i,f){p(i,a,f)},d(i){i&&e(a)}}}function Je(b){let a;return{c(){a=l("ListItem")},l(i){a=o(i,"ListItem")},m(i,f){p(i,a,f)},d(i){i&&e(a)}}}function Ke(b){let a,i;return{c(){a=new Be,i=xe(),this.h()},l(f){a=Ye(f),i=xe(),this.h()},h(){a.a=i},m(f,_){a.m(Ge,f,_),p(f,i,_)},p:Ue,d(f){f&&e(i),f&&a.d()}}}function Ne(b){let a;return{c(){a=l("ListItem")},l(i){a=o(i,"ListItem")},m(i,f){p(i,a,f)},d(i){i&&e(a)}}}function Qe(b){let a;return{c(){a=l("ListItem")},l(i){a=o(i,"ListItem")},m(i,f){p(i,a,f)},d(i){i&&e(a)}}}function Xe(b){let a,i,f,_,tt,$,y,I,E;return i=new Dt({props:{$$slots:{default:[Ze]},$$scope:{ctx:b}}}),_=new Dt({props:{$$slots:{icon:[Ke],default:[Je]},$$scope:{ctx:b}}}),$=new Dt({props:{selected:!0,$$slots:{default:[Ne]},$$scope:{ctx:b}}}),I=new Dt({props:{disabled:!0,$$slots:{default:[Qe]},$$scope:{ctx:b}}}),{c(){a=c("div"),Z(i.$$.fragment),f=h(),Z(_.$$.fragment),tt=h(),Z($.$$.fragment),y=h(),Z(I.$$.fragment),this.h()},l(m){a=r(m,"DIV",{style:!0});var d=u(a);J(i.$$.fragment,d),f=k(d),J(_.$$.fragment,d),tt=k(d),J($.$$.fragment,d),y=k(d),J(I.$$.fragment,d),d.forEach(e),this.h()},h(){qe(a,"inline-size","240px")},m(m,d){p(m,a,d),K(i,a,null),s(a,f),K(_,a,null),s(a,tt),K($,a,null),s(a,y),K(I,a,null),E=!0},p(m,d){const v={};d&1&&(v.$$scope={dirty:d,ctx:m}),i.$set(v);const G={};d&1&&(G.$$scope={dirty:d,ctx:m}),_.$set(G);const D={};d&1&&(D.$$scope={dirty:d,ctx:m}),$.$set(D);const U={};d&1&&(U.$$scope={dirty:d,ctx:m}),I.$set(U)},i(m){E||(N(i.$$.fragment,m),N(_.$$.fragment,m),N($.$$.fragment,m),N(I.$$.fragment,m),E=!0)},o(m){Q(i.$$.fragment,m),Q(_.$$.fragment,m),Q($.$$.fragment,m),Q(I.$$.fragment,m),E=!1},d(m){m&&e(a),X(i),X(_),X($),X(I)}}}function ts(b){let a,i,f,_,tt='<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ListItem <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>',$,y,I,E,m,d,v,G,D,U,xt,et,Ht,Pt,st,Tt,Mt,ft,T,Ot,mt,C,Rt,at,Ft,St,nt,jt,qt,dt,M,He='<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ListItem</span> <span class="token attr-name">selected</span><span class="token punctuation">></span></span>Text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ListItem</span><span class="token punctuation">></span></span></code>',ht,g,Bt,lt,Yt,Gt,ot,Ut,Vt,kt,O,zt,_t,A,Wt,it,Zt,Jt,pt,Kt,Nt,vt,R,Pe='<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ListItem</span> <span class="token attr-name">disabled</span><span class="token punctuation">></span></span>Text<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ListItem</span><span class="token punctuation">></span></span></code>',$t,F,Qt,It,x,Xt,ct,te,ee,bt,S,Te=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ListItem</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://github.com/microsoft/fluentui-system-icons --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 16 16<span class="token punctuation">"</span></span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
    Text
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ListItem</span><span class="token punctuation">></span></span></code>`,yt,j,se,Et,w,ae,rt,ne,le,q,oe,ie,ut,pe,ce,wt,B,re,Lt,Y,Ct;return y=new Ve({props:{repl:"",$$slots:{default:[Xe]},$$scope:{ctx:b}}}),Y=new ze({props:{data:We}}),{c(){a=c("p"),i=l("List Items display data stacked vertically in a single column. List Items work better for items that have text as a focal point, and for collections that are meant to be read top to bottom (i.e. alphabetically ordered). A few common use cases for List Items include lists of messages and search results."),f=h(),_=c("pre"),$=h(),Z(y.$$.fragment),I=h(),E=c("h2"),m=l("Usage"),d=h(),v=c("p"),G=l("A ListItem is either a general-purpose item or a link. By default, an item will be rendered as a standard HTML "),D=c("code"),U=l("<li>"),xt=l(" element. If an "),et=c("code"),Ht=l("href"),Pt=l(" property is provided, the item will be converted into an "),st=c("code"),Tt=l("<a>"),Mt=l(" tag."),ft=h(),T=c("h3"),Ot=l("Selecting Items"),mt=h(),C=c("p"),Rt=l("An item can be marked as "),at=c("em"),Ft=l("selected"),St=l(" to indicate that it a currently active option. To do this, use the "),nt=c("code"),jt=l("selected"),qt=l(" property."),dt=h(),M=c("pre"),ht=h(),g=c("p"),Bt=l("You can also listen to the "),lt=c("code"),Yt=l("select"),Gt=l(" event, which is dispatched when the "),ot=c("code"),Ut=l("selected"),Vt=l(" property is changed to a truthy value."),kt=h(),O=c("h3"),zt=l("Disabled Items"),_t=h(),A=c("p"),Wt=l("If the item is not meant to be clicked, you can use the "),it=c("code"),Zt=l("disabled"),Jt=l(" property to visually indicate this. If an item is disabled, it will be unclickable and the "),pt=c("code"),Kt=l("href"),Nt=l(" prop will be ignored."),vt=h(),R=c("pre"),$t=h(),F=c("h3"),Qt=l("Adding an Icon"),It=h(),x=c("p"),Xt=l("You can easily add an icon to an item using the "),ct=c("code"),te=l("icon"),ee=l(" slot. Passing in an SVG element will render it before any contents with 16x16 dimensions."),bt=h(),S=c("pre"),yt=h(),j=c("h3"),se=l("ARIA Roles"),Et=h(),w=c("p"),ae=l("For the purposes of accessibly adapting ListItems to certain use-cases, a "),rt=c("code"),ne=l("role"),le=l(" property has been exposed to override the default "),q=c("a"),oe=l("ARIA role"),ie=l(" of the item, which is "),ut=c("code"),pe=l("listitem"),ce=l("."),wt=h(),B=c("h2"),re=l("Component API"),Lt=h(),Z(Y.$$.fragment),this.h()},l(t){a=r(t,"P",{});var n=u(a);i=o(n,"List Items display data stacked vertically in a single column. List Items work better for items that have text as a focal point, and for collections that are meant to be read top to bottom (i.e. alphabetically ordered). A few common use cases for List Items include lists of messages and search results."),n.forEach(e),f=k(t),_=r(t,"PRE",{class:!0});var gt=u(_);gt.forEach(e),$=k(t),J(y.$$.fragment,t),I=k(t),E=r(t,"H2",{id:!0});var ue=u(E);m=o(ue,"Usage"),ue.forEach(e),d=k(t),v=r(t,"P",{});var H=u(v);G=o(H,"A ListItem is either a general-purpose item or a link. By default, an item will be rendered as a standard HTML "),D=r(H,"CODE",{});var fe=u(D);U=o(fe,"<li>"),fe.forEach(e),xt=o(H," element. If an "),et=r(H,"CODE",{});var me=u(et);Ht=o(me,"href"),me.forEach(e),Pt=o(H," property is provided, the item will be converted into an "),st=r(H,"CODE",{});var de=u(st);Tt=o(de,"<a>"),de.forEach(e),Mt=o(H," tag."),H.forEach(e),ft=k(t),T=r(t,"H3",{id:!0});var he=u(T);Ot=o(he,"Selecting Items"),he.forEach(e),mt=k(t),C=r(t,"P",{});var V=u(C);Rt=o(V,"An item can be marked as "),at=r(V,"EM",{});var ke=u(at);Ft=o(ke,"selected"),ke.forEach(e),St=o(V," to indicate that it a currently active option. To do this, use the "),nt=r(V,"CODE",{});var _e=u(nt);jt=o(_e,"selected"),_e.forEach(e),qt=o(V," property."),V.forEach(e),dt=k(t),M=r(t,"PRE",{class:!0});var Me=u(M);Me.forEach(e),ht=k(t),g=r(t,"P",{});var z=u(g);Bt=o(z,"You can also listen to the "),lt=r(z,"CODE",{});var ve=u(lt);Yt=o(ve,"select"),ve.forEach(e),Gt=o(z," event, which is dispatched when the "),ot=r(z,"CODE",{});var $e=u(ot);Ut=o($e,"selected"),$e.forEach(e),Vt=o(z," property is changed to a truthy value."),z.forEach(e),kt=k(t),O=r(t,"H3",{id:!0});var Ie=u(O);zt=o(Ie,"Disabled Items"),Ie.forEach(e),_t=k(t),A=r(t,"P",{});var W=u(A);Wt=o(W,"If the item is not meant to be clicked, you can use the "),it=r(W,"CODE",{});var be=u(it);Zt=o(be,"disabled"),be.forEach(e),Jt=o(W," property to visually indicate this. If an item is disabled, it will be unclickable and the "),pt=r(W,"CODE",{});var ye=u(pt);Kt=o(ye,"href"),ye.forEach(e),Nt=o(W," prop will be ignored."),W.forEach(e),vt=k(t),R=r(t,"PRE",{class:!0});var Oe=u(R);Oe.forEach(e),$t=k(t),F=r(t,"H3",{id:!0});var Ee=u(F);Qt=o(Ee,"Adding an Icon"),Ee.forEach(e),It=k(t),x=r(t,"P",{});var At=u(x);Xt=o(At,"You can easily add an icon to an item using the "),ct=r(At,"CODE",{});var we=u(ct);te=o(we,"icon"),we.forEach(e),ee=o(At," slot. Passing in an SVG element will render it before any contents with 16x16 dimensions."),At.forEach(e),bt=k(t),S=r(t,"PRE",{class:!0});var Re=u(S);Re.forEach(e),yt=k(t),j=r(t,"H3",{id:!0});var Le=u(j);se=o(Le,"ARIA Roles"),Le.forEach(e),Et=k(t),w=r(t,"P",{});var P=u(w);ae=o(P,"For the purposes of accessibly adapting ListItems to certain use-cases, a "),rt=r(P,"CODE",{});var Ce=u(rt);ne=o(Ce,"role"),Ce.forEach(e),le=o(P," property has been exposed to override the default "),q=r(P,"A",{href:!0,rel:!0});var ge=u(q);oe=o(ge,"ARIA role"),ge.forEach(e),ie=o(P," of the item, which is "),ut=r(P,"CODE",{});var Ae=u(ut);pe=o(Ae,"listitem"),Ae.forEach(e),ce=o(P,"."),P.forEach(e),wt=k(t),B=r(t,"H2",{id:!0});var De=u(B);re=o(De,"Component API"),De.forEach(e),Lt=k(t),J(Y.$$.fragment,t),this.h()},h(){L(_,"class","language-ts"),L(E,"id","usage"),L(T,"id","selecting-items"),L(M,"class","language-html"),L(O,"id","disabled-items"),L(R,"class","language-html"),L(F,"id","adding-an-icon"),L(S,"class","language-html"),L(j,"id","aria-roles"),L(q,"href","https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques"),L(q,"rel","nofollow"),L(B,"id","component-api")},m(t,n){p(t,a,n),s(a,i),p(t,f,n),p(t,_,n),_.innerHTML=tt,p(t,$,n),K(y,t,n),p(t,I,n),p(t,E,n),s(E,m),p(t,d,n),p(t,v,n),s(v,G),s(v,D),s(D,U),s(v,xt),s(v,et),s(et,Ht),s(v,Pt),s(v,st),s(st,Tt),s(v,Mt),p(t,ft,n),p(t,T,n),s(T,Ot),p(t,mt,n),p(t,C,n),s(C,Rt),s(C,at),s(at,Ft),s(C,St),s(C,nt),s(nt,jt),s(C,qt),p(t,dt,n),p(t,M,n),M.innerHTML=He,p(t,ht,n),p(t,g,n),s(g,Bt),s(g,lt),s(lt,Yt),s(g,Gt),s(g,ot),s(ot,Ut),s(g,Vt),p(t,kt,n),p(t,O,n),s(O,zt),p(t,_t,n),p(t,A,n),s(A,Wt),s(A,it),s(it,Zt),s(A,Jt),s(A,pt),s(pt,Kt),s(A,Nt),p(t,vt,n),p(t,R,n),R.innerHTML=Pe,p(t,$t,n),p(t,F,n),s(F,Qt),p(t,It,n),p(t,x,n),s(x,Xt),s(x,ct),s(ct,te),s(x,ee),p(t,bt,n),p(t,S,n),S.innerHTML=Te,p(t,yt,n),p(t,j,n),s(j,se),p(t,Et,n),p(t,w,n),s(w,ae),s(w,rt),s(rt,ne),s(w,le),s(w,q),s(q,oe),s(w,ie),s(w,ut),s(ut,pe),s(w,ce),p(t,wt,n),p(t,B,n),s(B,re),p(t,Lt,n),K(Y,t,n),Ct=!0},p(t,[n]){const gt={};n&1&&(gt.$$scope={dirty:n,ctx:t}),y.$set(gt)},i(t){Ct||(N(y.$$.fragment,t),N(Y.$$.fragment,t),Ct=!0)},o(t){Q(y.$$.fragment,t),Q(Y.$$.fragment,t),Ct=!1},d(t){t&&e(a),t&&e(f),t&&e(_),t&&e($),X(y,t),t&&e(I),t&&e(E),t&&e(d),t&&e(v),t&&e(ft),t&&e(T),t&&e(mt),t&&e(C),t&&e(dt),t&&e(M),t&&e(ht),t&&e(g),t&&e(kt),t&&e(O),t&&e(_t),t&&e(A),t&&e(vt),t&&e(R),t&&e($t),t&&e(F),t&&e(It),t&&e(x),t&&e(bt),t&&e(S),t&&e(yt),t&&e(j),t&&e(Et),t&&e(w),t&&e(wt),t&&e(B),t&&e(Lt),X(Y,t)}}}class fs extends Fe{constructor(a){super();Se(this,a,null,ts,je,{})}}export{fs as default};