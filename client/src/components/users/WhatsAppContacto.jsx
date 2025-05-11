import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppContacto = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ""; 
    
    // const message = `Hola, me interesa este producto: \n*${product.name}*\n*Precio: $${product.price}*\n¿Me podría dar más información?`;

    const message = `¡Hola! Me gustaría obtener más información sobre sus productos.
    ¿Podría proporcionarme más información?`;

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className='bg-green-500 rounded-2xl shadow-lg flex items-center gap-4 justify-center text-white font-medium text-md w-60 py-3  text-center transition-transform hover:scale-105'
        >
            <FaWhatsapp className="size-6" /> 
            Contactame
        </a>
    );
};

export default WhatsAppContacto;