import React, { Component } from 'react'
import Main from '../templates/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuarios',
    subtitle: 'Cadastro de operadores'
}


axios('http://localhost:3001/fazenda').then(resp => //FAZ GET     
    (this.fazeda = resp.data)
)
console.log(fazenda)

const baseUrl = 'http://localhost:3001/users'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const estadoInicial = {
    user: { name: '', email: '' },
    list: [],
    formErros: {
        name: "Insira nome maior",
        email: "Email incorreto"
    }
}

const validateForm = (errors) => {
    let valid = true;
    if(errors){
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
    }else{
        valid = false;
    }
    return valid;
}

export default class UserCrud extends Component {

    state = { ...estadoInicial }

    componentWillMount() { //Monta o componente para exibir ao carregar a pagina
        //NOME DA FUNCAO É FIXO
        axios(baseUrl).then(resp => { //FAZ GET
            this.setState({ list: resp.data })
        })
    }
    getUpdateList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.push(user)
        return list
    }

    save( event ) {
        event.preventDefault();

        // const formErrors = this.state.formErros
        const user = this.state.user
        const method = user.id ? 'put' : 'post' //se esta setado entao sera alteracao, senao sera post
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        if (validateForm(this.state.formErrors)) {
            // console.log(method, url, user)
            console.info('Valid Form')
            axios[method](url, user)
                .then(resp => {
                    const list = this.getUpdateList(resp.data)
                    this.setState({ user: estadoInicial.user, list })
                })

        } else {
            console.error('Invalid Form')
        }
    }

    clear() {
        this.setState({ user: estadoInicial.user })
    }

    update(event) { //Validação de dados também... provavelmente muito incorreto....
        event.preventDefault();

        const { name, value } = event.target;
        const user = { ...this.state.user }
        let formErrors = this.state.formErros;

        switch (name) {
            case 'name':
                formErrors.name =
                    value.length < 3 && value.length > 0 ? "Caracteres minimos" : '';
                break;
            case 'email':
                formErrors.email =
                    emailRegex.test(value) ? '' : 'Email incorreto';
                break;
            default:
                break;
        }

        user[event.target.name] = event.target.value
        this.setState({ user })
        this.setState({ formErrors, [name]: value });
        console.log(formErrors)
    }

    handleSubmit = (event) => {

        if (validateForm(this.state.formErrors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }

    renderForm() {
        return (
            <div className="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="Nome"></label>
                            <input type="text required" className="form-control" name="name"
                                value={this.state.user.name}
                                onChange={e => this.update(e)}
                                placeholder="Digite o nome"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="email"></label>
                            <input type="text required" className="form-control" name="email"
                                value={this.state.user.email}
                                onChange={e => this.update(e)}
                                placeholder="Insira o E-mail..."
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)} >
                            {/* onClick={this.handleSubmit()} > */}
                            
                            Salvar
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.clear(e)} >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== user)
            //const list = this.getUpdateList(users, true)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Acao</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderLinhas()}
                </tbody>
            </table>
        )
    }

    renderLinhas() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={e => this.load(user)} >
                            {/* onClick = {() => this.load(user)} dica...*/}
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        

        if (this.state.fazenda > 0) {
            return (
                <Main icon="users" title="Operadores" subtitle="Cadastro de Operadores" >
                    {this.renderForm()}
                    {this.renderTable()}
                </Main>
            )
        } else {
            return (
                <Main>
                    <div className="alert alert-danger" role="alert">
                        Por favor, insira uma fazenda antes
                    </div>
                    {this.renderForm()}
                    {this.renderTable()}
                </Main>
            )
        }
    }
}