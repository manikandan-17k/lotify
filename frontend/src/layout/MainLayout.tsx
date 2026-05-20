import { Outlet } from 'react-router-dom';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import Topbar from "@/components/ui/Topbar";

const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Topbar />  {/* ✅ once, shared across all pages */}

      <div className="flex-1 min-h-0 p-2">
        <ResizablePanelGroup
             direction={"horizontal" as "horizontal" | "vertical"}
          className="h-full w-full"
        >
          <ResizablePanel maxSize={30} minSize={isMobile ? 0 : 10} defaultSize={20}>
            <LeftSidebar />
          </ResizablePanel>
          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
          <ResizablePanel defaultSize={isMobile ? 100 : 60} maxSize={60}>
            <Outlet />
          </ResizablePanel>
          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
          <ResizablePanel maxSize={30} minSize={0} defaultSize={20} collapsedSize={0}>
            <FriendsActivity />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>
  );
};
export default MainLayout;