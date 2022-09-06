import FormReport from './components/FormReport';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='font-poppins flex justify-center py-10'>
        <FormReport />
      </div>
    </>
  );
}

export default App;
