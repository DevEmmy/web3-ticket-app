"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { 
  Shield, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Save, 
  Upload, 
  Globe, 
  Key
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { toastError, toastSuccess } from "@/utils/toast";

const Settings = () => {
  const [form, setForm] = useState<any>({
    
  });

  const user = useAuthStore((state) => state.user);

  useEffect(()=>{
    if(user){
      console.log("User data:", user);
      setForm({...form, ...user})
    }
  }, [user])

  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const { updateProfile, isUpdating, error, isSuccess } = useUpdateProfile();

  const handleSave = () => {
    const profileData = {
      ...form,
      profileImage: profileImage || user?.profileImage,
    };
    updateProfile(profileData);
  };

  // Add success/error feedback
  useEffect(() => {
    if (isSuccess) {
      // You could add a toast notification here
      toastSuccess("Profile updated successfully!");
      console.log("Profile updated successfully!");
    }
    if (error) {
      toastError(error.message || "Failed to update profile");
      console.error("Failed to update profile:", error);
    }
  }, [isSuccess, error]);

  return (
    <div className="min-h-screen  p-6">
      <div className=" mx-auto rounded-xl overflow-hidden shadow-2xl backdrop-blur-lg bg-black bg-opacity-40 border border-purple-500/20">
        
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"></div>
          <div className="absolute -bottom-16 left-8 flex items-end">
            <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden bg-gray-800">
              <img
                src={user?.profileImage || "https://api.dicebear.com/7.x/adventurer/svg?seed=5duyf9sj3aubwvvvtslbxkj8edz9dhamkxxz1sbdvhj2"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <label className="ml-4 mb-4 cursor-pointer flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all">
              <Upload size={16} />
              <span>Upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label> */}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-20 px-8 pt-4 flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 font-medium text-sm flex items-center space-x-2 ${
              activeTab === "profile"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <User size={16} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("web3")}
            className={`px-6 py-3 font-medium text-sm flex items-center space-x-2 ${
              activeTab === "web3"
                ? "text-purple-400 border-b-2 border-purple-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Key size={16} />
            <span>Web3</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <User className="mr-2 text-purple-400" /> Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <User size={16} className="mr-2 text-purple-400" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                    value={form.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <Mail size={16} className="mr-2 text-purple-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <Phone size={16} className="mr-2 text-purple-400" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                    value={form.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <MapPin size={16} className="mr-2 text-purple-400" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                    value={form.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm text-gray-300">
                  <FileText size={16} className="mr-2 text-purple-400" />
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                  value={form.bio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {activeTab === "web3" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Key className="mr-2 text-purple-400" /> Web3 Information
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <Key size={16} className="mr-2 text-purple-400" />
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    name="walletAddress"
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white font-mono"
                    value={form.walletAddress}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-300">
                    <Globe size={16} className="mr-2 text-purple-400" />
                    Website / ENS
                  </label>
                  <input
                    type="text"
                    name="website"
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white"
                    value={form.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className={`flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-medium transition-all shadow-lg hover:shadow-purple-500/20 ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Save size={18} />
              <span>{isUpdating ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;