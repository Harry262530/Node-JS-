
const fs=require('fs');
const url=require('url');
const http=require('http');
const replace_template=require('./module1.js')

const template_overview=fs.readFileSync('templates/template-overview.html','utf-8');
const template_card=fs.readFileSync('templates/template-card.html','utf-8');
const template_product=fs.readFileSync('templates/template-product.html','utf-8');

const data=fs.readFileSync('data.json','utf-8');
const realvalue=JSON.parse(data);
const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true);


    //overview page
    if (pathname==='/' || pathname==='/overview'){
        res.writeHead(202,{ 'Content-type':'text/html'});

        const cards=realvalue.map(el => replace_template(template_card,el)).join('');
        const output=template_overview.replace('{%PRODUCT_CARDS%}',cards)
        res.end(output);

    }

    else if (pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'});
        const display=realvalue[query.id];
        const output=replace_template(template_product,display);
        res.end(output);
    }

    //product details
    else if (pathname==='/details'){
        res.end("This page will show the details of the selected product");
    }

    //api
    else if (pathname==='/api'){
        res.writeHead(202,{
            'Content-type':'application/json'
        });
        res.end(data);
    }

    //not found
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>This is error web server request</h1>");
    }
})
server.listen(8000,'127.0.0.1',()=>{
    console.log("reacting to request made at 8000");
})
