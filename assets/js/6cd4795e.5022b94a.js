"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[52],{2513:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>d,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"features/dynamic-route-params","title":"Dynamic Route Parameters","description":"Dynamic route parameters allow you to define flexible routes that can handle different inputs dynamically. This is useful when creating routes that depend on user-provided values, such as IDs or slugs.","source":"@site/docs/features/dynamic-route-params.md","sourceDirName":"features","slug":"/features/dynamic-route-params","permalink":"/file-express-router/docs/features/dynamic-route-params","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/features/dynamic-route-params.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Features","permalink":"/file-express-router/docs/category/features"},"next":{"title":"HTTP Method Handlers","permalink":"/file-express-router/docs/features/http-methods"}}');var a=s(4848),n=s(8453);const d={},i="Dynamic Route Parameters",l={},c=[{value:"Single Parameters",id:"single-parameters",level:2},{value:"Multiple Parameters",id:"multiple-parameters",level:2},{value:"Summary",id:"summary",level:3}];function o(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.header,{children:(0,a.jsx)(r.h1,{id:"dynamic-route-parameters",children:"Dynamic Route Parameters"})}),"\n",(0,a.jsx)(r.p,{children:"Dynamic route parameters allow you to define flexible routes that can handle different inputs dynamically. This is useful when creating routes that depend on user-provided values, such as IDs or slugs."}),"\n",(0,a.jsx)(r.h2,{id:"single-parameters",children:"Single Parameters"}),"\n",(0,a.jsxs)(r.p,{children:["A single dynamic parameter is represented using square brackets (",(0,a.jsx)(r.code,{children:"[]"}),"). The value in the brackets acts as a placeholder and is replaced with actual data from the request."]}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-bash",children:"routes/\r\n\u251c\u2500\u2500 users/\r\n\u2502   \u251c\u2500\u2500 [id].get.ts   \u2192  GET /users/:id\r\n\u2514\u2500\u2500 products/\r\n    \u251c\u2500\u2500 [slug].get.ts \u2192  GET /products/:slug\r\n    \u251c\u2500\u2500 [slug].post.ts \u2192  POST /products/:slug\n"})}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-ts",metastring:'title="routes/users/[id].get.ts"',children:"export const handler = (req, res) => {\r\n  const { id } = req.params;\r\n  res.json({ userId: id });\r\n};\n"})}),"\n",(0,a.jsx)(r.h2,{id:"multiple-parameters",children:"Multiple Parameters"}),"\n",(0,a.jsx)(r.p,{children:"You can define multiple parameters within the same route using multiple bracketed values."}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-bash",children:"routes/\r\n\u2514\u2500\u2500 orders/\r\n    \u251c\u2500\u2500 [userId]/[orderId].get.ts \u2192 GET /orders/:userId/:orderId\n"})}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-ts",metastring:'title="routes/orders/[userId]/[orderId].ts"',children:"export const handler = (req, res) => {\r\n  const { userId, orderId } = req.params;\r\n  res.json({ userId, orderId });\r\n};\n"})}),"\n",(0,a.jsx)(r.h3,{id:"summary",children:"Summary"}),"\n",(0,a.jsxs)(r.table,{children:[(0,a.jsx)(r.thead,{children:(0,a.jsxs)(r.tr,{children:[(0,a.jsx)(r.th,{children:"Feature"}),(0,a.jsx)(r.th,{children:"Syntax"}),(0,a.jsx)(r.th,{children:"Example Route"}),(0,a.jsx)(r.th,{children:"Example URL"})]})}),(0,a.jsxs)(r.tbody,{children:[(0,a.jsxs)(r.tr,{children:[(0,a.jsx)(r.td,{children:"Single Parameter"}),(0,a.jsx)(r.td,{children:(0,a.jsx)(r.code,{children:"[param]"})}),(0,a.jsx)(r.td,{children:(0,a.jsx)(r.code,{children:"/users/[id]"})}),(0,a.jsx)(r.td,{children:(0,a.jsx)(r.code,{children:"/users/123"})})]}),(0,a.jsxs)(r.tr,{children:[(0,a.jsx)(r.td,{children:"Multiple Parameters"}),(0,a.jsx)(r.td,{children:(0,a.jsx)(r.code,{children:"[param1]/[param2]"})}),(0,a.jsx)(r.td,{children:(0,a.jsx)(r.code,{children:"/orders/[userId]/[orderId]"})}),(0,a.jsx)(r.td,{children:(0,a.jsx)(r.code,{children:"/orders/45/789"})})]})]})]}),"\n",(0,a.jsx)(r.p,{children:"These dynamic routes enable flexible and scalable routing structures, making API development more streamlined."})]})}function u(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>d,x:()=>i});var t=s(6540);const a={},n=t.createContext(a);function d(e){const r=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:d(e.components),t.createElement(n.Provider,{value:r},e.children)}}}]);