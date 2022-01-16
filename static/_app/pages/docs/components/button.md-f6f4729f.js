import{S as rn,i as ln,s as cn,e as i,t as r,k as m,w as T,c,a as f,h as l,d as n,m as _,x as g,b as Pt,g as d,G as e,y as A,q as C,o as H,B as O}from"../../../chunks/vendor-9c551f02.js";import{B as V}from"../../../chunks/Button-a7276b10.js";import"../../../chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js";/* empty css                                                            */import{S as fn}from"../../../chunks/Showcase-188efe60.js";import{A as un}from"../../../chunks/APIDocs-0423bc85.js";import"../../../chunks/TooltipWrapper-3e5457be.js";import"../../../chunks/IconButton-c8cc9811.js";import"../../../chunks/InfoBar-c9f740b0.js";var dn={props:[{name:"variant",kind:"let",description:"Specifies the visual styling of the button.",type:"string",value:'"standard"',isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"href",kind:"let",description:"Sets an href value and converts the button element into an anchor/",type:"string",value:'""',isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"disabled",kind:"let",description:"Controls whether the button is intended for user interaction, and styles it accordingly.",type:"boolean",value:"false",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"element",kind:"let",description:"Obtains a bound DOM reference to the button or anchor element.",type:"null | HTMLAnchorElement | HTMLButtonElement",value:"null",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0}],slots:[{name:"__default__",default:!0,slot_props:"{}"}],events:[],typedefs:[],rest_props:{type:"Element",name:"button | a"}};function pn(h){let a;return{c(){a=r("Button")},l(o){a=l(o,"Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function $n(h){let a;return{c(){a=r("Button")},l(o){a=l(o,"Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function mn(h){let a;return{c(){a=r("Button")},l(o){a=l(o,"Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function _n(h){let a;return{c(){a=r("Button")},l(o){a=l(o,"Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function hn(h){let a;return{c(){a=r("Button")},l(o){a=l(o,"Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function vn(h){let a;return{c(){a=r("Button")},l(o){a=l(o,"Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function bn(h){let a,o,p,B,S,P,v,j,E,q,y,b;return a=new V({props:{variant:"standard",$$slots:{default:[pn]},$$scope:{ctx:h}}}),p=new V({props:{variant:"accent",$$slots:{default:[$n]},$$scope:{ctx:h}}}),S=new V({props:{variant:"hyperlink",$$slots:{default:[mn]},$$scope:{ctx:h}}}),v=new V({props:{variant:"standard",disabled:!0,$$slots:{default:[_n]},$$scope:{ctx:h}}}),E=new V({props:{variant:"accent",disabled:!0,$$slots:{default:[hn]},$$scope:{ctx:h}}}),y=new V({props:{variant:"hyperlink",disabled:!0,$$slots:{default:[vn]},$$scope:{ctx:h}}}),{c(){T(a.$$.fragment),o=m(),T(p.$$.fragment),B=m(),T(S.$$.fragment),P=m(),T(v.$$.fragment),j=m(),T(E.$$.fragment),q=m(),T(y.$$.fragment)},l(s){g(a.$$.fragment,s),o=_(s),g(p.$$.fragment,s),B=_(s),g(S.$$.fragment,s),P=_(s),g(v.$$.fragment,s),j=_(s),g(E.$$.fragment,s),q=_(s),g(y.$$.fragment,s)},m(s,$){A(a,s,$),d(s,o,$),A(p,s,$),d(s,B,$),A(S,s,$),d(s,P,$),A(v,s,$),d(s,j,$),A(E,s,$),d(s,q,$),A(y,s,$),b=!0},p(s,$){const Z={};$&1&&(Z.$$scope={dirty:$,ctx:s}),a.$set(Z);const tt={};$&1&&(tt.$$scope={dirty:$,ctx:s}),p.$set(tt);const z={};$&1&&(z.$$scope={dirty:$,ctx:s}),S.$set(z);const et={};$&1&&(et.$$scope={dirty:$,ctx:s}),v.$set(et);const nt={};$&1&&(nt.$$scope={dirty:$,ctx:s}),E.$set(nt);const x={};$&1&&(x.$$scope={dirty:$,ctx:s}),y.$set(x)},i(s){b||(C(a.$$.fragment,s),C(p.$$.fragment,s),C(S.$$.fragment,s),C(v.$$.fragment,s),C(E.$$.fragment,s),C(y.$$.fragment,s),b=!0)},o(s){H(a.$$.fragment,s),H(p.$$.fragment,s),H(S.$$.fragment,s),H(v.$$.fragment,s),H(E.$$.fragment,s),H(y.$$.fragment,s),b=!1},d(s){O(a,s),s&&n(o),O(p,s),s&&n(B),O(S,s),s&&n(P),O(v,s),s&&n(j),O(E,s),s&&n(q),O(y,s)}}}function En(h){let a;return{c(){a=r("Standard Button")},l(o){a=l(o,"Standard Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function kn(h){let a;return{c(){a=r("Accent Button")},l(o){a=l(o,"Accent Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function yn(h){let a;return{c(){a=r("Hyperlink Button")},l(o){a=l(o,"Hyperlink Button")},m(o,p){d(o,a,p)},d(o){o&&n(a)}}}function Bn(h){let a,o,p,B,S='<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Button <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>',P,v,j,E,q,y,b,s,$,Z,tt,z,et,nt,x,Gt,Wt,jt,K,Yt,Ft,k,Jt,ct,Kt,Nt,ft,Qt,Xt,ut,Zt,te,dt,ee,ne,pt,ae,oe,Lt,G,$t,F,mt,se,re,_t,le,ie,ht,ce,fe,L,M,vt,bt,ue,de,Et,W,pe,kt,$e,me,R,yt,Bt,_e,he,wt,Y,ve,Dt,be,Ee,U,Tt,gt,ke,ye,At,J,Be,Ct,we,Mt,N,De,Rt,I,Te,Ht,ge,Ae,Ot,Ce,He,Ut,Q,Oe,Vt,X,qt;return v=new fn({props:{columns:3,repl:"0c6ca42e2c5c4868a7a8c1a1a45759eb",$$slots:{default:[bn]},$$scope:{ctx:h}}}),W=new V({props:{variant:"standard",$$slots:{default:[En]},$$scope:{ctx:h}}}),Y=new V({props:{variant:"accent",$$slots:{default:[kn]},$$scope:{ctx:h}}}),J=new V({props:{variant:"hyperlink",$$slots:{default:[yn]},$$scope:{ctx:h}}}),X=new un({props:{data:dn}}),{c(){a=i("p"),o=r("A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus."),p=m(),B=i("pre"),P=m(),T(v.$$.fragment),j=m(),E=i("h2"),q=r("Usage"),y=m(),b=i("p"),s=r("A button can either be a clickable action or a link. By default, a button will be rendered as a standard HTML "),$=i("code"),Z=r("<button>"),tt=r(" element. If an "),z=i("code"),et=r("href"),nt=r(" property is provided, the button will be converted into an "),x=i("code"),Gt=r("<a>"),Wt=r(" tag."),jt=m(),K=i("h3"),Yt=r("Styles"),Ft=m(),k=i("p"),Jt=r("Buttons come in three possible "),ct=i("em"),Kt=r("variants"),Nt=r(" - "),ft=i("code"),Qt=r("standard"),Xt=r(", "),ut=i("code"),Zt=r("accent"),te=r(" and "),dt=i("code"),ee=r("hyperlink"),ne=r(". Variants can be specified using the "),pt=i("code"),ae=r("variant"),oe=r(" property."),Lt=m(),G=i("table"),$t=i("thead"),F=i("tr"),mt=i("th"),se=r("Variant"),re=m(),_t=i("th"),le=r("Preview"),ie=m(),ht=i("th"),ce=r("Usage"),fe=m(),L=i("tbody"),M=i("tr"),vt=i("td"),bt=i("code"),ue=r("standard"),de=m(),Et=i("td"),T(W.$$.fragment),pe=m(),kt=i("td"),$e=r("Secondary or alternative actions that are not important to the user."),me=m(),R=i("tr"),yt=i("td"),Bt=i("code"),_e=r("accent"),he=m(),wt=i("td"),T(Y.$$.fragment),ve=m(),Dt=i("td"),be=r("Actions that are important to the user, or are the primary focus a decision."),Ee=m(),U=i("tr"),Tt=i("td"),gt=i("code"),ke=r("hyperlink"),ye=m(),At=i("td"),T(J.$$.fragment),Be=m(),Ct=i("td"),we=r("Low-emphasis, tertiary actions that link to an external resource."),Mt=m(),N=i("h3"),De=r("Disabled Buttons"),Rt=m(),I=i("p"),Te=r("If the button is not meant to be clicked, you can use the "),Ht=i("code"),ge=r("disabled"),Ae=r(" property to visually indicate this. If a button is disabled, it will be unclickable and the "),Ot=i("code"),Ce=r("href"),He=r(" property will be ignored."),Ut=m(),Q=i("h2"),Oe=r("Component API"),Vt=m(),T(X.$$.fragment),this.h()},l(t){a=c(t,"P",{});var u=f(a);o=l(u,"A button gives the user a way to trigger an immediate action. Some buttons are specialized for particular tasks, such as navigation, repeated actions, or presenting menus."),u.forEach(n),p=_(t),B=c(t,"PRE",{class:!0});var zt=f(B);zt.forEach(n),P=_(t),g(v.$$.fragment,t),j=_(t),E=c(t,"H2",{id:!0});var St=f(E);q=l(St,"Usage"),St.forEach(n),y=_(t),b=c(t,"P",{});var D=f(b);s=l(D,"A button can either be a clickable action or a link. By default, a button will be rendered as a standard HTML "),$=c(D,"CODE",{});var It=f($);Z=l(It,"<button>"),It.forEach(n),tt=l(D," element. If an "),z=c(D,"CODE",{});var Se=f(z);et=l(Se,"href"),Se.forEach(n),nt=l(D," property is provided, the button will be converted into an "),x=c(D,"CODE",{});var Ie=f(x);Gt=l(Ie,"<a>"),Ie.forEach(n),Wt=l(D," tag."),D.forEach(n),jt=_(t),K=c(t,"H3",{id:!0});var Pe=f(K);Yt=l(Pe,"Styles"),Pe.forEach(n),Ft=_(t),k=c(t,"P",{});var w=f(k);Jt=l(w,"Buttons come in three possible "),ct=c(w,"EM",{});var je=f(ct);Kt=l(je,"variants"),je.forEach(n),Nt=l(w," - "),ft=c(w,"CODE",{});var Fe=f(ft);Qt=l(Fe,"standard"),Fe.forEach(n),Xt=l(w,", "),ut=c(w,"CODE",{});var Le=f(ut);Zt=l(Le,"accent"),Le.forEach(n),te=l(w," and "),dt=c(w,"CODE",{});var Me=f(dt);ee=l(Me,"hyperlink"),Me.forEach(n),ne=l(w,". Variants can be specified using the "),pt=c(w,"CODE",{});var Re=f(pt);ae=l(Re,"variant"),Re.forEach(n),oe=l(w," property."),w.forEach(n),Lt=_(t),G=c(t,"TABLE",{});var xt=f(G);$t=c(xt,"THEAD",{});var Ue=f($t);F=c(Ue,"TR",{});var at=f(F);mt=c(at,"TH",{});var Ve=f(mt);se=l(Ve,"Variant"),Ve.forEach(n),re=_(at),_t=c(at,"TH",{});var qe=f(_t);le=l(qe,"Preview"),qe.forEach(n),ie=_(at),ht=c(at,"TH",{});var ze=f(ht);ce=l(ze,"Usage"),ze.forEach(n),at.forEach(n),Ue.forEach(n),fe=_(xt),L=c(xt,"TBODY",{});var ot=f(L);M=c(ot,"TR",{});var st=f(M);vt=c(st,"TD",{});var xe=f(vt);bt=c(xe,"CODE",{});var Ge=f(bt);ue=l(Ge,"standard"),Ge.forEach(n),xe.forEach(n),de=_(st),Et=c(st,"TD",{});var We=f(Et);g(W.$$.fragment,We),We.forEach(n),pe=_(st),kt=c(st,"TD",{});var Ye=f(kt);$e=l(Ye,"Secondary or alternative actions that are not important to the user."),Ye.forEach(n),st.forEach(n),me=_(ot),R=c(ot,"TR",{});var rt=f(R);yt=c(rt,"TD",{});var Je=f(yt);Bt=c(Je,"CODE",{});var Ke=f(Bt);_e=l(Ke,"accent"),Ke.forEach(n),Je.forEach(n),he=_(rt),wt=c(rt,"TD",{});var Ne=f(wt);g(Y.$$.fragment,Ne),Ne.forEach(n),ve=_(rt),Dt=c(rt,"TD",{});var Qe=f(Dt);be=l(Qe,"Actions that are important to the user, or are the primary focus a decision."),Qe.forEach(n),rt.forEach(n),Ee=_(ot),U=c(ot,"TR",{});var lt=f(U);Tt=c(lt,"TD",{});var Xe=f(Tt);gt=c(Xe,"CODE",{});var Ze=f(gt);ke=l(Ze,"hyperlink"),Ze.forEach(n),Xe.forEach(n),ye=_(lt),At=c(lt,"TD",{});var tn=f(At);g(J.$$.fragment,tn),tn.forEach(n),Be=_(lt),Ct=c(lt,"TD",{});var en=f(Ct);we=l(en,"Low-emphasis, tertiary actions that link to an external resource."),en.forEach(n),lt.forEach(n),ot.forEach(n),xt.forEach(n),Mt=_(t),N=c(t,"H3",{id:!0});var nn=f(N);De=l(nn,"Disabled Buttons"),nn.forEach(n),Rt=_(t),I=c(t,"P",{});var it=f(I);Te=l(it,"If the button is not meant to be clicked, you can use the "),Ht=c(it,"CODE",{});var an=f(Ht);ge=l(an,"disabled"),an.forEach(n),Ae=l(it," property to visually indicate this. If a button is disabled, it will be unclickable and the "),Ot=c(it,"CODE",{});var on=f(Ot);Ce=l(on,"href"),on.forEach(n),He=l(it," property will be ignored."),it.forEach(n),Ut=_(t),Q=c(t,"H2",{id:!0});var sn=f(Q);Oe=l(sn,"Component API"),sn.forEach(n),Vt=_(t),g(X.$$.fragment,t),this.h()},h(){Pt(B,"class","language-ts"),Pt(E,"id","usage"),Pt(K,"id","styles"),Pt(N,"id","disabled-buttons"),Pt(Q,"id","component-api")},m(t,u){d(t,a,u),e(a,o),d(t,p,u),d(t,B,u),B.innerHTML=S,d(t,P,u),A(v,t,u),d(t,j,u),d(t,E,u),e(E,q),d(t,y,u),d(t,b,u),e(b,s),e(b,$),e($,Z),e(b,tt),e(b,z),e(z,et),e(b,nt),e(b,x),e(x,Gt),e(b,Wt),d(t,jt,u),d(t,K,u),e(K,Yt),d(t,Ft,u),d(t,k,u),e(k,Jt),e(k,ct),e(ct,Kt),e(k,Nt),e(k,ft),e(ft,Qt),e(k,Xt),e(k,ut),e(ut,Zt),e(k,te),e(k,dt),e(dt,ee),e(k,ne),e(k,pt),e(pt,ae),e(k,oe),d(t,Lt,u),d(t,G,u),e(G,$t),e($t,F),e(F,mt),e(mt,se),e(F,re),e(F,_t),e(_t,le),e(F,ie),e(F,ht),e(ht,ce),e(G,fe),e(G,L),e(L,M),e(M,vt),e(vt,bt),e(bt,ue),e(M,de),e(M,Et),A(W,Et,null),e(M,pe),e(M,kt),e(kt,$e),e(L,me),e(L,R),e(R,yt),e(yt,Bt),e(Bt,_e),e(R,he),e(R,wt),A(Y,wt,null),e(R,ve),e(R,Dt),e(Dt,be),e(L,Ee),e(L,U),e(U,Tt),e(Tt,gt),e(gt,ke),e(U,ye),e(U,At),A(J,At,null),e(U,Be),e(U,Ct),e(Ct,we),d(t,Mt,u),d(t,N,u),e(N,De),d(t,Rt,u),d(t,I,u),e(I,Te),e(I,Ht),e(Ht,ge),e(I,Ae),e(I,Ot),e(Ot,Ce),e(I,He),d(t,Ut,u),d(t,Q,u),e(Q,Oe),d(t,Vt,u),A(X,t,u),qt=!0},p(t,[u]){const zt={};u&1&&(zt.$$scope={dirty:u,ctx:t}),v.$set(zt);const St={};u&1&&(St.$$scope={dirty:u,ctx:t}),W.$set(St);const D={};u&1&&(D.$$scope={dirty:u,ctx:t}),Y.$set(D);const It={};u&1&&(It.$$scope={dirty:u,ctx:t}),J.$set(It)},i(t){qt||(C(v.$$.fragment,t),C(W.$$.fragment,t),C(Y.$$.fragment,t),C(J.$$.fragment,t),C(X.$$.fragment,t),qt=!0)},o(t){H(v.$$.fragment,t),H(W.$$.fragment,t),H(Y.$$.fragment,t),H(J.$$.fragment,t),H(X.$$.fragment,t),qt=!1},d(t){t&&n(a),t&&n(p),t&&n(B),t&&n(P),O(v,t),t&&n(j),t&&n(E),t&&n(y),t&&n(b),t&&n(jt),t&&n(K),t&&n(Ft),t&&n(k),t&&n(Lt),t&&n(G),O(W),O(Y),O(J),t&&n(Mt),t&&n(N),t&&n(Rt),t&&n(I),t&&n(Ut),t&&n(Q),t&&n(Vt),O(X,t)}}}class In extends rn{constructor(a){super();ln(this,a,null,Bn,cn,{})}}export{In as default};
