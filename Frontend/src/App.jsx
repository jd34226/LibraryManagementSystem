import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Books from './pages/Books';
import BookAdd from './pages/BookAdd';
import BookUpdate from './pages/BookUpdate';

import Transaction from './pages/Transaction';
import TransactionAdd from './pages/TransactionAdd';
import TransactionUpdate from './pages/TransactionUpdate';

import Members from './pages/Members';
import MemberAdd from './pages/MemberAdd';
import MemberUpdate from './pages/MemberUpdate';

import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<BookAdd />} />
        <Route path="/books/update/:id" element={<BookUpdate />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction/add" element={<TransactionAdd />} />
        <Route path="/transaction/update/:id" element={<TransactionUpdate />} />
        <Route path="/member/add" element={<MemberAdd />} />
        <Route path="/member/update/:id" element={<MemberUpdate />} />
        <Route path="/members" element={<Members />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
