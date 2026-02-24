import React from "react";
import { Layers, BarChart3, Bot, Users, Zap, Globe } from "lucide-react";
import Hero from "../components/Hero";
import CoursesSection from "../components/CoursesSection";
import ProductSection from "../components/ProductSection";
import StatsSection from "../components/StatsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import MentorsSection from "../components/MentorsSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import FAQSection from "../components/FAQSection";
import SuccessStoriesSection from "../components/SuccessStoriesSection";
import CTASection from "../components/CTASection";

const curriculumItems = [
  {
    name: "Core Logic",
    icon: <Layers size={20} className="text-blue-600" />,
    description:
      "Master the fundamentals of algorithmic thinking and problem-solving strategies.",
  },
  {
    name: "Industry Projects",
    icon: <BarChart3 size={20} className="text-blue-600" />,
    description:
      "Build real-world applications using modern tech stacks used by top-tier companies.",
  },
  {
    name: "AI-Assisted Learning",
    icon: <Bot size={20} className="text-blue-600" />,
    description:
      "Leverage AI tools to accelerate your learning curve and debug complex logic.",
  },
];

const mentorshipItems = [
  {
    name: "1-on-1 Mentoring",
    icon: <Users size={20} className="text-blue-600" />,
    description:
      "Get personalized guidance from industry veterans who have worked at Big Tech.",
  },
  {
    name: "Career Coaching",
    icon: <Zap size={20} className="text-blue-600" />,
    description:
      "Resume reviews, mock interviews, and negotiation strategies to land your dream job.",
  },
  {
    name: "Global Network",
    icon: <Globe size={20} className="text-blue-600" />,
    description:
      "Access our exclusive alumni network and connect with peers across the globe.",
  },
];

const LandingPage = () => (
  <main className="overflow-x-hidden">
    <Hero />

    <CoursesSection />

    <ProductSection
      id="curriculum"
      title="The Curriculum"
      subtitle="Logic-first approach to engineering"
      description="We don't just teach code; we teach you how to think. Our curriculum is designed to build a solid foundation in logic before diving into syntax."
      items={curriculumItems}
    />

    <StatsSection />

    <WhyChooseUs />

    <MentorsSection />

    <ProductSection
      title="Mentorship & Placement"
      subtitle="Your bridge to the tech industry"
      description="Our mentorship program ensures you're never alone. We provide the support and networking required to launch a successful career."
      items={mentorshipItems}
      reverse={true}
    />

    <TestimonialsCarousel />

    <FAQSection />

    <SuccessStoriesSection />

    <CTASection />
  </main>
);

export default LandingPage;
