import React, { useRef, useState, useEffect } from 'react';

const brands = [
    { name: 'Nike', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Adidas', img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { name: 'Apple', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Google', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Amazon', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Samsung', img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Microsoft', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
    { name: 'Coca-Cola', img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Coca-Cola_logo.svg' },
    { name: 'Pepsi', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Pepsi_logo.svg' },
    { name: 'Sony', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg' },
    { name: 'Toyota', img: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_logo.svg' },
    { name: 'Honda', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_logo.svg' },
    { name: 'BMW', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
    { name: 'Mercedes', img: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
    { name: 'Intel', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' },
    { name: 'HP', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/HP_logo_2012.svg' },
    { name: 'Dell', img: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
    { name: 'LG', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/LG_logo_%282015%29.svg' },
    { name: 'Puma', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg' },
    { name: 'Reebok', img: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Reebok_logo.svg' },
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
            console.log(newScrollPosition, totalScrollWidth);


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
                        <img src={brand.img} alt={brand.name} className="brand-logo" />
                    </div>
                ))}
            </div>
            <button className="carousel-btn" onClick={handleNext} aria-label="Next brands"><i class="bi bi-chevron-right"></i></button>
        </div>
    );
}

export default BrandCarousel;
