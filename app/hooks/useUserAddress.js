const useUserAddress = async () => {
    try {
        let address = {}
        let response = await fetch('/api/address/get')

        if (response) {
            let data = await response.json() // превращение в json надо тоже ждать 

            if (data) address = data
        }

        return address;

    } catch (error) {
        console.log(error)
    }


}

export default useUserAddress;