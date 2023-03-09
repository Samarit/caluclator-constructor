import { Provider } from 'react-redux';
import './App.sass';
import Constructor from './components/constructor/Constructor';
import DropArea from './components/droparea/DropArea';
import SwitchMode from './components/SwitchMode/SwitchMode';
import store from './core/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <SwitchMode />
          <Constructor />
          <DropArea />
        </div>
        </div>
    </Provider>
  );
}

export default App;
