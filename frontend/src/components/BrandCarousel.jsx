import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
    { name: 'Betis', img: getImagePath('betis.svg'), invertible: false, wide: true },
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
    const swiperRef = useRef(null);

    return (
        <div className="container d-flex align-items-center">
            <button className="carousel-btn" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous brands"><i className="bi bi-chevron-left"></i></button>
            <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                spaceBetween={12}
                slidesPerGroup={3}
                breakpoints={{
                    0: { slidesPerView: 3 },
                    576: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1200: { slidesPerView: 7 },
                }}
                className="brand-carousel-track"
            >
                {brands.map((brand, i) => (
                    <SwiperSlide className="brand-item" key={brand.name + i}>
                        <img style={{ width: brand.wide ? '100%' : '' }} src={brand.img} alt={brand.name} loading="lazy" className={brand.invertible ? "brand-logo invertible" : "brand-logo"} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="carousel-btn" onClick={() => swiperRef.current?.slideNext()} aria-label="Next brands"><i className="bi bi-chevron-right"></i></button>
        </div>
    );
}

export default BrandCarousel;
