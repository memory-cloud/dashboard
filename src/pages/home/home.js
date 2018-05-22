import React, {Component} from 'react'
import NavBar from '../../containers/header'
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'
import Footer from '../../containers/Footer'
import './style.css'
import { Switch, Route } from 'react-router'
import Dashboard from '../../pages/dashboard'
import Login from '../../pages/login'
import NewGame from '../../pages/newgame'
import GamePage from '../../pages/game'
import PageNotFound from '../../pages/PageNotFound'
import { initializeIcons } from '@uifabric/icons';

// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons()
class App extends Component {
	render() {
		return (
			<Fabric className="App">
				<div className="header">
					<NavBar />
				</div>
				<div className="body">
					<div className="content">
						<Switch>
							{/*<Route exact path="/about" component={About} />*/}
							<Route exact path="/dashboard" component={Dashboard}/>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/newgame" component={NewGame}/>
							<Route exact path="/game/:id" component={GamePage}/>
							<Route exact path="*" component={PageNotFound}/>
						</Switch>
					</div>
				</div>
				<div className="footer">
					<Footer />
				</div>
			</Fabric>
		)
	}
}

export default App