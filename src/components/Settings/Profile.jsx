import React, { useState, useRef, useEffect, useMemo } from "react";
import useFunction from "../../hooks/useFunction";
import UploadImg from "../Custom/UploadImg";
import {
  AtSign,
  Check,
  ChevronDown,
  Contact,
  LayoutGrid,
  Loader2,
  LocateFixed,
  Mail,
  Navigation,
  Network,
  Notebook,
  ShieldCheck,
} from "lucide-react";

//🔹 Company Config
const companyConfig = {
  departments: [
    "Engineering",
    "Product",
    "Design",
    "Human Resources",
    "Marketing",
    "Sales",
    "Finance",
    "Operations",
    "Customer Support",
    "Legal",
    "Research & Development",
    "Security",
    "Data & Analytics",
    "IT",
  ],

  roles: [
    "Frontend Developer",
    "Backend Engineer",
    "Full Stack Developer",
    "Mobile App Developer",
    "Software Engineer",
    "Senior Software Engineer",
    "Tech Lead",
    "Engineering Manager",
    "DevOps Engineer",
    "Cloud Engineer",
    "Site Reliability Engineer",
    "QA Engineer",
    "Automation Tester",
    "UI Designer",
    "UX Designer",
    "Product Designer",
    "Graphic Designer",
    "Product Manager",
    "Project Manager",
    "Scrum Master",
    "Business Analyst",
    "HR Executive",
    "HR Manager",
    "Recruiter",
    "Marketing Executive",
    "Digital Marketing Specialist",
    "Content Writer",
    "SEO Specialist",
    "Sales Executive",
    "Sales Manager",
    "Accountant",
    "Finance Manager",
    "Customer Support Executive",
    "Support Manager",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "Cybersecurity Specialist",
    "System Administrator",
    "Network Engineer",
  ],
};

export default function Profile({
  formData,
  setFormData,
  handleChange,

  LastUsername,
  usernameStatus,
  setUsernameStatus,

  GetCurrentLocation,
  isChange,
  handleSave,
  isSaving,
}) {
  const fileInputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { uploadImageFn, uniUsername } = useFunction();

  const dropdownRef1 = useRef(null);
  const [isFocused1, setIsFocused1] = useState(false);
  const [query1, setQuery1] = useState("");

  const dropdownRef2 = useRef(null);
  const [isFocused2, setIsFocused2] = useState(false);
  const [query2, setQuery2] = useState("");

  //🔹 Handle Image Upload
  const handleImageUpload = async (data) => {
    const url = data.url;
    const file = data.file;
    if (!url) return;

    setIsUploading(true);
    const res = await uploadImageFn(file);
    if (!res.isError) {
      setFormData((prev) => ({ ...prev, photoURL: res.url }));
    } else {
      alert("Image upload failed. Please try again.");
    }
    setIsUploading(false);
  };

  // 🔹 Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setIsFocused1(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsFocused2(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDepartments = useMemo(() => {
    return companyConfig.departments.filter((dt) =>
      dt.toLowerCase().includes(query1.toLowerCase()),
    );
  }, [query1]);

  const filteredPositions = useMemo(() => {
    return companyConfig.roles.filter((dt) =>
      dt.toLowerCase().includes(query2.toLowerCase()),
    );
  }, [query2]);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div>
        <h2 className="text-xl font-bold text-textPrimary text-center md:text-left">
          General Profile
        </h2>
        <p className="text-textMuted mt-1 text-xs text-center md:text-left">
          Update your personal information and how others see you on the
          platform.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Photo */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-6 pb-6 border-b border-border">
          <div className="relative">
            <UploadImg
              img={{
                file: {},
                url: formData.photoURL,
              }}
              setImg={handleImageUpload}
              isShow={false}
              labelClass={"flex md:hidden"}
              fileInputRef={fileInputRef}
            />
          </div>
          <div className="hidden md:flex flex-col gap-1 md:gap-0">
            <h3 className="text-lg font-semibold text-textPrimary text-left">
              Profile Picture
            </h3>
            <p className="text-xs text-textMuted max-w-sm mt-1 mb-3 text-left">
              Upload a high-res image (Max 2MB). Formats: JPEG, PNG, WEBP.
            </p>
            <div className="flex items-center justify-start gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="text-sm font-semibold bg-surfaceSoft hover:bg-hover text-textPrimary px-4 py-2 rounded-lg transition-colors border border-border disabled:pointer-events-none disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload New"}
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="px-3 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-textMuted block mb-1"
            >
              Full Name
            </label>

            <div className="relative flex flex-col w-full">
              <div className="relative flex items-center group">
                <Contact
                  size={18}
                  className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 text-textPrimary rounded-lg pl-11 pr-4 py-2.5 outline-none transition-all placeholder:text-textMuted/50"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-3">
            <label
              htmlFor="username"
              className="flex justify-between items-center text-xs font-medium text-textMuted ml-1"
            >
              <span className="text-sm font-semibold text-textMuted">
                Username
              </span>

              <span
                className={`text-[11px] px-2 py-0.5 rounded ${
                  usernameStatus === "Available"
                    ? "bg-success/10 text-success"
                    : usernameStatus === "Checking..."
                      ? "bg-warning/10 text-warning"
                      : "bg-error/10 text-error"
                }`}
              >
                Status: {usernameStatus}
              </span>
            </label>

            <div className="relative flex flex-col w-full">
              <div className="relative flex items-center group">
                <AtSign
                  size={18}
                  className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    const val = e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .replace(/@+/g, "")
                      .replace(/[^a-z0-9._]/g, "");

                    const username = val;

                    setFormData((prev) => ({
                      ...prev,
                      username,
                    }));

                    if (!val.trim()) {
                      clearTimeout(debounceTimerRef.current);
                      return setUsernameStatus("Not Valid");
                    }

                    setUsernameStatus("Checking...");

                    clearTimeout(debounceTimerRef.current);

                    debounceTimerRef.current = setTimeout(async () => {
                      const status = await uniUsername({
                        type: "find",
                        baseName: `@${username}`,
                      });

                      const isAvailable = username === LastUsername || status;

                      setUsernameStatus(isAvailable ? "Available" : "Taken");
                    }, 800);
                  }}
                  className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 text-textPrimary rounded-lg pl-11 pr-4 py-2.5 outline-none transition-all placeholder:text-textMuted/50"
                  placeholder="e.g. johndoe"
                />
              </div>
            </div>
          </div>

          {/*  Email Address */}
          <div className="space-y-3">
            <label
              disabled
              className="text-sm font-semibold text-textMuted block mb-1"
            >
              Email Address
            </label>
            <div className="relative flex flex-col w-full">
              <div className="relative flex items-center group">
                <Mail
                  size={18}
                  className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full bg-surfaceSoft/50 border border-border/50 text-textMuted rounded-lg pl-11 pr-4 py-2.5 outline-none cursor-not-allowed select-none"
                  placeholder="e.g. name@company.com"
                  disabled
                />
              </div>
            </div>
            <p className="text-xs text-textMuted mt-1 ml-2">
              The email change feature is currently unavailable.
            </p>
          </div>

          {/*  Role */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-textMuted block mb-1">
              Role
            </label>
            <div className="relative flex flex-col w-full">
              <div className="relative flex items-center group">
                <ShieldCheck
                  size={18}
                  className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                />
                <input
                  type="text"
                  value={`${formData.role}`}
                  className="w-full bg-surfaceSoft/50 border border-border/50 text-textMuted rounded-lg pl-10 pr-4 py-2.5 outline-none cursor-not-allowed select-none capitalize"
                  disabled
                />
              </div>
            </div>
          </div>

          {/*  Location */}
          <div className="col-span-full space-y-3">
            <label
              htmlFor="location"
              className="text-sm font-semibold text-textMuted block mb-1"
            >
              Location
            </label>

            <div className="relative flex flex-col w-full">
              <div className="relative flex items-center group">
                <Navigation
                  size={18}
                  className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                />
                <input
                  type="text"
                  id="location"
                  name="location"
                  onChange={handleChange}
                  value={formData.location}
                  placeholder="e.g. Location"
                  className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 text-textPrimary  rounded-lg pl-11 pr-11 py-2.5 outline-none transition-all placeholder:text-textMuted/50"
                />

                {/* Current Location Button */}
                <button
                  type="button"
                  onClick={async () => await GetCurrentLocation()}
                  title="Set Current Location"
                  className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-lg flex items-center justify-center bg-surface hover:bg-boxHover border border-border hover:border-accent/30 transition-all duration-200 group"
                >
                  <LocateFixed className="size-4 text-textMuted group-hover:text-accent transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {formData.role === "employee" && (
            <>
              {/*  Department */}
              <div className="col-span-full space-y-3">
                <label
                  htmlFor="department"
                  className="text-sm font-semibold text-textMuted block mb-1"
                >
                  Department
                </label>

                <div
                  className="relative flex flex-col w-full"
                  ref={dropdownRef1}
                >
                  <div className="relative flex items-center group">
                    <Network
                      size={18}
                      className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                    />
                    <input
                      id="department"
                      type="text"
                      placeholder="Search or select department..."
                      value={isFocused1 ? query1 : formData.department || ""}
                      onChange={(e) => {
                        setQuery1(e.target.value);
                        if (!isFocused1) setIsFocused1(true);
                      }}
                      onFocus={() => {
                        setIsFocused1(true);
                        setQuery1("");
                      }}
                      className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-md pl-12 pr-10 py-3 text-[13px] text-textPrimary placeholder:text-textMuted outline-none transition-all cursor-pointer"
                    />
                    <ChevronDown
                      size={16}
                      className={`absolute right-4 text-textMuted pointer-events-none transition-transform z-10 ${
                        isFocused1 ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Options */}
                  {isFocused1 && (
                    <div className="absolute top-[52px] left-0 w-full bg-surfaceSoft border border-border rounded-lg shadow-xl z-20 flex flex-col py-2 px-1.5 space-y-1">
                      {filteredDepartments.length > 0 ? (
                        <div className="max-h-56 overflow-y-auto px-1.5">
                          <div className="sticky top-0 z-10 bg-surfaceSoft text-[11px] font-medium text-textMuted uppercase tracking-wider px-2 py-1 mb-1 border-b border-border/50 pb-2">
                            {query1 ? "Search Results" : "All Departments"}
                          </div>
                          <ul className="mt-1">
                            {filteredDepartments.sort().map((item) => (
                              <li
                                key={item}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    department: item,
                                  }));
                                  setIsFocused1(false);
                                  setQuery1("");
                                }}
                                className={`group relative flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                                  formData.department === item
                                    ? "bg-accent/10 border-accent/20"
                                    : "hover:bg-boxHover"
                                }`}
                              >
                                <span
                                  className={`text-[13px] ${
                                    formData.department === item
                                      ? "text-accent font-medium"
                                      : "text-textPrimary/65 group-hover:text-textPrimary"
                                  }`}
                                >
                                  {item}
                                </span>
                                {formData.department === item && (
                                  <span className="text-[10px] text-accent font-medium px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 flex items-center gap-1">
                                    <Check size={10} /> Selected
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="px-3 py-4 text-center text-[13px] text-textMuted italic">
                          No departments found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/*  Position */}
              <div className="col-span-full space-y-3">
                <label
                  htmlFor="position"
                  className="text-sm font-semibold text-textMuted block mb-1"
                >
                  Position
                </label>

                <div
                  className="relative flex flex-col w-full"
                  ref={dropdownRef2}
                >
                  <div className="relative flex items-center group">
                    <LayoutGrid
                      size={18}
                      className="absolute left-4 text-textMuted group-focus-within:text-accent transition-colors z-10"
                    />
                    <input
                      id="position"
                      type="text"
                      placeholder="Search or select position..."
                      value={isFocused2 ? query2 : formData.position || ""}
                      onChange={(e) => {
                        setQuery2(e.target.value);
                        if (!isFocused2) setIsFocused2(true);
                      }}
                      onFocus={() => {
                        setIsFocused2(true);
                        setQuery2("");
                      }}
                      className="w-full bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 rounded-md pl-12 pr-10 py-3 text-[13px] text-textPrimary placeholder:text-textMuted outline-none transition-all cursor-pointer"
                    />
                    <ChevronDown
                      size={16}
                      className={`absolute right-4 text-textMuted pointer-events-none transition-transform z-10 ${
                        isFocused2 ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Options */}
                  {isFocused2 && (
                    <div className="absolute top-[52px] left-0 w-full bg-surfaceSoft border border-border rounded-lg shadow-xl z-20 flex flex-col py-2 px-1.5 space-y-1">
                      {filteredPositions.length > 0 ? (
                        <div className="max-h-56 overflow-y-auto px-1.5">
                          <div className="sticky top-0 z-10 bg-surfaceSoft text-[11px] font-medium text-textMuted uppercase tracking-wider px-2 py-1 mb-1 border-b border-border/50 pb-2">
                            {query2 ? "Search Results" : "All Positions"}
                          </div>
                          <ul className="mt-1">
                            {filteredPositions.sort().map((item) => (
                              <li
                                key={item}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    position: item,
                                  }));
                                  setIsFocused2(false);
                                  setQuery2("");
                                }}
                                className={`group relative flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                                  formData.position === item
                                    ? "bg-accent/10 border-accent/20"
                                    : "hover:bg-boxHover"
                                }`}
                              >
                                <span
                                  className={`text-[13px] ${
                                    formData.position === item
                                      ? "text-accent font-medium"
                                      : "text-textPrimary/65 group-hover:text-textPrimary"
                                  }`}
                                >
                                  {item}
                                </span>
                                {formData.position === item && (
                                  <span className="text-[10px] text-accent font-medium px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 flex items-center gap-1">
                                    <Check size={10} /> Selected
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="px-3 py-4 text-center text-[13px] text-textMuted italic">
                          No positions found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/*   Short Bio */}
          <div className="col-span-full space-y-3">
            <label
              htmlFor="bio"
              className="text-sm font-semibold text-textMuted block mb-1"
            >
              Short Bio
            </label>
            <div className="relative flex flex-col w-full">
              <div className="relative">
                <Notebook
                  size={18}
                  className="absolute left-3 top-4 text-textMuted pointer-events-none"
                />

                <textarea
                  id="bio"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us a little about yourself..."
                  className="w-full min-h-[150px] bg-surfaceSoft border border-border hover:border-hover focus:border-accent/50 text-textPrimary focus:border-accent rounded-lg pl-10 pt-3 pr-4 pb-3 outline-none transition-all placeholder:text-textMuted/50 resize-y"
                />
              </div>
            </div>
          </div>

          <div className="col-span-full flex justify-center items-center mt-12">
            <button
              type="submit"
              disabled={isSaving || !isChange || usernameStatus !== "Available"}
              className="w-72 bg-accent text-[0.8rem] md:text-[1rem] text-textPrimary px-8 py-3 lg:px-10 lg:py-3 rounded-md font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-55 disabled:pointer-events-none"
            >
              {isSaving ? (
                <div className="w-full flex justify-center items-center">
                  <Loader2 size={23} className="animate-spin" />
                </div>
              ) : (
                <span>Update profile</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
