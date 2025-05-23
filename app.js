//Всякая начальная фигня
var http_module = require('http');
var fs = require('fs');
var path = require('path');
var port = 3000;


//Тут все типы подключений
var mimes = {
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.ico': 'image/x-icon'
};

function onrequest(request, Response) {
    
    
    //Заправшиваем путь и проверяем не index.html ли
    var filePath = '.' + request.url;

    if (request.url === "/"){

        filePath = './index.html'

    };


    
    //path.extname - возвращает расширения файлов типа .css, .html
    //потом из объекта mimes выбирается тип и добавляется потом позже
    var extname = String(path.extname(filePath)).toLocaleLowerCase();
    var contentType = mimes[extname];


    fs.readFile(filePath, function(err,data){


        //обработка ошибок, если url не найден, тогда выводится страница с надписью 404
        
        if (err) {

            //ENOENT ошибка, означающая, что указанный путь к файлу или каталогу не существует в файловой системе
            //writeHead задаёт http ответ

            if (err.code === 'ENOENT') {
                Response.writeHead(404, { 'Content-Type': 'text/html' });
                Response.end('<h1>404 Not Found</h1>');
            } else {
                Response.writeHead(500);
                Response.end('Server Error');
            }
            return; 
        }

        //context-type из массива mimes получаем
        Response.writeHead(200,{ 'Content-Type': contentType });
        Response.write(data);
        Response.end();

    });

};


//тут создаём сервер
var Server = http_module.createServer(onrequest);
Server.listen(port,'0.0.0.0',()=>{
    console.log(`http://127.0.0.1:${port}/`);
});