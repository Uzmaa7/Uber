import React from "react";

const LocationSearchPanel = ({setPanelOpen, activeField, suggestions, setPickup,setDestination, setVehiclePanel }) => {

    // const locations = [
    //     "24B, Near Kapoor's cafe",
    //     "70A, Noida son market",
    //     "yamuna 34 C-1 Block malhotra shop"
    // ]


    // sample array for location 
    const handleSuggestionClick = (suggestion) => {
        if(activeField === 'pickup'){
            setPickup(suggestion)
        }else{
            setDestination(suggestion)
        }
        // console.log(suggestions)
    }

    return (
        <div >

            {/* {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={()=>{
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className="flex items-centre m-4 gap-4 justify-start">
                        <h2 className="bg-[#eee] h-7 flex items-center justify-centre w-12 rounded-full"><i className="ri-map-pin-fill text-xl"></i></h2>
                        <h4 className="font-medium">{elem}</h4>
                    </div>
                })
            } */}


            {
                Array.isArray(suggestions) ? suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => {handleSuggestionClick(elem.description)}}
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem.description}</h4>
                    </div>
                )): <p className="p-2 text-gray-500">No suggestions available</p>
            }


        </div>
    );
}

export default LocationSearchPanel;