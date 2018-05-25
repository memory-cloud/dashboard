import React, {Component} from 'react'
import NavBar from '../../components/NavBar'
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'
import Footer from '../../components/Footer'
import './style.css'
import {Switch, Route} from 'react-router'
import Dashboard from '../../pages/dashboard'
import Login from '../../pages/login'
import NewGame from '../../pages/NewGame'
import GamePage from '../../pages/game'
import PageNotFound from '../../pages/PageNotFound'
import {initializeIcons} from '@uifabric/icons';
import {Provider} from 'unstated'
import {Subscribe} from 'unstated'
import AuthContainer from '../../containers/AuthContainer'
import FeedbackContainer from '../../containers/FeedbackContainer'
import Feedback from '../../components/Feedback'
// Register icons and pull the fonts from the default SharePoint cdn:
initializeIcons()
var auth = new AuthContainer()
var feed = new FeedbackContainer()

class App extends Component {
	render() {
		return (
			<Provider inject={[auth, feed]}>
				<Subscribe to={[AuthContainer, FeedbackContainer]}>
					{(authStore, feedStore) => (
						<Fabric className="App">
							<div className="header">
								<NavBar authStore={authStore}/>
							</div>
							<div className="body">
								<div className="content">

									<Switch>
										{/*<Route exact path="/" component={About} />*/}
										<Route exact path="/games" render={() => <Dashboard authStore={authStore} feedStore={feedStore}/>} />
										<Route exact path="/login" render={() => <Login authStore={authStore} feedStore={feedStore} />} />
										<Route exact path="/newgame" render={() => <NewGame authStore={authStore} feedStore={feedStore} />} />
										<Route exact path="/game/:id" render={(props) => <GamePage authStore={authStore} feedStore={feedStore} appid={props.match.params.id} />} />
										<Route exact path="*" component={PageNotFound}/>

									</Switch>
								</div>
							</div>
							<Feedback feedStore={feedStore}/>
							<div className="footer">
								<Footer />
							</div>
						</Fabric>
					)}
				</Subscribe>
			</Provider>
		)
	}
}

export default App