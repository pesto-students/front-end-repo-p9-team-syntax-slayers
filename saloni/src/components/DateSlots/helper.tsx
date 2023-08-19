import { DateAndTime } from "./DateSlots";

export const dummyData: DateAndTime = {
    day: "17",
    month: "August",
    week: "Tuesday",
    slots: [
      { avaliableForBooking: true, slot: "09:00 AM", slotId: "1" },
      { avaliableForBooking: true, slot: "09:30 AM", slotId: "2" },
      { avaliableForBooking: false, slot: "10:00 AM", slotId: "3" }, // Assuming 10:00 AM slot is not available
      { avaliableForBooking: true, slot: "10:30 AM", slotId: "4" },
      { avaliableForBooking: true, slot: "11:00 AM", slotId: "5" },
      { avaliableForBooking: true, slot: "11:30 AM", slotId: "6" },
      { avaliableForBooking: true, slot: "12:00 PM", slotId: "7" },
      { avaliableForBooking: true, slot: "12:30 PM", slotId: "8" },
      { avaliableForBooking: true, slot: "01:00 PM", slotId: "9" },
      { avaliableForBooking: true, slot: "01:30 PM", slotId: "10" },
      { avaliableForBooking: true, slot: "02:00 PM", slotId: "11" },
      { avaliableForBooking: false, slot: "02:30 PM", slotId: "12" }, // Assuming 2:30 PM slot is not available
      { avaliableForBooking: true, slot: "03:00 PM", slotId: "13" },
      { avaliableForBooking: true, slot: "03:30 PM", slotId: "14" },
      { avaliableForBooking: true, slot: "04:00 PM", slotId: "15" },
      { avaliableForBooking: true, slot: "04:30 PM", slotId: "16" },
      { avaliableForBooking: true, slot: "05:00 PM", slotId: "17" },
      { avaliableForBooking: true, slot: "05:30 PM", slotId: "18" },
      { avaliableForBooking: true, slot: "06:00 PM", slotId: "19" },
      { avaliableForBooking: false, slot: "06:30 PM", slotId: "20" }, // Assuming 6:30 PM slot is not available
      { avaliableForBooking: true, slot: "07:00 PM", slotId: "21" },
      { avaliableForBooking: true, slot: "07:30 PM", slotId: "22" },
      { avaliableForBooking: true, slot: "08:00 PM", slotId: "23" },
      { avaliableForBooking: true, slot: "08:30 PM", slotId: "24" }
    ]
  }
  
  export default dummyData;
  