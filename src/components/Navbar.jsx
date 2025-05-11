import { LogOut, MessageSquare, User, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/useAuthUser";
import { Camera, Pencil, Check } from "lucide-react";
import profile from "../assets/profile.png"


function Navbar() {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [showProfileModal, setShowProfileModal] = useState(false);
  // inside your component
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(authUser?.name || "");
  const textRef = useRef()
  const [loadImages, setLoadeImages] = useState("");


  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64image = reader.result;
      setLoadeImages(base64image)
    }
    const formData = {
      image: file
    }
    updateProfile(formData);
  }
  const handleInputData = (e) => {
    e.preventDefault();
    const formData = {
      name: nameInput
    }
    updateProfile(formData);
    setIsEditing((prev) => !prev)
  }

  useEffect(() => {
    if (isEditing) {
      textRef.current?.focus();
    }
  }, [isEditing]);


  console.log(authUser?.image,"******************8")
  return (
    <>
      <header
        className="text-black border-b border-base-300 fixed w-full top-0 z-40 
        backdrop-blur-lg my-gradient-bg"
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <h1 className="text-lg font-bold">My chatApp</h1>
              </Link>
            </div>

            <div className="flex items-center gap-6">
              {authUser && (
                <>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="flex gap-2 items-center cursor-pointer hover:shadow py-2 px-3 rounded-md duration-300 transition-all"
                  >
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </button>

                  <button className="flex gap-2 items-center cursor-pointer hover:shadow py-2 px-3 rounded-md duration-300 transition-all" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl shadow-lg w-full max-w-md p-4 relative my-gradient-bg">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X className="w-8 h-8 cursor-pointer" />
            </button>

            <div className="text-black rounded-xl p-6 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold ">Profile</h1>
                <p className="mt-2">Your profile information</p>
              </div>

              {/* avatar upload section */}

              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={loadImages || authUser?.image || profile}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-2 border-white"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                  absolute bottom-0 right-0 
                  bg-base-content
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                  >
                    <Camera className="w-5 h-5 text-black hover:scale-105" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                <p className="text-xs -mt-4">
                  {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={nameInput}
                    ref={textRef}
                    onChange={(e) => setNameInput(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-transparent
        pr-10 transition duration-200 ${isEditing ? 'border-primary focus:outline-none focus:ring-2 ring-primary' : 'border-gray-600 text-gray-600'}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:opacity-80 cursor-pointer"
                  >
                    {isEditing ? <Check onClick={handleInputData} className="w-5 h-5" /> : <Pencil onClick={() => setIsEditing((prev) => !prev)
                    } className="w-5 h-5" />}
                  </button>
                </div>
              </div>


              <div className="mt-6 rounded-xl p-6">
                <h2 className="text-lg font-medium  mb-4">Account Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span>Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Account Status</span>
                    <span className="text-green-600 font-bold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;



