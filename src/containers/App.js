import { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
//import { robots } from './robots'
import Scroll from '../components/Scroll';
import './App.css'

// importamos un action para conectar con los reducers
import { setSearchField, requestRobots } from '../actions/actions'

// define los state que seràn escuchados
// debe incluir los state que se utilizan en los actions
const mapStateToProps = state =>{
    return {
        // state tiene 2 propiedades por combinar los reducers
        searchField : state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        // se indican los action que estan utilizandose para procesar los cambios de estados
        // el action requestRobots tiene un metodo de envio dispatch
        onSearchChange : (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: ()=> dispatch(requestRobots())
        // onRequestRobots: ()=> requestRobots(dispatch) // se reemplazo para usar thunk

    }
}

//const App = ()=>{
class App extends Component{
    // no se necesita el constructor para crear state porque se usa redux
    // constructor(){
    //     super()
    //     this.state = {
    //         robots: [],
    //         //searchfield : '' // se elimina por uso de mapStateToProps
    //     }
    // }

    componentDidMount(){
        //cuando <App> recibe el almacen de estados
        //console.log(this.props.store.getState());
        // ya no se requiere
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response=>response.json())
        //     .then(users=>this.setState({robots : users}));

        this.props.onRequestRobots();

    }
    // se elimina método por uso de mapDispatchToProps
    // onSearchChange = (event)=>{
    //     this.setState({searchfield: event.target.value})
    // }

    render(){
        // desectructuramos para un codigo más limpio
        // const { robots, searchfield } = this.state; 
        // se modifica, ya no necesita iondicar searchfield

        // ya no existe como propiedad de la clase
        // const { robots } = this.state;
        // ambas funciones o acciones viene de props
        const { searchField, onSearchChange, robots, isPending } = this.props;


        const filterRobots = robots.filter(robot=>{
            return robot.name.toLowerCase()
            .includes(searchField.toLowerCase())
        })
        // robots.length === 0
        //return !robots.length ?  // ahora se consluta por isPending
        return isPending ? 
            <h1>Loading ...</h1> :
            (
                <div  className='tc'>
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} /> 
                    <Scroll>
                        <CardList robots={filterRobots}/>
                    </Scroll>
                </div>
            );
    }
}

// connect es un funcion deorden superior, dentro realizara la conexión con el
// almacen de estado devolviendo una funcion que se ejecutara usando App como parametro
// asi App es suscrita para ser actualizada cuando corran cambios en el almacen de estados
// para su ejecución, connect recibe 2 parametros obligatorios, los nombres son standards
// el estado a escuchar por App es mapStateToProps y la acción a escuchar es mapDipachToProps
// se configura, esta escuchando estos estados y esta interesado en estas acciones y se los
// entrega a la App 
export default connect(mapStateToProps, mapDispatchToProps)(App);
