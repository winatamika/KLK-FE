import logo from './logo.svg';
import './App.css';
import Navigation from './apps/Navigation';
import Background from './apps/Background';
import Userlists from './apps/Userlists';


function App() {
  return (
    <div>
      <Navigation />
      <Background />
      <Userlists />
    </div>
  );
}

export default App;
