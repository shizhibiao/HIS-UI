import React from 'react';
import './assets/css/App.css';
import {HashRouter} from 'react-router-dom';
import Routers from './routers/Index';

class App extends React.Component {
  constructor() {
		super();
		this.state = {
			
		}
	}

	componentDidMount() {
		
	}
	
  
  render() {
    return(
      <HashRouter>
        <div className="app">
					<Routers />
        </div>
      </HashRouter>
    )
  }
}
export default App;