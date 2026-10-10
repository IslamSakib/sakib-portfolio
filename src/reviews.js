// Recommendations copied from Sakib's LinkedIn profile. Text is quoted, never rewritten; long ones are cut to whole sentences.
// LinkedIn recommendations have no star ratings, so none are shown.
export const allReviewsUrl = 'https://www.linkedin.com/in/sakibislamofficial/details/recommendations/';

const li = (slug) => `https://www.linkedin.com/in/${slug}/`;

export const reviews = [
  {
    name: 'Ahad Ali, CPA',
    role: 'Founder, Tabby',
    date: 'October 2026',
    url: li('ahadalicpa'),
    text: "Sakib has done a fantastic job with our Tabby 2.0 launch work along with continuous maintenance and updates on Tabby's website. He is very responsive and dedicated to any project he works on. I highly recommend him.",
  },
  {
    name: 'Md. Shahid Hossain',
    role: 'Key Account Manager at Nagad, formerly at Moneybag',
    date: 'January 2026',
    url: li('shahidhossain26'),
    text: 'Sakib Islam is an exceptional Senior WordPress Developer with deep expertise in custom development, performance optimization, and clean, scalable code. Reliable, proactive, and easy to work with, they consistently deliver high-quality results.',
  },
  {
    name: 'Shamsi Nur',
    role: 'Content Strategist and UX Copywriter at Musemind',
    date: 'January 2026',
    url: li('shamsi-nur'),
    text: "He's highly responsive, communicative, and consistently delivers work on time without compromising on quality. Sakib understands requirements quickly, executes with precision, and is proactive when it comes to solving problems or suggesting improvements.",
  },
  {
    name: 'Soummo Supriya',
    role: 'CEO, BizPartner 360',
    date: 'May 2025',
    url: li('soummosupriya'),
    text: 'His attention to detail, commitment to clean and scalable code, and deep understanding of modern frontend frameworks have consistently elevated the quality of our digital products.',
  },
  {
    name: 'Akib Jafor',
    role: 'Senior Software Engineer',
    date: 'November 2024',
    url: li('akib-jafor'),
    text: 'His ability to translate ideas into functional designs and optimize website performance sets him apart. Beyond his technical skills, Sakib is detail-oriented, creative, and an excellent communicator.',
  },
  {
    name: 'Franklin B Gomes',
    role: 'Business Development Manager',
    date: 'November 2024',
    url: li('franklin-b-gomes-b02b64202'),
    text: 'I had the pleasure of working with Sakib Islam on several projects, and I was really happy with his performance and commitment.',
  },
  {
    name: 'Azaz Youlee',
    role: 'Worked with Sakib on the same team',
    date: 'November 2024',
    url: li('azaz-youlee'),
    text: 'Highly professional, quality oriented and deadline maintaining web developer!',
  },
];

// "Ahad Ali, CPA" becomes "AA"; used for the avatar until the reviewer agrees to a photo.
export const initials = (name) =>
  name.replace(/,.*$/, '').replace(/\b(Md|Mr|Mrs|Dr)\.?\s/g, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
