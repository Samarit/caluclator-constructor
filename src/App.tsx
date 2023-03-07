import { Provider } from 'react-redux';
import './App.css';
import Constructor from './components/constructor/Constructor';
import store from './core/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Constructor />
      </div>
    </Provider>
  );
}

export default App;
