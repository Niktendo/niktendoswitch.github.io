import{S as ta,i as ea,s as sa,e as u,t as c,k as m,w as V,c as d,a as f,h as i,d as a,m as k,x as Z,b as g,g as s,G as r,y as z,q as W,o as J,B as K,H as pa,l as zn,I as oa,as as la,a9 as ca}from"../../../chunks/vendor-9c551f02.js";import"../../../chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js";import{E as In}from"../../../chunks/Expander-e69a98d3.js";/* empty css                                                            */import{S as ia}from"../../../chunks/Showcase-188efe60.js";import{A as ra}from"../../../chunks/APIDocs-0423bc85.js";import"../../../chunks/TooltipWrapper-3e5457be.js";import"../../../chunks/IconButton-c8cc9811.js";import"../../../chunks/Button-a7276b10.js";import"../../../chunks/InfoBar-c9f740b0.js";var ua={props:[{name:"expanded",kind:"let",description:"Determines whether the expander is expanded (open) or not.",type:"boolean",value:"false",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0},{name:"direction",kind:"let",description:"Determines the direction that the expander will extend to.",type:"string",value:'"down"',isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"containerElement",kind:"let",description:"Obtains a bound DOM reference to the expander's container element.",type:"null | HTMLDivElement",value:"null",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0},{name:"headerElement",kind:"let",description:"Obtains a bound DOM reference to the expander's header button element.",type:"null | HTMLDivElement",value:"null",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0},{name:"contentElement",kind:"let",description:"Obtains a bound DOM reference to the expander's content container.",type:"null | HTMLDivElement",value:"null",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0}],slots:[{name:"__default__",default:!0,slot_props:"{}"},{name:"content",default:!1,slot_props:"{}"},{name:"icon",default:!1,slot_props:"{}"}],events:[{type:"dispatched",name:"expand"},{type:"dispatched",name:"collapse"}],typedefs:[],rest_props:{type:"Element",name:"div"}};function da(h){let t;return{c(){t=c("Expander")},l(e){t=i(e,"Expander")},m(e,l){s(e,t,l)},d(e){e&&a(t)}}}function fa(h){let t;return{c(){t=c("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")},l(e){t=i(e,"Lorem ipsum dolor sit amet, consectetur adipiscing elit.")},m(e,l){s(e,t,l)},d(e){e&&a(t)}}}function ma(h){let t;return{c(){t=c("Expander")},l(e){t=i(e,"Expander")},m(e,l){s(e,t,l)},d(e){e&&a(t)}}}function ka(h){let t,e;return{c(){t=new pa,e=zn(),this.h()},l(l){t=oa(l),e=zn(),this.h()},h(){t.a=e},m(l,x){t.m(la,l,x),s(l,e,x)},p:ca,d(l){l&&a(e),l&&t.d()}}}function _a(h){let t;return{c(){t=c("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")},l(e){t=i(e,"Lorem ipsum dolor sit amet, consectetur adipiscing elit.")},m(e,l){s(e,t,l)},d(e){e&&a(t)}}}function xa(h){let t;return{c(){t=c("Expander")},l(e){t=i(e,"Expander")},m(e,l){s(e,t,l)},d(e){e&&a(t)}}}function ha(h){let t;return{c(){t=c("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")},l(e){t=i(e,"Lorem ipsum dolor sit amet, consectetur adipiscing elit.")},m(e,l){s(e,t,l)},d(e){e&&a(t)}}}function va(h){let t,e,l,x,$,w;return t=new In({props:{$$slots:{content:[fa],default:[da]},$$scope:{ctx:h}}}),l=new In({props:{$$slots:{content:[_a],icon:[ka],default:[ma]},$$scope:{ctx:h}}}),$=new In({props:{direction:"up",$$slots:{content:[ha],default:[xa]},$$scope:{ctx:h}}}),{c(){V(t.$$.fragment),e=m(),V(l.$$.fragment),x=m(),V($.$$.fragment)},l(o){Z(t.$$.fragment,o),e=k(o),Z(l.$$.fragment,o),x=k(o),Z($.$$.fragment,o)},m(o,_){z(t,o,_),s(o,e,_),z(l,o,_),s(o,x,_),z($,o,_),w=!0},p(o,_){const E={};_&1&&(E.$$scope={dirty:_,ctx:o}),t.$set(E);const F={};_&1&&(F.$$scope={dirty:_,ctx:o}),l.$set(F);const L={};_&1&&(L.$$scope={dirty:_,ctx:o}),$.$set(L)},i(o){w||(W(t.$$.fragment,o),W(l.$$.fragment,o),W($.$$.fragment,o),w=!0)},o(o){J(t.$$.fragment,o),J(l.$$.fragment,o),J($.$$.fragment,o),w=!1},d(o){K(t,o),o&&a(e),K(l,o),o&&a(x),K($,o)}}}function $a(h){let t,e,l,x,$='<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Expander <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>',w,o,_,E,F,L,b,kn,S,_n,xn,N,H,Wn=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span><span class="token punctuation">></span></span>
    Header
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">svelte:</span>fragment</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        Content
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">svelte:</span>fragment</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`,Q,T,hn,X,C,vn,B,$n,En,nn,P,Jn=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span> <span class="token attr-name">expanded</span><span class="token punctuation">></span></span>
    I am expanded by default.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`,an,M,gn,tn,v,wn,R,bn,Cn,Y,yn,Dn,G,Ln,Hn,en,q,Kn=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span> <span class="token attr-name">direction</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>up<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    I am expanded by default.
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`,sn,A,Tn,pn,y,Pn,U,Mn,qn,on,I,Nn=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Expander</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- https://github.com/microsoft/fluentui-system-icons --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>16<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 16 16<span class="token punctuation">"</span></span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2000/svg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M7.85355 0.146447C7.65829 -0.0488155 7.34171 -0.0488155 7.14645 0.146447C6.95118 0.341709 6.95118 0.658291 7.14645 0.853553L8.29603 2.00314C4.80056 2.11088 2 4.97839 2 8.5C2 12.0899 4.91015 15 8.5 15C12.0899 15 15 12.0899 15 8.5C15 8.48656 15 8.47313 14.9999 8.45971C14.9983 8.2001 14.7805 8 14.5209 8H14.4782C14.2093 8 14 8.23107 14 8.5C14 11.5376 11.5376 14 8.5 14C5.46243 14 3 11.5376 3 8.5C3 5.53311 5.34917 3.11491 8.28892 3.00398L7.14645 4.14645C6.95118 4.34171 6.95118 4.65829 7.14645 4.85355C7.34171 5.04882 7.65829 5.04882 7.85355 4.85355L9.85355 2.85355C10.0488 2.65829 10.0488 2.34171 9.85355 2.14645L7.85355 0.146447ZM11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355L6.64645 8.35355C6.45118 8.15829 6.45118 7.84171 6.64645 7.64645C6.84171 7.45118 7.15829 7.45118 7.35355 7.64645L8.5 8.79289L11.1464 6.14645C11.3417 5.95118 11.6583 5.95118 11.8536 6.14645Z<span class="token punctuation">"</span></span> <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span>
    Expander
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">svelte:</span>fragment</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">svelte:</span>fragment</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Expander</span><span class="token punctuation">></span></span></code>`,ln,O,An,cn,j,rn;return o=new ia({props:{style:"block-size: 360px;",repl:"78aa3269aba34022a958311963520428",$$slots:{default:[va]},$$scope:{ctx:h}}}),j=new ra({props:{data:ua}}),{c(){t=u("p"),e=c("Expanders are controls that display a header and a collapsable content area. The content area can be expanded clicking on the header."),l=m(),x=u("pre"),w=m(),V(o.$$.fragment),_=m(),E=u("h2"),F=c("Usage"),L=m(),b=u("p"),kn=c("A basic expander expects a header and contents. The expander\u2019s default slot will be rendered into the header, while content can be rendered into the "),S=u("code"),_n=c("content"),xn=c(" slot."),N=m(),H=u("pre"),Q=m(),T=u("h3"),hn=c("Controlling Expansion"),X=m(),C=u("p"),vn=c("Expanders can be either expanded or collapsed. This can be controlled by setting the "),B=u("code"),$n=c("expanded"),En=c(" property."),nn=m(),P=u("pre"),an=m(),M=u("h3"),gn=c("Directions"),tn=m(),v=u("p"),wn=c("An expander doesn\u2019t have to expand downwards. You can control an expander\u2019s expansion direction using the "),R=u("code"),bn=c("direction"),Cn=c(" property. To create an upwards-expanding expander, set "),Y=u("code"),yn=c("direction"),Dn=c(" to "),G=u("code"),Ln=c("up"),Hn=c("."),en=m(),q=u("pre"),sn=m(),A=u("h3"),Tn=c("Adding an Icon"),pn=m(),y=u("p"),Pn=c("You can easily add an icon to an expander\u2019s header using the "),U=u("code"),Mn=c("icon"),qn=c(" slot. Passing in an SVG element will render it into the header with 16x16 dimensions."),on=m(),I=u("pre"),ln=m(),O=u("h2"),An=c("Component API"),cn=m(),V(j.$$.fragment),this.h()},l(n){t=d(n,"P",{});var p=f(t);e=i(p,"Expanders are controls that display a header and a collapsable content area. The content area can be expanded clicking on the header."),p.forEach(a),l=k(n),x=d(n,"PRE",{class:!0});var un=f(x);un.forEach(a),w=k(n),Z(o.$$.fragment,n),_=k(n),E=d(n,"H2",{id:!0});var On=f(E);F=i(On,"Usage"),On.forEach(a),L=k(n),b=d(n,"P",{});var dn=f(b);kn=i(dn,"A basic expander expects a header and contents. The expander\u2019s default slot will be rendered into the header, while content can be rendered into the "),S=d(dn,"CODE",{});var jn=f(S);_n=i(jn,"content"),jn.forEach(a),xn=i(dn," slot."),dn.forEach(a),N=k(n),H=d(n,"PRE",{class:!0});var Qn=f(H);Qn.forEach(a),Q=k(n),T=d(n,"H3",{id:!0});var Fn=f(T);hn=i(Fn,"Controlling Expansion"),Fn.forEach(a),X=k(n),C=d(n,"P",{});var fn=f(C);vn=i(fn,"Expanders can be either expanded or collapsed. This can be controlled by setting the "),B=d(fn,"CODE",{});var Sn=f(B);$n=i(Sn,"expanded"),Sn.forEach(a),En=i(fn," property."),fn.forEach(a),nn=k(n),P=d(n,"PRE",{class:!0});var Xn=f(P);Xn.forEach(a),an=k(n),M=d(n,"H3",{id:!0});var Bn=f(M);gn=i(Bn,"Directions"),Bn.forEach(a),tn=k(n),v=d(n,"P",{});var D=f(v);wn=i(D,"An expander doesn\u2019t have to expand downwards. You can control an expander\u2019s expansion direction using the "),R=d(D,"CODE",{});var Rn=f(R);bn=i(Rn,"direction"),Rn.forEach(a),Cn=i(D," property. To create an upwards-expanding expander, set "),Y=d(D,"CODE",{});var Yn=f(Y);yn=i(Yn,"direction"),Yn.forEach(a),Dn=i(D," to "),G=d(D,"CODE",{});var Gn=f(G);Ln=i(Gn,"up"),Gn.forEach(a),Hn=i(D,"."),D.forEach(a),en=k(n),q=d(n,"PRE",{class:!0});var na=f(q);na.forEach(a),sn=k(n),A=d(n,"H3",{id:!0});var Un=f(A);Tn=i(Un,"Adding an Icon"),Un.forEach(a),pn=k(n),y=d(n,"P",{});var mn=f(y);Pn=i(mn,"You can easily add an icon to an expander\u2019s header using the "),U=d(mn,"CODE",{});var Vn=f(U);Mn=i(Vn,"icon"),Vn.forEach(a),qn=i(mn," slot. Passing in an SVG element will render it into the header with 16x16 dimensions."),mn.forEach(a),on=k(n),I=d(n,"PRE",{class:!0});var aa=f(I);aa.forEach(a),ln=k(n),O=d(n,"H2",{id:!0});var Zn=f(O);An=i(Zn,"Component API"),Zn.forEach(a),cn=k(n),Z(j.$$.fragment,n),this.h()},h(){g(x,"class","language-ts"),g(E,"id","usage"),g(H,"class","language-html"),g(T,"id","controlling-expansion"),g(P,"class","language-html"),g(M,"id","directions"),g(q,"class","language-html"),g(A,"id","adding-an-icon"),g(I,"class","language-html"),g(O,"id","component-api")},m(n,p){s(n,t,p),r(t,e),s(n,l,p),s(n,x,p),x.innerHTML=$,s(n,w,p),z(o,n,p),s(n,_,p),s(n,E,p),r(E,F),s(n,L,p),s(n,b,p),r(b,kn),r(b,S),r(S,_n),r(b,xn),s(n,N,p),s(n,H,p),H.innerHTML=Wn,s(n,Q,p),s(n,T,p),r(T,hn),s(n,X,p),s(n,C,p),r(C,vn),r(C,B),r(B,$n),r(C,En),s(n,nn,p),s(n,P,p),P.innerHTML=Jn,s(n,an,p),s(n,M,p),r(M,gn),s(n,tn,p),s(n,v,p),r(v,wn),r(v,R),r(R,bn),r(v,Cn),r(v,Y),r(Y,yn),r(v,Dn),r(v,G),r(G,Ln),r(v,Hn),s(n,en,p),s(n,q,p),q.innerHTML=Kn,s(n,sn,p),s(n,A,p),r(A,Tn),s(n,pn,p),s(n,y,p),r(y,Pn),r(y,U),r(U,Mn),r(y,qn),s(n,on,p),s(n,I,p),I.innerHTML=Nn,s(n,ln,p),s(n,O,p),r(O,An),s(n,cn,p),z(j,n,p),rn=!0},p(n,[p]){const un={};p&1&&(un.$$scope={dirty:p,ctx:n}),o.$set(un)},i(n){rn||(W(o.$$.fragment,n),W(j.$$.fragment,n),rn=!0)},o(n){J(o.$$.fragment,n),J(j.$$.fragment,n),rn=!1},d(n){n&&a(t),n&&a(l),n&&a(x),n&&a(w),K(o,n),n&&a(_),n&&a(E),n&&a(L),n&&a(b),n&&a(N),n&&a(H),n&&a(Q),n&&a(T),n&&a(X),n&&a(C),n&&a(nn),n&&a(P),n&&a(an),n&&a(M),n&&a(tn),n&&a(v),n&&a(en),n&&a(q),n&&a(sn),n&&a(A),n&&a(pn),n&&a(y),n&&a(on),n&&a(I),n&&a(ln),n&&a(O),n&&a(cn),K(j,n)}}}class Pa extends ta{constructor(t){super();ea(this,t,null,$a,sa,{})}}export{Pa as default};
