import { useState } from 'react';
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

const UserAccountDropdown = () => {
  const { orders } = useOrder();
  
  const handleLogout = () => {
    // Add logout logic here
    console.log('User logged out');
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
          <p className="text-xs text-muted-foreground">user@example.com</p>
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