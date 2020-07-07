import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import MusicComp from './components/MusicComp/MusicComp';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/login';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

// import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));         //Ленивая загрузка данных компонента, загружается только после перехода.
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));         ////Ленивая загрузка данных компонента, загружается только после перехода.

class App extends React.Component {

    catchAllUnhandledError = (reason, promise) => {
        alert('promiseRejectionEvent');
        // console.log(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp()        //thunk вызываем

        window.addEventListener('unhandledrejection', this.catchAllUnhandledError);         //обработка всех reject от промисов(всех ошибок промисов)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledError);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/profile' />} />

                        {/* <Route path="/dialogs" component={Dialogs} />
                        <Route path="/profile" component={Profile} /> */}
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)} />       {/* Обернули комопнент в Suspense в хоке */}

                        {/* return (
                             <Suspense fallback={<div>Загрузка...</div>}>            
                                 <DialogsContainer />
                             </Suspense>
                         )
                    }} /> */}
                        <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />       {/* Обернули комопнент в Suspense в хоке */}
                        {/* <Route path='/profile/:userId?' render={() => {
                        return (
                            <Suspense fallback={<div>Загрузка...</div>}>
                                <ProfileContainer />
                            </Suspense>
                        )
                    }} /> */}
                        <Route path='/users' render={() => <UsersContainer pageTitle='Samurai' />} />
                        <Route path='/news' component={News} />
                        <Route path='/music' component={MusicComp} />
                        <Route path='/settings' component={Settings} />
                        <Route path='/login' render={() => <Login />} />

                        <Route path='*' render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </div>

                <footer className='footer'>Footer</footer>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);
