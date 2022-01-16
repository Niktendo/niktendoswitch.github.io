import{S as zt,i as Gt,s as Wt,e as i,t as $,k as m,w as I,c,a as f,h as g,d as e,m as _,x as P,b as t5,g as v,G as n,y as M,q as k,o as b,B as x,a9 as Ht,l as Ot,n as St,p as jt,O as At}from"../../../chunks/vendor-9c551f02.js";import"../../../chunks/ContextMenu.svelte_svelte_type_style_lang-806ab04e.js";import{a as K}from"../../../chunks/InfoBar-c9f740b0.js";/* empty css                                                            */import{S as Yt}from"../../../chunks/Showcase-188efe60.js";import{A as Jt}from"../../../chunks/APIDocs-0423bc85.js";import"../../../chunks/TooltipWrapper-3e5457be.js";import"../../../chunks/IconButton-c8cc9811.js";import"../../../chunks/Button-a7276b10.js";var Kt={props:[{name:"severity",kind:"let",description:"Indicates the severity color of the badge.",type:"string",value:'"attention"',isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!1},{name:"element",kind:"let",description:"Obtains a bound DOM reference to the badge's element.",type:"null | HTMLSpanElement",value:"null",isFunction:!1,isFunctionDeclaration:!1,constant:!1,reactive:!0}],slots:[{name:"__default__",default:!0,fallback:`{#if severity === "attention"}
			<svg {...svgProps} viewBox="162 118 701 789">
				<path
					fill="currentColor"
					d="M862.5,680C862.5,687.333 861.083,694.25 858.25,700.75C855.417,707.25 851.583,712.917 846.75,717.75C841.917,722.583 836.25,726.417 829.75,729.25C823.25,732.083 816.333,733.5 809,733.5C800,733.5 791.333,731.167 783,726.5L565.5,603.5L565.5,853.5C565.5,860.833 564.083,867.75 561.25,874.25C558.417,880.75 554.583,886.333 549.75,891C544.917,895.667 539.25,899.417 532.75,902.25C526.25,905.083 519.333,906.5 512,906.5C504.667,906.5 497.75,905.083 491.25,902.25C484.75,899.417 479.083,895.667 474.25,891C469.417,886.333 465.583,880.75 462.75,874.25C459.917,867.75 458.5,860.833 458.5,853.5L458.5,603.5L241,726.5C232.667,731.167 224,733.5 215,733.5C207.667,733.5 200.75,732.083 194.25,729.25C187.75,726.417 182.083,722.583 177.25,717.75C172.417,712.917 168.583,707.25 165.75,700.75C162.917,694.25 161.5,687.333 161.5,680C161.5,670.667 164,661.75 169,653.25C174,644.75 180.5,638.167 188.5,633.5L403.5,512L188.5,390.5C180.5,385.833 174,379.25 169,370.75C164,362.25 161.5,353.333 161.5,344C161.5,336.667 162.917,329.75 165.75,323.25C168.583,316.75 172.417,311.083 177.25,306.25C182.083,301.417 187.75,297.583 194.25,294.75C200.75,291.917 207.667,290.5 215,290.5C224.667,290.5 233.333,292.833 241,297.5L458.5,420.5L458.5,170.5C458.5,163.167 459.917,156.25 462.75,149.75C465.583,143.25 469.417,137.667 474.25,133C479.083,128.333 484.75,124.583 491.25,121.75C497.75,118.917 504.667,117.5 512,117.5C519.333,117.5 526.25,118.917 532.75,121.75C539.25,124.583 544.917,128.333 549.75,133C554.583,137.667 558.417,143.25 561.25,149.75C564.083,156.25 565.5,163.167 565.5,170.5L565.5,420.5L783,297.5C791.333,292.833 800,290.5 809,290.5C816.333,290.5 823.25,291.917 829.75,294.75C836.25,297.583 841.917,301.417 846.75,306.25C851.583,311.083 855.417,316.75 858.25,323.25C861.083,329.75 862.5,336.667 862.5,344C862.5,353.333 860,362.25 855,370.75C850,379.25 843.5,385.833 835.5,390.5L620.5,512L835.5,633.5C843.5,638.167 850,644.75 855,653.25C860,661.75 862.5,670.667 862.5,680Z"
				/>
			</svg>
		{:else if severity === "success"}
			<svg {...svgProps} viewBox="118 245 790 577">
				<path
					fill="currentColor"
					d="M117.5,554.5C117.5,547.167 118.917,540.25 121.75,533.75C124.583,527.25 128.417,521.583 133.25,516.75C138.083,511.917 143.75,508.083 150.25,505.25C156.75,502.417 163.667,501 171,501C185.333,501 197.833,506.333 208.5,517L384,692.5L815.5,261C826.167,250.333 838.833,245 853.5,245C860.833,245 867.75,246.417 874.25,249.25C880.75,252.083 886.417,256 891.25,261C896.083,266 899.917,271.75 902.75,278.25C905.583,284.75 907,291.5 907,298.5C907,313.167 901.667,325.833 891,336.5L421.5,805.5C416.5,810.5 410.75,814.417 404.25,817.25C397.75,820.083 391,821.5 384,821.5C369.667,821.5 357.167,816.167 346.5,805.5L133,592.5C122.667,582.167 117.5,569.5 117.5,554.5Z"
				/>
			</svg>
		{:else if severity === "caution"}
			<svg {...svgProps} viewBox="406 86 213 875">
				<path
					fill="currentColor"
					d="M426.5,512L426.5,170.5C426.5,158.833 428.75,147.833 433.25,137.5C437.75,127.167 443.917,118.167 451.75,110.5C459.583,102.833 468.667,96.75 479,92.25C489.333,87.75 500.333,85.5 512,85.5C523.667,85.5 534.667,87.75 545,92.25C555.333,96.75 564.417,102.833 572.25,110.5C580.083,118.167 586.25,127.167 590.75,137.5C595.25,147.833 597.5,158.833 597.5,170.5L597.5,512C597.5,523.667 595.25,534.667 590.75,545C586.25,555.333 580.083,564.417 572.25,572.25C564.417,580.083 555.333,586.25 545,590.75C534.667,595.25 523.667,597.5 512,597.5C500.333,597.5 489.333,595.25 479,590.75C468.667,586.25 459.583,580.083 451.75,572.25C443.917,564.417 437.75,555.333 433.25,545C428.75,534.667 426.5,523.667 426.5,512ZM405.5,853.5C405.5,838.833 408.333,825 414,812C419.667,799 427.333,787.667 437,778C446.667,768.333 457.917,760.667 470.75,755C483.583,749.333 497.333,746.5 512,746.5C526.667,746.5 540.417,749.333 553.25,755C566.083,760.667 577.333,768.333 587,778C596.667,787.667 604.333,799 610,812C615.667,825 618.5,838.833 618.5,853.5C618.5,868.167 615.667,881.917 610,894.75C604.333,907.583 596.667,918.833 587,928.5C577.333,938.167 566,945.833 553,951.5C540,957.167 526.333,960 512,960C497.333,960 483.583,957.167 470.75,951.5C457.917,945.833 446.667,938.167 437,928.5C427.333,918.833 419.667,907.583 414,894.75C408.333,881.917 405.5,868.167 405.5,853.5Z"
				/>
			</svg>
		{:else if severity === "critical"}
			<svg {...svgProps} viewBox="172 171 683 683">
				<path
					fill="currentColor"
					d="M512.5,587.5L262.5,838C252.167,848.333 239.5,853.5 224.5,853.5C209.5,853.5 196.917,848.417 186.75,838.25C176.583,828.083 171.5,815.5 171.5,800.5C171.5,785.5 176.667,772.833 187,762.5L437,512L187,262C176.667,251.667 171.5,239.167 171.5,224.5C171.5,217.167 172.833,210.167 175.5,203.5C178.167,196.833 181.917,191.167 186.75,186.5C191.583,181.833 197.167,178.083 203.5,175.25C209.833,172.417 216.833,171 224.5,171C239.167,171 251.667,176.167 262,186.5L512.5,437L762.5,186.5C773.167,175.833 785.833,170.5 800.5,170.5C807.833,170.5 814.75,171.917 821.25,174.75C827.75,177.583 833.417,181.417 838.25,186.25C843.083,191.083 846.833,196.75 849.5,203.25C852.167,209.75 853.5,216.667 853.5,224C853.5,238.667 848.333,251.167 838,261.5L587.5,512L838,762.5C848.667,773.167 854,785.833 854,800.5C854,807.833 852.583,814.667 849.75,821C846.917,827.333 843.083,832.917 838.25,837.75C833.417,842.583 827.75,846.417 821.25,849.25C814.75,852.083 807.833,853.5 800.5,853.5C785.5,853.5 772.833,848.333 762.5,838Z"
				/>
			</svg>
		{:else if severity === "information"}
			<svg {...svgProps} viewBox="406 64 213 875">
				<path
					fill="currentColor"
					d="M405.5,170.5C405.5,156.167 408.333,142.5 414,129.5C419.667,116.5 427.333,105.167 437,95.5C446.667,85.8334 457.917,78.1667 470.75,72.5C483.583,66.8334 497.333,64.0001 512,64C526.333,64.0001 540,66.8334 553,72.5C566,78.1667 577.333,85.8334 587,95.5C596.667,105.167 604.333,116.5 610,129.5C615.667,142.5 618.5,156.167 618.5,170.5C618.5,185.167 615.667,199 610,212C604.333,225 596.667,236.333 587,246C577.333,255.667 566.083,263.333 553.25,269C540.417,274.667 526.667,277.5 512,277.5C497.333,277.5 483.583,274.667 470.75,269C457.917,263.333 446.667,255.667 437,246C427.333,236.333 419.667,225 414,212C408.333,199 405.5,185.167 405.5,170.5ZM426.5,853.5L426.5,512C426.5,500.333 428.75,489.333 433.25,479C437.75,468.667 443.917,459.583 451.75,451.75C459.583,443.917 468.667,437.75 479,433.25C489.333,428.75 500.333,426.5 512,426.5C523.667,426.5 534.667,428.75 545,433.25C555.333,437.75 564.417,443.917 572.25,451.75C580.083,459.583 586.25,468.667 590.75,479C595.25,489.333 597.5,500.333 597.5,512L597.5,853.5C597.5,865.167 595.25,876.167 590.75,886.5C586.25,896.833 580.083,905.833 572.25,913.5C564.417,921.167 555.333,927.25 545,931.75C534.667,936.25 523.667,938.5 512,938.5C500.333,938.5 489.333,936.25 479,931.75C468.667,927.25 459.583,921.167 451.75,913.5C443.917,905.833 437.75,896.833 433.25,886.5C428.75,876.167 426.5,865.167 426.5,853.5Z"
				/>
			</svg>
		{/if}`,slot_props:"{}"}],events:[],typedefs:[],rest_props:{type:"Element",name:"span"}};function Rt(y,r,p){const o=y.slice();return o[1]=r[p],o}function Zt(y,r,p){const o=y.slice();return o[1]=r[p],o}function Ft(y){let r,p;return r=new K({props:{severity:y[1]}}),{c(){I(r.$$.fragment)},l(o){P(r.$$.fragment,o)},m(o,h){M(r,o,h),p=!0},p:Ht,i(o){p||(k(r.$$.fragment,o),p=!0)},o(o){b(r.$$.fragment,o),p=!1},d(o){x(r,o)}}}function Qt(y){let r=Math.floor(Math.random()*10)+"",p;return{c(){p=$(r)},l(o){p=g(o,r)},m(o,h){v(o,p,h)},p:Ht,d(o){o&&e(p)}}}function qt(y){let r,p;return r=new K({props:{severity:y[1],$$slots:{default:[Qt]},$$scope:{ctx:y}}}),{c(){I(r.$$.fragment)},l(o){P(r.$$.fragment,o)},m(o,h){M(r,o,h),p=!0},p(o,h){const C={};h&64&&(C.$$scope={dirty:h,ctx:o}),r.$set(C)},i(o){p||(k(r.$$.fragment,o),p=!0)},o(o){b(r.$$.fragment,o),p=!1},d(o){x(r,o)}}}function Vt(y){let r,p,o,h=y[0],C=[];for(let a=0;a<h.length;a+=1)C[a]=Ft(Zt(y,h,a));const Q=a=>b(C[a],1,1,()=>{C[a]=null});let E=y[0],d=[];for(let a=0;a<E.length;a+=1)d[a]=qt(Rt(y,E,a));const D=a=>b(d[a],1,1,()=>{d[a]=null});return{c(){for(let a=0;a<C.length;a+=1)C[a].c();r=m();for(let a=0;a<d.length;a+=1)d[a].c();p=Ot()},l(a){for(let l=0;l<C.length;l+=1)C[l].l(a);r=_(a);for(let l=0;l<d.length;l+=1)d[l].l(a);p=Ot()},m(a,l){for(let s=0;s<C.length;s+=1)C[s].m(a,l);v(a,r,l);for(let s=0;s<d.length;s+=1)d[s].m(a,l);v(a,p,l),o=!0},p(a,l){if(l&1){h=a[0];let s;for(s=0;s<h.length;s+=1){const B=Zt(a,h,s);C[s]?(C[s].p(B,l),k(C[s],1)):(C[s]=Ft(B),C[s].c(),k(C[s],1),C[s].m(r.parentNode,r))}for(St(),s=h.length;s<C.length;s+=1)Q(s);jt()}if(l&1){E=a[0];let s;for(s=0;s<E.length;s+=1){const B=Rt(a,E,s);d[s]?(d[s].p(B,l),k(d[s],1)):(d[s]=qt(B),d[s].c(),k(d[s],1),d[s].m(p.parentNode,p))}for(St(),s=E.length;s<d.length;s+=1)D(s);jt()}},i(a){if(!o){for(let l=0;l<h.length;l+=1)k(C[l]);for(let l=0;l<E.length;l+=1)k(d[l]);o=!0}},o(a){C=C.filter(Boolean);for(let l=0;l<C.length;l+=1)b(C[l]);d=d.filter(Boolean);for(let l=0;l<d.length;l+=1)b(d[l]);o=!1},d(a){At(C,a),a&&e(r),At(d,a),a&&e(p)}}}function Xt(y){let r,p,o,h,C='<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> InfoBadge <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"fluent-svelte"</span><span class="token punctuation">;</span></code>',Q,E,d,D,a,l,s,B,y5,L,j5,e5,A5,R5,n5,Z5,F5,E5,H,a5,O,s5,q5,N5,o5,U5,z5,w,S,r5,l5,G5,W5,i5,j,Y5,A,c5,f5,J5,K5,p5,R,Q5,Z,u5,C5,V5,X5,d5,F,tt,q,h5,v5,et,nt,m5,N,at,U,_5,$5,st,ot,g5,z,k5,G,rt,w5,V,lt,b5,W,Nt=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBadge</span><span class="token punctuation">></span></span>99<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBadge</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>InfoBadge</span> <span class="token attr-name">severity</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>critical<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>bazinga<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>InfoBadge</span><span class="token punctuation">></span></span></code>`,L5,Y,it,T5,J,D5;return E=new Yt({props:{repl:"ce7c58c352e24e84ad6838663e6dcd4e",columns:5,$$slots:{default:[Vt]},$$scope:{ctx:y}}}),j=new K({props:{severity:"attention"}}),R=new K({props:{severity:"information"}}),F=new K({props:{severity:"success"}}),N=new K({props:{severity:"caution"}}),z=new K({props:{severity:"critical"}}),J=new Jt({props:{data:Kt}}),{c(){r=i("p"),p=$("InfoBadges are a non-intrusive and intuitive way to display notifications or bring focus to an area within an app - whether that be for notifications, indicating new content, or showing an alert."),o=m(),h=i("pre"),Q=m(),I(E.$$.fragment),d=m(),D=i("h2"),a=$("Usage"),l=m(),s=i("h3"),B=$("Severity"),y5=m(),L=i("p"),j5=$("InfoBadges can take in a "),e5=i("code"),A5=$("severity"),R5=$(" prop, which represent the type of information you wish to convey to the user. The default severity is "),n5=i("code"),Z5=$("attention"),F5=$("."),E5=m(),H=i("table"),a5=i("thead"),O=i("tr"),s5=i("th"),q5=$("Severity"),N5=m(),o5=i("th"),U5=$("Preview"),z5=m(),w=i("tbody"),S=i("tr"),r5=i("td"),l5=i("code"),G5=$("attention"),W5=m(),i5=i("td"),I(j.$$.fragment),Y5=m(),A=i("tr"),c5=i("td"),f5=i("code"),J5=$("information"),K5=m(),p5=i("td"),I(R.$$.fragment),Q5=m(),Z=i("tr"),u5=i("td"),C5=i("code"),V5=$("success"),X5=m(),d5=i("td"),I(F.$$.fragment),tt=m(),q=i("tr"),h5=i("td"),v5=i("code"),et=$("caution"),nt=m(),m5=i("td"),I(N.$$.fragment),at=m(),U=i("tr"),_5=i("td"),$5=i("code"),st=$("critical"),ot=m(),g5=i("td"),I(z.$$.fragment),k5=m(),G=i("h3"),rt=$("Custom Content"),w5=m(),V=i("p"),lt=$("The default badge glyph can be overrided with your own content. This can be useful if you wish display text, or an alert count. Passing HTML content into the default slot will override the glyph with said content."),b5=m(),W=i("pre"),L5=m(),Y=i("h2"),it=$("Component API"),T5=m(),I(J.$$.fragment),this.h()},l(t){r=c(t,"P",{});var u=f(r);p=g(u,"InfoBadges are a non-intrusive and intuitive way to display notifications or bring focus to an area within an app - whether that be for notifications, indicating new content, or showing an alert."),u.forEach(e),o=_(t),h=c(t,"PRE",{class:!0});var B5=f(h);B5.forEach(e),Q=_(t),P(E.$$.fragment,t),d=_(t),D=c(t,"H2",{id:!0});var ct=f(D);a=g(ct,"Usage"),ct.forEach(e),l=_(t),s=c(t,"H3",{id:!0});var ft=f(s);B=g(ft,"Severity"),ft.forEach(e),y5=_(t),L=c(t,"P",{});var X=f(L);j5=g(X,"InfoBadges can take in a "),e5=c(X,"CODE",{});var pt=f(e5);A5=g(pt,"severity"),pt.forEach(e),R5=g(X," prop, which represent the type of information you wish to convey to the user. The default severity is "),n5=c(X,"CODE",{});var ut=f(n5);Z5=g(ut,"attention"),ut.forEach(e),F5=g(X,"."),X.forEach(e),E5=_(t),H=c(t,"TABLE",{});var I5=f(H);a5=c(I5,"THEAD",{});var Ct=f(a5);O=c(Ct,"TR",{});var P5=f(O);s5=c(P5,"TH",{});var dt=f(s5);q5=g(dt,"Severity"),dt.forEach(e),N5=_(P5),o5=c(P5,"TH",{});var ht=f(o5);U5=g(ht,"Preview"),ht.forEach(e),P5.forEach(e),Ct.forEach(e),z5=_(I5),w=c(I5,"TBODY",{});var T=f(w);S=c(T,"TR",{});var M5=f(S);r5=c(M5,"TD",{});var vt=f(r5);l5=c(vt,"CODE",{});var mt=f(l5);G5=g(mt,"attention"),mt.forEach(e),vt.forEach(e),W5=_(M5),i5=c(M5,"TD",{});var _t=f(i5);P(j.$$.fragment,_t),_t.forEach(e),M5.forEach(e),Y5=_(T),A=c(T,"TR",{});var x5=f(A);c5=c(x5,"TD",{});var $t=f(c5);f5=c($t,"CODE",{});var gt=f(f5);J5=g(gt,"information"),gt.forEach(e),$t.forEach(e),K5=_(x5),p5=c(x5,"TD",{});var yt=f(p5);P(R.$$.fragment,yt),yt.forEach(e),x5.forEach(e),Q5=_(T),Z=c(T,"TR",{});var H5=f(Z);u5=c(H5,"TD",{});var Et=f(u5);C5=c(Et,"CODE",{});var kt=f(C5);V5=g(kt,"success"),kt.forEach(e),Et.forEach(e),X5=_(H5),d5=c(H5,"TD",{});var wt=f(d5);P(F.$$.fragment,wt),wt.forEach(e),H5.forEach(e),tt=_(T),q=c(T,"TR",{});var O5=f(q);h5=c(O5,"TD",{});var bt=f(h5);v5=c(bt,"CODE",{});var Lt=f(v5);et=g(Lt,"caution"),Lt.forEach(e),bt.forEach(e),nt=_(O5),m5=c(O5,"TD",{});var Tt=f(m5);P(N.$$.fragment,Tt),Tt.forEach(e),O5.forEach(e),at=_(T),U=c(T,"TR",{});var S5=f(U);_5=c(S5,"TD",{});var Dt=f(_5);$5=c(Dt,"CODE",{});var Bt=f($5);st=g(Bt,"critical"),Bt.forEach(e),Dt.forEach(e),ot=_(S5),g5=c(S5,"TD",{});var It=f(g5);P(z.$$.fragment,It),It.forEach(e),S5.forEach(e),T.forEach(e),I5.forEach(e),k5=_(t),G=c(t,"H3",{id:!0});var Pt=f(G);rt=g(Pt,"Custom Content"),Pt.forEach(e),w5=_(t),V=c(t,"P",{});var Mt=f(V);lt=g(Mt,"The default badge glyph can be overrided with your own content. This can be useful if you wish display text, or an alert count. Passing HTML content into the default slot will override the glyph with said content."),Mt.forEach(e),b5=_(t),W=c(t,"PRE",{class:!0});var Ut=f(W);Ut.forEach(e),L5=_(t),Y=c(t,"H2",{id:!0});var xt=f(Y);it=g(xt,"Component API"),xt.forEach(e),T5=_(t),P(J.$$.fragment,t),this.h()},h(){t5(h,"class","language-ts"),t5(D,"id","usage"),t5(s,"id","severity"),t5(G,"id","custom-content"),t5(W,"class","language-html"),t5(Y,"id","component-api")},m(t,u){v(t,r,u),n(r,p),v(t,o,u),v(t,h,u),h.innerHTML=C,v(t,Q,u),M(E,t,u),v(t,d,u),v(t,D,u),n(D,a),v(t,l,u),v(t,s,u),n(s,B),v(t,y5,u),v(t,L,u),n(L,j5),n(L,e5),n(e5,A5),n(L,R5),n(L,n5),n(n5,Z5),n(L,F5),v(t,E5,u),v(t,H,u),n(H,a5),n(a5,O),n(O,s5),n(s5,q5),n(O,N5),n(O,o5),n(o5,U5),n(H,z5),n(H,w),n(w,S),n(S,r5),n(r5,l5),n(l5,G5),n(S,W5),n(S,i5),M(j,i5,null),n(w,Y5),n(w,A),n(A,c5),n(c5,f5),n(f5,J5),n(A,K5),n(A,p5),M(R,p5,null),n(w,Q5),n(w,Z),n(Z,u5),n(u5,C5),n(C5,V5),n(Z,X5),n(Z,d5),M(F,d5,null),n(w,tt),n(w,q),n(q,h5),n(h5,v5),n(v5,et),n(q,nt),n(q,m5),M(N,m5,null),n(w,at),n(w,U),n(U,_5),n(_5,$5),n($5,st),n(U,ot),n(U,g5),M(z,g5,null),v(t,k5,u),v(t,G,u),n(G,rt),v(t,w5,u),v(t,V,u),n(V,lt),v(t,b5,u),v(t,W,u),W.innerHTML=Nt,v(t,L5,u),v(t,Y,u),n(Y,it),v(t,T5,u),M(J,t,u),D5=!0},p(t,[u]){const B5={};u&64&&(B5.$$scope={dirty:u,ctx:t}),E.$set(B5)},i(t){D5||(k(E.$$.fragment,t),k(j.$$.fragment,t),k(R.$$.fragment,t),k(F.$$.fragment,t),k(N.$$.fragment,t),k(z.$$.fragment,t),k(J.$$.fragment,t),D5=!0)},o(t){b(E.$$.fragment,t),b(j.$$.fragment,t),b(R.$$.fragment,t),b(F.$$.fragment,t),b(N.$$.fragment,t),b(z.$$.fragment,t),b(J.$$.fragment,t),D5=!1},d(t){t&&e(r),t&&e(o),t&&e(h),t&&e(Q),x(E,t),t&&e(d),t&&e(D),t&&e(l),t&&e(s),t&&e(y5),t&&e(L),t&&e(E5),t&&e(H),x(j),x(R),x(F),x(N),x(z),t&&e(k5),t&&e(G),t&&e(w5),t&&e(V),t&&e(b5),t&&e(W),t&&e(L5),t&&e(Y),t&&e(T5),x(J,t)}}}function te(y){return[["information","attention","success","caution","critical"]]}class fe extends zt{constructor(r){super();Gt(this,r,te,Xt,Wt,{})}}export{fe as default};
