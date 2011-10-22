this.serverError = function(sys, res, code, content, error) {
    sys.puts(error);
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.end(content);
};

this.renderHtml = function(sys, res,content) {
    sys.puts('rendering content');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(content, 'utf-8');
};