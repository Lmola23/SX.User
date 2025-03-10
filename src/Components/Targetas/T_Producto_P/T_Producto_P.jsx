
import './T_Producto_P.css';
import { useState } from 'react';
import './../../../Style/fonts.css';

const T_Producto_P = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    document.body.classList.remove('modal-open');
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    document.body.classList.add('modal-open');
  };

  return (
    <div className="product-grid" style={{ fontFamily: "Comorant" }}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className='nameProduct'>{product.name}</h3>
            <p className="priceProduct">{product.price}$</p>
            <p>Cantidad :{product.cantidadStock}</p>
            <p className="rating" style={{ fontFamily: "sans-serif" }}>⭐⭐⭐⭐⭐5</p>
            <button className="details-button" style={{ fontFamily: "Comorant" }} onClick={() => handleOpenModal(product)}>
              Ver detalles
            </button>
          </div>
        ))
      ) : (
        <p>No se encontraron productos.</p>
      )}

      {selectedProduct && (
        <div className="modal-overlay" style={{ fontFamily: "Comorant" }}>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>✖</button>
            <div className="product-details">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />
              <div className="details-text">
                <h2 style={{ fontStyle: "italic" }}>{selectedProduct.name}</h2>
                <p className="priceProduct">{selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
                {/* Si selectedProduct.beneficio es un arreglo, renderizarlo como lista; de lo contrario, mostrarlo en un párrafo */}
                {Array.isArray(selectedProduct.beneficio) ? (
                  <ul style={{textAlign:"start"}}>
                    {selectedProduct.beneficio.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{selectedProduct.beneficio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default T_Producto_P;
