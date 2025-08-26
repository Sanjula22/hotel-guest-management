import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Guest Management System</h1>
        <Routes>
          <Route path="/guests" element={<div>Guest List</div>} />
          <Route path="/guests/new" element={<div>Add Guest</div>} />
          <Route path="/guests/:id" element={<div>Guest Detail</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;