import React from "react";
import { Divider, Link } from "@heroui/react";

const Footer = () => {
  const courseLinks = ["Full Stack Dev", "Data Science", "UI/UX Design", "Cybersecurity"];
  const instituteLinks = [
    { label: "About Us", href: "#curriculum" },
    { label: "Mentors", href: "#mentors" },
    { label: "Success Stories", href: "#stories" },
    { label: "Contact", href: "#footer" },
  ];
  const communityLinks = ["Discord", "LinkedIn", "GitHub"];

  return (
    <footer
      id="footer"
      className="py-20 px-4 sm:px-6 border-t border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 mb-20">
          <div className="col-span-2">
            <a
              href="/"
              className="text-2xl font-bold tracking-tighter text-blue-900 dark:text-white mb-6 block"
            >
              Logix & Code
            </a>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Empowering the next generation of developers with logic-driven
              education.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Courses</h4>
            <ul className="space-y-4">
              {courseLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Institute</h4>
            <ul className="space-y-4">
              {instituteLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Community</h4>
            <ul className="space-y-4">
              {communityLinks.map((label) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="bg-blue-50 dark:bg-slate-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">
            © 2024 Logix & Code. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
