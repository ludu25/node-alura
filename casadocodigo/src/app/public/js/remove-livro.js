let tabelaLivros = document.querySelector('#table-livros');
tabelaLivros.addEventListener('click', (evento) => {
    let elemento = evento.target;

    if(elemento.dataset.type == "delete") {
        let livroId = elemento.dataset.id;
        fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE'} )
            .then( (res) => {

                let tr = elemento.closest(`#livro_${livroId}`);
                alert(tr);
                tr.remove();
            })
            .catch( (error) => console.log(error)) 
    }
});