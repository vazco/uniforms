"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[777],{61898:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>d,toc:()=>a});var i=t(86106),o=t(82036);const r={id:"migrating-3-to-4",title:"Migrating v3 to v4",sidebar_position:4},s=void 0,d={id:"getting-started/migrating-3-to-4",title:"Migrating v3 to v4",description:"This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on why certain changes were made, see the CHANGELOG.md. When migrating to v4, use the newest version. Gradual updates will take more time and won't ease this process.",source:"@site/docs/getting-started/migrating-3-to-4.md",sourceDirName:"getting-started",slug:"/getting-started/migrating-3-to-4",permalink:"/docs/getting-started/migrating-3-to-4",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"migrating-3-to-4",title:"Migrating v3 to v4",sidebar_position:4},sidebar:"docs",previous:{title:"Migrating v2 to v3",permalink:"/docs/getting-started/migrating-2-to-3"},next:{title:"Custom theme",permalink:"/docs/getting-started/custom-theme"}},c={},a=[{value:"Breaking API changes",id:"breaking-api-changes",level:2},{value:"Deprecated packages",id:"deprecated-packages",level:2}];function l(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["This guide is designed to help you through the migration. If you went through it and encountered any problems - do let us know. For more information on why certain changes were made, see the ",(0,i.jsx)(n.a,{href:"https://github.com/vazco/uniforms/blob/master/CHANGELOG.md",children:"CHANGELOG.md"}),". When migrating to v4, use the newest version. Gradual updates will take more time and won't ease this process."]}),"\n",(0,i.jsx)(n.h2,{id:"breaking-api-changes",children:"Breaking API changes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"AutoFields"})," component in all themes now renders a ",(0,i.jsx)(n.code,{children:"React.Fragment"})," instead of a ",(0,i.jsx)(n.code,{children:"div"}),". Explicitly render a wrapper component around if you need one."]}),"\n",(0,i.jsxs)(n.li,{children:["Dropped support for ",(0,i.jsx)(n.code,{children:"initialCount"})," in bridges and ",(0,i.jsx)(n.code,{children:"ListField"}),"s. Pass a model object to the form with the appropriate amount of initial items instead."]}),"\n",(0,i.jsxs)(n.li,{children:["Removed the ",(0,i.jsx)(n.code,{children:"autoField"})," prop from ",(0,i.jsx)(n.code,{children:"QuickForm"}),", ",(0,i.jsx)(n.code,{children:"AutoForm"}),", and ",(0,i.jsx)(n.code,{children:"AutoFields"})," components in all themes. Use ",(0,i.jsx)(n.code,{children:"AutoField.componentDetectorContext.Provider"})," instead."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"componentDetector"})," in ",(0,i.jsx)(n.code,{children:"AutoField"})," components now always takes precedence over ",(0,i.jsx)(n.code,{children:"component"})," property on a schema. This may make your ",(0,i.jsx)(n.code,{children:"AutoField"})," render a different component when you were using both previously. If that's the case, move your schema's ",(0,i.jsx)(n.code,{children:"component"})," definition to a ",(0,i.jsx)(n.code,{children:"AutoField.componentDetectorContext.Provider"})," instead."]}),"\n",(0,i.jsxs)(n.li,{children:["The constructors for all our bridges now accept an object (e.g., ",(0,i.jsx)(n.code,{children:"{schema, validator}"}),") instead of individual parameters. This applies to ",(0,i.jsx)(n.code,{children:"SimpleSchema2Bridge"}),", ",(0,i.jsx)(n.code,{children:"JSONSchemaBridge"}),", and ",(0,i.jsx)(n.code,{children:"ZodBridge"}),". Please update your constructor calls accordingly."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"getInitialValue"})," returns empty array or object instead of ",(0,i.jsx)(n.code,{children:"undefined"})," for ",(0,i.jsx)(n.code,{children:"ListField"})," and ",(0,i.jsx)(n.code,{children:"NestField"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Bridge.getProps"})," method accepts only ",(0,i.jsx)(n.code,{children:"name"})," argument now. Additional arguments are no longer supported."]}),"\n",(0,i.jsxs)(n.li,{children:["Replaced ",(0,i.jsx)(n.code,{children:"allowedValues"})," with ",(0,i.jsx)(n.code,{children:"options"})," prop"]}),"\n",(0,i.jsxs)(n.li,{children:["AntD theme uses ",(0,i.jsx)(n.code,{children:"v5"})," of ",(0,i.jsx)(n.code,{children:"antd"})," package. Update your project to use ",(0,i.jsx)(n.code,{children:"v5"})," of ",(0,i.jsx)(n.code,{children:"antd"})," package."]}),"\n",(0,i.jsxs)(n.li,{children:["MUI theme uses ",(0,i.jsx)(n.code,{children:"v6"})," of ",(0,i.jsx)(n.code,{children:"@mui/material"})," package. Update your project to use ",(0,i.jsx)(n.code,{children:"v6"})," of ",(0,i.jsx)(n.code,{children:"@mui/material"})," package."]}),"\n",(0,i.jsxs)(n.li,{children:["Initial render doesn't trigger individual field ",(0,i.jsx)(n.code,{children:"onChange"})," functions anymore. ",(0,i.jsx)(n.a,{href:"https://github.com/vazco/uniforms/pull/1343",children:"#1343"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"deprecated-packages",children:"Deprecated packages"}),"\n",(0,i.jsx)(n.p,{children:"The following packages are deprecated and are no longer supported in v4.0.0."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Deprecate ",(0,i.jsx)(n.code,{children:"uniforms-bootstrap3"})," package"]}),"\n",(0,i.jsxs)(n.li,{children:["Deprecate ",(0,i.jsx)(n.code,{children:"uniforms-material"})," package"]}),"\n",(0,i.jsxs)(n.li,{children:["Deprecate ",(0,i.jsx)(n.code,{children:"uniforms-bridge-simple-schema"})," package"]}),"\n",(0,i.jsxs)(n.li,{children:["Deprecate ",(0,i.jsx)(n.code,{children:"uniforms-bridge-graphql"})," package"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["If you want to continue using these packages, we recommend staying with uniforms v3, as we don't guarantee they will work with the newer versions. You can use the following commands to download the ",(0,i.jsx)(n.code,{children:"3.10.2"})," version of the package:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"npx gitget https://github.com/vazco/uniforms/tree/v3.10.2/packages/<uniforms-package-name>\n"})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},82036:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>d});var i=t(7378);const o={},r=i.createContext(o);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);