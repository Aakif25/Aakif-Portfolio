import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../out',import.meta.url));
const port=Number(process.env.PORT||3000);
if(!fs.existsSync(root)){console.error('Run npm run build first.');process.exit(1)}
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.mp4':'video/mp4','.webm':'video/webm','.vtt':'text/vtt','.woff2':'font/woff2','.pdf':'application/pdf','.json':'application/json'};
http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root)||!fs.existsSync(file)){res.writeHead(404);res.end('Not found');return}let b=fs.readFileSync(file);const ext=path.extname(file);res.setHeader('Content-Type',mime[ext]||'application/octet-stream');res.setHeader('Cache-Control',name.startsWith('/_next/')?'public, max-age=31536000, immutable':'public, max-age=3600');if(req.headers.range){const m=/bytes=(\d+)-(\d*)/.exec(req.headers.range);if(m){const start=+m[1],end=m[2]?+m[2]:b.length-1;res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${b.length}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});res.end(b.subarray(start,end+1));return}}if(/\.(html|js|css|svg|json)$/.test(file)&&req.headers['accept-encoding']?.includes('gzip')){b=zlib.gzipSync(b);res.setHeader('Content-Encoding','gzip')}res.setHeader('Content-Length',b.length);res.end(b)}).listen(port,'127.0.0.1',()=>console.log(`http://localhost:${port}`));
