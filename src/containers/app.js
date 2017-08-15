import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from './home';
import LoadingOverlay from '../components/loadingOverlay';

import '../scss/app.css';

class App extends React.Component {
    
    componentWillMount() {
    }
    
    render() {
        return (
            <div>
                <header>
                    <NavLink className="home-link" to="/">V</NavLink>
                    <NavLink to="/Top">Top</NavLink>
                    <NavLink to="/New">New</NavLink>
                    <NavLink to="/Show">Show</NavLink>
                    <NavLink to="/Ask">Ask</NavLink>
                    <NavLink to="/Jobs">Jobs</NavLink>
                </header>
                
                <main>
                    <Home/>
                </main>
                
                {this.props.loading && <LoadingOverlay/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.ajaxStatus > 0
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
