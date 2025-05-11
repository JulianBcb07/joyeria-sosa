import { useState } from 'react';

const ProductFilter = ({ isMobile = false, onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleClearFilters = () => {
        setSelectedFilter(null);
        onFilterChange(null);
    };

    if (isMobile) {
        return <MobileFilter selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            onClear={handleClearFilters}
            onFilterChange={onFilterChange} />;
    }

    return <DesktopFilter selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        onClear={handleClearFilters}
        onFilterChange={onFilterChange} />;
};

const MobileFilter = ({ selectedFilter, setSelectedFilter, onClear, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (filterType) => {
        setSelectedFilter(filterType);
        onFilterChange(filterType);
        setIsOpen(false); // Cerrar después de seleccionar (opcional)
    };

    return (
        <div className='mt-8 block md:hidden'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600'
            >
                <span className='text-sm font-medium'>Filtrar productos</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`size-4 rtl:rotate-180 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {isOpen && (
                <div className='mt-4 space-y-2 border rounded-lg border-gray-300 p-4'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm font-medium'>Ordenar por</span>
                    </div>

                    <div className='flex flex-col gap-3 mt-3'>
                        <label className='flex gap-2 items-center'>
                            <input
                                type='radio'
                                name='mobile-filter'
                                checked={selectedFilter === 'high-price'}
                                onChange={() => handleFilterChange('high-price')}
                            />
                            <span className='text-sm text-gray-700'>Mayor precio</span>
                        </label>

                        <label className='flex gap-2 items-center'>
                            <input
                                type="radio"
                                name='mobile-filter'
                                checked={selectedFilter === 'low-price'}
                                onChange={() => handleFilterChange('low-price')}
                            />
                            <span className='text-sm text-gray-700'>Menor precio</span>
                        </label>
                    </div>

                    <div className='mt-4 pt-3 border-t border-gray-300 flex justify-between items-center'>
                        <span className='text-xs text-gray-700'>
                            {selectedFilter ? '1 seleccionado' : '0 seleccionado'}
                        </span>
                        <button
                            onClick={onClear}
                            className='text-xs text-gray-900 underline font-medium underline-offset-4 cursor-pointer'
                        >
                            Borrar filtro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const DesktopFilter = ({ selectedFilter, setSelectedFilter, onClear, onFilterChange }) => {
    const handleFilterChange = (filterType) => {
        setSelectedFilter(filterType);
        onFilterChange(filterType);
    };

    return (
        <div className='hidden md:block md:col-span-1'>
            <p className='block text-xs font-medium text-gray-700'>Filtros</p>
            <div className='mt-1 space-y-2 border rounded-lg border-gray-300'>
                <div className='border-b border-gray-300 p-4 flex justify-between items-center'>
                    <span className='text-sm font-medium'>Seleccionar</span>
                    <span className="transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div>
                <div className='border-b border-gray-300 p-4 flex flex-col gap-2 lg:flex-row items-center justify-between'>
                    <span className='text-sm text-gray-700'>
                        {selectedFilter ? '1 Seleccionado' : '0 Seleccionado'}
                    </span>
                    <button
                        onClick={onClear}
                        className='text-xs text-gray-900 underline font-medium underline-offset-4 cursor-pointer'
                    >
                        Borrar filtro
                    </button>
                </div>
                <div className='p-4 flex flex-col gap-2'>
                    <label className='flex gap-2 items-center'>
                        <input
                            type='radio'
                            name='desktop-filter'
                            checked={selectedFilter === 'high-price'}
                            onChange={() => handleFilterChange('high-price')}
                        />
                        <span className='text-sm text-gray-700'>Mayor precio</span>
                    </label>
                    <label className='flex gap-2 items-center'>
                        <input
                            type="radio"
                            name='desktop-filter'
                            checked={selectedFilter === 'low-price'}
                            onChange={() => handleFilterChange('low-price')}
                        />
                        <span className='text-sm text-gray-700'>Menor precio</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;