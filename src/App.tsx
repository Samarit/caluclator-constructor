import { Provider } from 'react-redux';
import './App.sass';
import Constructor from './components/constructor/Constructor';
import DragArea from './components/dragarea/DragArea';
import store from './core/store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Constructor />
          <DragArea />
        </div>
        </div>
    </Provider>
  );
}

export default App;
