import React, {Component} from 'react'
import NavBar from '../components/NavBar'
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'
import Footer from '../components/Footer'
import './style.css'
import {Switch, Route} from 'react-router'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import NewGame from '../pages/NewGame'
import GamePage from '../pages/game'
import PageNotFound from '../pages/PageNotFound'
import {initializeIcons} from '@uifabric/icons'
import {AuthStore} from '../containers/AuthContainer'
import {GameStore} from '../containers/GameContainer'
import {FeedStore} from '../containers/FeedbackContainer'
import Feedback from '../components/Feedback'

class App extends Component {
	constructor() {
		super()
		initializeIcons()
	}

	render() {
		return (
			<FeedStore>
				{ feedStore => (
					<AuthStore>
						{authStore => (
							<Fabric className="App">
								<div className="header">
									<NavBar authStore={authStore}/>
								</div>
								<div className="body">
									<div className="content">
										<GameStore>
											{gameStore => (
												<Switch>
													{/*<Route exact path="/" component={About} />*/}
													<Route exact path="/login" render={() =>
														<Login
															authStore={authStore}
															feedStore={feedStore}/>
													}/>

													<Route exact path="/games" render={() =>
														<Dashboard
															feedStore={feedStore}
															gameStore={gameStore}
														/>
													}/>
													<Route exact path="/newgame" render={() =>
														<NewGame
															feedStore={feedStore}
															gameStore={gameStore}
														/>
													}/>
													<Route exact path="/game/:id" render={(props) =>
														<GamePage
															feedStore={feedStore}
															gameStore={gameStore}
															appid={props.match.params.id}/>
													}/>

													<Route exact path="*" component={PageNotFound}/>
												</Switch>
											)}
										</GameStore>
									</div>
								</div>
								<Feedback feedStore={feedStore}/>
								<Footer/>
							</Fabric>
						)}
					</AuthStore>
				) }
			</FeedStore>
		)
	}
}

export default App