import Footer from "../../components/footer/Footer"
import ListCarForm from "../../components/listCarForm/ListCarForm"
import Navbar from "../../components/navbar/Navbar"
import "./listCar.css"

const ListCar = () => {
  return (
    <div className="listCar">
        <Navbar type={"listcar"} />
        <div className="listCarContainer">
            <ListCarForm />
        </div>
        <Footer />
    </div>
  )
}

export default ListCar