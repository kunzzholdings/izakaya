"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';
import './MapSection.css';

gsap.registerPlugin(ScrollTrigger);

const MapSection = () => {
    const titleRef = useRef(null);
    const mainStoreRef = useRef(null);
    const branchStoreRef = useRef(null);

    useEffect(() => {
        // 标题动画
        gsap.set(titleRef.current, { opacity: 0, y: -30 });
        gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });

        // 店铺卡片动画
        gsap.set([mainStoreRef.current, branchStoreRef.current], { 
            opacity: 0, 
            y: 50,
            scale: 0.95
        });

        gsap.to(mainStoreRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-section',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });

        gsap.to(branchStoreRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-section',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
    }, []);

    return (
        <div 
            className="map-section"
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 justify-items-center">
                    {/* 总店 */}
                    <div ref={mainStoreRef} className="store-card">
                        <div className="store-card-inner">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#8B6F47' }}>
                                总店
                            </h3>
                            
                            {/* 地图 */}
                            <div className="map-wrapper mb-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4475276450275!2d103.77369647567853!3d1.501963561066547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da6dd0d05beaa3%3A0x5617d385f1f81e11!2sTokyo%20Japanese%20Cuisine%20%40%20Mid%20Valley%20Southkey%20(NORTH%20COURT)%20JB!5e0!3m2!1sen!2smy!4v1762160658810!5m2!1sen!2smy"
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
                                        href="https://www.google.com/maps/place/Tokyo+Japanese+Cuisine+@+Mid+Valley+Southkey+(NORTH+COURT)+JB/@1.5019636,103.7736965,17z/data=!3m2!4b1!5s0x31da6ce226750f0b:0x20fb43f3d722c21d!4m6!3m5!1s0x31da6dd0d05beaa3:0x5617d385f1f81e11!8m2!3d1.5019582!4d103.7762714!16s%2Fg%2F11tc2ttq2d?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 text-sm md:text-base hover:text-yellow-600 transition-colors cursor-pointer"
                                    >
                                        T-042 Level 3, Mid Valley, The Mall, Southkey, 81100 Johor Bahru, Johor Darul Ta&apos;zim
                                    </a>
                                </div>

                                <div className="info-row">
                                    <span className="font-semibold" style={{ color: '#8B6F47' }}>电话：</span>
                                    <a 
                                        href="tel:+60197108090" 
                                        className="text-gray-700 text-sm md:text-base hover:text-yellow-600 transition-colors"
                                    >
                                        +60 19-710 8090
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 分店 */}
                    <div ref={branchStoreRef} className="store-card">
                        <div className="store-card-inner">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#8B6F47' }}>
                                分店
                            </h3>
                            
                            {/* 地图 */}
                            <div className="map-wrapper mb-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31907.468559496578!2d103.73373499468003!3d1.50959129373446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da73d12ff16aa9%3A0x45bb0865198b1bc3!2sTokyo%20Japanese%20Cuisine%20%40%20Paradigm%20Mall%20JB!5e0!3m2!1sen!2smy!4v1762160553896!5m2!1sen!2smy"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, borderRadius: '8px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="分店地图"
                                ></iframe>
                            </div>

                            {/* 地址信息 */}
                            <div className="space-y-3 text-left">
                                <div className="info-row">
                                    <span className="font-semibold" style={{ color: '#8B6F47' }}>地址：</span>
                                    <a 
                                        href="https://www.google.com/maps/place/Tokyo+Japanese+Cuisine+@+Paradigm+Mall+JB/@1.5153492,103.683809,17z/data=!3m1!4b1!4m6!3m5!1s0x31da73d12ff16aa9:0x45bb0865198b1bc3!8m2!3d1.5153438!4d103.6863839!16s%2Fg%2F11wj2ydt5d?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 text-sm md:text-base hover:text-yellow-600 transition-colors cursor-pointer"
                                    >
                                        Lot UG-25, Upper Ground Floor, Paradigm Mall, Lbh Skudai, Taman Bukit Mewah, 81200 Johor Bahru, Johor Darul Ta&apos;zim
                                    </a>
                                </div>

                                <div className="info-row">
                                    <span className="font-semibold" style={{ color: '#8B6F47' }}>电话：</span>
                                    <a 
                                        href="tel:+60187738090" 
                                        className="text-gray-700 text-sm md:text-base hover:text-yellow-600 transition-colors"
                                    >
                                        +60 18-773 8090
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


