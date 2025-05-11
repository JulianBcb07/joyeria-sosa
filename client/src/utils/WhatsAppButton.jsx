import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ product }) => {
    // Validación por si el producto no está definido
    if (!product) return null;

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "";
    
    // const message = `Hola, me interesa este producto: \n*${product.name}*\n*Precio: $${product.price}*\n¿Me podría dar más información?`;

    const message = `¡Hola! Vi este producto en su catálogo:
    *Enlace al producto*: http://localhost:5173/producto/${product.id_product}
    *Detalles:*
    - Nombre: ${product.name}
    - Precio: $${product.price}  
    ¿Podría proporcionarme más información?`;

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 rounded-full shadow-lg flex items-center gap-4 justify-center text-white font-medium text-md w-80 py-2 text-center transition-transform hover:scale-105"
            aria-label="Contactar por WhatsApp sobre este producto"
        >
            <FaWhatsapp className="size-6" /> 
            Preguntar por este producto
        </a>
    );
};

export default WhatsAppButton;