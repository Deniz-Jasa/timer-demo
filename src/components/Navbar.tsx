import React from 'react';
import { ModeToggle } from "@/components/theme-button";
import SettingsDialog from "@/components/SettingsDialog";
import Image from 'next/image';
import logo from '../../public/logo-g.png'

interface NavbarProps {
  setSettings: React.Dispatch<React.SetStateAction<any>>;
}

const Navbar: React.FC<NavbarProps> = ({ setSettings }) => {
    return (
        <div>
            <nav style={{ position: 'fixed', top: 0, width: '100%' }} className="flex justify-between items-center p-4">
                <div className="navbarBrand" style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Use CSS to make the image non-draggable */}
                    <div style={{ marginRight: 20, userSelect: 'none', pointerEvents: 'none' }}>
                        <Image src={logo} alt="Description of the image" width={40} height={40} />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="mr-2"><SettingsDialog setSettings={setSettings} /></div>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
