import UseCallbackComp from './UseCallbackComp'
import UseMemoComp from './UseMemoComp'
import UseRefComp from './UseRefComp'
function App() {
  return (
    <div className="App">
      <h1>React Hooks</h1>
      <UseCallbackComp />
      <UseMemoComp />
      <UseRefComp />
    </div>
  );
}

export default App;
