import Captain from "../models/captain.model.js";

const createCaptain = async (
    {
        firstname,
        lastname,
        email,
        password,
        color,
        plate,
        capacity,
        vehicleType,
        contact,

    }) => {

    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        },
        contact,
    })

    if(!captain) throw new Error("Something went wrong while registering captain")

    return captain;

}

export {createCaptain};