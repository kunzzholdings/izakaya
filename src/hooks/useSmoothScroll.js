import { useEffect } from 'react';
import { gsap } from 'gsap';

export const useSmoothScroll = () => {
    useEffect(() => {
        const container = document.querySelector('.snap-container');
        if (!container) return;

        let isScrolling = false;
        let currentSection = 0;
        const sections = document.querySelectorAll('.snap-section');
        let scrollTimeout = null;

        const scrollToSection = (index) => {
            if (index < 0 || index >= sections.length || isScrolling) return;
            
            isScrolling = true;
            currentSection = index;
            const targetPosition = index * window.innerHeight;
            
            gsap.to(container, {
                scrollTop: targetPosition,
                duration: 0.8, // 更快更流畅，从1秒改为0.8秒
                ease: 'power2.inOut', // 使用power2.inOut，更自然的加速减速
                onComplete: () => {
                    isScrolling = false;
                }
            });
        };

        const handleWheel = (e) => {
            e.preventDefault();
            
            if (isScrolling) {
                return;
            }

            // 防抖处理 - 避免过快触发
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(() => {
                const delta = e.deltaY;
                
                if (Math.abs(delta) > 5) { // 增加最小滚动阈值
                    if (delta > 0) {
                        // 向下滚动
                        scrollToSection(currentSection + 1);
                    } else if (delta < 0) {
                        // 向上滚动
                        scrollToSection(currentSection - 1);
                    }
                }
            }, 50); // 50ms 防抖延迟
        };

        // 触摸支持
        let touchStartY = 0;
        let touchStartTime = 0;
        
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        };

        const handleTouchEnd = (e) => {
            if (isScrolling) return;
            
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            const diff = touchStartY - touchEndY;
            const timeDiff = touchEndTime - touchStartTime;
            
            // 计算滑动速度
            const velocity = Math.abs(diff) / timeDiff;
            
            // 根据滑动距离和速度判断
            if (Math.abs(diff) > 50 || velocity > 0.5) {
                if (diff > 0) {
                    scrollToSection(currentSection + 1);
                } else {
                    scrollToSection(currentSection - 1);
                }
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
};

