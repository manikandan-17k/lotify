import { Outlet } from 'react-router-dom';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from './components/PlaybackControls';
import { useEffect, useState } from 'react';

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []); // ← empty array, not [isMobile]

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <div className="flex-1 min-h-0 p-2">
                <ResizablePanelGroup direction='horizontal' className="h-full w-full"> {/* ← direction added */}
                    <AudioPlayer />
                    <ResizablePanel maxSize={30} minSize={isMobile ? 0 : 10} defaultSize={20}>
                        <LeftSidebar />
                    </ResizablePanel>
                    <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
                    <ResizablePanel defaultSize={isMobile ? 80 : 60} maxSize={60}>
                        <Outlet />
                    </ResizablePanel>

                    {/* ← Hide FriendsActivity on mobile, same as original */}
                    {!isMobile && (
                        <>
                            <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
                            <ResizablePanel maxSize={25} minSize={0} defaultSize={20} collapsedSize={0}>
                                <FriendsActivity />
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
            <PlaybackControls />
        </div>
    );
};

export default MainLayout;