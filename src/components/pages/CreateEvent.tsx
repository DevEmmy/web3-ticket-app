"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Link, 
  Tag, 
  Globe, 
  Hash, 
  Ticket, 
  Image, 
  Twitter, 
  Instagram, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Check, 
  Wallet,
  Plus,
  DollarSign
} from "lucide-react";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import { useCreateEvent } from '@/hooks/useCreateEvent';

const EventCreation = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    startDate: "",
    endDate: "",
    timezone: "UTC",
    eventType: "in-person",
    venue: {
      name: "",
      address: "",
      city: "",
      country: "",
    },
    onlineUrl: "",
    ticketTiers: [{ name: "General Admission", price: 0, quantity: 100, tokenGated: false, requiredToken: "" }],
    isFree: true,
    bannerUrl: "",
    socialLinks: {
      twitter: "",
      instagram: "",
      discord: "",
    },
    walletAddress: "",
    mintNFT: false,
    allowCrypto: true,
    acceptedTokens: ["ETH", "USDC"]
  });

  const { createEvent, isCreating, error } = useCreateEvent();

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(Math.min(step + 1, totalSteps));
  };
  
  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(Math.max(step - 1, 1));
  };

  const updateForm = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTicketTier = (index, field, value) => {
    const updatedTiers = [...formData.ticketTiers];
    updatedTiers[index][field] = value;
    updateForm("ticketTiers", updatedTiers);
  };

  const addTicketTier = () => {
    updateForm("ticketTiers", [
      ...formData.ticketTiers,
      { name: "", price: 0, quantity: 0, tokenGated: false, requiredToken: "" },
    ]);
  };

  const removeTicketTier = (index) => {
    const updatedTiers = formData.ticketTiers.filter((_, i) => i !== index);
    updateForm("ticketTiers", updatedTiers);
  };

  const toggleTokenAcceptance = (token) => {
    if (formData.acceptedTokens.includes(token)) {
      updateForm("acceptedTokens", formData.acceptedTokens.filter(t => t !== token));
    } else {
      updateForm("acceptedTokens", [...formData.acceptedTokens, token]);
    }
  };

  const handleSubmit = () => {
    createEvent(formData);
  };

  // Calculate progress percentage
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header and progress tracker */}
        <div className="mb-8 text-center">
          <div className="inline-block px-4 py-1 bg-purple-800 bg-opacity-50 rounded-full text-purple-300 text-sm font-medium mb-4">
            Step {step} of {totalSteps}
          </div>
          <h1 className="text-3xl font-bold text-white mb-6">Create Your Web3 Event</h1>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {/* Step labels */}
          <div className="flex justify-between text-xs text-gray-400 px-2">
            <div className={step >= 1 ? "text-purple-400" : ""}>Event Info</div>
            <div className={step >= 2 ? "text-purple-400" : ""}>Schedule</div>
            <div className={step >= 3 ? "text-purple-400" : ""}>Tickets</div>
            {/* <div className={step >= 4 ? "text-purple-400" : ""}>Web3 Options</div> */}
            <div className={step >= 4 ? "text-purple-400" : ""}>Finalize</div>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          
          {/* Form content */}
          <div className="p-8">
          
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Info className="mr-2 text-purple-400" size={20} />
                  Event Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Event Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Web3 Community Meetup"
                        className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        value={formData.name}
                        onChange={(e) => updateForm("name", e.target.value)}
                      />
                      <Tag className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Description</label>
                    <div className="relative">
                      <textarea
                        placeholder="Share details about your event..."
                        className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                      />
                      <Info className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Category</label>
                      <div className="relative">
                        <select
                          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.category}
                          onChange={(e) => updateForm("category", e.target.value)}
                        >
                          <option value="">Select a category</option>
                          <option value="conference">Conference</option>
                          <option value="workshop">Workshop</option>
                          <option value="hackathon">Hackathon</option>
                          <option value="networking">Networking</option>
                          <option value="ama">AMA Session</option>
                          <option value="launch">Product Launch</option>
                          <option value="other">Other</option>
                        </select>
                        <Hash className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Tags</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="nft, defi, dao, ethereum"
                          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.tags}
                          onChange={(e) => updateForm("tags", e.target.value)}
                        />
                        <Tag className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags && formData.tags.split(',').map((tag, i) => (
                        tag.trim() && (
                          <span key={i} className="bg-purple-900/50 text-purple-300 text-xs font-medium px-2.5 py-1 rounded">
                            #{tag.trim()}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Scheduling */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Calendar className="mr-2 text-purple-400" size={20} />
                  Event Schedule & Location
                </h2>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Start Date & Time</label>
                      <div className="relative">
                        <input
                          type="datetime-local"
                          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.startDate}
                          onChange={(e) => updateForm("startDate", e.target.value)}
                        />
                        <Calendar className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">End Date & Time</label>
                      <div className="relative">
                        <input
                          type="datetime-local"
                          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.endDate}
                          onChange={(e) => updateForm("endDate", e.target.value)}
                        />
                        <Calendar className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Timezone</label>
                    <div className="relative">
                      <select
                        className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        value={formData.timezone}
                        onChange={(e) => updateForm("timezone", e.target.value)}
                      >
                        <option value="UTC">UTC</option>
                        <option value="GMT-8">Pacific Time (GMT-8)</option>
                        <option value="GMT-5">Eastern Time (GMT-5)</option>
                        <option value="GMT+1">Central European Time (GMT+1)</option>
                        <option value="GMT+8">China/Singapore (GMT+8)</option>
                        <option value="GMT+9">Japan/Korea (GMT+9)</option>
                        <option value="GMT+5:30">India (GMT+5:30)</option>
                      </select>
                      <Globe className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Event Type</label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${
                          formData.eventType === "in-person"
                            ? "bg-purple-800/50 border-purple-500 text-white"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                        onClick={() => updateForm("eventType", "in-person")}
                      >
                        <MapPin size={16} />
                        In-person
                      </button>
                      
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${
                          formData.eventType === "online"
                            ? "bg-purple-800/50 border-purple-500 text-white"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                        onClick={() => updateForm("eventType", "online")}
                      >
                        <Globe size={16} />
                        Online
                      </button>
                      
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 border ${
                          formData.eventType === "hybrid"
                            ? "bg-purple-800/50 border-purple-500 text-white"
                            : "border-gray-700 text-gray-300 hover:border-gray-600"
                        }`}
                        onClick={() => updateForm("eventType", "hybrid")}
                      >
                        <Link size={16} />
                        Hybrid
                      </button>
                    </div>
                  </div>
                  
                  {/* Show venue fields if in-person or hybrid */}
                  {formData.eventType !== "online" && (
                    <div className="border border-gray-800 rounded-lg p-4 bg-gray-800/50 space-y-4">
                      <h3 className="text-white font-medium flex items-center">
                        <MapPin className="mr-2 text-purple-400" size={16} />
                        Venue Information
                      </h3>
                      
                      <div>
                        <input
                          type="text"
                          placeholder="Venue Name"
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.venue.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              venue: { ...formData.venue, name: e.target.value },
                            })
                          }
                        />
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          placeholder="Address"
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.venue.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              venue: { ...formData.venue, address: e.target.value },
                            })
                          }
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            placeholder="City"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={formData.venue.city}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                venue: { ...formData.venue, city: e.target.value },
                              })
                            }
                          />
                        </div>
                        
                        <div>
                          <input
                            type="text"
                            placeholder="Country"
                            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={formData.venue.country}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                venue: { ...formData.venue, country: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Show URL field if online or hybrid */}
                  {formData.eventType !== "in-person" && (
                    <div className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                      <h3 className="text-white font-medium flex items-center mb-4">
                        <Link className="mr-2 text-purple-400" size={16} />
                        Online Information
                      </h3>
                      
                      <div className="relative">
                        <input
                          type="url"
                          placeholder="Meeting URL (Zoom, Google Meet, etc.)"
                          className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          value={formData.onlineUrl}
                          onChange={(e) => updateForm("onlineUrl", e.target.value)}
                        />
                        <Link className="absolute left-3 top-3.5 text-gray-400" size={16} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 3: Tickets */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Ticket className="mr-2 text-purple-400" size={20} />
                  Ticket Information
                </h2>
                
                <div className="space-y-5">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-700 focus:ring-purple-500"
                        checked={formData.isFree}
                        onChange={() => updateForm("isFree", !formData.isFree)}
                      />
                      <span className="ml-2 text-white">This is a free event</span>
                    </label>
                  </div>
                  
                  {!formData.isFree && (
                    <div className="space-y-4">
                      {formData.ticketTiers.map((tier, index) => (
                        <div key={index} className="bg-gray-800/80 p-5 rounded-lg border border-gray-700 space-y-4 relative">
                          {formData.ticketTiers.length > 1 && (
                            <button
                              type="button"
                              className="absolute top-3 right-3 text-gray-400 hover:text-red-400"
                              onClick={() => removeTicketTier(index)}
                            >
                              ×
                            </button>
                          )}
                          
                          <h3 className="font-medium text-white">Ticket Tier {index + 1}</h3>
                          
                          <div>
                            <label className="text-xs text-gray-400 mb-1 block">Name</label>
                            <input
                              type="text"
                              placeholder="VIP, Early Bird, etc."
                              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                              value={tier.name}
                              onChange={(e) => updateTicketTier(index, "name", e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Price</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  placeholder="0.00"
                                  className="w-full p-3 pl-8 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={tier.price}
                                  onChange={(e) => updateTicketTier(index, "price", Number(e.target.value))}
                                />
                                <DollarSign className="absolute left-2.5 top-3.5 text-gray-400" size={16} />
                              </div>
                            </div>
                            
                            <div>
                              <label className="text-xs text-gray-400 mb-1 block">Quantity</label>
                              <input
                                type="number"
                                placeholder="100"
                                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                value={tier.quantity}
                                onChange={(e) => updateTicketTier(index, "quantity", Number(e.target.value))}
                              />
                            </div>
                          </div>
                          
                          {/* <div>
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-purple-500 rounded border-gray-600 focus:ring-purple-500"
                                checked={tier.tokenGated}
                                onChange={(e) => updateTicketTier(index, "tokenGated", e.target.checked)}
                              />
                              <span className="ml-2 text-white text-sm">Token-gated access</span>
                            </label>
                            
                            {tier.tokenGated && (
                              <div className="mt-3">
                                <input
                                  type="text"
                                  placeholder="NFT Collection Address or Token Contract"
                                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                  value={tier.requiredToken}
                                  onChange={(e) => updateTicketTier(index, "requiredToken", e.target.value)}
                                />
                              </div>
                            )}
                          </div> */}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 mt-2"
                        onClick={addTicketTier}
                      >
                        <Plus size={16} />
                        Add Another Ticket Tier
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 4: Web3 Options */}
            {/* {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Wallet className="mr-2 text-purple-400" size={20} />
                  Web3 Options
                </h2>
                
                <div className="space-y-5">
                  <div className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                    <h3 className="text-white font-medium mb-4">Payment Options</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-700 focus:ring-purple-500"
                          checked={formData.allowCrypto}
                          onChange={() => updateForm("allowCrypto", !formData.allowCrypto)}
                        />
                        <span className="ml-2 text-white">Accept cryptocurrency payments</span>
                      </label>
                      
                      {formData.allowCrypto && (
                        <div className="pl-7">
                          <p className="text-sm text-gray-400 mb-2">Select accepted tokens:</p>
                          <div className="flex flex-wrap gap-2">
                            {["ETH", "USDC", "DAI", "MATIC", "SOL", "BNB"].map((token) => (
                              <button
                                key={token}
                                type="button"
                                className={`px-3 py-1.5 rounded text-sm ${
                                  formData.acceptedTokens.includes(token)
                                    ? "bg-purple-800 text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                }`}
                                onClick={() => toggleTokenAcceptance(token)}
                              >
                                {token}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                    <h3 className="text-white font-medium mb-4">Web3 Features</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-700 focus:ring-purple-500"
                          checked={formData.mintNFT}
                          onChange={() => updateForm("mintNFT", !formData.mintNFT)}
                        />
                        <span className="ml-2 text-white">Mint attendance NFT for participants</span>
                      </label>
                      
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Creator Wallet Address</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="0x..."
                            className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
                            value={formData.walletAddress}
                            onChange={(e) => updateForm("walletAddress", e.target.value)}
                          />
                          <Wallet className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">This wallet will receive funds from ticket sales</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            
            {/* Step 5: Finalize */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Check className="mr-2 text-purple-400" size={20} />
                  Finalize Your Event
                </h2>
                
                <div className="space-y-5">
                  <div className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                    <h3 className="text-white font-medium mb-4">Event Banner</h3>
                    
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Banner Image URL"
                        className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        value={formData.bannerUrl}
                        onChange={(e) => updateForm("bannerUrl", e.target.value)}
                      />
                      <Image className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    </div>
                    
                    {formData.bannerUrl && (
                      <img src={formData.bannerUrl} alt="Banner Preview" className="mt-4 rounded-lg w-full h-auto" />
                    )}
                  </div>
                  
                  <div className="border border-gray-800 rounded-lg p-4 bg-gray-800/50">
                    <h3 className="text-white font-medium mb-4">Social Media Links</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Twitter</label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://twitter.com/your_event"
                            className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={formData.socialLinks.twitter}
                            onChange={(e) => updateForm("socialLinks", { ...formData.socialLinks, twitter: e.target.value })}
                          />
                          <FaTwitter className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Discord</label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://discord.gg/your_event"
                            className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={formData.socialLinks.discord}
                            onChange={(e) => updateForm("socialLinks", { ...formData.socialLinks, discord: e.target.value })}
                          />
                          <FaDiscord className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Telegram</label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://t.me/your_event"
                            className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={formData.socialLinks.telegram}
                            onChange={(e) => updateForm("socialLinks", { ...formData.socialLinks, telegram: e.target.value })}
                          />
                          <FaTelegram className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Website</label>
                        <div className="relative">
                          <input
                            type="url"
                            placeholder="https://your_event.com"
                            className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            value={formData.socialLinks.website}
                            onChange={(e) => updateForm("socialLinks", { ...formData.socialLinks, website: e.target.value })}
                          />
                          <Link className="absolute left-3 top-3.5 text-gray-400" size={16} />  
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-gray-300"
                onClick={prevStep}
                disabled={step === 1}
              >
                Back
              </button>
              {step === 4 ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isCreating}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-lg text-white font-medium"
                >
                  {isCreating ? (
                    <span>Creating...</span>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Create Event</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-gray-300" 
                  onClick={nextStep}
                >
                  Next
                </button>
              )}
            </div>
            {error && (
              <p className="mt-4 text-red-500 text-sm">
                {error instanceof Error ? error.message : 'Failed to create event'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreation