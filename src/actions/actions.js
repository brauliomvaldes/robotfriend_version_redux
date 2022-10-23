import { 
        CHANGE_SEARCH_FIELD,
        REQUEST_ROBOTS_PENDING,
        REQUEST_ROBOTS_SUCCESS,
        REQUEST_ROBOTS_FAILED
} from "../constants/constants";

export const setSearchField = (text)=>({
        type: CHANGE_SEARCH_FIELD,
        payload: text  
})

// se utiliza un funcion de orden superior que recibe una funcion para procesar la 
// devolución del dispatch, que es una función
export const requestRobots = () =>(dispatch) =>{
        // se envia sin payload porque no hay aùn datos o carga util que enviar
        dispatch({ type: REQUEST_ROBOTS_PENDING });
        // se realiza la solicitud asíncrona
        // una vez recibido los datos en la promesa se envia la carga util payload 
        // con los datos recibidos
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(data=>dispatch({ 
                type: REQUEST_ROBOTS_SUCCESS,
                payload: data
                }))
        .catch(error=>dispatch({
                type: REQUEST_ROBOTS_FAILED,
                payload: error
        }))
}