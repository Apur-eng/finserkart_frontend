import fs from 'node:fs';
import {parse} from '@babel/parser';
const file='src/routes/index.tsx';const src=fs.readFileSync(file,'utf8');const ast=parse(src,{sourceType:'module',plugins:['typescript','jsx']});
const routes=[];
function walk(n,base=''){
 if(!n||typeof n!=='object')return;
 if(n.type==='JSXElement'&&n.openingElement.name.name==='Route'){
  const attrs=n.openingElement.attributes;
  const p=attrs.find(a=>a.name?.name==='path')?.value?.value;
  const index=attrs.some(a=>a.name?.name==='index');
  const full=p?(p.startsWith('/')?p:`${base}/${p}`):base;
  const name=attrs.find(a=>a.name?.name==='element')?.value?.expression?.openingElement?.name?.name;
  if(name?.endsWith('Page'))routes.push({path:index?base:full,page:name});
  for(const child of n.children)walk(child,full);return;
 }
 for(const [k,v] of Object.entries(n)){if(['loc','comments'].includes(k))continue;if(Array.isArray(v))v.forEach(x=>walk(x,base));else if(v&&typeof v==='object')walk(v,base);}
}
walk(ast);
const testfiles=fs.readdirSync('src/app/__tests__').filter(f=>f.endsWith('.test.tsx'));
const examples=testfiles.flatMap(f=>[...fs.readFileSync('src/app/__tests__/'+f,'utf8').matchAll(/(?:route|path):\s*'([^']+)'/g)].map(m=>m[1]));
for(const r of routes){const pattern=new RegExp('^'+r.path.replace(/:[^/]+/g,'[^/]+').replace('*','.*')+'$');r.preview=r.path.includes('*')?'/not-a-real-route':examples.find(e=>pattern.test(e))??r.path.replace(/:[^/]+/g,'1');}
fs.writeFileSync('src/app/__tests__/routeInventory.json',JSON.stringify(routes,null,2)+'\n');
console.log(`${routes.length} leaf route entries; ${new Set(routes.map(r=>r.page)).size} page components.`);
