"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MenuGallery.css';

const MenuGallery = ({ category, menuType }) => {
    const galleryRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const wheelHandlerRef = useRef(null);

    useEffect(() => {
        loadMenuImages();
    }, [category, menuType]);

    useEffect(() => {
        if (images.length > 0) {
            const timer = setTimeout(() => {
                initDragAndScroll();
            }, 200);
            return () => {
                clearTimeout(timer);
                // 清理滚轮事件监听器
                if (wheelHandlerRef.current && galleryRef.current) {
                    galleryRef.current.removeEventListener('wheel', wheelHandlerRef.current);
                }
            };
        }
    }, [images]);

    const loadMenuImages = async () => {
        setLoading(true);
        const baseUrl = `/assets/images/${menuType}/${category}/`;
        const imageList = Array.from({ length: 20 }, (_, i) => `${i + 1}.jpg`);
        const loadedImages = [];

        for (const imageFile of imageList) {
            const imageUrl = `${baseUrl}${imageFile}`;
            try {
                const response = await fetch(imageUrl, { method: 'HEAD' });
                if (response.ok) {
                    loadedImages.push(imageUrl);
                }
            } catch (error) {
                continue;
            }
        }

        setImages(loadedImages);
        setLoading(false);
    };

    const initDragAndScroll = () => {
        const gallery = galleryRef.current;
        const container = containerRef.current;
        
        if (!gallery || !container) return;

        // 初始化拖拽功能
        initSimpleDrag();

        // 鼠标滚轮水平滚动
        const galleryWidth = gallery.offsetWidth;
        const containerWidth = container.scrollWidth;
        const maxDrag = Math.max(0, containerWidth - galleryWidth);

        wheelHandlerRef.current = (e) => {
            e.preventDefault();
            const currentX = gsap.getProperty(container, "x") || 0;
            const newX = Math.max(-maxDrag, Math.min(0, currentX - e.deltaY * 0.5));
            gsap.to(container, { x: newX, duration: 0.3, ease: "power2.out" });
        };

        gallery.addEventListener('wheel', wheelHandlerRef.current, { passive: false });
    };

    const initSimpleDrag = () => {
        const gallery = galleryRef.current;
        const container = containerRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;
        let velocity = 0;
        let lastX = 0;
        let lastTime = Date.now();

        const handleStart = (pageX) => {
            isDown = true;
            startX = pageX - gallery.offsetLeft;
            scrollLeft = gsap.getProperty(container, "x") || 0;
            velocity = 0;
            lastX = pageX;
            lastTime = Date.now();
            gallery.style.cursor = 'grabbing';
        };

        const handleEnd = () => {
            isDown = false;
            gallery.style.cursor = 'grab';
            
            // 添加惯性滚动
            if (Math.abs(velocity) > 0.5) {
                const galleryWidth = gallery.offsetWidth;
                const containerWidth = container.scrollWidth;
                const maxDrag = Math.max(0, containerWidth - galleryWidth);
                const currentX = gsap.getProperty(container, "x") || 0;
                const targetX = Math.max(-maxDrag, Math.min(0, currentX + velocity * 50));
                
                gsap.to(container, { 
                    x: targetX, 
                    duration: 0.8, 
                    ease: "power2.out" 
                });
            }
        };

        const handleMove = (pageX) => {
            if (!isDown) return;
            
            const x = pageX - gallery.offsetLeft;
            const walk = x - startX;
            const newX = scrollLeft + walk;

            const galleryWidth = gallery.offsetWidth;
            const containerWidth = container.scrollWidth;
            const maxDrag = Math.max(0, containerWidth - galleryWidth);
            const boundedX = Math.max(-maxDrag, Math.min(0, newX));

            gsap.set(container, { x: boundedX });

            // 计算速度
            const now = Date.now();
            const dt = now - lastTime;
            if (dt > 0) {
                velocity = (pageX - lastX) / dt;
            }
            lastX = pageX;
            lastTime = now;
        };

        // 鼠标事件
        gallery.addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleStart(e.pageX);
        });

        gallery.addEventListener('mouseleave', handleEnd);
        gallery.addEventListener('mouseup', handleEnd);

        gallery.addEventListener('mousemove', (e) => {
            if (isDown) {
                e.preventDefault();
                handleMove(e.pageX);
            }
        });

        // 触摸事件
        gallery.addEventListener('touchstart', (e) => {
            handleStart(e.touches[0].pageX);
        }, { passive: true });

        gallery.addEventListener('touchend', handleEnd, { passive: true });

        gallery.addEventListener('touchmove', (e) => {
            if (isDown) {
                handleMove(e.touches[0].pageX);
            }
        }, { passive: true });
    };


    return (
        <div className="menu-gallery" ref={galleryRef}>
            <div className="menu-gallery-container" ref={containerRef}>
                {loading ? (
                    <div className="loading">正在加载菜单图片...</div>
                ) : images.length > 0 ? (
                    images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`菜单页面 ${index + 1}`}
                            className="menu-image"
                        />
                    ))
                ) : (
                    <div className="loading">未找到菜单图片</div>
                )}
            </div>
        </div>
    );
};

export default MenuGallery;

