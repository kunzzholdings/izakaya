import { useEffect } from 'react';
import { gsap } from 'gsap';

export const useSmoothScroll = () => {
    useEffect(() => {
        const container = document.querySelector('.snap-container');
        if (!container) return;

        let isScrolling = false;
        let currentSection = 0;
        const sections = document.querySelectorAll('.snap-section');

        const scrollToSection = (index) => {
            if (index < 0 || index >= sections.length || isScrolling) return;
            
            isScrolling = true;
            currentSection = index;
            const targetPosition = index * window.innerHeight;
            
            gsap.to(container, {
                scrollTop: targetPosition,
                duration: 1, // 稍微慢一点更丝滑
                ease: 'power3.out', // 使用power3.out更流畅
                onComplete: () => {
                    isScrolling = false;
                }
            });
        };

        const handleWheel = (e) => {
            if (isScrolling) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            const delta = e.deltaY;
            
            if (delta > 0) {
                // 向下滚动
                scrollToSection(currentSection + 1);
            } else if (delta < 0) {
                // 向上滚动
                scrollToSection(currentSection - 1);
            }
        };

        // 添加触摸支持
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) { // 滑动阈值
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
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);
};

