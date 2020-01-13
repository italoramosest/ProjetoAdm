import React from 'react'
import axios from 'axios'


export default function (props) {

    const user = this.state.user
    const method = user.id ? 'put' : 'post' //se esta setado entao sera alteracao, senao sera put
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    console.log(method, url, user)
    axios[method](url, user)
        .then(resp => {
            const list = this.getUpdateList(resp.data)
            this.setState({ user: estadoInicial.user, list })
        })
    return
}







