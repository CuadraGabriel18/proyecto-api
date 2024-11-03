import { useState } from "react";
import Peticiones from "./components/Peticiones";
import MostrarTracks from "./components/MostrarTracks";
import BuscarTrack from "./components/BuscarTrack";
import EliminarTrack from "./components/EliminarTrack";
import GuardarTrack from "./components/GuardarTrack";
import EditarTrack from "./components/EditarTrack";


function App() {
  const [Paginas, setSeleccPag] = useState('segunda');

  const RederegirPagina = () => {
    switch (Paginas) {
      case 'segunda':
        return <Peticiones navigate={setSeleccPag} />;
      case 'mostrarTracks':
        return <MostrarTracks navigate={setSeleccPag} />;
      case 'buscarTracks':
        return <BuscarTrack navigate={setSeleccPag} />;
      case 'guardarTrack':
        return <GuardarTrack navigate={setSeleccPag}/>;
        case 'editarTrack':
          return <EditarTrack navigate={setSeleccPag}/>;
      case 'eliminarTrack':
        return <EliminarTrack navigate={setSeleccPag} />;
      default:
        return <Peticiones navigate={setSeleccPag} />;
    }
  };
  return (
    <div className="App">
      <div>
        {RederegirPagina()}
      </div>
    </div>
  );
}

export default App;
