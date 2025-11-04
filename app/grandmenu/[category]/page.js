"use client";

import React from 'react';
import MenuSidebar from '@/components/MenuSidebar';
import MenuGallery from '@/components/MenuGallery';
import { GRAND_MENU_CATEGORIES } from '@/config/menuConfig';
import './grandmenu.css';

export default function GrandMenuPage({ params }) {
    const { category } = params;

    return (
        <div className="menu-page-container">
            <MenuSidebar 
                menuType="grandmenu"
                categories={GRAND_MENU_CATEGORIES}
                currentCategory={category}
            />
            
            <div className="menu-main-content">
                <MenuGallery 
                    category={category}
                    menuType="grand"
                />
            </div>
        </div>
    );
}

