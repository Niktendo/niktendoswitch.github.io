import{S as At,i as Rt,s as It,e as u,t as l,k,w as O,c as r,a as i,h as o,d as t,m,x as N,b as v,g as n,G as a,y as V,q as G,o as U,B as W}from"../../chunks/vendor-9c551f02.js";import{B as $t}from"../../chunks/Button-a7276b10.js";import"../../chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js";import{I as bt}from"../../chunks/InfoBar-c9f740b0.js";import{C as ot}from"../../chunks/CopyBox-4b49697f.js";/* empty css                                                         */import"../../chunks/TextBoxButton-cdab09ab.js";function qt(_){let p;return{c(){p=l("Learn Svelte")},l(c){p=o(c,"Learn Svelte")},m(c,f){n(c,p,f)},d(c){c&&t(p)}}}function Dt(_){let p,c;return p=new $t({props:{slot:"action",variant:"accent",$$slots:{default:[qt]},$$scope:{ctx:_}}}),{c(){O(p.$$.fragment)},l(f){N(p.$$.fragment,f)},m(f,h){V(p,f,h),c=!0},p(f,h){const d={};h&1&&(d.$$scope={dirty:h,ctx:f}),p.$set(d)},i(f){c||(G(p.$$.fragment,f),c=!0)},o(f){U(p.$$.fragment,f),c=!1},d(f){W(p,f)}}}function Ft(_){let p,c,f,h;return{c(){p=l("In some cases, your bundler may not have the capability to resolve CSS files. Both the default Svelte template and the SvelteKit starter project (Vite) have this ability, however you might need to install a "),c=u("a"),f=l("dedicated bundler plugin"),h=l(" to import CSS."),this.h()},l(d){p=o(d,"In some cases, your bundler may not have the capability to resolve CSS files. Both the default Svelte template and the SvelteKit starter project (Vite) have this ability, however you might need to install a "),c=r(d,"A",{href:!0,target:!0,rel:!0});var g=i(c);f=o(g,"dedicated bundler plugin"),g.forEach(t),h=o(d," to import CSS."),this.h()},h(){v(c,"href","https://gist.github.com/Tropix126/6306afeffbcc551425d5658b856e8c4c"),v(c,"target","_blank"),v(c,"rel","noreferrer noopener")},m(d,g){n(d,p,g),n(d,c,g),a(c,f),n(d,h,g)},d(d){d&&t(p),d&&t(c),d&&t(h)}}}function Ht(_){let p;return{c(){p=l("View this in the REPL")},l(c){p=o(c,"View this in the REPL")},m(c,f){n(c,p,f)},d(c){c&&t(p)}}}function Kt(_){let p,c,f,h,d,g,E,rs,S,As,is,z,Rs,fs,w,Is,A,ks,C,qs,R,ms,x,Ds,I,vs,L,Fs,ds,J,Hs,hs,$,ss,Ks,Ms,ts,Os,Ns,gs,q,Et=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token string">"fluent-svelte/theme.css"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code>`,ys,P,_s,Q,Vs,$s,D,St=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"https://unpkg.com/fluent-svelte/theme.css"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>
	<span class="token comment">/* ...or @import url("https://cdn.jsdelivr.net/npm/fluent-svelte/theme.css"); */</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`,bs,B,Gs,Es,X,Us,Ss,F,wt=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Button<span class="token punctuation">,</span> Checkbox <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Checkbox</span><span class="token punctuation">></span></span>Check me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Checkbox</span><span class="token punctuation">></span></span></code>`,ws,Y,Ws,Cs,H,Ct=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> Fluent <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Fluent.Button</span><span class="token punctuation">></span></span>Click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Fluent.Button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Fluent.Checkbox</span><span class="token punctuation">></span></span>Check me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Fluent.Checkbox</span><span class="token punctuation">></span></span></code>`,xs,j,zs,Ls,b,es,Js,Qs,K,Xs,Ys,Ps,y,Zs,ns,st,tt,as,et,nt,Bs,M,xt=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Button<span class="token punctuation">,</span> Checkbox <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span><span class="token punctuation">></span></span>Click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"https://unpkg.com/fluent-svelte/theme.css"</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>

	<span class="token comment">/* Some base styles to get things looking right. */</span>
	<span class="token selector">:global(body)</span> <span class="token punctuation">&#123;</span>
		<span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--fds-solid-background-base<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--fds-text-primary<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`,js,T,Ts;return E=new bt({props:{severity:"attention",title:"Before We Start",message:"This tutorial assumes you have basic knowledge of Svelte.",$$slots:{action:[Dt]},$$scope:{ctx:_}}}),A=new ot({props:{value:"npm i --save-dev fluent-svelte"}}),R=new ot({props:{value:"pnpm i --save-dev fluent-svelte"}}),I=new ot({props:{value:"yarn add --dev fluent-svelte"}}),P=new bt({props:{title:"Bundler Support",severity:"caution",$$slots:{default:[Ft]},$$scope:{ctx:_}}}),T=new $t({props:{variant:"hyperlink",href:"https://svelte.dev/repl/2a30b6d202d24fb6b14783132b86b706",target:"_blank",rel:"noreferrer noopener",$$slots:{default:[Ht]},$$scope:{ctx:_}}}),{c(){p=u("p"),c=l("This page will guide you through the process of adding fluent-svelte to your existing Svelte project. If you don\u2019t have a Svelte or SvelteKit project already, you can create one using "),f=u("a"),h=l("this guide"),d=l("."),g=k(),O(E.$$.fragment),rs=k(),S=u("h3"),As=l("Step 1: Install the Library"),is=k(),z=u("p"),Rs=l("This will install fluent-svelte and it\u2019s required dependencies. This can be done using a package manager of your choice."),fs=k(),w=u("label"),Is=l(`npm
    `),O(A.$$.fragment),ks=k(),C=u("label"),qs=l(`pnpm
    `),O(R.$$.fragment),ms=k(),x=u("label"),Ds=l(`yarn
    `),O(I.$$.fragment),vs=k(),L=u("h3"),Fs=l("Step 2: Add Theme File"),ds=k(),J=u("p"),Hs=l("Fluent Svelte components use a set of common resources to style their elements. These values are defined in a theme file that must be imported into your project before components can render properly."),hs=k(),$=u("p"),ss=u("code"),Ks=l("src/App.svelte"),Ms=l(" (or "),ts=u("code"),Os=l("src/routes/__layout.svelte"),Ns=l(" if using SvelteKit)"),gs=k(),q=u("pre"),ys=k(),O(P.$$.fragment),_s=k(),Q=u("p"),Vs=l("Alternatively, you can import the theme file from a CDN (though this generally isn\u2019t recommended)."),$s=k(),D=u("pre"),bs=k(),B=u("h3"),Gs=l("Step 3: Importing a Component"),Es=k(),X=u("p"),Us=l("Components are exported from a single index file in the library. They can be imported and used in your project like so:"),Ss=k(),F=u("pre"),ws=k(),Y=u("p"),Ws=l("Alternatively you can import under a namespace:"),Cs=k(),H=u("pre"),xs=k(),j=u("h3"),zs=l("Svelte REPL Usage"),Ls=k(),b=u("p"),es=u("code"),Js=l("fluent-svelte"),Qs=l(" components can also be imported into the "),K=u("a"),Xs=l("Svelte REPL"),Ys=l("."),Ps=k(),y=u("p"),Zs=l("In the REPL, packages are automatically installed by name when using an "),ns=u("code"),st=l("import"),tt=l(" statement, so the installation step can be skipped. Because the REPL doesn\u2019t support importing CSS in "),as=u("code"),et=l("node_modules"),nt=l(", we\u2019ll need to import the theme file through a CDN."),Bs=k(),M=u("pre"),js=k(),O(T.$$.fragment),this.h()},l(s){p=r(s,"P",{});var e=i(p);c=o(e,"This page will guide you through the process of adding fluent-svelte to your existing Svelte project. If you don\u2019t have a Svelte or SvelteKit project already, you can create one using "),f=r(e,"A",{href:!0,rel:!0});var ps=i(f);h=o(ps,"this guide"),ps.forEach(t),d=o(e,"."),e.forEach(t),g=m(s),N(E.$$.fragment,s),rs=m(s),S=r(s,"H3",{id:!0,class:!0});var ls=i(S);As=o(ls,"Step 1: Install the Library"),ls.forEach(t),is=m(s),z=r(s,"P",{});var os=i(z);Rs=o(os,"This will install fluent-svelte and it\u2019s required dependencies. This can be done using a package manager of your choice."),os.forEach(t),fs=m(s),w=r(s,"LABEL",{class:!0});var at=i(w);Is=o(at,`npm
    `),N(A.$$.fragment,at),at.forEach(t),ks=m(s),C=r(s,"LABEL",{class:!0});var pt=i(C);qs=o(pt,`pnpm
    `),N(R.$$.fragment,pt),pt.forEach(t),ms=m(s),x=r(s,"LABEL",{class:!0});var lt=i(x);Ds=o(lt,`yarn
    `),N(I.$$.fragment,lt),lt.forEach(t),vs=m(s),L=r(s,"H3",{id:!0,class:!0});var ct=i(L);Fs=o(ct,"Step 2: Add Theme File"),ct.forEach(t),ds=m(s),J=r(s,"P",{});var ut=i(J);Hs=o(ut,"Fluent Svelte components use a set of common resources to style their elements. These values are defined in a theme file that must be imported into your project before components can render properly."),ut.forEach(t),hs=m(s),$=r(s,"P",{});var cs=i($);ss=r(cs,"CODE",{});var rt=i(ss);Ks=o(rt,"src/App.svelte"),rt.forEach(t),Ms=o(cs," (or "),ts=r(cs,"CODE",{});var it=i(ts);Os=o(it,"src/routes/__layout.svelte"),it.forEach(t),Ns=o(cs," if using SvelteKit)"),cs.forEach(t),gs=m(s),q=r(s,"PRE",{class:!0});var Lt=i(q);Lt.forEach(t),ys=m(s),N(P.$$.fragment,s),_s=m(s),Q=r(s,"P",{});var ft=i(Q);Vs=o(ft,"Alternatively, you can import the theme file from a CDN (though this generally isn\u2019t recommended)."),ft.forEach(t),$s=m(s),D=r(s,"PRE",{class:!0});var Pt=i(D);Pt.forEach(t),bs=m(s),B=r(s,"H3",{id:!0,class:!0});var kt=i(B);Gs=o(kt,"Step 3: Importing a Component"),kt.forEach(t),Es=m(s),X=r(s,"P",{});var mt=i(X);Us=o(mt,"Components are exported from a single index file in the library. They can be imported and used in your project like so:"),mt.forEach(t),Ss=m(s),F=r(s,"PRE",{class:!0});var Bt=i(F);Bt.forEach(t),ws=m(s),Y=r(s,"P",{});var vt=i(Y);Ws=o(vt,"Alternatively you can import under a namespace:"),vt.forEach(t),Cs=m(s),H=r(s,"PRE",{class:!0});var jt=i(H);jt.forEach(t),xs=m(s),j=r(s,"H3",{id:!0,class:!0});var dt=i(j);zs=o(dt,"Svelte REPL Usage"),dt.forEach(t),Ls=m(s),b=r(s,"P",{});var us=i(b);es=r(us,"CODE",{});var ht=i(es);Js=o(ht,"fluent-svelte"),ht.forEach(t),Qs=o(us," components can also be imported into the "),K=r(us,"A",{href:!0,rel:!0});var gt=i(K);Xs=o(gt,"Svelte REPL"),gt.forEach(t),Ys=o(us,"."),us.forEach(t),Ps=m(s),y=r(s,"P",{});var Z=i(y);Zs=o(Z,"In the REPL, packages are automatically installed by name when using an "),ns=r(Z,"CODE",{});var yt=i(ns);st=o(yt,"import"),yt.forEach(t),tt=o(Z," statement, so the installation step can be skipped. Because the REPL doesn\u2019t support importing CSS in "),as=r(Z,"CODE",{});var _t=i(as);et=o(_t,"node_modules"),_t.forEach(t),nt=o(Z,", we\u2019ll need to import the theme file through a CDN."),Z.forEach(t),Bs=m(s),M=r(s,"PRE",{class:!0});var Tt=i(M);Tt.forEach(t),js=m(s),N(T.$$.fragment,s),this.h()},h(){v(f,"href","https://svelte.dev/blog/the-easiest-way-to-get-started"),v(f,"rel","nofollow"),v(S,"id","step-1-install-the-library"),v(S,"class","svelte-dqkg8w"),v(w,"class","svelte-dqkg8w"),v(C,"class","svelte-dqkg8w"),v(x,"class","svelte-dqkg8w"),v(L,"id","step-2-add-theme-file"),v(L,"class","svelte-dqkg8w"),v(q,"class","language-html"),v(D,"class","language-html"),v(B,"id","step-3-importing-a-component"),v(B,"class","svelte-dqkg8w"),v(F,"class","language-html"),v(H,"class","language-html"),v(j,"id","svelte-repl-usage"),v(j,"class","svelte-dqkg8w"),v(K,"href","https://svelte.dev/repl/"),v(K,"rel","nofollow"),v(M,"class","language-html")},m(s,e){n(s,p,e),a(p,c),a(p,f),a(f,h),a(p,d),n(s,g,e),V(E,s,e),n(s,rs,e),n(s,S,e),a(S,As),n(s,is,e),n(s,z,e),a(z,Rs),n(s,fs,e),n(s,w,e),a(w,Is),V(A,w,null),n(s,ks,e),n(s,C,e),a(C,qs),V(R,C,null),n(s,ms,e),n(s,x,e),a(x,Ds),V(I,x,null),n(s,vs,e),n(s,L,e),a(L,Fs),n(s,ds,e),n(s,J,e),a(J,Hs),n(s,hs,e),n(s,$,e),a($,ss),a(ss,Ks),a($,Ms),a($,ts),a(ts,Os),a($,Ns),n(s,gs,e),n(s,q,e),q.innerHTML=Et,n(s,ys,e),V(P,s,e),n(s,_s,e),n(s,Q,e),a(Q,Vs),n(s,$s,e),n(s,D,e),D.innerHTML=St,n(s,bs,e),n(s,B,e),a(B,Gs),n(s,Es,e),n(s,X,e),a(X,Us),n(s,Ss,e),n(s,F,e),F.innerHTML=wt,n(s,ws,e),n(s,Y,e),a(Y,Ws),n(s,Cs,e),n(s,H,e),H.innerHTML=Ct,n(s,xs,e),n(s,j,e),a(j,zs),n(s,Ls,e),n(s,b,e),a(b,es),a(es,Js),a(b,Qs),a(b,K),a(K,Xs),a(b,Ys),n(s,Ps,e),n(s,y,e),a(y,Zs),a(y,ns),a(ns,st),a(y,tt),a(y,as),a(as,et),a(y,nt),n(s,Bs,e),n(s,M,e),M.innerHTML=xt,n(s,js,e),V(T,s,e),Ts=!0},p(s,[e]){const ps={};e&1&&(ps.$$scope={dirty:e,ctx:s}),E.$set(ps);const ls={};e&1&&(ls.$$scope={dirty:e,ctx:s}),P.$set(ls);const os={};e&1&&(os.$$scope={dirty:e,ctx:s}),T.$set(os)},i(s){Ts||(G(E.$$.fragment,s),G(A.$$.fragment,s),G(R.$$.fragment,s),G(I.$$.fragment,s),G(P.$$.fragment,s),G(T.$$.fragment,s),Ts=!0)},o(s){U(E.$$.fragment,s),U(A.$$.fragment,s),U(R.$$.fragment,s),U(I.$$.fragment,s),U(P.$$.fragment,s),U(T.$$.fragment,s),Ts=!1},d(s){s&&t(p),s&&t(g),W(E,s),s&&t(rs),s&&t(S),s&&t(is),s&&t(z),s&&t(fs),s&&t(w),W(A),s&&t(ks),s&&t(C),W(R),s&&t(ms),s&&t(x),W(I),s&&t(vs),s&&t(L),s&&t(ds),s&&t(J),s&&t(hs),s&&t($),s&&t(gs),s&&t(q),s&&t(ys),W(P,s),s&&t(_s),s&&t(Q),s&&t($s),s&&t(D),s&&t(bs),s&&t(B),s&&t(Es),s&&t(X),s&&t(Ss),s&&t(F),s&&t(ws),s&&t(Y),s&&t(Cs),s&&t(H),s&&t(xs),s&&t(j),s&&t(Ls),s&&t(b),s&&t(Ps),s&&t(y),s&&t(Bs),s&&t(M),s&&t(js),W(T,s)}}}class zt extends At{constructor(p){super();Rt(this,p,null,Kt,It,{})}}export{zt as default};