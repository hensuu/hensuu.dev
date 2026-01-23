<template>
  <div>
    <div class="h-110 p-10">
      <div class="flex flex-col gap-10 items-center justify-center h-full">
        <div class="flex flex-row items-center justify-center gap-2">
          <span class="text-4xl h-full font-medium text-sienna-400 mb-10">↘</span>
          <span class="text-5xl/17 tracking-wide inline-block w-min sm:w-62 md:w-fit font-medium whitespace-nowrap bg-clip-text text-transparent bg-linear-to-r from-sienna-400 via-lavender-400 to-shamrock-400 ">Hi, <wbr>it's me, <wbr>hensuu!</span>
          <LogoSticker
            class="ml-3 -mb-2 w-18 h-18 shrink-0 from-teal-600 to-shamrock-600 stroke-[1.7] drop-shadow-md rotate-10"
          />
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center sm:gap-2">
          <div class="bg-sienna-50 border border-sienna-200 px-3 py-1 rounded-lg">
            <span class="text-sienna-800 font-medium text-md">🧑‍💻 Developer</span>
          </div>
          <span class="text-sienna-800 font-normal text-xl mb-0.5">+</span>
          <div class="bg-sienna-50 border border-sienna-200 px-3 py-1 rounded-lg">
            <span class="text-sienna-800 font-medium text-md whitespace-nowrap">🎵 Vocaloid Producer</span>
          </div>
        </div>
      </div>
    </div>
    <HorizontalLine />
    <div class="p-10 bg-white/35">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1 flex flex-col gap-4">
          <span class="text-orange-800/70 text-3xl relative ">
            → About me
          </span>
          <div class="text-yellow-950 text-justify font-medium text-base/relaxed leading-6 space-y-2">
            <p>
              A developer with 1 year of front-end experience and 2 years as an SRE. Passionate about crafting refined UI and seamless UX, I build upon the solid foundation from my CS studies at National Taiwan University.
            </p>
            <p>
              Over the past 5 years, I've been creating VOCALOID music, inspired by a deep love for its diversity and creativity.
            </p>
          </div>
        </div>
        <div class="flex-1 flex flex-col gap-4">
          <span class="text-pink-800/70 text-3xl relative ">
            → Work Experiences
          </span>
          <div class="text-yellow-950 space-y-2">
            <WorkExperience
              title="Software Engineer"
              company="MyProGuide Japan"
              duration="Apr 2025 - Now"
              :responsibilities="[
                'Developed full-stack travel and SaaS platforms (20k+ MAU) using Vue 3/Nuxt.js with TypeScript, Pinia, and hybrid CSR/SSR for frontend with lazy loading optimization, and Koa for RESTful backend microservices.',
                'Automated deployment and maintained cloud infrastructure on GCP with Kubernetes and Cloud Run via GitHub Actions, configured Cloudflare edge caching and CDN, reducing Google Places API costs by 99%.',
                'Developed AI email parsing pipeline using LLM and prompt engineering for automated customer information extraction and categorization, integrated RESTful third-party OTA service APIs (Trip.com) for booking management.'
              ]"
            />
            <WorkExperience
              title="Front-end Software Engineer I"
              company="Garmin Ltd."
              duration="Sep 2024 - Mar 2025"
              :responsibilities="[
                'Led a smart factory dashboard project as project leader, leveraging Angular and TypeScript to build an MQTT-based SPA with data visualization and live video streaming to control and monitor AGVs and assembly lines.',
                'Established a design system using Storybook and Tailwind CSS with standardized UI/UX patterns, refactored legacy UI components into reusable templates for manufacturing systems and analytical dashboards.'
              ]"
            />
            <WorkExperience
              title="Network and System Administrator / Site Reliability Engineer"
              company="NTU Digital Learning Center"
              duration="Jul 2023 - May 2025"
              :responsibilities="[
                'Orchestrated zero-downtime migration of NTU COOL PostgreSQL database from outdated Ubuntu 16.04 using streaming replication and high availability setup, ensuring 99.9% uptime for over 40,000 daily users.',
                'Deployed Prometheus and Grafana for infrastructure monitoring and observability, implemented automated Slack alerting, and performed network troubleshooting to resolve packet loss on Proxmox VE hypervisor.',
                'Administered self-hosted GitLab DevOps platform using Docker Compose and Nginx reverse proxy, configured GitLab Runners for automated CI/CD pipelines deploying to Kubernetes clusters.'
              ]"
            />
          </div>
        </div>
      </div>
    </div>
    <HorizontalLine />
  </div>
</template>

<script setup lang="ts">
useHead(
  {
    title: 'hensuu.dev',
  },
)
</script>
