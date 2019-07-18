import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import { SwapiServiceProvider } from '../swapi-service-context'

import { 
  PeoplePage,
  StarshipPage,
  PlanetPage,
  SecretPage,
  LoginPage
} from '../pages'

import './app.css';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({ isLoggedIn: true })
  }

  render() {

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header />
              <RandomPlanet/>
              <Switch>
                <Route path="/" exact render={() => (<h2>Welcome to StarDB</h2>) } />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets/:id?" component={PlanetPage} />
                <Route path="/starships" exact component={StarshipPage} />
                <Route path="/starships/:id" 
                      render={ ({match, location, history}) => {
                        const { id } = match.params;
                        return <StarshipDetails itemId={id}/> 
                      }} />
                <Route path="/secret" render={() => ( <SecretPage isLoggedIn={ isLoggedIn } /> ) } />       
                <Route path="/login" render={() => ( <LoginPage isLoggedIn={ isLoggedIn } onLogin={ this.onLogin }/> ) } />       
                <Redirect to="/" />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
