import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListarTarefas } from './components/ListarTarefas';
import { AddTarefa } from './components/AddTarefa';

export const routes = <Layout>
    <Route exact path='/' component={ ListarTarefas } />
    <Route path='/listartarefas' component={ListarTarefas} />
    <Route path='/addtarefa' component={AddTarefa} />
    <Route path='/tarefas/:id' component={AddTarefa} />  
</Layout>;
