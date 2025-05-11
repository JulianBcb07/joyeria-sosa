import React from 'react'

// Componente memoizado para imágenes
const MemoizedImage = React.memo(({ src, alt, className }) => {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={className}
            onError={(e) => {
                e.target.onerror = null;
            }}
        />
    );
});

export default MemoizedImage;