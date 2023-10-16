import { useContext, useEffect } from "react"
import Footer from "../../components/footer/Footer"
import ListCarForm from "../../components/listCarForm/ListCarForm"
import Navbar from "../../components/navbar/Navbar"
import "./listCar.css"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const ListCar = () => {

  const  { user } = useContext(AuthContext)
  const navigate = useNavigate() 

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, []);

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