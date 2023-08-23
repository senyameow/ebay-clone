import { data } from "autoprefixer";

const useCreateAddress = async (address) => {
    let url = 'create';
    if (address.addressId) { // если поле addressId не пустое, то update, если пустое, то create
        url = 'update'
    } // теперь мы можем заюзать этот юрл в запросе на апишку

    // т.е. если пока не заполняли адрес, то будем фетчить дату с create, если заполняли, то с update

    const response = await fetch(`/api/address/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            addressId: address.addressId,
            name: address.name,
            address: address.address,
            zipcode: address.zipcode,
            city: address.city,
            country: address.country
        }) // вот так фетчим дату
    })

    const data = await response.json()

    return data

}

export default useCreateAddress;