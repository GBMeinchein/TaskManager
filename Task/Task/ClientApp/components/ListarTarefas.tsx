import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
interface ListarTarefasDataState {
    tarefaLista: TarefaData[];
    carregando: boolean;
}
export class ListarTarefas extends React.Component<RouteComponentProps<{}>, ListarTarefasDataState> {
    constructor() {
        super();
        this.state = { tarefaLista: [], carregando: true };
        fetch('api/Tarefas')
            .then(response => response.json() as Promise<TarefaData[]>)
            .then(data => {
                this.setState({ tarefaLista: data, carregando: false });
            });
        // este binding é necessário para que o 'this' funcione no callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderTarefaTable(this.state.tarefaLista);
        return <div>
            <h1>Tarefas</h1>
            <p>
                <Link to="/addtarefa">Criar Nova</Link>
            </p>
            {contents}
        </div>;
    }
    // Trata a solicitação Delete  para um tarefa  
    private handleDelete(id: number) {
        if (!confirm("Deseja deletar o tarefa com id : " + id))
            return;
        else {
            fetch('api/Tarefas/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        tarefaLista: this.state.tarefaLista.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("tarefas/" + id);
    }
    // Retorna uma tabela HTML para o método render().  
    private renderTarefaTable(tarefaLista: TarefaData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {tarefaLista.map(emp =>
                    <tr key={emp.id}>
                        <td></td>
                        <td>{emp.titulo}</td>
                        <td>{emp.descricao}</td>
                        <td>{emp.status}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.id)}>Editar</a>  |
                                <a className="action" onClick={(id) => this.handleDelete(emp.id)}>Deletar</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class TarefaData {
    id: number = 0;
    titulo: string = "";
    descricao: string = "";
    status: string = "";
    datacriacao: string = "";
    dataedicao: string = "";
    dataconclusao: string = "";
    dataexclusao: string = "";
    statusConcluido: boolean = false;
}    