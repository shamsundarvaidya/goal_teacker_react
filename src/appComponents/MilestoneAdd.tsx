import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'; 
import { Button } from '@/components/ui/button'; // Adjust path
import { Input } from '@/components/ui/input'; // Adjust path
import { Textarea } from '@/components/ui/textarea'; // Adjust path
import { addMilestone } from '@/lib/milestoneLib';
import { useRouter } from '@tanstack/react-router';


type AddMilestonePopupProps = {
  goalId: string;
  onClose: () => void;
};

export const AddMilestonePopup = ({ goalId, onClose }: AddMilestonePopupProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  

  const handleSave = async () => {
    if (!title) {
      setError('Title is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result =   await addMilestone(goalId, { title, description, target_date: targetDate,});
    if(result){
        await router.invalidate({ filter: (match) => {console.log(match.id,match.id === `/goals/${goalId}`);
        return match.id,match.id === `/goals/${goalId}`;}})
        
        onClose(); // Close the modal on success
    }
    else{
        setError("Failed to add milestone")
    }

    setIsLoading(false);

  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Milestone</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor="target_date" className="block text-sm font-medium">
              Target Date
            </label>
            <Input id="target_date" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
