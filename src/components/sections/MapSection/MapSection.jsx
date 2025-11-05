"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';
import './MapSection.css';

const MapSection = () => {
    const titleRef = useRef(null);
    const mainStoreRef = useRef(null);
    const branchStoreRef = useRef(null);

    useEffect(() => {
        // 设置初始状态
        gsap.set(titleRef.current, { opacity: 0, y: -30 });
        gsap.set([mainStoreRef.current, branchStoreRef.current], { 
            opacity: 0, 
            y: 50,
            scale: 0.95
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 标题动画
                        gsap.to(titleRef.current, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power3.out'
                        });

                        // 店铺卡片动画
                        gsap.to(mainStoreRef.current, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: 'power3.out'
                        });

                        gsap.to(branchStoreRef.current, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            delay: 0.2,
                            ease: 'power3.out'
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        const section = document.querySelector('.map-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <div 
            className="map-section snap-section"
            style={{ 
                backgroundImage: 'url(/assets/images/address.webp)'
            }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
                {/* 标题 */}
                <div ref={titleRef} className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-wider mb-2" style={{ color: '#8B6F47' }}>
                        我们在这
                    </h2>
                </div>

                {/* 店铺信息网格 */}
                <div className="flex justify-center items-start">
                    {/* 总店 */}
                    <div ref={mainStoreRef} className="store-card">
                        <div className="store-card-inner">
                            {/* <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#8B6F47' }}>
                                总店
                            </h3> */}
                            
                            {/* 地图 */}
                            <div className="map-wrapper mb-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3525885689637!2d103.7887319756785!3d1.5531078608873266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6f0060d3b32d%3A0x59bbff320119895d!2sTokyo%20Izakaya%20%40%20Desa%20Tebrau!5e0!3m2!1sen!2smy!4v1762229772013!5m2!1sen!2smy"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: '8px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="总店地图"
                                ></iframe>
                            </div>

                            {/* 地址信息 */}
                            <div className="space-y-3 text-left">
                                <div className="info-row">
                                    <span className="font-semibold" style={{ color: '#8B6F47' }}>地址：</span>
                                    <a 
                                        href="https://maps.app.goo.gl/5tcXEC6cHCuLaHkd9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 text-sm md:text-base hover:text-yellow-600 transition-colors cursor-pointer"
                                    >
                                        45, Jalan Harmonium 33/1, Taman Desa Tebrau, 81100 Johor Bahru, Johor Darul Ta&apos;zim&apos;
                                    </a>
                                </div>

                                <div className="info-row">
                                    <span className="font-semibold" style={{ color: '#8B6F47' }}>电话：</span>
                                    <a 
                                        href="tel:+60197108090" 
                                        className="text-gray-700 text-sm md:text-base hover:text-yellow-600 transition-colors"
                                    >
                                        +60 18-765 8090
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MapSection;


