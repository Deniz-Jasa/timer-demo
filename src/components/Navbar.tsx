import React from 'react';
import { ModeToggle } from "@/components/theme-button";
import { SoundButton } from "@/components/SoundButton";
import SettingsDialog from "@/components/SettingsDialog";
import Image from 'next/image';
import logo from '../../public/logo-g.png'

interface NavbarProps {
  setSettings: React.Dispatch<React.SetStateAction<any>>;
  toggleMute: () => void;
  isMuted: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setSettings, toggleMute, isMuted }) => {
    return (
        <div>
            <nav style={{ position: 'fixed', top: 0, width: '100%' }} className="flex justify-between items-center p-4">
                <div className="navbarBrand" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: 20, userSelect: 'none', pointerEvents: 'none' }}>
                        <Image src={logo} alt="Description of the image" width={40} height={40} />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="mr-2"><SettingsDialog setSettings={setSettings} /></div>
                    <div className="mr-2"><SoundButton toggleMute={toggleMute} isMuted={isMuted} /></div>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
