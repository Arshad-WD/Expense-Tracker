import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaWallet, FaBell, FaCog, FaArrowLeft } from 'react-icons/fa';
import Logo from '../../assets/Jenix.jpg';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const DesktopMenus = [
        { title: 'Home', icon: <FaHome />, path: '/' },
        { title: 'Transactions', icon: <FaWallet />, path: '/transactions' },
        //{ title: 'Notifications', icon: <FaBell />, path: '/notifications' },
        { title: 'Settings', icon: <FaCog />, path: '/settings' },
    ];

    const MobileMenus = [
        { title: 'Home', icon: <FaHome />, path: '/' },
        { title: 'Transactions', icon: <FaWallet />, path: '/transactions' },
      //  { title: 'Notifications', icon: <FaBell />, path: '/notifications' },
        { title: 'Settings', icon: <FaCog />, path: '/settings' },
    ];

    const activeClass =
        'bg-indigo-500/80 text-white rounded-full w-10 h-10 flex justify-center items-center';
    const inactiveClass =
        'text-gray-300 text-lg flex justify-center items-center';

    return (
        <div>
            {/* Sidebar for Desktop */}
            <div className="hidden lg:flex">
                <div
                    className={`${
                        open ? 'w-72' : 'w-20'
                    } fixed left-0 top-0 bg-black/90 border border-white/10 h-screen p-5 pt-8 duration-300 rounded-r-lg z-50 `}
                >
                    <div
                        className="absolute cursor-pointer -right-3 top-11 w-7 h-7 border-white/20 border-2 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-md"
                        onClick={() => {setOpen(!open), console.log(open)}}
                    >
                        <FaArrowLeft
                            className={`text-white text-xl transform ${!open && 'rotate-180'}`}
                        />
                    </div>
                    <div className="flex gap-x-4 items-center">
                        <img
                            src={Logo}
                            alt="Logo"
                            className={`text-white text-3xl duration-500 rounded-[50%] h-[6vh] md:h-10 ${open && 'rotate-[360deg]'}`}
                        />
                        <h1
                            className={`text-white origin-left font-bold text-xl duration-200 ${
                                !open && 'scale-0'
                            }`}
                        >
                            Jenix Tracker
                        </h1>
                    </div>
                    <ul className="pt-6">
                        {DesktopMenus.map((Menu, index) => (
                            <li
                                key={index}
                                className="flex rounded-md p-2 cursor-pointer hover:bg-white/10 text-gray-300 text-sm items-center gap-x-4 mt-2 font-semibold"
                            >
                               <NavLink
                                    to={Menu.path}
                                    className="flex items-center gap-x-4"
                                >
                                    <span className="text-xl">{Menu.icon}</span>
                                    {/* Show the title only when the sidebar is open */}
                                    {open && <span>{Menu.title}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Navigation Bar for Mobile and Medium Screens */}
            <div className="lg:hidden fixed bottom-2 left-0 right-0 bg-black/30 backdrop-blur-lg border border-white/10 h-[8%] flex justify-around items-center shadow-lg rounded-full mx-2 z-10">
                {MobileMenus.map((Menu, index) => (
                    <NavLink
                        key={index}
                        to={Menu.path}
                        className={({ isActive }) =>
                            isActive ? activeClass : inactiveClass
                        }
                    >
                        <span className="text-2xl">{Menu.icon}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
