import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Masthead } from "@/components/sections/Masthead";
import { Writing } from "@/components/sections/Writing";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <About />
      <Writing />
      <Contact />
    </>
  );
}
