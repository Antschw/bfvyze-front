import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button
} from "@heroui/react";
import type {ViewType} from '../types';

interface NavbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

const BFVyzeLogo: React.FC = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c5.514 0 10 4.486 10 10s-4.486 10-10 10S6 21.514 6 16 10.486 6 16 6zm-2 6l4 4-4 4v-8z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

const CustomNavbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
    const navItems: Array<{ key: ViewType; label: string }> = [
        { key: 'server', label: 'Serveur' },
        { key: 'stats', label: 'Statistiques' },
        { key: 'settings', label: 'Paramètres' }
    ];

    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <BFVyzeLogo />
                <p className="font-bold text-inherit ml-2">BFVyze</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem key={item.key} isActive={currentView === item.key}>
                        <Link
                            color={currentView === item.key ? "primary" : "foreground"}
                            href="#"
                            aria-current={currentView === item.key ? "page" : undefined}
                            onPress={() => onViewChange(item.key)}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        as={Link}
                        color="primary"
                        href="https://github.com/your-repo/bfvyze"
                        variant="flat"
                        size="sm"
                    >
                        GitHub
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default CustomNavbar;