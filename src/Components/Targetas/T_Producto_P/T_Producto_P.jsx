
import './T_Producto_P.css';
import { useState } from 'react';
import './../../../Style/fonts.css';

const T_Producto_P = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleReserve = () => {
        // URL personalizada de WhatsApp con el servicio específico
        const whatsappURL = `https://wa.me/+5355890908?text=Hola%20quiero%20reservar%20el%20producto%20${encodeURIComponent(products.name)}`;
        window.open(whatsappURL, '_blank');
    };
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
                        <h3 className="nameProduct">{product.name}</h3>
                        <p className="priceProduct">{product.price}$</p>
                        <p>Cantidad: {product.cantidadStock}</p>
                        <p className="rating" style={{ fontFamily: "sans-serif" }}>⭐⭐⭐⭐⭐</p>
                        <button
                            className="details-button"
                            style={{ fontFamily: "Comorant" }}
                            onClick={() => handleOpenModal(product)}>
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
                                <p translate="no" className="priceProduct">{selectedProduct.price}$</p>
                                <p>{selectedProduct.description}</p>
                                {Array.isArray(selectedProduct.beneficio) ? (
                                    <ul>
                                        {selectedProduct.beneficio.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>

                                ) : (
                                    <p>{selectedProduct.beneficio}</p>
                                )}

                            </div>

                        </div>
                        <button
                            onClick={handleReserve}
                            style={{ backgroundColor: "#60e264ff", color: "#ffffff", padding: "3vw", border: "none", borderRadius: "15px", marginLeft: "50%" }}
                        >
                            Reservar por WhatsApp
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default T_Producto_P;
