import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Popular from "./pages/popular/Popular";
import Explore from "./pages/explore/Explore";
import Login from "./pages/login/Login";
import ListCar from "./pages/list_car/ListCar";
import Listing from "./pages/listing/Listing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/popular" element={<Popular />}/>
        <Route path="/explore" element={<Explore />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/listcar" element={<ListCar />} />
        <Route path="/listings/:id" element={<Listing />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;