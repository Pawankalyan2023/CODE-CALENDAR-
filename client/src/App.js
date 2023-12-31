import './App.css';
import Navi from './Component/navbar';
import Pageindex from './Content';
import Foter from './Footer/footer';

function App() {
  return (
    <div className="App">
      <Navi/>
      <Pageindex/> 
      <Foter/>
    </div>
  );
}

export default App;
