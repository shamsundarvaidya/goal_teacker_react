import React from 'react';

import GoalSection from './GoalComponents/GoalSection';
import Navbar from './Navbar';
const Dashboard: React.FC = () => {

  
  return (
    <div className="p-4 w-full">
      <Navbar />
      <GoalSection />
    </div>
  );
};

export default Dashboard;

