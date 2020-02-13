class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'select * from livros',
                (error, resultados) => {
                    if(error) {
                        return reject('Não foi possível listar os livros!');
                    }
                    else {
                        return resolve(resultados);
                    }
                }
            );
        })
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'insert into livros (titulo, preco, descricao) values (?, ?, ?) ',
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function(err) {
                    if(err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro. Tente novamente!');
                    }
                    else {
                        resolve();
                    }
                }
            )
        });
    }

    getBookById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'select * from livros where id = ?',
                [
                    id
                ],
                (error, livro) => {
                    if(error) {
                        console.log(error);
                        return reject('Não foi possível obter o livro informado');
                    }
                    else {
                        resolve(livro);
                    }
                }
            );
        });
    }

    atualizar(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET 
                titulo = ?, 
                preco = ?, 
                descricao = ? 
                WHERE id = ?`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                error => {
                    if(error) {
                        console.log(error);
                        return reject('Não foi possível atualizar o livro');
                    }
                    else {
                        resolve(livro);
                    }
                }
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'delete from livros where id = ?',
                [
                    id
                ],
                (error, livro) => {
                    if(error) {
                        console.log(error);
                        return reject('Não foi possível deletar o livro');
                    }
                    else {
                        resolve(livro);
                    }
                }
            );
        });
    }

}

module.exports = LivroDao;