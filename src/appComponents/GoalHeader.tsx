
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {useNavigate  } from '@tanstack/react-router'


const Goal_Header = () => {


        const navigate = useNavigate()

    return (
        <div id="header" className="flex flex-row justify-between pb-2 px-4 mb-5 border-b-2">
            <div>
                <span className="text-xl text-blue-500">GOALS</span>
            </div>

            <div id="header-action" className="flex flex-row gap-2 ml-auto">
                <Input placeholder="Search by tag" name="search_term" />
                <Button>Filter</Button>
                <Button onClick={() => navigate({to:'/goals/addGoal/'})}>Create Goal</Button>
            </div>

            {/* Dialog for Adding Goal */}

        </div>
    );
};

export default Goal_Header
