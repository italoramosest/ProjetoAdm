import React, { Component } from 'react'
import Main from '../templates/Main'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/fazenda'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const estadoInicial = {
    fazenda: { name: '', location: '', fone: '', site:'', email: '' },
    list: [],
    formErros: {
        name: "Insira nome maior",
        location: 'Insira endereço da fazenda',
        fone: 'Insira um número valido',
        email: "Email incorreto"
    }
}

const validateForm = (errors) => {
    let valid = true;
    if (errors) {
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
    } else {
        valid = false;
    }
    return valid;
}

export default class FazendaCrud extends Component {
    state = { ...estadoInicial }
    
    componentWillMount() {
         axios('http://localhost:3001/fazenda').then(resp => { 
             console.log(resp.data)
         })

        axios(baseUrl).then(resp => { //FAZ GET
            this.setState({ list: resp.data })
        })
    }
    getUpdateList(fazenda) {
        const list = this.state.list.filter(u => u.id !== fazenda.id)
        list.push(fazenda)
        return list
    }

    save(event) {
        event.preventDefault();

        const formErrors = this.state.formErros
        const fazenda = this.state.fazenda
        const method = fazenda.id ? 'put' : 'post' //se esta setado entao sera alteracao, senao sera post
        const url = fazenda.id ? `${baseUrl}/${fazenda.id}` : baseUrl

        if (validateForm(this.state.formErrors)) {
            console.info('Valid Form fazenda')
            axios[method](url, fazenda)
                .then(resp => {
                    const list = this.getUpdateList(resp.data)
                    this.setState({ fazenda: estadoInicial.fazenda, list })
                })
        } else {
            console.error('Invalid Form')
        }
    }

    clear() {
        this.setState({ fazenda: estadoInicial.fazenda })
    }

    update(event) {
        event.preventDefault();

        const { name, value } = event.target;
        const fazenda = { ...this.state.fazenda }
        let formErrors = this.state.formErros;

        switch (name) {
            case 'name':
                formErrors.name =
                    value.length < 3 && value.length > 0 ? "Caracteres minimos" : '';
                break;
            case 'location':
                formErrors.name =
                    value.length < 3 && value.length > 0 ? "Endereço curto demais" : '';
                break;
            case 'fone':
                formErrors.name =
                    value.length < 9 && value.length > 0 ? "Numero de telefone incorreto" : '';
                break;
            case 'email':
                formErrors.email =
                    emailRegex.test(value) ? '' : 'Email incorreto';
                break;
            default:
                break;
        }

        fazenda[event.target.name] = event.target.value
        this.setState({ fazenda })
        this.setState({ formErrors, [name]: value });
    }
    renderForm() {
        return (
            <div className="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label ></label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.fazenda.name}
                                onChange={e => this.update(e)}
                                placeholder="Insira um nome"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label></label>
                            <input type="text" className="form-control" name="location"
                                value={this.state.fazenda.location}
                                onChange={e => this.update(e)}
                                placeholder="Insira o endereço"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label ></label>
                            <input type="text" className="form-control" name="tel"
                                value={this.state.fazenda.fone}
                                onChange={e => this.update(e)}
                                placeholder="Insira um telefone"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-9">
                        <div className="form-group">
                            <label ></label>
                            <input type="text" className="form-control" name="site"
                                value={this.state.fazenda.site}
                                onChange={e => this.update(e)}
                                placeholder="Insira o site (Opcional)"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label ></label>
                            <input type="text" className="form-control" name="email"
                                value={this.state.fazenda.email}
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
    load(fazenda) {
        this.setState({ fazenda })
    }

    remove(fazenda) {
        axios.delete(`${baseUrl}/${fazenda.id}`).then(resp => {
            const list = this.state.list.filter(u => u !== fazenda)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Site</th>
                        <th>E-Mail</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderLinhas()}
                </tbody>
            </table>
        )
    }
    renderLinhas() {
        return this.state.list.map(fazenda => {
            return (
                <tr key={fazenda.id}>
                    <td>{fazenda.name}</td>
                    <td>{fazenda.location}</td>
                    <td>{fazenda.fone}</td>
                    <td>{fazenda.site}</td>
                    <td>{fazenda.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={e => this.load(fazenda)} >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.remove(fazenda)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main icon="warehouse" title="Fazendas" subtitle="Cadastro de fazendas">
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}