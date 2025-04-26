import { useState, useEffect } from 'react';
import PerfilUsuario from "../../Components/PerfilUsuario/PerfilUsuario";
import PageWrapper from '../../Components/Utils/PageWraper/PageWraper';
import './Perfil.css';

const Perfil = () => {
    const [isContentLoading, setIsContentLoading] = useState(true);

    useEffect(() => {
        const loadProfileContent = async () => {
            try {
                // Simulate or wait for profile data to load
                await new Promise(resolve => setTimeout(resolve, 500));
                setIsContentLoading(false);
            } catch (error) {
                console.error('Error loading profile:', error);
                setIsContentLoading(false);
            }
        };

        loadProfileContent();
    }, []);

    return (
        <PageWrapper>
            <div 
                className="perfilContainerPage"
                data-loading={isContentLoading}
            >
                <PerfilUsuario />
            </div>
        </PageWrapper>
    );
};

export default Perfil;