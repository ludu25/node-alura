const db = require('../../config/database');
const LivroDao = require('../intra/livro-dao');

module.exports = (app) => {

    app.get('/', function(req, res) {
        res.send(
            `
            <html>  
                <head> 
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Home <h1>
                </body>
            </html>
            `
        );
    });
    
    app.get('/livros', function(req, res) {

        const livroDao = new LivroDao(db);
        
        livroDao
            .lista()
            .then( resultados => {
                res.marko(
                    require('../views/livros/lista/listagem.marko'),
                    {
                        livros: resultados
                    }
                );
            })
            .catch( error => 
                console.log(error)
            ); 
        
    });

    //form para adicionar livro
    app.get('/livros/form', function(req, res) {

        res.marko(
            require('../views/livros/form/form.marko'),
            {
                livro: {}
            }
        );

    });

    //adicionar livro
    app.post('/livros', function(req, res) {
        console.log(req.body);
        const livroDao = new LivroDao(db);

        if(req.body.id != ''){

        }
        else {
            livroDao
            .adiciona(req.body)
            .then( () => { 
                res.redirect('/livros');
                console.log('Livros adicionados com sucesso!');
            })
            .catch( error => 
                console.log(error)
            ); 
        }
        
    });

    //editar livro
    app.get('/livros/form/:id', function(req, res) {

        const id = req.params.id;

        const livroDao = new LivroDao(db);
        
        livroDao
            .getBookById(id)
            .then( livro => 
                res.marko(
                    require('../views/livros/form/form.marko'),
                    {
                        livro:livro
                    }
                )
            )
            .catch( error => 
                console.log(error)
            ); 
    });

    //deletar livro
    app.delete('/livros/:id', function(req, res) {

        const id = req.params.id;

        const livroDao = new LivroDao(db);
        
        livroDao
            .remove(id)
            .then( () => res.status(200).end())
            .catch( error => console.log(error)); 
    });

}

