import React from "react";

const LocationSearchPanel = (props) => {

    const locations = [
        "24B, Near Kapoor's cafe",
        "70A, Noida son market",
        "yamuna 34 C-1 Block malhotra shop"
    ]

    return (
        <div >

            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={()=>{
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className="flex items-centre m-4 gap-4 justify-start">
                        <h2 className="bg-[#eee] h-7 flex items-center justify-centre w-12 rounded-full"><i className="ri-map-pin-fill text-xl"></i></h2>
                        <h4 className="font-medium">{elem}</h4>
                    </div>
                })
            }


        </div>
    );
}

export default LocationSearchPanel;