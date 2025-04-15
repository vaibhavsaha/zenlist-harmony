
import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Tasks', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Focus', href: '/focus' },
];

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setMenuOpen(false);
  };

  return (
    <header className="py-6 px-4 sm:px-6 flex justify-between items-center border-b border-border/40">
      <div className="flex items-center">
        <h1 className="text-xl font-medium tracking-wide">
          <span className="text-indigo">禅</span>List
        </h1>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.href)}
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              location.pathname === item.href && "text-foreground font-medium"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-9 h-9"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="rounded-full w-9 h-9 md:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[69px] left-0 right-0 bg-background border-b border-border/40 z-50 md:hidden"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "py-3 px-4 text-left hover:bg-accent rounded-md",
                    location.pathname === item.href && "bg-accent/50"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
