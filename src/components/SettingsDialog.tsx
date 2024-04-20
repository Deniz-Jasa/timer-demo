import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

interface DatePickerProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-[280px] justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-1050" style={{ zIndex: 1050 }}>
        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

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
          Make changes to the simulation's countdown setting. Click save changes below when you're done.
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
