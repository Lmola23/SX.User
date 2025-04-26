import './Producto.css';
import {T_Producto_P} from './../../Components/Targetas/index.js';
import ImgInicial from '../../assets/ProductImg/imgProductoInicial.jpeg';
import { useState, useEffect } from 'react';
import {SectionIntro} from './../../Components/Utils/index.js';
import PageWrapper from '../../Components/Utils/PageWraper/PageWraper';

const getProductsFromAPI = async () => {
  try {
    const response = await fetch('https://luismola-001-site3.qtempurl.com/api/Cliente/Producto');
    const data = await response.json();
    const productsResolved = data.map((product) => ({
      id: product.id,
      name: product.title,
      price: product.precio,
      image: product.urlImg, // Se utiliza directamente la URL externa
      description: product.detalle,
      cantidadStock:product.cantidadStock,
      beneficio: product.beneficio.split(',').map(b => b.trim())
    }));
    return productsResolved;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
};

export default function Producto() {
  const [products, setProducts] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Cargar productos
        const productsFromAPI = await getProductsFromAPI();
        setProducts(productsFromAPI);

        // Precargar imagen inicial
        await new Promise((resolve) => {
          const img = new Image();
          img.src = ImgInicial;
          img.onload = resolve;
        });

        // Precargar imágenes de productos
        await Promise.all(
          productsFromAPI.map((product) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = product.image;
              img.onload = resolve;
              img.onerror = resolve; // Manejar errores de carga
            });
          })
        );

        setIsContentLoading(false);
      } catch (error) {
        console.error('Error loading content:', error);
        setIsContentLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <PageWrapper>
      <div 
        className='containerProductSection'
        data-loading={isContentLoading}
      >
        <SectionIntro
          title="Descubre tu mejor versión"
          textIntro="En Salón Xanadu, te ofrecemos productos de alta calidad para realzar tu belleza y cuidar tu cabello y piel. Explora nuestra selección y encuentra los aliados perfectos para tu rutina de belleza."
          ImgIntro={ImgInicial}
        />
        <T_Producto_P products={products} />
      </div>
    </PageWrapper>
  );
}