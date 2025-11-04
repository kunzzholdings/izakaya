"use client";

import React from 'react';
import MenuSidebar from '@/components/MenuSidebar';
import MenuGallery from '@/components/MenuGallery';
import { SUSHI_MENU_CATEGORIES } from '@/config/menuConfig';
import './sushimenu.css';

export default function SushiMenuPage({ params }) {
    const { category } = params;

    return (
        <div className="menu-page-container">
            <MenuSidebar 
                menuType="sushimenu"
                categories={SUSHI_MENU_CATEGORIES}
                currentCategory={category}
            />
            
            <div className="menu-main-content">
                <MenuGallery 
                    category={category}
                    menuType="sushi"
                />
            </div>
        </div>
    );
}

