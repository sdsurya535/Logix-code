import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@heroui/react";
import { Moon, Sun } from "lucide-react";

const Navbar = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Curriculum", href: "/#curriculum" },
    { name: "Mentors", href: "/#mentors" },
    { name: "Success Stories", href: "/#stories" },
    { name: "Careers", href: "/#footer" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = href.split("#")[1];
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      classNames={{
        base: `fixed top-0 transition-all duration-300 z-50 ${
          isScrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-blue-100 dark:border-slate-800 shadow-sm"
            : "bg-transparent border-transparent"
        }`,
        wrapper: "px-4 sm:px-6",
      }}
    >
      {/* Brand + Mobile Toggle */}
      <NavbarContent justify="start">
        <NavbarMenuToggle className="lg:hidden text-slate-700 dark:text-white" />
        <NavbarBrand>
          <RouterLink
            to="/"
            className="text-xl sm:text-2xl font-bold tracking-tighter text-blue-900 dark:text-white"
          >
            Logix & Code
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Nav Links */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {navLinks.map((link) => (
          <NavbarItem key={link.name}>
            <a
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Desktop Actions */}
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onPress={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="text-slate-600 dark:text-slate-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            as={RouterLink}
            to="/login"
            variant="light"
            className="text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            as={RouterLink}
            to="/signup"
            color="primary"
            radius="full"
            className="shadow-md shadow-blue-200 dark:shadow-none"
          >
            Enroll Now
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white dark:bg-slate-900 pt-6 gap-2">
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.name}>
            <a
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full block py-2"
            >
              {link.name}
            </a>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <div className="h-px bg-blue-50 dark:bg-slate-800 my-2" />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            as={RouterLink}
            to="/login"
            variant="light"
            fullWidth
            className="justify-start text-lg font-medium text-slate-900 dark:text-white"
            onPress={() => setIsMenuOpen(false)}
          >
            Sign In
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            as={RouterLink}
            to="/signup"
            color="primary"
            radius="lg"
            fullWidth
            className="text-lg font-medium"
            onPress={() => setIsMenuOpen(false)}
          >
            Enroll Now
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
