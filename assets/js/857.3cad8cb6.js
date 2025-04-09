(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[857],{67810:(e,t,n)=>{"use strict";n.d(t,{A:()=>M});var s=n(7378),o=n(86106);function c(e){const{mdxAdmonitionTitle:t,rest:n}=function(e){const t=s.Children.toArray(e),n=t.find((e=>s.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),c=t.filter((e=>e!==n)),r=n?.props.children;return{mdxAdmonitionTitle:r,rest:c.length>0?(0,o.jsx)(o.Fragment,{children:c}):null}}(e.children),c=e.title??t;return{...e,...c&&{title:c},children:n}}var r=n(23372),a=n(95364),i=n(85133);const l="admonition_GVl3",d="admonitionHeading_TJb7",u="admonitionIcon_yI9l",m="admonitionContent_BvDm";function h(e){let{type:t,className:n,children:s}=e;return(0,o.jsx)("div",{className:(0,r.A)(i.G.common.admonition,i.G.common.admonitionType(t),l,n),children:s})}function f(e){let{icon:t,title:n}=e;return(0,o.jsxs)("div",{className:d,children:[(0,o.jsx)("span",{className:u,children:t}),n]})}function p(e){let{children:t}=e;return t?(0,o.jsx)("div",{className:m,children:t}):null}function x(e){const{type:t,icon:n,title:s,children:c,className:r}=e;return(0,o.jsxs)(h,{type:t,className:r,children:[s||n?(0,o.jsx)(f,{title:s,icon:n}):null,(0,o.jsx)(p,{children:c})]})}function g(e){return(0,o.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})})}const j={icon:(0,o.jsx)(g,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.note",description:"The default label used for the Note admonition (:::note)",children:"note"})};function b(e){return(0,o.jsx)(x,{...j,...e,className:(0,r.A)("alert alert--secondary",e.className),children:e.children})}function v(e){return(0,o.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})})}const y={icon:(0,o.jsx)(v,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.tip",description:"The default label used for the Tip admonition (:::tip)",children:"tip"})};function N(e){return(0,o.jsx)(x,{...y,...e,className:(0,r.A)("alert alert--success",e.className),children:e.children})}function k(e){return(0,o.jsx)("svg",{viewBox:"0 0 14 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})})}const B={icon:(0,o.jsx)(k,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.info",description:"The default label used for the Info admonition (:::info)",children:"info"})};function A(e){return(0,o.jsx)(x,{...B,...e,className:(0,r.A)("alert alert--info",e.className),children:e.children})}function C(e){return(0,o.jsx)("svg",{viewBox:"0 0 16 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})})}const w={icon:(0,o.jsx)(C,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.warning",description:"The default label used for the Warning admonition (:::warning)",children:"warning"})};function E(e){return(0,o.jsx)("svg",{viewBox:"0 0 12 16",...e,children:(0,o.jsx)("path",{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})})}const T={icon:(0,o.jsx)(E,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.danger",description:"The default label used for the Danger admonition (:::danger)",children:"danger"})};const L={icon:(0,o.jsx)(C,{}),title:(0,o.jsx)(a.A,{id:"theme.admonition.caution",description:"The default label used for the Caution admonition (:::caution)",children:"caution"})};const _={...{note:b,tip:N,info:A,warning:function(e){return(0,o.jsx)(x,{...w,...e,className:(0,r.A)("alert alert--warning",e.className),children:e.children})},danger:function(e){return(0,o.jsx)(x,{...T,...e,className:(0,r.A)("alert alert--danger",e.className),children:e.children})}},...{secondary:e=>(0,o.jsx)(b,{title:"secondary",...e}),important:e=>(0,o.jsx)(A,{title:"important",...e}),success:e=>(0,o.jsx)(N,{title:"success",...e}),caution:function(e){return(0,o.jsx)(x,{...L,...e,className:(0,r.A)("alert alert--warning",e.className),children:e.children})}}};function M(e){const t=c(e),n=(s=t.type,_[s]||(console.warn(`No admonition component found for admonition type "${s}". Using Info as fallback.`),_.info));var s;return(0,o.jsx)(n,{...t})}},67990:(e,t,n)=>{"use strict";n.d(t,{A:()=>le});var s=n(7378),o=n(24454),c=n(12721),r=n(23372),a=n(67939),i=n(48444);function l(){const{prism:e}=(0,i.p)(),{colorMode:t}=(0,a.G)(),n=e.theme,s=e.darkTheme||n;return"dark"===t?s:n}var d=n(85133),u=n(61357),m=n.n(u);const h=/title=(?<quote>["'])(?<title>.*?)\1/,f=/\{(?<range>[\d,-]+)\}/,p={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},x={...p,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},vbnet:{start:"(?:_\\s*)?['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},g=Object.keys(p);function j(e,t){const n=e.map((e=>{const{start:n,end:s}=x[e];return`(?:${n}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${s})`})).join("|");return new RegExp(`^\\s*(?:${n})\\s*$`)}function b(e,t){let n=e.replace(/\n$/,"");const{language:s,magicComments:o,metastring:c}=t;if(c&&f.test(c)){const e=c.match(f).groups.range;if(0===o.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${c}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=o[0].className,s=m()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(s),code:n}}if(void 0===s)return{lineClassNames:{},code:n};const r=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return j(["js","jsBlock"],t);case"jsx":case"tsx":return j(["js","jsBlock","jsx"],t);case"html":return j(["js","jsBlock","html"],t);case"python":case"py":case"bash":return j(["bash"],t);case"markdown":case"md":return j(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return j(["tex"],t);case"lua":case"haskell":case"sql":return j(["lua"],t);case"wasm":return j(["wasm"],t);case"vb":case"vba":case"visual-basic":return j(["vb","rem"],t);case"vbnet":return j(["vbnet","rem"],t);case"batch":return j(["rem"],t);case"basic":return j(["rem","f90"],t);case"fsharp":return j(["js","ml"],t);case"ocaml":case"sml":return j(["ml"],t);case"fortran":return j(["f90"],t);case"cobol":return j(["cobol"],t);default:return j(g,t)}}(s,o),a=n.split("\n"),i=Object.fromEntries(o.map((e=>[e.className,{start:0,range:""}]))),l=Object.fromEntries(o.filter((e=>e.line)).map((e=>{let{className:t,line:n}=e;return[n,t]}))),d=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.start,t]}))),u=Object.fromEntries(o.filter((e=>e.block)).map((e=>{let{className:t,block:n}=e;return[n.end,t]})));for(let m=0;m<a.length;){const e=a[m].match(r);if(!e){m+=1;continue}const t=e.slice(1).find((e=>void 0!==e));l[t]?i[l[t]].range+=`${m},`:d[t]?i[d[t]].start=m:u[t]&&(i[u[t]].range+=`${i[u[t]].start}-${m-1},`),a.splice(m,1)}n=a.join("\n");const h={};return Object.entries(i).forEach((e=>{let[t,{range:n}]=e;m()(n).forEach((e=>{h[e]??=[],h[e].push(t)}))})),{lineClassNames:h,code:n}}const v="codeBlockContainer_kBVN";var y=n(86106);function N(e){let{as:t,...n}=e;const s=function(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((e=>{let[s,o]=e;const c=t[s];c&&"string"==typeof o&&(n[c]=o)})),n}(l());return(0,y.jsx)(t,{...n,style:s,className:(0,r.A)(n.className,v,d.G.common.codeBlock)})}const k={codeBlockContent:"codeBlockContent_eKcI",codeBlockTitle:"codeBlockTitle_oV8l",codeBlock:"codeBlock_UTMO",codeBlockStandalone:"codeBlockStandalone_P59Y",codeBlockLines:"codeBlockLines_rz1f",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_XR30",buttonGroup:"buttonGroup_EJmL"};function B(e){let{children:t,className:n}=e;return(0,y.jsx)(N,{as:"pre",tabIndex:0,className:(0,r.A)(k.codeBlockStandalone,"thin-scrollbar",n),children:(0,y.jsx)("code",{className:k.codeBlockLines,children:t})})}var A=n(12182);const C={attributes:!0,characterData:!0,childList:!0,subtree:!0};function w(e,t){const[n,o]=(0,s.useState)(),c=(0,s.useCallback)((()=>{o(e.current?.closest("[role=tabpanel][hidden]"))}),[e,o]);(0,s.useEffect)((()=>{c()}),[c]),function(e,t,n){void 0===n&&(n=C);const o=(0,A._q)(t),c=(0,A.Be)(n);(0,s.useEffect)((()=>{const t=new MutationObserver(o);return e&&t.observe(e,c),()=>t.disconnect()}),[e,o,c])}(n,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),c())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}var E=n(67733);const T="codeLine_PfZE",L="codeLineNumber_nJMP",_="codeLineContent_l575";function M(e){let{line:t,classNames:n,showLineNumbers:s,getLineProps:o,getTokenProps:c}=e;1===t.length&&"\n"===t[0].content&&(t[0].content="");const a=o({line:t,className:(0,r.A)(n,s&&T)}),i=t.map(((e,t)=>(0,y.jsx)("span",{...c({token:e})},t)));return(0,y.jsxs)("span",{...a,children:[s?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("span",{className:L}),(0,y.jsx)("span",{className:_,children:i})]}):i,(0,y.jsx)("br",{})]})}var S=n(95364);function z(e){return(0,y.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,y.jsx)("path",{fill:"currentColor",d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})})}function R(e){return(0,y.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,y.jsx)("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})}const I={copyButtonCopied:"copyButtonCopied_fStt",copyButtonIcons:"copyButtonIcons_BjMh",copyButtonIcon:"copyButtonIcon_bHls",copyButtonSuccessIcon:"copyButtonSuccessIcon_TGR_"};function H(e){let{code:t,className:n}=e;const[o,c]=(0,s.useState)(!1),a=(0,s.useRef)(void 0),i=(0,s.useCallback)((()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const s=document.createElement("textarea"),o=document.activeElement;s.value=e,s.setAttribute("readonly",""),s.style.contain="strict",s.style.position="absolute",s.style.left="-9999px",s.style.fontSize="12pt";const c=document.getSelection(),r=c.rangeCount>0&&c.getRangeAt(0);n.append(s),s.select(),s.selectionStart=0,s.selectionEnd=e.length;let a=!1;try{a=document.execCommand("copy")}catch{}s.remove(),r&&(c.removeAllRanges(),c.addRange(r)),o&&o.focus()}(t),c(!0),a.current=window.setTimeout((()=>{c(!1)}),1e3)}),[t]);return(0,s.useEffect)((()=>()=>window.clearTimeout(a.current)),[]),(0,y.jsx)("button",{type:"button","aria-label":o?(0,S.T)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,S.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,S.T)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,r.A)("clean-btn",n,I.copyButton,o&&I.copyButtonCopied),onClick:i,children:(0,y.jsxs)("span",{className:I.copyButtonIcons,"aria-hidden":"true",children:[(0,y.jsx)(z,{className:I.copyButtonIcon}),(0,y.jsx)(R,{className:I.copyButtonSuccessIcon})]})})}function V(e){return(0,y.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,y.jsx)("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})})}const $="wordWrapButtonIcon_Y8yP",P="wordWrapButtonEnabled_N66P";function W(e){let{className:t,onClick:n,isEnabled:s}=e;const o=(0,S.T)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,y.jsx)("button",{type:"button",onClick:n,className:(0,r.A)("clean-btn",t,s&&P),"aria-label":o,title:o,children:(0,y.jsx)(V,{className:$,"aria-hidden":"true"})})}function D(e){let{children:t,className:n="",metastring:o,title:c,showLineNumbers:a,language:d}=e;const{prism:{defaultLanguage:u,magicComments:m}}=(0,i.p)(),f=function(e){return e?.toLowerCase()}(d??function(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}(n)??u),p=l(),x=function(){const[e,t]=(0,s.useState)(!1),[n,o]=(0,s.useState)(!1),c=(0,s.useRef)(null),r=(0,s.useCallback)((()=>{const n=c.current.querySelector("code");e?n.removeAttribute("style"):(n.style.whiteSpace="pre-wrap",n.style.overflowWrap="anywhere"),t((e=>!e))}),[c,e]),a=(0,s.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=c.current,n=e>t||c.current.querySelector("code").hasAttribute("style");o(n)}),[c]);return w(c,a),(0,s.useEffect)((()=>{a()}),[e,a]),(0,s.useEffect)((()=>(window.addEventListener("resize",a,{passive:!0}),()=>{window.removeEventListener("resize",a)})),[a]),{codeBlockRef:c,isEnabled:e,isCodeScrollable:n,toggle:r}}(),g=function(e){return e?.match(h)?.groups.title??""}(o)||c,{lineClassNames:j,code:v}=b(t,{metastring:o,language:f,magicComments:m}),B=a??function(e){return Boolean(e?.includes("showLineNumbers"))}(o);return(0,y.jsxs)(N,{as:"div",className:(0,r.A)(n,f&&!n.includes(`language-${f}`)&&`language-${f}`),children:[g&&(0,y.jsx)("div",{className:k.codeBlockTitle,children:g}),(0,y.jsxs)("div",{className:k.codeBlockContent,children:[(0,y.jsx)(E.f4,{theme:p,code:v,language:f??"text",children:e=>{let{className:t,style:n,tokens:s,getLineProps:o,getTokenProps:c}=e;return(0,y.jsx)("pre",{tabIndex:0,ref:x.codeBlockRef,className:(0,r.A)(t,k.codeBlock,"thin-scrollbar"),style:n,children:(0,y.jsx)("code",{className:(0,r.A)(k.codeBlockLines,B&&k.codeBlockLinesWithNumbering),children:s.map(((e,t)=>(0,y.jsx)(M,{line:e,getLineProps:o,getTokenProps:c,classNames:j[t],showLineNumbers:B},t)))})})}}),(0,y.jsxs)("div",{className:k.buttonGroup,children:[(x.isEnabled||x.isCodeScrollable)&&(0,y.jsx)(W,{className:k.codeButton,onClick:()=>x.toggle(),isEnabled:x.isEnabled}),(0,y.jsx)(H,{className:k.codeButton,code:v})]})]})]})}function G(e){let{children:t,...n}=e;const o=(0,c.A)(),r=function(e){return s.Children.toArray(e).some((e=>(0,s.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),a="string"==typeof r?D:B;return(0,y.jsx)(a,{...n,children:r},String(o))}function O(e){return(0,y.jsx)("code",{...e})}var q=n(34824);var F=n(36772),J=n(13576);const Z="details_mSd0",U="isBrowser_qGiQ",Y="collapsibleContent_dFAx";function K(e){return!!e&&("SUMMARY"===e.tagName||K(e.parentElement))}function Q(e,t){return!!e&&(e===t||Q(e.parentElement,t))}function X(e){let{summary:t,children:n,...o}=e;(0,F.A)().collectAnchor(o.id);const a=(0,c.A)(),i=(0,s.useRef)(null),{collapsed:l,setCollapsed:d}=(0,J.u)({initialState:!o.open}),[u,m]=(0,s.useState)(o.open),h=s.isValidElement(t)?t:(0,y.jsx)("summary",{children:t??"Details"});return(0,y.jsxs)("details",{...o,ref:i,open:u,"data-collapsed":l,className:(0,r.A)(Z,a&&U,o.className),onMouseDown:e=>{K(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;K(t)&&Q(t,i.current)&&(e.preventDefault(),l?(d(!1),m(!0)):d(!0))},children:[h,(0,y.jsx)(J.N,{lazy:!1,collapsed:l,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{d(e),m(!e)},children:(0,y.jsx)("div",{className:Y,children:n})})]})}const ee="details_Zbs9";function te(e){let{...t}=e;return(0,y.jsx)(X,{...t,className:(0,r.A)("alert alert--info",ee,t.className)})}function ne(e){const t=s.Children.toArray(e.children),n=t.find((e=>s.isValidElement(e)&&"summary"===e.type)),o=(0,y.jsx)(y.Fragment,{children:t.filter((e=>e!==n))});return(0,y.jsx)(te,{...e,summary:n,children:o})}var se=n(77872);function oe(e){return(0,y.jsx)(se.A,{...e})}const ce="containsTaskList_RZR5";function re(e){if(void 0!==e)return(0,r.A)(e,e?.includes("contains-task-list")&&ce)}const ae="img_IJJ8";var ie=n(67810);const le={Head:o.A,details:ne,Details:ne,code:function(e){return function(e){return void 0!==e.children&&s.Children.toArray(e.children).every((e=>"string"==typeof e&&!e.includes("\n")))}(e)?(0,y.jsx)(O,{...e}):(0,y.jsx)(G,{...e})},a:function(e){return(0,y.jsx)(q.A,{...e})},pre:function(e){return(0,y.jsx)(y.Fragment,{children:e.children})},ul:function(e){return(0,y.jsx)("ul",{...e,className:re(e.className)})},li:function(e){return(0,F.A)().collectAnchor(e.id),(0,y.jsx)("li",{...e})},img:function(e){return(0,y.jsx)("img",{decoding:"async",loading:"lazy",...e,className:(t=e.className,(0,r.A)(t,ae))});var t},h1:e=>(0,y.jsx)(oe,{as:"h1",...e}),h2:e=>(0,y.jsx)(oe,{as:"h2",...e}),h3:e=>(0,y.jsx)(oe,{as:"h3",...e}),h4:e=>(0,y.jsx)(oe,{as:"h4",...e}),h5:e=>(0,y.jsx)(oe,{as:"h5",...e}),h6:e=>(0,y.jsx)(oe,{as:"h6",...e}),admonition:ie.A,mermaid:()=>null}},61357:(e,t)=>{function n(e){let t,n=[];for(let s of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(s))n.push(parseInt(s,10));else if(t=s.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,s,o,c]=t;if(s&&c){s=parseInt(s),c=parseInt(c);const e=s<c?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(c+=e);for(let t=s;t!==c;t+=e)n.push(t)}}return n}t.default=n,e.exports=n},82036:(e,t,n)=>{"use strict";n.d(t,{R:()=>r,x:()=>a});var s=n(7378);const o={},c=s.createContext(o);function r(e){const t=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(c.Provider,{value:t},e.children)}}}]);