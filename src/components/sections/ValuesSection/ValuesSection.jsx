"use client";

import React, { useState } from 'react';
import { IMAGES } from '../../../config/images';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';
import './ValuesSection.css';

const ValuesSection = () => {
    const [activeCard, setActiveCard] = useState(null);

    const toggleCard = (cardIndex) => {
        setActiveCard(activeCard === cardIndex ? null : cardIndex);
    };

    const values = [
        {
            title: '使命',
            content: '以极致的匠心和热情为每一位顾客呈现最正宗的日式料理体验我们致力于将传统日本饮食文化与现代创新完美融合'
        },
        {
            title: '愿景',
            content: '成为世界级的日料品牌让更多人感受到日本料理的精致与美好我们希望通过品越的服务和品质成为顾客心中最值得信赖的日式餐厅'
        },
        {
            title: '价值观',
            content: '专注品质追求完美尊重传统勇于创新我们相信细节决定成败每一个环节都精益求精为顾客创造难忘的用餐体验'
        },
        {
            title: '人品',
            content: '诚信为本匠心独运服务至上我们以最真诚的态度对待每一位顾客用心制作每一道料理让顾客感受到家一般的温暖和关怀'
        }
    ];

    const handleBackgroundClick = () => {
        if (activeCard !== null) {
            setActiveCard(null);
        }
    };

    return (
        <div className="relative min-h-screen values-background flex-center py-16 px-5 overflow-hidden z-base"
             style={{backgroundImage: `url('/assets/images/vision.webp')`}}
             onClick={handleBackgroundClick}>
            {/* 遮罩层 */}
            <div className="values-overlay absolute top-0 left-0 w-full h-full z-base pointer-events-none"></div>
            
            <div className={`values-container relative z-overlay flex flex-row items-center justify-center gap-5 transition-all duration-700 ${activeCard !== null ? 'has-active' : ''}`}>
                {values.map((value, index) => (
                    <div 
                        key={index}
                        className={`values-card relative glass-effect rounded-2xl border border-white border-opacity-15 p-6 cursor-pointer transition-all duration-700 shadow-2xl vertical-text flex flex-col items-center justify-center h-96 w-24 flex-shrink-0 opacity-100 filter-none scale-100 hover-lift ${
                            activeCard === index 
                                ? 'active' 
                                : ''
                        }`}
                        onClick={(e) => { e.stopPropagation(); toggleCard(index); }}
                    >
                        <h3 className="values-title text-4xl font-bold text-white tracking-widest text-shadow-lg transition-all duration-300 whitespace-nowrap text-center">
                            {value.title}
                        </h3>
                        <div className={`values-content overflow-hidden transition-all duration-700 text-white text-base leading-relaxed tracking-wider text-shadow-sm pt-5 border-t-2 border-white border-opacity-30 vertical-text transform ${
                            activeCard === index 
                                ? 'active' 
                                : 'inactive'
                        }`}>
                            <p className="text-justify values-vertical-text">{value.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValuesSection;
