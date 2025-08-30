import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Smartphone, Upload } from "lucide-react";

const MobileCustomization = () => {
  const [mobileConfig, setMobileConfig] = useState({
    address: "",
    title: "GYM Master",
    primaryColor: "#3b82f6",
    secondaryColor: "#64748b",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    logo: "https://gemawy.codebase-product.com/storage/82/favicon.ico",
    splashScreen: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setMobileConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save mobile configuration logic here
    toast({
      title: "Settings saved",
      description: "Mobile customization settings have been updated.",
    });
  };

  return (
    <DashboardLayout title="Mobile App Customization">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mobile App Customization</h1>
          <p className="text-muted-foreground mt-2">
            Configure your mobile application settings, design, and branding.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mobile Mockup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative" style={{ backgroundColor: mobileConfig.backgroundColor }}>
                    {/* Status Bar */}
                    <div className="h-6 bg-black/5 flex items-center justify-between px-4 text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-black/20 rounded-sm"></div>
                        <div className="w-6 h-2 bg-black/20 rounded-sm"></div>
                        <div className="w-6 h-2 bg-black/20 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="p-4 text-center border-b" style={{ borderColor: mobileConfig.primaryColor + '20' }}>
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: mobileConfig.primaryColor }}>
                        <img 
                          src={mobileConfig.logo} 
                          alt="Logo" 
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <h2 className="font-bold text-lg" style={{ color: mobileConfig.textColor }}>
                        {mobileConfig.title}
                      </h2>
                    </div>
                    
                    {/* Mock Content */}
                    <div className="p-4 space-y-3">
                      <div className="h-4 rounded" style={{ backgroundColor: mobileConfig.secondaryColor + '30' }}></div>
                      <div className="h-4 rounded w-3/4" style={{ backgroundColor: mobileConfig.secondaryColor + '30' }}></div>
                      <div className="h-20 rounded-lg" style={{ backgroundColor: mobileConfig.primaryColor + '10', border: `1px solid ${mobileConfig.primaryColor}30` }}></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-16 rounded" style={{ backgroundColor: mobileConfig.secondaryColor + '20' }}></div>
                        <div className="h-16 rounded" style={{ backgroundColor: mobileConfig.secondaryColor + '20' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile-address">Mobile Address</Label>
                  <Input
                    id="mobile-address"
                    type="text"
                    placeholder="Enter mobile address"
                    value={mobileConfig.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="app-title">App Title</Label>
                  <Input
                    id="app-title"
                    type="text"
                    placeholder="Enter app title"
                    value={mobileConfig.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-url">Logo URL</Label>
                  <Input
                    id="logo-url"
                    type="url"
                    placeholder="Enter logo URL"
                    value={mobileConfig.logo}
                    onChange={(e) => handleInputChange('logo', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="splash-screen">Splash Screen URL</Label>
                  <Input
                    id="splash-screen"
                    type="url"
                    placeholder="Enter splash screen image URL"
                    value={mobileConfig.splashScreen}
                    onChange={(e) => handleInputChange('splashScreen', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={mobileConfig.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={mobileConfig.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={mobileConfig.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={mobileConfig.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="background-color"
                        type="color"
                        value={mobileConfig.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={mobileConfig.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="text-color"
                        type="color"
                        value={mobileConfig.textColor}
                        onChange={(e) => handleInputChange('textColor', e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={mobileConfig.textColor}
                        onChange={(e) => handleInputChange('textColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full">
              Save Mobile Configuration
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MobileCustomization;