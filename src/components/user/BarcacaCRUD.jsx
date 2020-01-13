import React, { Component } from 'react'
import Main from '../templates/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Barcaça',
    subtitle: 'Cadastro de barcaças'
}

const baseUrl = 'http://localhost:3001/barcaca'

const estadoInicial = {
    user: { name: '', email: '' },
    list: []

}

export default class BarcacaCrud extends Component {

    state = {...estadoInicial}

    render(){
        return(
            <Main>
                if( this.state.list)
            </Main>
            
        )
    }
}