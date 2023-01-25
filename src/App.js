import logo from './logo.svg';
import './App.css';
import Heavy from './components/Heavy';
import { ModalProvider, useModalDialog } from './hooks/useModalDialog';

function App() {
  const {showConfirmDialog,closeModalDialog} = useModalDialog();
  

  return (
    
    <div className="App">
      <p>this is an app</p>
      <Heavy/>
    </div>
  );
}

export default App;
