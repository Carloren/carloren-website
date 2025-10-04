import React, { useRef, useState, useEffect } from 'react';

const brands = [
    { name: 'Netflix', img: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', invertible: false },
    { name: 'HBO', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/HBO_Max_%282025%29.svg', invertible: true },
    { name: 'Crunchyroll', img: 'https://cdn.worldvectorlogo.com/logos/crunchyroll-2.svg', invertible: false },
    { name: 'Prime Video', img: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg', invertible: false },
    { name: 'Ubisoft', img: 'https://cdn.worldvectorlogo.com/logos/ubisoft-3.svg', invertible: true },
    { name: 'Bethesda', img: 'https://cdn.worldvectorlogo.com/logos/bethesda-game-studios-1.svg', invertible: true },
    { name: 'SkyShowtime', img: 'https://cdn.worldvectorlogo.com/logos/sky-4.svg', invertible: true },
    { name: 'Samsung', img: 'https://cdn.worldvectorlogo.com/logos/samsung-8.svg', invertible: true },
    { name: 'Schweppes', img: 'https://cdn.worldvectorlogo.com/logos/schweppes-5.svg', invertible: false },
    { name: 'Mercadona', img: 'https://cdn.worldvectorlogo.com/logos/mercadona.svg', invertible: false },
    { name: 'Ministerio de Hacienda', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Logotipo_del_Ministerio_de_Hacienda.svg', invertible: false },
    { name: 'Movistar Plus', img: 'https://cdn.worldvectorlogo.com/logos/movistar-plus-2022-logo-1.svg', invertible: true },
    { name: 'AMC+', img: 'https://cdn.worldvectorlogo.com/logos/amc.svg', invertible: true },
    { name: 'ACORN TV', img: 'https://m.media-amazon.com/images/G/01/digital/video/merch/subs/benefit-id/a-f/acorntves/logos/3p-logo._CB554484535_.png', invertible: false },
    { name: 'Animebox', img: 'https://api.selecta-vision-production.eu-west-2.tuc.red/configuration/wrLgIdrecEs3at3jaThLBaqiRu4uPhiW/data/images/cce25b8856981b368189020cedebca23fccab016b9197d48bfc9cc04011f283c.png', invertible: false },
    { name: 'Antena 3', img: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_Antena_3_2025_%28Naranja%29.svg', invertible: false },
    { name: 'Nova', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Nova.svg', invertible: false },
    { name: 'Nickelodeon', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Nickelodeon_2009_logo.svg', invertible: false },
    { name: 'EAE Business School', img: 'https://d30mzt1bxg5llt.cloudfront.net/public/uploads/images/_signatoryLogo/AF_EAE-BS_LOGO_RGB_ROJO.png', invertible: false },
    { name: 'Finanzas para todos', img: 'https://www.finanzasparatodos.es/system/themes/logos/000/000/001/original/finanzas.png?1614951093', invertible: false },
    { name: 'Numericco', img: 'https://ajezaragoza.com/wp-content/uploads/2019/04/logotipo-numericco.png', invertible: false },
    { name: 'Canal Cocina', img: 'https://canalcocina.es/images/canalcocina.png', invertible: false },
    { name: 'Dark', img: 'https://ipmark.com/wp-content/uploads/2016/10/DARK-Canal-Televisi%C3%B3n-Terror.png', invertible: true },
    { name: 'DMAX', img: 'https://upload.wikimedia.org/wikipedia/commons/9/98/DMAX_BLACK.svg', invertible: true },
    { name: 'Discovery+', img: 'https://vectorseek.com/wp-content/uploads/2023/08/Discovery-Plus-Logo-Vector.svg-.png', invertible: true },
    { name: 'Beon Entertainment', img: 'https://beonworldwide.com/assets/img/footer/logo-footer-light.svg', invertible: false },
    { name: 'SIMA', img: 'https://simaexpo.com/wp-content/themes/sima2025/images/SIMA-gen.svg', invertible: true },
    { name: 'Lodgerin', img: 'https://cdn.prod.website-files.com/661d37451db040cda5844e0c/665461bbb375b6e7e3cfd280_Logo_Azul.png', invertible: false },
    { name: 'Everak', img: 'https://www.everak.com/img/logo-blanco.png', invertible: false },
    { name: 'Bookavivo', img: 'https://rbmediaglobal.com/wp-content/uploads/2021/03/bookavivo-red-white-300x53.png', invertible: false },
    { name: 'MTV', img: 'https://es.wikipedia.org/wiki/MTV#/media/Archivo:MTV_2021_(brand_version).svg', invertible: false },
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
            const totalScrollWidth = trackRef.current.scrollWidth - trackRef.current.clientWidth;

            // Check if we need to loop back to the start
            if (newScrollPosition >= totalScrollWidth) {
                trackRef.current.scrollBy({ left: -totalScrollWidth, behavior: 'smooth' });
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
            <button className="carousel-btn" onClick={handlePrev} aria-label="Previous brands"><i class="bi bi-chevron-left"></i></button>
            <div
                className="brand-carousel-track"
                ref={trackRef}
            >
                {brands.map((brand, i) => (
                    <div className="brand-item" key={brand.name + i}>
                        <img src={brand.img} alt={brand.name} className={brand.invertible ? "brand-logo invertible" : "brand-logo"} />
                    </div>
                ))}
            </div>
            <button className="carousel-btn" onClick={handleNext} aria-label="Next brands"><i class="bi bi-chevron-right"></i></button>
        </div>
    );
}

export default BrandCarousel;
