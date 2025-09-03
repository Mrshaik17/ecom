import { useState, useEffect } from 'react';
import { ChevronDown, User, Package, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useOrder } from '@/context/OrderContext';
import { auth } from '../LS/firebase';  // ✅ make sure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';

const UserAccountDropdown = () => {
  const { orders } = useOrder();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('✅ User logged out');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Account</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-background border border-border shadow-lg z-50"
      >
        <div className="p-2 border-b border-border">
          <p className="text-sm font-medium">Welcome back!</p>
          <p className="text-xs text-muted-foreground">
            {userEmail || 'Not signed in'}
          </p>
        </div>
        
        <DropdownMenuItem className="cursor-pointer">
          <Package className="h-4 w-4 mr-2" />
          <div>
            <div className="text-sm">Track Orders</div>
            <div className="text-xs text-muted-foreground">
              {orders.length} active orders
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Support
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountDropdown;
