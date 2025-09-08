import { BrowserRouter , Routes, Route } from "react-router-dom";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Careers />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:jobId" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
