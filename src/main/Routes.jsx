import React from 'react'
import { Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCRUD'
import Fazenda from '../components/user/FazendaCrud'
// import Login from '../components/Login'

export default props =>
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/users' component={UserCrud} />
    <Route path='/fazenda' component={Fazenda} />
    {/* <Route path='/login' component={Login} /> */}
    <Redirect from= '*' to='/' />
</Switch>