import sermon_one_img from "../../images/event1.webp";
import sermon_two_img from "../../images/event2.webp";
import sermon_three_img from "../../images/event3.webp";
import event_four_img from "../../images/event4.webp";
import event_five_img from "../../images/event5.webp";
import event_six_img from "../../images/event6.webp";
import event_seven_img from "../../images/event7.webp";
import event_eight_img from "../../images/event8.webp";
import event_nine_img from "../../images/event9.webp";

const sermons = [
  {
    id: 1,
    title: "Faith That Moves Mountains",
    preacher: "Pastor John Doe",
    description: "Discover how unwavering faith can transform your life and circumstances.",
    day: "15",
    month: "JAN",
    time: "10:00 AM",
    location: "Main Sanctuary",
    image: sermon_one_img,
    datetime: "2026-01-15T10:00:00", // ISO string for sorting
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
  {
    id: 2,
    title: "The Power of Prayer",
    preacher: "Pastor Jane Smith",
    description: "Exploring the life-changing impact of consistent prayer.",
    day: "22",
    month: "JAN",
    time: "10:00 AM",
    location: "Main Sanctuary",
    image: sermon_two_img,
    datetime: "2026-01-22T10:00:00",
     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Walking in God’s Purpose",
    preacher: "Bishop Mark Lee",
    description: "Understanding God’s calling and walking faithfully in it.",
    day: "29",
    month: "JAN",
    time: "10:00 AM",
    location: "Main Sanctuary",
    image: sermon_three_img,
    datetime: "2026-01-29T10:00:00",
     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default sermons;
