import { Provider, useSelector } from 'react-redux';
import './App.sass';
import Calculator from './components/Calculator';
import store, { RootState } from './core/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Calculator />
        </div>
    </Provider>
  );
}

export default App;
