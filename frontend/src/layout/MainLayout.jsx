import { Outlet } from 'react-router-dom';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";

const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full overflow-hidden p-2"
      >
        <ResizablePanel maxSize={30} minSize={isMobile ? 0 : 10} defaultSize={20}>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60} maxSize={60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel maxSize={30} minSize={0} defaultSize={20} collapsedSize={0}>
          <FriendsActivity/>
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;