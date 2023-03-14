import axios from 'axios'
const form = document.querySelector('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement

type googleGeoCodingResponse = {
    results: {
        geometry: {
            location: {
                lat: number,
                lng: number
            }
        }
    }[]
    status: 'OK' | 'ZERO_RESULTS'
}

const GOOGLE_API_KEY = "AIzaSyC1RHvMOSHUyTeyqDIteVl7NpXImD7gwWs"

const searchAddressHandler = (event: Event) => {
    event.preventDefault()
    const enteredAddress = addressInput.value

    axios.get<googleGeoCodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error("Could not fetch location!")
            }
            const coordinates = response.data.results[0].geometry.location

            const map = new google.maps.Map(document.getElementById("map") as HTMLInputElement, {
                center: coordinates,
                zoom: 16,
            });

            new google.maps.Marker({position: coordinates, map: map})
        })
        .catch(err => {
            alert(err.message)
            console.log(err)
        })
}

            //console.log(coordinates)
            //console.log(response.data.results[0].formatted_address)

form.addEventListener('submit', searchAddressHandler)
