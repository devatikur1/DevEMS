import { Plus, Timer, X } from "lucide-react";
import React from "react";

export default function WorkspaceTechStack({ actTags }) {
  const { activeTags, setActiveTags } = actTags;
  const availableTags = [
    // --- Frontend (More Modern) ---
    "React",
    "Next.js",
    "Tailwind",
    "TypeScript",
    "Vue.js",
    "Angular",
    "Redux",
    "Sass",
    "HTML5",
    "CSS3",
    "Vite",
    "Zustand",
    "Radix UI",
    "Shadcn UI",
    "Astro",

    // --- App Dev & Cross-Platform ---
    "Flutter",
    "React Native",
    "Swift",
    "Kotlin",
    "Ionic",
    "Dart",

    // --- UI/UX & Creative ---
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Canva",
    "Sketch",
    "After Effects",
    "Spline (3D)",
    "Blender",
    "InVision",
    "Framer",

    // --- Backend & Database ---
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "MySQL",
    "Prisma",
    "GraphQL",
    "FastAPI",
    "Go",
    "Redis",
    "Supabase",
    "Appwrite",
    "NestJS",

    // --- Marketing, SEO & Business ---
    "SEO",
    "Analytics",
    "Google Ads",
    "Content Writing",
    "Social Media",
    "Email Marketing",
    "Growth Hacking",
    "Facebook Ads",
    "Copywriting",
    "Market Research",
    "CRM Management",
    "B2B Sales",

    // --- Management, DevOps & Tools ---
    "Jira",
    "Trello",
    "Slack",
    "Agile",
    "Scrum",
    "Git",
    "GitHub",
    "Vercel",
    "Docker",
    "AWS",
    "Google Cloud",
    "Netlify",
    "Kubernetes",
    "CI/CD",
    "Terraform",
    "Linux",
    "Bitbucket",

    // --- AI & Data Science (Trending) ---
    "Machine Learning",
    "Deep Learning",
    "Data Analysis",
    "NLP",
    "OpenAI API",
    "PyTorch",
    "Pandas",
    "NumPy",
    "TensorFlow",
    "Prompt Engineering",

    // --- Special & Others ---
    "Quality Assurance",
    "Unit Testing",
    "API Development",
    "Blockchain",
    "Cyber Security",
    "Penetration Testing",
    "Web3",
    "Solidity",
    "E-commerce",
    "WordPress",
    "Shopify",
    "FinTech",
    "HealthTech",
    "Charts",
  ];

  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };
  return (
    <section className="w-full flex flex-col gap-2 mb-10">
      <label className="text-sm font-medium text-text ml-1 flex items-center gap-2">
        <Timer size={16} /> Workspace Tech Stack (Tags)
      </label>

      {/* Selected tag show here */}
      <div className="flex flex-wrap gap-2 min-h-[50px] p-3 rounded-lg bg-surface border border-boxHover mb-4 transition-all duration-300">
        {activeTags.length === 0 ? (
          <span className="text-xs text-smtext opacity-50 italic">
            Select tools like React, Figma...
          </span>
        ) : (
          activeTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-[11px] px-3 py-1 rounded-full animate-in fade-in"
            >
              {tag}{" "}
              <X
                size={12}
                className="cursor-pointer hover:text-white"
                onClick={() => toggleTag(tag)}
              />
            </span>
          ))
        )}
      </div>

      {/* Select tag */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[11px] transition-all duration-300 ${
              activeTags.includes(tag)
                ? "bg-accent border-accent text-text "
                : "bg-surface border-boxHover text-smtext hover:border-accent"
            }`}
          >
            <span>{tag}</span>
            <Plus
              size={16}
              className={`${
                activeTags.includes(tag) && "rotate-45"
              } transition-all duration-300`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
