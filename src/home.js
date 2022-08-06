import './App.css';
import Naalebaa from './naalebaa.png';

function Home() {
  return (
    <div className="App">
       <div className="container" style={{ marginTop:'150px' }}>
            <img src={Naalebaa} style={{ width:'40%' }} alt="naalebaa logo" />
            <h1>You don't need to hear Naalebaa with project Naalebaa</h1>
        </div>
    </div>
  );
}
export default Home;