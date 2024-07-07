import './App.scss';
import './overrides.scss';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/el';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/home-page/HomePage';

moment.locale('el');

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
          </Routes>
        </main>

        <ToastContainer
          position='bottom-center'
          transition={Slide}
        ></ToastContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
