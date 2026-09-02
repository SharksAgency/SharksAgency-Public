import { Clients } from "@/components/sections/Clients"
import { Contact } from "@/components/sections/Contact"
import { HomeIntro } from "@/components/sections/HomeIntro"
import { KineticType } from "@/components/sections/KineticType"
import { Manifesto } from "@/components/sections/Manifesto"
import { Philosophy } from "@/components/sections/Philosophy"
import { Process } from "@/components/sections/Process"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { Services } from "@/components/sections/Services"
import { Studio } from "@/components/sections/Studio"

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <Manifesto />
      <Services />
      <KineticType />
      <SelectedWork />
      <Studio />
      <Process />
      <Philosophy />
      <Clients />
      <Contact />
    </>
  )
}
