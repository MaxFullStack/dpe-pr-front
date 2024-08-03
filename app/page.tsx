import React from "react"
import {
  evaluationCriteria,
  nonFunctionalRequirements,
  nonFunctionalRequirementsTitle,
  projectObjective,
  projectTitle,
  queryDetails,
  queryDetailsTitle,
  queryOptions,
} from "@/constants/project-info"

import FooterSection from "@/components/layout/footer-section"
import { SiteHeader } from "@/components/layout/site-header"

const IndexPage = () => {
  return (
    <>
      <SiteHeader />
      <main id="solutions" className="p-8 md:px-12 md:py-10">
        <h1 className="mb-8 text-center text-3xl font-bold">{projectTitle}</h1>
        <p className="mb-2">{projectObjective}</p>
        <ul className="mb-8 list-inside list-disc">
          {queryOptions.map((option: string, index: number) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
        <h2 className="mb-2 text-2xl font-bold">{queryDetailsTitle}</h2>
        <ul className="mb-8 list-inside list-disc">
          {queryDetails.map((detail: string, index: number) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <h2 className="mb-4 text-2xl font-bold">
          {nonFunctionalRequirementsTitle}
        </h2>
        <ul className="mb-8 list-inside list-disc">
          {nonFunctionalRequirements.map((req: string, index: number) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <h2 className="mb-4 text-2xl font-bold">Critérios de Avaliação</h2>
        <ul className="mb-8 list-inside list-disc">
          {evaluationCriteria.map((criteria: string, index: number) => (
            <li key={index}>{criteria}</li>
          ))}
        </ul>
      </main>
      <FooterSection />
    </>
  )
}

export default IndexPage
