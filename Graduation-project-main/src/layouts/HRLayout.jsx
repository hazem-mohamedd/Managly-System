import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

const HRLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [userProfilePicture, setUserProfilePicture] = useState(
    'https://ui-avatars.com/api/?name=HR+User&background=0D8ABC&color=fff'
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top Header */}
        <TopHeader
          setMobileOpen={setMobileOpen}
          userProfilePicture={userProfilePicture}
        />

        {/* Pages */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto w-full">
          <Outlet context={{ userProfilePicture, setUserProfilePicture }} />
        </main>

      </div>
    </div>
  );
};

export default HRLayout;