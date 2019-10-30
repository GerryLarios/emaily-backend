import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

export default () => (
    <div>
        <BrowserRouter>
            <div>
                <Header/>
                <Route exact path="/" component={Landing} />
                <Route exact path="/surveys" component={Dashboard} />
                <Route path="/survey/new" component={SurveyNew} />
            </div>
        </BrowserRouter>
    </div>
)