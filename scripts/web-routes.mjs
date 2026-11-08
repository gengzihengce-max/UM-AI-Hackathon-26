import {readFileSync,writeFileSync,mkdirSync,readdirSync,copyFileSync,rmSync} from 'node:fs';
import path from 'node:path';
// Flatten dependency assets: some static hosts reserve node_modules paths.
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const assets=files('dist/assets');
const replacements=assets.map(p=>['/'+p.slice(5).split(path.sep).join('/'),'/media/'+path.basename(p)]);
mkdirSync('dist/media',{recursive:true});
for(const file of assets)copyFileSync(file,'dist/media/'+path.basename(file));
for(const file of files('dist/_expo').filter(p=>p.endsWith('.js'))){let code=readFileSync(file,'utf8');for(const [oldUrl,newUrl] of replacements)code=code.split(oldUrl).join(newUrl);writeFileSync(file,code);}
rmSync('dist/assets',{recursive:true,force:true});
const html=readFileSync('dist/index.html','utf8').replace(/<title>.*?<\/title>/,'<title>Memory Garden</title>');
writeFileSync('dist/index.html',html);
const routes=['year-demo','report','pitch','workout','instructions','play','result','complete','library','whole-journey','provider','care-circle','privacy','help','journey','stats','account',...Array.from({length:9},(_,i)=>'onboarding/'+i)];
for(const route of routes){mkdirSync('dist/'+route,{recursive:true});writeFileSync('dist/'+route+'/index.html',html);}
writeFileSync('dist/404.html',html);
