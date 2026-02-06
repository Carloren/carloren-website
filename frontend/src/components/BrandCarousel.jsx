import React, { useRef, useState, useEffect } from 'react';

// Dynamically import all logo images
const logoModules = import.meta.glob('../assets/logos/*', { eager: true });

// Helper function to get image path from filename
const getImagePath = (filename) => {
    const imagePath = `../assets/logos/${filename}`;
    return logoModules[imagePath]?.default || null;
};

const brands = [
    { name: 'Netflix', img: getImagePath('netflix.svg'), invertible: false, wide: true },
    { name: 'HBO', img: getImagePath('hbo.svg'), invertible: true, wide: false },
    { name: 'Crunchyroll', img: getImagePath('crunchyroll.svg'), invertible: false, wide: true },
    { name: 'Prime Video', img: getImagePath('prime-video.svg'), invertible: false, wide: true },
    { name: 'Ubisoft', img: getImagePath('Ubisoft.svg'), invertible: true, wide: false },
    { name: 'Bethesda', img: getImagePath('Bethesda.svg'), invertible: true, wide: true },
    { name: 'SkyShowtime', img: getImagePath('sky.svg'), invertible: true, wide: false },
    { name: 'Samsung', img: getImagePath('Samsung.svg'), invertible: true, wide: true },
    { name: 'Repsol', img: getImagePath('repsol.svg'), invertible: false, wide: true },
    // { name: 'Betis', img: getImagePath('betis.svg'), invertible: false, wide: true },
    { name: 'Schweppes', img: getImagePath('Schweppes.svg'), invertible: false, wide: true },
    { name: 'Mercadona', img: getImagePath('Mercadona.svg'), invertible: false, wide: true },
    { name: 'Ministerio de Hacienda', img: getImagePath('ministerio-hacienda.svg'), invertible: false, wide: true },
    { name: 'Movistar Plus', img: getImagePath('movistar-plus.svg'), invertible: true, wide: false },
    { name: 'AMC+', img: getImagePath('amc.svg'), invertible: true, wide: false },
    { name: 'ACORN TV', img: getImagePath('acorn-tv.png'), invertible: false, wide: true },
    { name: 'Animebox', img: getImagePath('animebox.png'), invertible: false, wide: false },
    { name: 'Antena 3', img: getImagePath('antena3.svg'), invertible: false, wide: false },
    { name: 'Nova', img: getImagePath('Nova.svg'), invertible: false, wide: false },
    { name: 'Nickelodeon', img: getImagePath('Nickelodeon.svg'), invertible: false, wide: true },
    { name: 'EAE Business School', img: getImagePath('eae-business-school.png'), invertible: false, wide: true },
    { name: 'Finanzas para todos', img: getImagePath('finanzas-para-todos.png'), invertible: false, wide: true },
    { name: 'Numericco', img: getImagePath('Numericco.png'), invertible: false, wide: true },
    { name: 'Canal Cocina', img: getImagePath('canal-cocina.png'), invertible: false, wide: true },
    { name: 'Dark', img: getImagePath('dark.png'), invertible: true, wide: false },
    { name: 'DMAX', img: getImagePath('dmax.svg'), invertible: true, wide: false },
    { name: 'Discovery+', img: getImagePath('discovery-plus.png'), invertible: false, wide: true },
    { name: 'Beon Entertainment', img: getImagePath('beon-entertainment.svg'), invertible: false, wide: false },
    { name: 'SIMA', img: getImagePath('sima.svg'), invertible: false, wide: false },
    { name: 'Lodgerin', img: getImagePath('lodgerin.png'), invertible: false, wide: true },
    { name: 'Everak', img: getImagePath('everak.png'), invertible: false, wide: true },
    { name: 'Bookavivo', img: getImagePath('bookavivo.png'), invertible: false, wide: true },
    { name: 'MTV', img: getImagePath('MTV.svg'), invertible: false, wide: false },
];

function BrandCarousel() {
    const trackRef = useRef(null);
    const timerRef = useRef(null);

    // Auto-scroll every 5 seconds
    useEffect(() => {
        timerRef.current = setInterval(() => {
            scrollByAmount(0); // px
        }, 1);
        return () => clearInterval(timerRef.current);
    }, []);

    // Helper to scroll by px
    const scrollByAmount = (amount) => {
        if (trackRef.current) {
            const newScrollPosition = trackRef.current.scrollLeft;
            const totalScrollWidth = trackRef.current.scrollWidth - trackRef.current.clientWidth - 1;
            console.log({ newScrollPosition, totalScrollWidth });


            // Check if we need to loop back to the start
            if (newScrollPosition >= totalScrollWidth && amount > 0) {
                trackRef.current.scrollBy({ left: -totalScrollWidth, behavior: 'smooth' });
            } else if (newScrollPosition <= 0 && amount < 0) {
                trackRef.current.scrollBy({ left: totalScrollWidth, behavior: 'smooth' });
            } else {
                trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
            }
        }
        resetTimer();
    };

    const handlePrev = () => { clearInterval(timerRef.current); scrollByAmount(-(3 * (trackRef.current.scrollWidth / brands.length))) };
    const handleNext = () => { clearInterval(timerRef.current); scrollByAmount(3 * (trackRef.current.scrollWidth / brands.length)) };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            scrollByAmount(3 * (trackRef.current.scrollWidth / brands.length));
        }, 5000);
    };

    return (
        <div className="container d-flex align-items-center">
            <button className="carousel-btn" onClick={handlePrev} aria-label="Previous brands"><i className="bi bi-chevron-left"></i></button>
            <div
                className="brand-carousel-track"
                ref={trackRef}
            >
                {brands.map((brand, i) => (
                    <div className="brand-item" key={brand.name + i}>
                        <img style={{ width: brand.wide ? '100%' : '' }} src={brand.img} alt={brand.name} className={brand.invertible ? "brand-logo invertible" : "brand-logo"} />
                    </div>
                ))}
            </div>
            <button className="carousel-btn" onClick={handleNext} aria-label="Next brands"><i className="bi bi-chevron-right"></i></button>
        </div>
    );
}

export default BrandCarousel;
