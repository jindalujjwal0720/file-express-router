"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[761],{1574:(e,r,s)=>{s.r(r),s.d(r,{assets:()=>i,contentTitle:()=>a,default:()=>c,frontMatter:()=>d,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"features/http-methods","title":"HTTP Method Handlers","description":"In file-express-router, HTTP method handlers allow you to define how your routes should respond to various HTTP requests like GET, POST, PUT, DELETE, etc. Each route file can have one or more handlers that correspond to the HTTP methods supported for that route. This approach simplifies route handling by providing a clear structure for each type of request.","source":"@site/docs/features/http-methods.md","sourceDirName":"features","slug":"/features/http-methods","permalink":"/file-express-router/docs/features/http-methods","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/features/http-methods.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Dynamic Route Parameters","permalink":"/file-express-router/docs/features/dynamic-route-params"},"next":{"title":"Middleware Management","permalink":"/file-express-router/docs/features/middlewares"}}');var n=s(4848),o=s(8453);const d={},a="HTTP Method Handlers",i={},l=[{value:"Defining HTTP Method Handlers",id:"defining-http-method-handlers",level:2},{value:"Supported HTTP Methods",id:"supported-http-methods",level:2},{value:"Handling Multiple Methods",id:"handling-multiple-methods",level:2},{value:"Dynamic Route Handling",id:"dynamic-route-handling",level:2},{value:"Returning Responses",id:"returning-responses",level:2}];function h(e){const r={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.header,{children:(0,n.jsx)(r.h1,{id:"http-method-handlers",children:"HTTP Method Handlers"})}),"\n",(0,n.jsxs)(r.p,{children:["In ",(0,n.jsx)(r.code,{children:"file-express-router"}),", HTTP method handlers allow you to define how your routes should respond to various HTTP requests like ",(0,n.jsx)(r.code,{children:"GET"}),", ",(0,n.jsx)(r.code,{children:"POST"}),", ",(0,n.jsx)(r.code,{children:"PUT"}),", ",(0,n.jsx)(r.code,{children:"DELETE"}),", etc. Each route file can have one or more handlers that correspond to the HTTP methods supported for that route. This approach simplifies route handling by providing a clear structure for each type of request."]}),"\n",(0,n.jsx)(r.h2,{id:"defining-http-method-handlers",children:"Defining HTTP Method Handlers"}),"\n",(0,n.jsxs)(r.p,{children:["In each route file, you can define methods such as ",(0,n.jsx)(r.code,{children:"get"}),", ",(0,n.jsx)(r.code,{children:"post"}),", ",(0,n.jsx)(r.code,{children:"put"}),", and ",(0,n.jsx)(r.code,{children:"delete"})," to handle requests for the corresponding HTTP methods. The handler functions receive the same parameters as in standard Express.js route handlers: ",(0,n.jsx)(r.code,{children:"req"}),", ",(0,n.jsx)(r.code,{children:"res"}),", and ",(0,n.jsx)(r.code,{children:"next"}),"."]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="routes/products/featured.ts"',children:"export const get = (req, res) => {\r\n  res.json({ featured: [] });\r\n};\r\n\r\nexport const post = (req, res) => {\r\n  res.status(405).json({ message: 'Method Not Allowed' });\r\n};\n"})}),"\n",(0,n.jsxs)(r.p,{children:["In the above example, the ",(0,n.jsx)(r.code,{children:"GET /products/featured"})," route returns a list of featured products, while the ",(0,n.jsx)(r.code,{children:"POST"}),' method responds with a "Method Not Allowed" status.']}),"\n",(0,n.jsx)(r.h2,{id:"supported-http-methods",children:"Supported HTTP Methods"}),"\n",(0,n.jsx)(r.p,{children:"You can define handlers for the following HTTP methods:"}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:"GET"})}),"\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:"POST"})}),"\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:"PUT"})}),"\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:"DELETE"})}),"\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.strong,{children:"PATCH"})}),"\n"]}),"\n",(0,n.jsx)(r.p,{children:"Each handler corresponds to a specific HTTP request type, which helps to keep the logic for each type of operation well-defined and separate."}),"\n",(0,n.jsx)(r.h2,{id:"handling-multiple-methods",children:"Handling Multiple Methods"}),"\n",(0,n.jsx)(r.p,{children:"You can handle multiple methods in the same file by exporting handlers for different HTTP methods. This is useful when you want to manage multiple actions for a specific resource."}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="routes/products/[id].ts"',children:"export const get = (req, res) => {\r\n  const { id } = req.params;\r\n  res.json({ id });\r\n};\r\n\r\nexport const put = (req, res) => {\r\n  const { id } = req.params;\r\n  res.json({ updated: true, id });\r\n};\r\n\r\nexport const delete = (req, res) => {\r\n  const { id } = req.params;\r\n  res.json({ deleted: true, id });\r\n};\n"})}),"\n",(0,n.jsxs)(r.p,{children:["In this example, the ",(0,n.jsx)(r.code,{children:"GET"}),", ",(0,n.jsx)(r.code,{children:"PUT"}),", and ",(0,n.jsx)(r.code,{children:"DELETE"})," handlers for ",(0,n.jsx)(r.code,{children:"/products/:id"})," allow you to fetch, update, and delete product information."]}),"\n",(0,n.jsx)(r.h2,{id:"dynamic-route-handling",children:"Dynamic Route Handling"}),"\n",(0,n.jsxs)(r.p,{children:["For routes with dynamic parameters, you can use HTTP method handlers in conjunction with route parameters. The parameters are automatically parsed by the library and passed to the route handler via ",(0,n.jsx)(r.code,{children:"req.params"}),"."]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="routes/users/[id].ts"',children:"export const get = (req, res) => {\r\n  const { id } = req.params;\r\n  res.json({ user: id });\r\n};\r\n\r\nexport const put = (req, res) => {\r\n  const { id } = req.params;\r\n  res.json({ updatedUser: id });\r\n};\n"})}),"\n",(0,n.jsxs)(r.p,{children:["Here, the ",(0,n.jsx)(r.code,{children:"GET"})," and ",(0,n.jsx)(r.code,{children:"PUT"})," methods for ",(0,n.jsx)(r.code,{children:"/users/:id"})," allow retrieving and updating user data based on the dynamic ",(0,n.jsx)(r.code,{children:"id"})," parameter."]}),"\n",(0,n.jsx)(r.h2,{id:"returning-responses",children:"Returning Responses"}),"\n",(0,n.jsxs)(r.p,{children:["The HTTP method handlers can send responses in various formats, including JSON, HTML, plain text, and more. You can use the ",(0,n.jsx)(r.code,{children:"res"})," object to set the response status, headers, and body as needed."]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",metastring:'title="routes/health.ts"',children:"export const get = (req, res) => {\r\n  res.status(200).json({ status: 'OK' });\r\n};\n"})}),"\n",(0,n.jsxs)(r.p,{children:["In the above example, the ",(0,n.jsx)(r.code,{children:"GET /health"}),' route returns a JSON response with a status of "OK".']})]})}function c(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},8453:(e,r,s)=>{s.d(r,{R:()=>d,x:()=>a});var t=s(6540);const n={},o=t.createContext(n);function d(e){const r=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:d(e.components),t.createElement(o.Provider,{value:r},e.children)}}}]);