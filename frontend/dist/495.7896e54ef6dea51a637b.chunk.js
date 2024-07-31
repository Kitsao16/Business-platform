"use strict";(self.webpackChunkbusiness_platform=self.webpackChunkbusiness_platform||[]).push([[495],{3068:(e,n,s)=>{s.d(n,{A:()=>a});var r=s(1601),t=s.n(r),o=s(6314),i=s.n(o)()(t());i.push([e.id,'/* CreateBusiness container */\n.create-business {\n    padding: 20px;\n    max-width: 600px;\n    margin: 0 auto;\n    background-color: #f9f9f9;\n    border-radius: 8px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n/* Header styles */\n.create-business h2 {\n    font-size: 2em;\n    margin-bottom: 20px;\n    text-align: center;\n}\n\n/* Form group styles */\n.create-business .form-group {\n    margin-bottom: 20px;\n}\n\n/* Label styles */\n.create-business label {\n    display: block;\n    font-weight: bold;\n    margin-bottom: 5px;\n}\n\n/* Input and textarea styles */\n.create-business input,\n.create-business textarea {\n    width: 100%;\n    padding: 10px;\n    margin-bottom: 10px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\n\n/* Product input styles */\n.create-business .product-input {\n    display: flex;\n    align-items: center;\n    margin-bottom: 10px;\n}\n\n.create-business .product-input input {\n    flex: 1;\n    margin-right: 10px;\n}\n\n.create-business .product-input button {\n    padding: 5px 10px;\n    background-color: #d9534f;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.create-business .product-input button:hover {\n    background-color: #c9302c;\n}\n\n/* Error message styles */\n.create-business .error-message {\n    color: red;\n    margin-bottom: 20px;\n    text-align: center;\n}\n\n/* Submit button styles */\n.create-business button[type="submit"] {\n    display: block;\n    width: 100%;\n    padding: 10px;\n    background-color: #5cb85c;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.create-business button[type="submit"]:hover {\n    background-color: #4cae4c;\n}\n\n/* Add product button styles */\n.create-business button[type="button"] {\n    display: block;\n    width: 100%;\n    padding: 10px;\n    background-color: #0275d8;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    margin-top: 10px;\n}\n\n.create-business button[type="button"]:hover {\n    background-color: #025aa5;\n}\n',""]);const a=i},3495:(e,n,s)=>{s.r(n),s.d(n,{default:()=>w});var r=s(4848),t=s(6540),o=s(1468),i=s(8038),a=s(5072),c=s.n(a),u=s(7825),d=s.n(u),p=s(7659),l=s.n(p),b=s(5056),m=s.n(b),x=s(540),g=s.n(x),h=s(1113),y=s.n(h),f=s(3068),j={};j.styleTagTransform=y(),j.setAttributes=m(),j.insert=l().bind(null,"head"),j.domAPI=d(),j.insertStyleElement=g(),c()(f.A,j),f.A&&f.A.locals&&f.A.locals;var v=s(1083),k=s(9785);const w=()=>{const{register:e,handleSubmit:n,control:s,formState:{errors:a}}=(0,k.mN)(),{fields:c,append:u,remove:d}=(0,k.jz)({control:s,name:"products"}),p=(0,o.wA)(),l=(0,o.d4)((e=>e.auth.user)),[b,m]=(0,t.useState)(!1),[x,g]=(0,t.useState)(""),[h,y]=(0,t.useState)(!1);return(0,r.jsxs)("div",{className:"create-business",children:[(0,r.jsx)("h2",{children:"Create Business"}),x&&(0,r.jsx)("p",{className:"error-message",children:x}),h&&(0,r.jsx)("p",{className:"success-message",children:"Business created successfully!"}),(0,r.jsxs)("form",{onSubmit:n((async e=>{if(m(!0),g(""),y(!1),!l?.id)return g("User not found"),void m(!1);if(e.products.some((e=>e.price<=0)))return g("Product prices must be positive numbers"),void m(!1);const n={...e,owner:l.id};try{const e=await v.A.post("/api/businesses",n);p((0,i.Iy)(e.data)),y(!0)}catch(e){g("Error creating business")}finally{m(!1)}})),children:[(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{children:"Name:"}),(0,r.jsx)("input",{type:"text",...e("name",{required:!0})}),a.name&&(0,r.jsx)("p",{className:"error-message",children:"Name is required"})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{children:"Description:"}),(0,r.jsx)("textarea",{...e("description",{required:!0})}),a.description&&(0,r.jsx)("p",{className:"error-message",children:"Description is required"})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{children:"Products and Services:"}),c.map(((n,s)=>(0,r.jsxs)("div",{className:"product-input",children:[(0,r.jsx)("input",{type:"text",placeholder:"Product Name",...e(`products.${s}.name`,{required:!0})}),a.products?.[s]?.name&&(0,r.jsx)("p",{className:"error-message",children:"Product name is required"}),(0,r.jsx)("input",{type:"number",placeholder:"Price",...e(`products.${s}.price`,{required:!0,min:1})}),a.products?.[s]?.price&&(0,r.jsx)("p",{className:"error-message",children:"Price must be a positive number"}),(0,r.jsx)("button",{type:"button",onClick:()=>d(s),children:"Remove"})]},n.id))),(0,r.jsx)("button",{type:"button",onClick:()=>{u({id:Date.now(),name:"",price:0})},children:"Add Product or Service"})]}),(0,r.jsx)("button",{type:"submit",disabled:b,children:b?"Creating...":"Create Business"})]})]})}}}]);