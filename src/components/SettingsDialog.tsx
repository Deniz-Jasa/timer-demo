import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import DatePicker from '@/components/ui/date-picker';

interface SettingsDialogProps {
  setSettings: React.Dispatch<React.SetStateAction<any>>;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ setSettings }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [timeLimit, setTimeLimit] = useState<string>('');
  const [extraTime, setExtraTime] = useState<string>('');

  const saveChanges = () => {
    setSettings({ startDate, timeLimit, extraTime });
  };
  
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Settings</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]" >
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <br></br>
        <DialogDescription>
          Make changes to the simulation&rsquo;s countdown setting. Click save changes below when you&rsquo;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Start Date</Label>
          <div className="col-span-3">
            <DatePicker selectedDate={startDate} setSelectedDate={setStartDate} />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="timeLimit" className="text-right">
            Time Limit
          </Label>
          <Input
            id="timeLimit"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extraTime" className="text-right">
            Extra Time
          </Label>
          <Input
            id="extraTime"
            type="number"
            value={extraTime}
            onChange={(e) => setExtraTime(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>
        <DialogFooter>
          <DialogClose>
            <Button onClick={saveChanges} type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
