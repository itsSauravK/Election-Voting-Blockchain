import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<p>Home page</p>}/>
        <Route path='/login' element={<p>Login</p>}/>
        <Route path='/register' element={<p>Register user</p>}/>
        <Route path='/election' element={<p>Election page</p>}/>
        <Route path='/results' element={<p>All results</p>}/>
        <Route path='/results/:id' element={<p>Single result</p>}/>
        <Route path='/users' element={<p>All users</p>}/>
        <Route path='/users/:id' element={<p>Edit USer</p>}/>
        <Route path='/addElection' element={<p>Add election name and description</p>}/>
        <Route path='/addCandidate' element={<p>Add Candidate to election</p>}/>
        <Route path='/*' element={<p>Wrong page</p>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
