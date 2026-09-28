import { useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <div className="">
     <Calendar
    variant="picker"
    value={selectedDate}
    onChange={setSelectedDate}
  />
    </div>
  );
};

export default DashboardPage;
