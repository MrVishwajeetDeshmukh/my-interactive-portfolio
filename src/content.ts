// Everything the site says lives here, so updating the portfolio
// means editing this file and nothing else.

export const profile = {
  name: "Vishwajeet Deshmukh",
  role: "Backend engineer",
  location: "Navi Mumbai",
  email: "deshmukhv.vishwajeet@gmail.com",
  phone: "+91 87796 19155",
  phoneHref: "tel:+918779619155",
  resume:
    "https://drive.google.com/file/d/1lRN9SAGO0Seo_bc8VmoIw9FEYLxlcg_t/view?usp=sharing",
  linkedin: "https://linkedin.com/in/vishwajeetd",
  github: "https://github.com/MrVishwajeetDeshmukh",
};

export const facts = [
  { value: "3 years", label: "writing Go in production" },
  { value: "Millions", label: "of messages a day" },
  { value: "−30%", label: "API response time" },
  { value: "GCP + Azure", label: "where it runs" },
];

export type Job = {
  company: string;
  role: string;
  place: string;
  from: string;
  to: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    company: "Jio Platforms",
    role: "Software Development Engineer, back end",
    place: "Navi Mumbai",
    from: "Oct 2023",
    to: "now",
    points: [
      "Design and scale the Go microservices behind JioCX, Jio's RCS messaging platform. They handle millions of messages a day on Docker and Kubernetes (GKE).",
      "Cut API response times by 30%: tuned the slow MySQL queries, cached in Redis, and moved the highest-volume workloads to ScyllaDB.",
      "Put Apache Kafka between services, so a traffic spike queues up instead of slowing the platform down.",
      "Built an LLM-based pipeline that checks RCS templates for spam and policy problems, which cut the manual review effort.",
      "Built WebSocket dashboards that report delivery status with sub-second latency, and added fallback and retry paths to the message pipelines.",
      "Run deployments across GCP and Azure, and automated the setup work that used to slow down onboarding for enterprise clients.",
      "Integrated Razorpay for payments, with webhook-based reconciliation and automatic retries when a payment fails.",
      "Designed the prepaid wallet: balances are deducted in real time, customers get low-balance alerts, and heavy senders are throttled by usage.",
    ],
  },
];

export type Project = {
  name: string;
  context: string;
  body: string;
  result: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "RCS template checker",
    context: "Jio Platforms",
    body: "RCS templates have to be checked for spam and policy problems, and that was manual work. I built a pipeline that runs the checks with an LLM.",
    result: "Cut manual review effort",
    stack: ["LLM", "RCS"],
  },
  {
    name: "Prepaid wallet and payments",
    context: "Jio Platforms",
    body: "Billing for high-volume traffic. The wallet deducts balance in real time, sends low-balance alerts, and throttles sending based on usage. Payments go through Razorpay, reconciled by webhook, with automatic retries for failed payments.",
    result: "Real-time balance deduction",
    stack: ["Razorpay", "Webhooks"],
  },
  {
    name: "Live delivery dashboards",
    context: "Jio Platforms",
    body: "Dashboards that stream message delivery reports over WebSocket. The message pipelines behind them fall back and retry when something fails.",
    result: "Sub-second latency",
    stack: ["WebSocket"],
  },
  {
    name: "Real-time face mask detector",
    context: "College project",
    body: "A CNN trained in TensorFlow on more than 10,000 labelled images, wired into a live OpenCV video feed to check people at the entrance of public places.",
    result: "95% accuracy, under 100 ms per frame",
    stack: ["Python", "TensorFlow", "OpenCV"],
  },
];

export const stack = [
  { level: "Languages", items: ["Go", "Python", "HTML", "CSS"] },
  { level: "Frameworks", items: ["Fiber", "Gin", "net/http", "Gorilla Mux", "WebSocket", "Node.js"] },
  { level: "Databases", items: ["PostgreSQL", "MySQL", "ScyllaDB", "Redis"] },
  { level: "Messaging", items: ["Apache Kafka"] },
  { level: "Cloud", items: ["GCP", "Google Cloud Storage", "Azure"] },
  { level: "Ops", items: ["Docker", "Kubernetes (GKE)", "Git", "CI/CD", "Linux"] },
];

export const education = [
  {
    what: "B.E., Electronics & Telecommunication",
    where: "SCOE Pune, Savitribai Phule Pune University",
    grade: "CGPA 8.22 / 10",
    year: "May 2023",
  },
  {
    what: "Diploma, Electronics & Telecommunication",
    where: "SVIP Latur, MSBTE",
    grade: "78.24%",
    year: "Nov 2020",
  },
];

export const certifications = [
  { name: "Google Cloud Essentials", by: "Qwiklabs, 2023" },
  { name: "Programming with Go specialization", by: "Coursera, 2023" },
  { name: "Linux Command Line Basics", by: "Coursera, 2022" },
];
