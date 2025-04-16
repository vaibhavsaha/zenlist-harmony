import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    console.log('Toggling theme');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "You have been signed out",
      });
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
    }
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

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
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "px-4 py-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer",
              location.pathname === item.href 
                ? "bg-accent/50 text-foreground font-medium" 
                : "text-muted-foreground hover:bg-accent/20 hover:text-foreground hover:scale-105 hover:shadow-sm",
              "transform hover:translate-y-[-2px]" // Subtle lift effect
            )}
            onClick={() => console.log(`Clicked on ${item.label}`)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9 cursor-pointer hover:bg-accent/20 hover:scale-110 transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <UserCircle size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm">
                <div className="font-medium">{user.email}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="rounded-md cursor-pointer hover:bg-accent/20 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-sm transform origin-center"
            type="button"
          >
            Sign In
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-9 h-9 cursor-pointer hover:bg-accent/20 hover:scale-110 transition-all duration-300"
          type="button"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="rounded-full w-9 h-9 md:hidden cursor-pointer hover:bg-accent/20 hover:scale-110 transition-all duration-300"
          type="button"
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
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "py-3 px-4 text-left hover:bg-accent/20 rounded-md w-full block cursor-pointer transition-all duration-300 ease-in-out",
                    location.pathname === item.href ? "bg-accent/50" : "",
                    "hover:translate-x-2" // Subtle slide effect for mobile
                  )}
                  onClick={() => {
                    console.log(`Mobile clicked on ${item.label}`);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
