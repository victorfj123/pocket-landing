
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";
import LinkEditor from "@/components/LinkEditor";
import Footer from "@/components/Footer";
import { LinkType } from "@/components/LinkCard";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNavigation from "@/components/dashboard/MobileNavigation";
import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import LinksTab from "@/components/dashboard/tabs/LinksTab";
import AppearanceTab from "@/components/dashboard/tabs/AppearanceTab";
import AnalyticsTab from "@/components/dashboard/tabs/AnalyticsTab";
import SettingsTab from "@/components/dashboard/tabs/SettingsTab";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Mock user data
  const [userData, setUserData] = useState({
    id: "user-1",
    name: "Alex Johnson",
    bio: "Product Designer & Developer",
    email: "alex@example.com",
    avatarUrl: "",
    username: "alexjohnson",
    profileViews: 246,
    totalClicks: 124,
  });
  
  // Mock links data
  const [links, setLinks] = useState<LinkType[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLinkEditorOpen, setIsLinkEditorOpen] = useState(false);
  const [currentEditingLink, setCurrentEditingLink] = useState<LinkType | undefined>(undefined);
  
  // Mock analytics data
  const mockAnalyticsData = {
    weeklyViews: [24, 32, 45, 12, 67, 45, 32],
    topLinks: [
      { name: "LinkedIn", clicks: 68 },
      { name: "Resume", clicks: 42 },
      { name: "Portfolio", clicks: 14 }
    ],
    referrers: [
      { name: "Direct", count: 142 },
      { name: "LinkedIn", count: 67 },
      { name: "Instagram", count: 37 }
    ]
  };

  // Load links on mount (mock data)
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setLinks([
        {
          id: "1",
          title: "LinkedIn Profile",
          url: "https://linkedin.com/in/alexjohnson",
          icon: <User className="h-4 w-4" />,
        },
        {
          id: "2",
          title: "Portfolio Website",
          url: "https://alexjohnson.design",
          icon: <User className="h-4 w-4" />,
        },
        {
          id: "3",
          title: "Resume/CV",
          url: "https://alexjohnson.design/resume.pdf",
          icon: <User className="h-4 w-4" />,
        },
      ]);
    }, 500);
  }, []);

  const handleOpenLinkEditor = (linkId?: string) => {
    if (linkId) {
      const linkToEdit = links.find(link => link.id === linkId);
      setCurrentEditingLink(linkToEdit);
    } else {
      setCurrentEditingLink(undefined);
    }
    setIsLinkEditorOpen(true);
  };

  const handleCloseLinkEditor = () => {
    setIsLinkEditorOpen(false);
    setCurrentEditingLink(undefined);
  };

  const handleSaveLink = (linkData: Omit<LinkType, "id"> & { id?: string }) => {
    if (linkData.id) {
      // Updating existing link
      setLinks(prevLinks => 
        prevLinks.map(link => 
          link.id === linkData.id ? { ...linkData, id: link.id } as LinkType : link
        )
      );
      toast({
        title: "Link updated",
        description: "Your link has been updated successfully",
      });
    } else {
      // Adding new link
      const newLink = {
        ...linkData,
        id: `link-${Date.now()}`,
      } as LinkType;
      
      setLinks(prevLinks => [...prevLinks, newLink]);
      toast({
        title: "Link added",
        description: "Your new link has been added successfully",
      });
    }
  };

  const handleDeleteLink = (linkId: string) => {
    setLinks(prevLinks => prevLinks.filter(link => link.id !== linkId));
    toast({
      title: "Link deleted",
      description: "Your link has been removed",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userData={userData} />
      
      <div className="flex flex-1">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 py-8 px-4 md:px-8 overflow-auto">
          {activeTab === "overview" && (
            <OverviewTab 
              userData={userData} 
              links={links}
              onOpenLinkEditor={handleOpenLinkEditor}
              onDeleteLink={handleDeleteLink}
            />
          )}
          
          {activeTab === "links" && (
            <LinksTab 
              links={links}
              onOpenLinkEditor={handleOpenLinkEditor}
              onDeleteLink={handleDeleteLink}
            />
          )}
          
          {activeTab === "appearance" && (
            <AppearanceTab 
              userData={userData} 
              links={links}
            />
          )}
          
          {activeTab === "analytics" && (
            <AnalyticsTab 
              mockAnalyticsData={mockAnalyticsData}
            />
          )}
          
          {activeTab === "settings" && (
            <SettingsTab 
              userData={userData}
            />
          )}
        </main>
      </div>
      
      <LinkEditor 
        isOpen={isLinkEditorOpen} 
        onClose={handleCloseLinkEditor}
        onSave={handleSaveLink}
        editingLink={currentEditingLink}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;
