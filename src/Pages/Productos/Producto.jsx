import './Producto.css';
import {T_Producto_P} from './../../Components/Targetas/index.js';
import ImgInicial from '../../assets/ProductImg/imgProductoInicial.jpeg';
import { useState, useEffect } from 'react';
import {SectionIntro} from './../../Components/Utils/index.js';

const getProductsFromAPI = async () => {
  try {
    const response = await fetch('http://luismola-001-site2.qtempurl.com/api/Cliente/Producto');
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

  useEffect(() => {
    const loadProducts = async () => {
      const productsFromAPI = await getProductsFromAPI();
      console.log("Productos desde API:", productsFromAPI);
      setProducts(productsFromAPI);
    };
    loadProducts();
  }, []);

  return (
    <div className='containerProductSection'>
      <SectionIntro
        title="Descubre tu mejor versión"
        textIntro="En Salón Xanadu, te ofrecemos productos de alta calidad para realzar tu belleza y cuidar tu cabello y piel. Explora nuestra selección y encuentra los aliados perfectos para tu rutina de belleza."
        ImgIntro={ImgInicial}
      />
      <T_Producto_P products={products} />
    </div>
  );
}