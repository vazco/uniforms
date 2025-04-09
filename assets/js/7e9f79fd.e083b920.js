"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[288],{8703:(e,r,n)=>{n.r(r),n.d(r,{appFile:()=>c,assets:()=>u,contentTitle:()=>m,default:()=>S,frontMatter:()=>i,json:()=>d,metadata:()=>l,simple:()=>f,toc:()=>h,zod:()=>p});var t=n(86106),o=n(82036),s=n(45162),a=n(42632);const i={title:"Multi step form",sidebar_position:4,hide_table_of_contents:!0},m=void 0,l={id:"examples/multi-step-form",title:"Multi step form",description:"const handleUserFormSubmit = model => {",source:"@site/docs/examples/multi-step-form.mdx",sourceDirName:"examples",slug:"/examples/multi-step-form",permalink:"/docs/examples/multi-step-form",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Multi step form",sidebar_position:4,hide_table_of_contents:!0},sidebar:"docs",previous:{title:"Passing field props via components",permalink:"/docs/examples/field-props"},next:{title:"Custom field",permalink:"/docs/examples/custom-field"}},u={},c="import { useState } from 'react';\nimport { UserForm } from './UserForm';\nimport { ProfileForm } from './ProfileForm';\n\nexport default function App() {\n  const [step, setStep] = useState(0);\n  const [form, setForm] = useState({});\n\n  const handleUserFormSubmit = model => {\n    setForm(form => ({ ...form, user: model }));\n    setStep(1);\n  };\n\n  if (step === 0) {\n    return <UserForm onSubmit={handleUserFormSubmit} />;\n  }\n\n  if (step === 1) {\n    return (\n      <ProfileForm\n        onSubmit={model =>\n          window.alert(JSON.stringify({ ...form, profile: model }))\n        }\n      />\n    );\n  }\n\n  return null;\n}",p={"/App.tsx":c,"/UserForm.tsx":"import { AutoForm } from 'uniforms-antd';\nimport ZodBridge from 'uniforms-bridge-zod';\nimport { z } from 'zod';\n\nconst userSchema = z.object({\n  username: z.string(),\n  password: z.string().uniforms({ type: 'password' }),\n});\n\nconst schema = new ZodBridge({ schema: userSchema });\n\ntype UserFormProps = {\n  onSubmit: (model: any) => void;\n};\n\nexport function UserForm(props: UserFormProps) {\n  const { onSubmit } = props;\n\n  return <AutoForm schema={schema} onSubmit={onSubmit} />;\n}","/ProfileForm.tsx":"import { AutoForm } from 'uniforms-antd';\nimport ZodBridge from 'uniforms-bridge-zod';\nimport { z } from 'zod';\n\nconst profileSchema = z.object({\n  firstName: z.string(),\n  lastName: z.string(),\n});\n\nconst schema = new ZodBridge({ schema: profileSchema });\n\ntype ProfileFormProps = {\n  onSubmit: (model: any) => void;\n};\nexport function ProfileForm(props: ProfileFormProps) {\n  const { onSubmit } = props;\n\n  return <AutoForm schema={schema} onSubmit={onSubmit} />;\n}"},d={"/App.tsx":c,"/UserForm.tsx":"import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';\nimport { JSONSchemaType } from 'ajv';\nimport { AutoForm } from 'uniforms-antd';\nimport { createValidator } from './validator';\n\ntype FormData = {\n  username: string;\n  password: string;\n};\n\nconst userSchema: JSONSchemaType<FormData> = {\n  type: 'object',\n  properties: {\n    username: { type: 'string' },\n    password: { type: 'string', uniforms: { type: 'password' } },\n  },\n  required: ['username', 'password'],\n};\n\nconst schema = new JSONSchemaBridge({\n  schema: userSchema,\n  validator: createValidator(userSchema),\n});\n\ntype UserFormProps = {\n  onSubmit: (model: any) => void;\n};\n\nexport function UserForm(props: UserFormProps) {\n  const { onSubmit } = props;\n\n  return <AutoForm schema={schema} onSubmit={onSubmit} />;\n}","/ProfileForm.tsx":"import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';\nimport { JSONSchemaType } from 'ajv';\nimport { AutoForm } from 'uniforms-antd';\nimport { createValidator } from './validator';\n\ntype FormData = {\n  firstName: string;\n  lastName: string;\n};\n\nconst profileSchema: JSONSchemaType<FormData> = {\n  type: 'object',\n  properties: {\n    firstName: { type: 'string' },\n    lastName: { type: 'string' },\n  },\n  required: ['firstName', 'lastName'],\n};\n\nconst schema = new JSONSchemaBridge({\n  schema: profileSchema,\n  validator: createValidator(profileSchema),\n});\n\ntype ProfileFormProps = {\n  onSubmit: (model: any) => void;\n};\n\nexport function ProfileForm(props: ProfileFormProps) {\n  const { onSubmit } = props;\n\n  return <AutoForm schema={schema} onSubmit={onSubmit} />;\n}","/validator.ts":s.K},f={"/App.tsx":c,"/UserForm.tsx":"import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';\nimport SimpleSchema from 'simpl-schema';\nimport { AutoForm } from 'uniforms-antd';\n\nconst userSchema = new SimpleSchema({\n  username: String,\n  password: { type: String, uniforms: { type: 'password' } },\n});\n\nconst schema = new SimpleSchema2Bridge({ schema: userSchema });\n\ntype UserFormProps = {\n  onSubmit: (model: any) => void;\n};\n\nexport function UserForm(props: UserFormProps) {\n  const { onSubmit } = props;\n\n  return <AutoForm schema={schema} onSubmit={onSubmit} />;\n}","/ProfileForm.tsx":"import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';\nimport SimpleSchema from 'simpl-schema';\nimport { AutoForm } from 'uniforms-antd';\n\nconst profileSchema = new SimpleSchema({\n  firstName: String,\n  lastName: String,\n});\n\nconst schema = new SimpleSchema2Bridge({ schema: profileSchema });\n\ntype ProfileFormProps = {\n  onSubmit: (model: any) => void;\n};\n\nexport function ProfileForm(props: ProfileFormProps) {\n  const { onSubmit } = props;\n\n  return <AutoForm schema={schema} onSubmit={onSubmit} />;\n}"},h=[];function b(e){return(0,t.jsx)(a.j,{zod:p,json:d,simple:f})}function S(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(b,{...e})}):b()}},32834:(e,r,n)=>{n.d(r,{A:()=>a});n(7378);var t=n(23372);const o={tabItem:"tabItem_ILl3"};var s=n(86106);function a(e){let{children:r,hidden:n,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,t.A)(o.tabItem,a),hidden:n,children:r})}},63418:(e,r,n)=>{n.d(r,{A:()=>F});var t=n(7378),o=n(23372),s=n(40518),a=n(30505),i=n(8083),m=n(14811),l=n(9144),u=n(59489);function c(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:r,children:n}=e;return(0,t.useMemo)((()=>{const e=r??function(e){return c(e).map((e=>{let{props:{value:r,label:n,attributes:t,default:o}}=e;return{value:r,label:n,attributes:t,default:o}}))}(n);return function(e){const r=(0,l.XI)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,n])}function d(e){let{value:r,tabValues:n}=e;return n.some((e=>e.value===r))}function f(e){let{queryString:r=!1,groupId:n}=e;const o=(0,a.W6)(),s=function(e){let{queryString:r=!1,groupId:n}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:r,groupId:n});return[(0,m.aZ)(s),(0,t.useCallback)((e=>{if(!s)return;const r=new URLSearchParams(o.location.search);r.set(s,e),o.replace({...o.location,search:r.toString()})}),[s,o])]}function h(e){const{defaultValue:r,queryString:n=!1,groupId:o}=e,s=p(e),[a,m]=(0,t.useState)((()=>function(e){let{defaultValue:r,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!d({value:r,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const t=n.find((e=>e.default))??n[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:r,tabValues:s}))),[l,c]=f({queryString:n,groupId:o}),[h,b]=function(e){let{groupId:r}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(r),[o,s]=(0,u.Dv)(n);return[o,(0,t.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:o}),S=(()=>{const e=l??h;return d({value:e,tabValues:s})?e:null})();(0,i.A)((()=>{S&&m(S)}),[S]);return{selectedValue:a,selectValue:(0,t.useCallback)((e=>{if(!d({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);m(e),c(e),b(e)}),[c,b,s]),tabValues:s}}var b=n(12721);const S={tabList:"tabList_k3Or",tabItem:"tabItem_dYdh"};var g=n(86106);function v(e){let{className:r,block:n,selectedValue:t,selectValue:a,tabValues:i}=e;const m=[],{blockElementScrollPositionUntilNextRender:l}=(0,s.a_)(),u=e=>{const r=e.currentTarget,n=m.indexOf(r),o=i[n].value;o!==t&&(l(r),a(o))},c=e=>{let r=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=m.indexOf(e.currentTarget)+1;r=m[n]??m[0];break}case"ArrowLeft":{const n=m.indexOf(e.currentTarget)-1;r=m[n]??m[m.length-1];break}}r?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},r),children:i.map((e=>{let{value:r,label:n,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:t===r?0:-1,"aria-selected":t===r,ref:e=>m.push(e),onKeyDown:c,onClick:u,...s,className:(0,o.A)("tabs__item",S.tabItem,s?.className,{"tabs__item--active":t===r}),children:n??r},r)}))})}function y(e){let{lazy:r,children:n,selectedValue:s}=e;const a=(Array.isArray(n)?n:[n]).filter(Boolean);if(r){const e=a.find((e=>e.props.value===s));return e?(0,t.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:a.map(((e,r)=>(0,t.cloneElement)(e,{key:r,hidden:e.props.value!==s})))})}function x(e){const r=h(e);return(0,g.jsxs)("div",{className:(0,o.A)("tabs-container",S.tabList),children:[(0,g.jsx)(v,{...r,...e}),(0,g.jsx)(y,{...r,...e})]})}function F(e){const r=(0,b.A)();return(0,g.jsx)(x,{...e,children:c(e.children)},String(r))}},50901:(e,r,n)=>{n.d(r,{B:()=>a});var t=n(86085),o=n(50050),s=n(86106);function a(e){const{files:r,bridge:n}=e;return(0,s.jsx)(t.l5,{template:"react-ts",customSetup:{dependencies:o.E[n]},files:r,options:{recompileMode:"delayed",recompileDelay:800},children:(0,s.jsxs)(t.am,{style:{height:"600px"},children:[(0,s.jsx)(t.cW,{showTabs:!0,showInlineErrors:!0,style:{height:"100%"}}),(0,s.jsx)(t.G5,{style:{height:"100%"}})]})})}},45162:(e,r,n)=>{n.d(r,{K:()=>t});const t="import Ajv, { JSONSchemaType } from 'ajv';\n\nconst ajv = new Ajv({\n  allErrors: true,\n  useDefaults: true,\n  keywords: ['uniforms'],\n});\n\nexport function createValidator<T>(schema: JSONSchemaType<T>) {\n  const validator = ajv.compile(schema);\n\n  return (model: Record<string, unknown>) => {\n    validator(model);\n    return validator.errors?.length ? { details: validator.errors } : null;\n  };\n}"},50050:(e,r,n)=>{n.d(r,{E:()=>s,N:()=>t});let t=function(e){return e.Zod="zod",e.JSONSchema="json-schema",e.SimpleSchema="simpl-schema",e}({});const o={antd:"^5",uniforms:"4.0.0-beta.2","uniforms-antd":"4.0.0-beta.2"},s={[t.Zod]:{...o,"uniforms-bridge-zod":"4.0.0-beta.2",zod:"^3"},[t.JSONSchema]:{...o,ajv:"^8","uniforms-bridge-json-schema":"4.0.0-beta.2"},[t.SimpleSchema]:{...o,"simpl-schema":"^3","uniforms-bridge-simple-schema-2":"4.0.0-beta.2"}}},42632:(e,r,n)=>{n.d(r,{j:()=>m});var t=n(50901),o=n(50050),s=n(32834),a=n(63418),i=n(86106);function m(e){const{zod:r,json:n,simple:m}=e;return(0,i.jsxs)(a.A,{children:[(0,i.jsx)(s.A,{value:"zod",label:"Zod",default:!0,children:(0,i.jsx)(t.B,{bridge:o.N.Zod,files:r})}),(0,i.jsx)(s.A,{value:"json-schema",label:"JSON Schema",children:(0,i.jsx)(t.B,{bridge:o.N.JSONSchema,files:n})}),(0,i.jsx)(s.A,{value:"simpl-schema",label:"Simple Schema",children:(0,i.jsx)(t.B,{bridge:o.N.SimpleSchema,files:m})})]})}}}]);