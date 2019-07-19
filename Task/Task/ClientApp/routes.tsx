import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ListarTarefas } from './components/ListarTarefas';
import { AddTarefa } from './components/AddTarefa';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/listartarefas' component={ListarTarefas} />
    <Route path='/addtarefa' component={AddTarefa} />
    <Route path='/tarefas/:id' component={AddTarefa} />  
</Layout>;
