import React from 'react';
import ReactDOM from 'react-dom'


// classe
class ProjetoCursos extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            vetor : [],
            nome : "",
            valor : "", 
        }
    }

    // Ao carregar o componente
    componentDidMount(){
        fetch('http://localhost:3000/cursos')
        .then(resultado => resultado.json())
        .then(resultado => this.setState ({vetor : resultado}))
        // .then(resultado => console.table (this.state.vetor))
        .catch(erro => alert("Falha ao obter dados:" + erro))
    }
    // FUNÇÂO TECLAR
    teclar = (elemento) => {
        let nome_elemento = elemento.target.name;
        let valor_elemento = elemento.target.value;

        this.setState({[nome_elemento] : valor_elemento});
    }

    // FUNÇÃO DE CADASTRAR
    cadastrar = () => {
         
        // Caracterisiticas para envio
        let caracteristicas = { 
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                nome:this.state.nome,
                valor:this.state.valor,
            })
        }

        // Efetuar o castro
        fetch('http://localhost:3000/cursos', caracteristicas)
        .then(resposta => resposta.json())
        .then(resposta => {
            let vetor_temporario = this.state.vetor;
            vetor_temporario.push(resposta);
            this.setState({vetor : vetor_temporario, nome : '', valor : ''});
        })

    } 

    // FUNÇÃO PARA REMOVER
    remover = (codigo, linha) => {

        // Caracterisiticas para deletar
        let caracteristicas = { 
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
        }
        // EFETUAR REMOÇÃO
        fetch('http://localhost:3000/cursos/'+codigo, caracteristicas)
        .then(resposta => resposta.json())
        .then(resposta => {
            let vetor_temporario = this.state.vetor;
            vetor_temporario.splice(linha, 1);
            this.setState({vetor : vetor_temporario});
        })

    
    }
    
    // RENDER
    render(){
        return(
            <main>
                
                {/* <p>{this.state.nome}</p>
                <p>{this.state.valor}</p> */}

            {/*Formulário*/}
                <form>
                    <input type="text" value={this.state.nome} onChange={this.teclar} name="nome" placeholder="Nome" />
                    <input type="text" value={this.state.valor} onChange={this.teclar} name="valor" placeholder="Valor" />
                    <input type="button" value="Cadastrar" onClick={this.cadastrar} />
                </form>            
            {/*Tabela*/}
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.vetor.map((objeto,linha) => (
                        <tr key={linha}>
                            <td>{objeto.nome}</td>
                            <td>{objeto.valor}</td>
                            <td><button onClick={()=>(this.remover(objeto.id, linha))}>Remover</button></td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </main>
        )
    }
}

ReactDOM.render(<ProjetoCursos/>, document.getElementById('root'));