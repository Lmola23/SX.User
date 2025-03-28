import PerfilUsuario from "../../Components/PerfilUsuario/PerfilUsuario";
import './Perfil.css'
import imagPerfil from './../../assets/PerfilImg/fotoPefil.png'
const Perfil = () => {
    return (
        <div className="perfilContainerPage">
            <div className="perfilContainerImg">
             <img  className="imgPerfillogo" src={imagPerfil} alt="icono de perfil" />
            </div>
        <PerfilUsuario />
        </div>
    );
    };
export default Perfil;