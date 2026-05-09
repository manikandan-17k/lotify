import { Outlet } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftSideBar from "./components/LeftSideBar";

const MainLayout = () => {
  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* PANELS - takes remaining height */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup
          direction="horizontal"
          style={{ height: "100%" }}  
        >
          {/* LEFT SIDEBAR */}
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={25}
            collapsible
            collapsedSize={0}
          >
          <LeftSideBar/>                   

          </ResizablePanel>

          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors hover:bg-zinc-600" />

          {/* CENTER */}
          <ResizablePanel defaultSize={60}>
            <div className="h-full overflow-y-auto">
              <Outlet />
            </div>
          </ResizablePanel>

          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors hover:bg-zinc-600" />

          {/* RIGHT SIDEBAR */}
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={25}
            collapsible
            collapsedSize={0}
          >
            <div className="h-full p-4 border-l border-zinc-800 overflow-y-auto">
              <h1 className="text-2xl font-bold">Right Sidebar</h1>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>
  );
};

export default MainLayout;