"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../../config/images';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const aboutContainerRef = useRef(null);

    useEffect(() => {
        gsap.to(aboutContainerRef.current, {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
    }, []);

    return (
        <div className="about-section relative min-h-screen overflow-hidden z-base about-background"
             style={{backgroundImage: `url('/assets/images/chef.webp')`}}>
            <div className="w-full h-screen opacity-0" ref={aboutContainerRef}>
                {/* 内容区域 - 使用普通 CSS 定位到屏幕四分之三处 */}
                <div className="about-content z-overlay text-justify">
                    <h2 className="about-title text-6xl font-bold text-black mb-8 relative inline-block tracking-wider">关于我们</h2>
                    <p className="about-text text-lg leading-relaxed text-gray-800 text-left max-w-2xl">
                        我们是一家致力于提供精致料理与品越服务的日式料理餐厅。以极致的匠心打造美食。严选当季新鲜食材,融合传统与创意,呈现日本料理美。
                        餐厅环境清雅舒适,充满日式格调。宾客在此不仅能品味精妙料理,更能感受到细致入微的服务与文化魅力。我们立志将每一次用餐变成难忘的美食之旅,
                        以品越的服务和精致的料理成为世界级日料品牌。
                    </p>
                </div>
            </div>

            {/* 樱花花瓣 - 屏幕右半部分飘落 */}
            <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none z-base">
                <div className="about-petal about-petal-1 absolute w-8 h-8 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-1/4 top-0" 
                     style={{animationDuration: '8s', animationDelay: '0s'}}></div>
                <div className="about-petal about-petal-2 absolute w-10 h-10 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-1/3 top-0" 
                     style={{animationDuration: '10s', animationDelay: '1s'}}></div>
                <div className="about-petal about-petal-3 absolute w-7 h-7 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-1/6 top-0" 
                     style={{animationDuration: '9s', animationDelay: '2s'}}></div>
                <div className="about-petal about-petal-4 absolute w-9 h-9 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-2/5 top-0" 
                     style={{animationDuration: '11s', animationDelay: '0.5s'}}></div>
                <div className="about-petal about-petal-5 absolute w-6 h-6 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-3/5 top-0" 
                     style={{animationDuration: '8.5s', animationDelay: '1.5s'}}></div>
                <div className="about-petal about-petal-6 absolute w-8 h-8 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-1/5 top-0" 
                     style={{animationDuration: '10.5s', animationDelay: '2.5s'}}></div>
                <div className="about-petal about-petal-7 absolute w-7 h-7 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-4/5 top-0" 
                     style={{animationDuration: '9.5s', animationDelay: '0.8s'}}></div>
                <div className="about-petal about-petal-8 absolute w-9 h-9 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-1/2 top-0" 
                     style={{animationDuration: '11.5s', animationDelay: '1.8s'}}></div>
                <div className="about-petal about-petal-1 absolute w-8 h-8 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-2/3 top-0" 
                     style={{animationDuration: '12s', animationDelay: '3s'}}></div>
                <div className="about-petal about-petal-2 absolute w-10 h-10 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-3/4 top-0" 
                     style={{animationDuration: '7s', animationDelay: '1.2s'}}></div>
                <div className="about-petal about-petal-3 absolute w-7 h-7 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-1/8 top-0" 
                     style={{animationDuration: '13s', animationDelay: '2.8s'}}></div>
                <div className="about-petal about-petal-4 absolute w-9 h-9 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-5/6 top-0" 
                     style={{animationDuration: '9.5s', animationDelay: '0.3s'}}></div>
                <div className="about-petal about-petal-5 absolute w-6 h-6 bg-cover bg-center bg-no-repeat animate-fall rounded-full opacity-60 left-7/8 top-0" 
                     style={{animationDuration: '11.2s', animationDelay: '1.7s'}}></div>
            </div>
        </div>
    );
};

export default AboutSection;
