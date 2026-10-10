import type { Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    role: "Advisory System Analyst",
    company: "IBM",
    companyUrl: "https://www.ibm.com",
    location: "Bengaluru, Karnataka, India",
    start: "2022-02",
    end: undefined,
    bullets: [
      "Build and maintain applications with ASP.NET Core, Blazor, and C#, including unit testing and ongoing maintenance.",
      "Work with scheduling and operations tooling such as Autosys to keep production workloads reliable.",
      "Recognized with the IBM Client and Partner Success Award in 2023.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "MariApps Marine Solutions",
    start: "2020-09",
    end: "2022-02",
    bullets: [
      "Built and maintained marine industry and vessel applications through development and unit testing.",
      "Maintained long-lived production software where reliability and correctness matter.",
    ],
  },
  {
    role: "Software Developer",
    company: "SGE Group International",
    location: "Dubai, United Arab Emirates",
    start: "2018-05",
    end: "2020-02",
    bullets: [
      "Developed and maintained the Aladdin CMMS/CAFM application with ASP.NET MVC, C#, and TelerikUI (KendoUI).",
      "Built and tested REST APIs consumed by web and mobile applications, using Azure WebJobs and Blob storage.",
      "Handled deployments to Azure Cloud.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Emirates India International Exchange",
    location: "Dubai, United Arab Emirates",
    start: "2017-01",
    end: "2018-03",
    bullets: [
      "Developed ASP.NET and MVC web applications for exchange workflows.",
      "Integrated APIs and web services using SOAP, REST, and WCF.",
    ],
  },
  {
    role: "Software Engineer",
    company: "PIT Solutions",
    start: "2014-05",
    end: "2017-01",
    bullets: [
      "Developed, maintained, and unit-tested ASP.NET web applications per client requirements.",
      "Wrote project documentation to support handover and maintenance.",
    ],
  },
];
