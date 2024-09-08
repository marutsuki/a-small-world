import { FC } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './layout/Main';
import Header from './layout/Header';

const App: FC = () => (
    <Provider store={store}>
        <Header />
        <Main />
    </Provider>
);

export default App;
