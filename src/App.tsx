import { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import ThemeProvider from './theme.provider'


class App extends Component {
    public render() {
        return <Provider store={store}>
          	<ThemeProvider/>
        </Provider>
    }
}

export default App
