"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { IMAGES } from '../../../config/images';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';
import './HeroSection.css';

const HeroSection = () => {
    const sceneRef = useRef(null);
    const contentOverlayRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef1 = useRef(null);
    const subtitleRef2 = useRef(null);
    const door1Ref = useRef(null);
    const door2Ref = useRef(null);
    const door3Ref = useRef(null);
    const door4Ref = useRef(null);
    const backgroundRef = useRef(null);
    const restaurantImageRef = useRef(null);

    // 追踪资源加载状态
    const [imagesLoaded, setImagesLoaded] = useState({
        restaurant: false,
        logo: false,
        door: false
    });

    // 检查所有图片是否加载完成
    const allImagesLoaded = imagesLoaded.restaurant && imagesLoaded.logo && imagesLoaded.door;

    useEffect(() => {
        // 设置初始状态
        gsap.set(contentOverlayRef.current, {
            xPercent: -50,
            yPercent: -50,
            opacity: 1
        });

        gsap.set(logoRef.current, {
            width: 200,
            height: 200
        });

        gsap.set([titleRef.current, subtitleRef1.current, subtitleRef2.current], {
            opacity: 0
        });

        // 预加载门的SVG图片
        // useEffect 只在客户端运行，但为了安全起见还是检查 window
        if (typeof window !== 'undefined') {
            const doorImage = new window.Image();
            doorImage.src = '/assets/images/Shoji.svg';
            doorImage.onload = () => {
                setImagesLoaded(prev => ({ ...prev, door: true }));
            };
            doorImage.onerror = () => {
                console.error('门图片加载失败');
                // 即使失败也标记为已加载，避免动画一直等待
                setImagesLoaded(prev => ({ ...prev, door: true }));
            };
        } else {
            // 如果在服务器端，直接标记为已加载
            setImagesLoaded(prev => ({ ...prev, door: true }));
        }
    }, []);

    useEffect(() => {
        // 只有当所有图片加载完成后才开始动画
        if (!allImagesLoaded) return;

        // 创建自动播放的开门动画时间线
        const tl = gsap.timeline({
            delay: 0.3 // 资源加载后延迟0.3秒开始动画
        });

        // 门打开动画
        tl.to(door2Ref.current, {
            x: '-100%',
            scale: 1.3,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0)
            .to(door3Ref.current, {
                x: '100%',
                scale: 1.3,
                duration: 1.5,
                ease: 'power2.inOut'
            }, 0)
            .to(door1Ref.current, {
                scale: 1.3,
                duration: 1.5,
                ease: 'power2.inOut'
            }, 0)
            .to(door4Ref.current, {
                scale: 1.3,
                duration: 1.5,
                ease: 'power2.inOut'
            }, 0)

            // 背景内容显示并放大
            .to(backgroundRef.current, {
                opacity: 1,
                scale: 1.4,
                duration: 1.5,
                ease: 'power2.out'
            }, 0)
            .to(restaurantImageRef.current, {
                scale: 1.3,
                duration: 1.5,
                ease: 'power2.out'
            }, 0)

            // Logo缩小
            .to(logoRef.current, {
                width: 120,
                height: 120,
                duration: 1.5,
                ease: 'power2.out'
            }, 0)

            // 整体内容放大
            .to(contentOverlayRef.current, {
                scale: 1.15,
                duration: 1.5,
                ease: 'power2.out'
            }, 0.2)

            // 标题和副标题同时渐显
            .to([titleRef.current, subtitleRef1.current, subtitleRef2.current], {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, 0.3);

        // 鼠标视差效果
        const handleMouseMove = (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;

            gsap.to(contentOverlayRef.current, {
                x: moveX,
                y: moveY,
                duration: 0.5,
                ease: 'power2.out'
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            tl.kill(); // 清理时间线
        };
    }, [allImagesLoaded]);

    return (
        <div className="snap-section relative overflow-hidden" ref={sceneRef}>
            {/* 背景内容 */}
            <div className="hero-background absolute top-0 left-0 w-full h-full flex-center opacity-50 scale-100" ref={backgroundRef}>
                <div className="hero-restaurant-image w-full h-full brightness-60 scale-100" ref={restaurantImageRef}>
                    <Image
                        src={IMAGES.tokyoRestaurant}
                        alt="Japanese Restaurant"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Logo和标题 */}
            <div className="hero-content-overlay absolute-center text-center text-white z-modal opacity-100" ref={contentOverlayRef}>
                <div className="hero-logo w-32 h-32 bg-tokyo-gold rounded-full mx-auto mb-8 flex-center shadow-2xl overflow-hidden relative" ref={logoRef}>
                    <Image src={IMAGES.tokyoLogo} alt="Tokyo Logo" fill className="object-cover" />
                </div>
                <h1 className="hero-title text-6xl font-bold tracking-widest mb-5 text-shadow-lg" ref={titleRef}>TOKYO IZAKAYA CUISINE</h1>
                <p className="hero-subtitle text-2xl tracking-wider mb-2 opacity-90" ref={subtitleRef1}>精致美食·品越服务</p>
                <p className="hero-subtitle text-2xl tracking-wider mb-2 opacity-90" ref={subtitleRef2}>成就世界级日料品牌</p>
            </div>

            {/* 四个门 */}
            <div className="absolute top-0 left-0 w-full h-full z-overlay pointer-events-none">
                <div className="hero-door hero-door-1 absolute top-0 left-0 w-1/4 h-full bg-cover bg-center overflow-hidden shadow-inner origin-center z-modal" ref={door1Ref}></div>
                <div className="hero-door hero-door-2 absolute top-0 left-1/4 w-1/4 h-full bg-cover bg-center overflow-hidden shadow-inner origin-center z-overlay" ref={door2Ref}></div>
                <div className="hero-door hero-door-3 absolute top-0 left-1/2 w-1/4 h-full bg-cover bg-center overflow-hidden shadow-inner origin-center z-overlay" ref={door3Ref}></div>
                <div className="hero-door hero-door-4 absolute top-0 right-0 w-1/4 h-full bg-cover bg-center overflow-hidden shadow-inner origin-center z-modal" ref={door4Ref}></div>
            </div>
        </div>
    );
};

export default HeroSection;
