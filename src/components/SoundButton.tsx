import React from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from 'lucide-react';

interface SoundButtonProps {
    isMuted: boolean;
    toggleMute: () => void;
}

export function SoundButton({ isMuted, toggleMute }: SoundButtonProps) {
    return (
        <Button variant={"outline"} onClick={toggleMute}>
            {isMuted ? (
                <Volume2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            ) : (
                <VolumeX className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            )}
        </Button>
    );
}