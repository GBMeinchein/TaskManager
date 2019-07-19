import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TarefaData } from './ListarTarefas';
interface AddTarefaDataState {
    title: string;
    loading: boolean;
    empData: TarefaData;
}
export class AddTarefa extends React.Component<RouteComponentProps<{}>, AddTarefaDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, empData: new TarefaData };

        //fetch('api/Employee/GetCityList')
        //    .then(response => response.json() as Promise<Array<any>>)
        var empid = this.props.match.params["id"];
        // This will set state for Edit employee  
        if (empid > 0) {
            fetch('api/Tarefas/' + empid)
                .then(response => response.json() as Promise<TarefaData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }
        // This will set state for Add employee  
        else {
            this.state = { title: "Create", loading: false, empData: new TarefaData };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Tarefas</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.empData.id) {
            fetch('api/Tarefas/' + this.state.empData.id, {
                method: 'PUT',
                body: data,
            }).then((response) => {
                this.props.history.push("/listartarefas");
                })
        }
        // POST request for Add employee.  
        else {
            fetch('api/Tarefas', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/listartarefas");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/listartarefas");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.empData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Titulo">Título</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Titulo" defaultValue={this.state.empData.titulo} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Descricao" >Descrição</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Descricao" defaultValue={this.state.empData.descricao} required />
                    </div>
                </div>
 
         

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}