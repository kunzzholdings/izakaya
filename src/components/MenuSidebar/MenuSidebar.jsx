"use client";

import React from 'react';
import Link from 'next/link';
import './MenuSidebar.css';

const MenuSidebar = ({ menuType, categories, currentCategory }) => {
    return (
        <div className="menu-sidebar">
            <div className="sidebar-content">
                <Link href="/#menu-selection" className="back-link">
                    ← Back
                </Link>
                
                <ul className="menu-categories">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Link 
                                href={`/${menuType}/${category.id}`}
                                className={currentCategory === category.id ? 'active' : ''}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuSidebar;

