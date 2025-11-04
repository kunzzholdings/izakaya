"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../../config/images';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';
import './MenuSelectionSection.css';

gsap.registerPlugin(ScrollTrigger);

const MenuSelectionSection = () => {
    const menuContainerRef = useRef(null);

    useEffect(() => {
        gsap.to(menuContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.menu-selection-section',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
    }, []);

    return (
        <div className="menu-selection-section relative min-h-screen menu-background flex-center overflow-hidden py-16 px-5 font-besley z-base" 
             style={{backgroundImage: `url('/assets/images/menubg.webp')`}} id="menu-selection">
            
            <div className="menu-container flex gap-16 max-w-6xl w-full opacity-0 translate-y-12 relative z-overlay" ref={menuContainerRef}>
                {/* Sushi & Sashimi 选项 */}
                <a href="/sushimenu/sashimi" className="menu-option flex-1 relative h-[500px] tokyo-gold-border cursor-pointer transition-all duration-400 flex-center overflow-hidden no-underline group hover-lift">
                    {/* 装饰边框 */}
                    <div className="absolute w-full h-full pointer-events-none">
                        <div className="menu-border menu-border-top-left"></div>
                        <div className="menu-border menu-border-bottom-right"></div>
                    </div>
                    
                    <div className="text-center text-white z-base relative no-underline w-full h-full flex-center">
                        <div className="menu-image max-w-[80%] max-h-[80%] relative w-full h-full">
                            <Image src={IMAGES.sushi} alt="寿司与刺身菜单" fill className="object-contain transition-transform duration-400 group-hover:scale-105" />
                        </div>
                    </div>
                    
                    {/* 悬停效果 */}
                    <div className="menu-hover-overlay"></div>
                </a>

                {/* Grand Menu 选项 */}
                <a href="/grandmenu/zensai" className="menu-option flex-1 relative h-[500px] tokyo-gold-border cursor-pointer transition-all duration-400 flex-center overflow-hidden no-underline group hover-lift">
                    {/* 装饰边框 */}
                    <div className="absolute w-full h-full pointer-events-none">
                        <div className="menu-border menu-border-top-left"></div>
                        <div className="menu-border menu-border-bottom-right"></div>
                    </div>
                    
                    <div className="text-center text-white z-base relative no-underline w-full h-full flex-center">
                        <div className="menu-image max-w-[80%] max-h-[80%] relative w-full h-full">
                            <Image src={IMAGES.grand} alt="精选菜单" fill className="object-contain transition-transform duration-400 group-hover:scale-105" />
                        </div>
                    </div>
                    
                    {/* 悬停效果 */}
                    <div className="menu-hover-overlay"></div>
                </a>
            </div>
        </div>
    );
};

export default MenuSelectionSection;
