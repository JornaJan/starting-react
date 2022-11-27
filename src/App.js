import UseCallbackComp from './UseCallbackComp'
import UseMemoComp from './UseMemoComp'
import UseRefComp from './UseRefComp'
import UseReducerMain from './UseReducer'

function App() {
  return (
    <div className="App">
      <h1>React Hooks</h1>
      <UseCallbackComp />
      <UseMemoComp />
      <UseRefComp />
      <UseReducerMain />
    </div>
  );
}

export default App;
