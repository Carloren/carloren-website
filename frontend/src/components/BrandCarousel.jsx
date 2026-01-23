import React, { useRef, useState, useEffect } from 'react';
import NetflixImage from '../assets/logos/netflix.svg';

const brands = [
    { name: 'Netflix', img: NetflixImage, invertible: false, wide: true },
    { name: 'HBO', img: '../assets/logos/hbo.svg', invertible: true, wide: false },
    { name: 'Crunchyroll', img: '../assets/logos/crunchyroll.svg', invertible: false, wide: true },
    { name: 'Prime Video', img: '../assets/logos/prime-video.svg', invertible: false, wide: true },
    { name: 'Ubisoft', img: '../assets/logos/ubisoft.svg', invertible: true, wide: false },
    { name: 'Bethesda', img: '../assets/logos/bethesda.svg', invertible: true, wide: true },
    { name: 'SkyShowtime', img: '../assets/logos/sky.svg', invertible: true, wide: false },
    { name: 'Samsung', img: '../assets/logos/samsung.svg', invertible: true, wide: true },
    { name: 'Repsol', img: '../assets/logos/repsol.svg', invertible: false, wide: true },
    { name: 'Schweppes', img: '../assets/logos/schweppes.svg', invertible: false, wide: true },
    { name: 'Betis', img: '../assets/logos/betis.svg', invertible: false, wide: true },
    { name: 'Mercadona', img: '../assets/logos/mercadona.svg', invertible: false, wide: true },
    { name: 'Ministerio de Hacienda', img: '../assets/logos/ministerio-hacienda.svg', invertible: false, wide: true },
    { name: 'Movistar Plus', img: '../assets/logos/movistar-plus.svg', invertible: true, wide: false },
    { name: 'AMC+', img: '../assets/logos/amc.svg', invertible: true, wide: false },
    { name: 'ACORN TV', img: '../assets/logos/acorn-tv.png', invertible: false, wide: true },
    { name: 'Animebox', img: '../assets/logos/animebox.png', invertible: false, wide: false },
    { name: 'Antena 3', img: '../assets/logos/antena3.svg', invertible: false, wide: false },
    { name: 'Nova', img: '../assets/logos/nova.svg', invertible: false, wide: false },
    { name: 'Nickelodeon', img: '../assets/logos/nickelodeon.svg', invertible: false, wide: true },
    { name: 'EAE Business School', img: '../assets/logos/eae-business-school.png', invertible: false, wide: true },
    { name: 'Finanzas para todos', img: '../assets/logos/finanzas-para-todos.png', invertible: false, wide: true },
    { name: 'Numericco', img: '../assets/logos/numericco.png', invertible: false, wide: true },
    { name: 'Canal Cocina', img: '../assets/logos/canal-cocina.png', invertible: false, wide: true },
    { name: 'Dark', img: '../assets/logos/dark.png', invertible: true, wide: false },
    { name: 'DMAX', img: '../assets/logos/dmax.svg', invertible: true, wide: false },
    { name: 'Discovery+', img: '../assets/logos/discovery-plus.png', invertible: false, wide: true },
    { name: 'Beon Entertainment', img: '../assets/logos/beon-entertainment.svg', invertible: false, wide: false },
    { name: 'SIMA', img: '../assets/logos/sima.svg', invertible: false, wide: false },
    { name: 'Lodgerin', img: '../assets/logos/lodgerin.png', invertible: false, wide: true },
    { name: 'Everak', img: '../assets/logos/everak.png', invertible: false, wide: true },
    { name: 'Bookavivo', img: '../assets/logos/bookavivo.png', invertible: false, wide: true },
    { name: 'MTV', img: '../assets/logos/mtv.svg', invertible: false, wide: false },
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
