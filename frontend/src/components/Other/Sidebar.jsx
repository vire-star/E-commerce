// src/components/Other/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3, Tag, LogOut, Home } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      path: '/', 
      label: 'Home',
      icon: Home
    },
    { 
      path: '/dashboard', 
      label: 'Overview',
      icon: LayoutDashboard
    },
    { 
      path: '/dashboard/product', 
      label: 'Products',
      icon: Package
    },
    
    
    
    
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-gray-900 font-bold text-xl">A</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 py-3 px-4 rounded-lg font-medium text-sm transition-all
                ${isActive 
                  ? 'bg-gray-800 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-800">
        {/* User Profile */}
        

        {/* Logout Button */}
        
      </div>
    </aside>
  );
};

export default Sidebar;
