import "./listCarForm.css"

const ListCarForm = () => {
  return (
    <div className="listCarForm">
        <div className="listCarFormContainer">
            <div className="listCarFormIntro">
                <span>Trade your car</span>
                <h1>List your <br />vehycle</h1>
                <p>
                    Interested in trading in your current vehicle? <br />
                    It would probably be good to have an estimate of what it’s worth first. <br />
                    After all, trading in a vehicle is a lot less hassle than selling it yourself. <br />
                    And you can often lower your payments by trading in a vehicle as well. Win-win!
                </p>
            </div>
            <div className="listCarDetails">
                <div className="listCarHeader">
                    <div className="listCarHeaderItem active">
                        <span className="step">
                            01
                        </span>
                        <h3>Basic Info</h3>
                        <span className="desc">
                            Add your vehycle details
                        </span>
                    </div>
                    <div className="listCarHeaderItem">
                        <span className="step">
                            02
                        </span>
                        <h3>Description</h3>
                        <span className="desc">
                            Add vehycle description
                        </span>
                    </div>
                    <div className="listCarHeaderItem">
                        <span className="step">
                            03
                        </span>
                        <h3>Settings</h3>
                        <span className="desc">
                            Add vehycle settings
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListCarForm