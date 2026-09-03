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
import {
  getActivePartners,
  getScenarios,
  getServices,
  getSiteContent,
} from "@/lib/content/queries"

export default async function HomePage() {
  const [content, services, scenarios, partners] = await Promise.all([
    getSiteContent(),
    getServices(),
    getScenarios(),
    getActivePartners(),
  ])

  return (
    <>
      <HomeIntro content={content.hero} />
      <Manifesto content={content.manifesto} />
      <Services services={services} content={content.editorial.services} />
      <KineticType content={content.editorial.kinetic} />
      <SelectedWork
        scenarios={scenarios}
        content={content.editorial.scenarios}
      />
      <Studio content={content.studio} />
      <Process content={content.editorial.process} />
      <Philosophy content={content.editorial.philosophy} />
      <Clients partners={partners} content={content.editorial.capabilities} />
      <Contact content={content} />
    </>
  )
}
