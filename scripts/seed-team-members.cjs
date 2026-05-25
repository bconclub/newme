/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs')
const path = require('path')
const { createClient } = require('@sanity/client')

const root = path.resolve(__dirname, '..')

function loadEnv(file) {
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const index = trimmed.indexOf('=')
    if (index === -1) continue
    const key = trimmed.slice(0, index).trim()
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, '')
    process.env[key] ??= value
  }
}

loadEnv(path.join(root, '.env.local'))

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.SANITY_API_VERSION || '2024-10-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const members = [
  {
    name: 'Dr. Palaniappan Manickam',
    slug: 'dr-palaniappan-manickam',
    role: 'Founder',
    photo: 'dr-palaniappan.jpg',
    bio: 'A gastroenterologist and metabolic health specialist, Dr. Pal founded NewME to deliver structured, clinical-grade care at scale.',
    linkedin: 'https://www.linkedin.com/in/drpal/',
  },
  {
    name: 'Priya Pal',
    slug: 'priya-pal',
    role: 'Co Founder',
    photo: 'priya-pal.jpg',
    bio: 'Priya co-founded NewME with a mission to make precision clinical care accessible and sustainable for everyone.',
  },
  {
    name: 'Shakeela Ranjithkumar',
    slug: 'shakeela-ranjithkumar',
    role: 'CEO',
    photo: 'shakeela.jpg',
    bio: 'Shakeela oversees operations and system execution across NewME. She brings a deep understanding of both client care and operational efficiency to ensure consistent, measurable outcomes.',
    linkedin: 'https://www.linkedin.com/in/shakeela-r-19aa0b290/',
  },
  {
    name: 'Karthik Ravi',
    slug: 'karthik-ravi',
    role: 'Head of Business Operations',
    photo: 'karthik-ravi.jpg',
    bio: 'Karthik oversees all business and operational functions, ensuring the NewME system runs with precision and efficiency.',
    linkedin: 'https://www.linkedin.com/in/karthikrav%C3%AE/',
  },
  {
    name: 'Gayatri Rajamani',
    slug: 'gayatri-rajamani',
    role: 'Head of Clinical Nutrition',
    photo: 'gayatri-rajamani.jpg',
    bio: "Gayatri leads the clinical nutrition team, designing evidence-based protocols tailored to each participant's metabolic markers.",
    linkedin: 'https://www.linkedin.com/in/gayatrirajamani/?skipRedirect=true',
  },
  {
    name: 'Rashmi Sinha',
    slug: 'rashmi-sinha',
    role: 'Clinical Nutrition Lead',
    photo: 'reshmi-sinha.jpg',
    bio: 'Rashmi drives the daily nutrition coaching process, translating clinical protocols into personalised, actionable guidance.',
  },
  {
    name: 'Devi Palaniappan',
    slug: 'devi-palaniappan',
    role: 'Head of Coaching',
    photo: 'devi-palaniappan.jpg',
    bio: 'Devi heads the coaching division, ensuring every participant receives structured, compassionate support throughout their pathway.',
  },
  {
    name: 'Namratha Nataraj',
    slug: 'namratha-nataraj',
    role: 'Head of Research & QA',
    photo: 'namratha-nataraj.jpg',
    bio: 'Namratha oversees research integrity and quality assurance, ensuring all NewME protocols are evidence-based and outcomes-driven.',
    linkedin: 'https://www.linkedin.com/in/drnamrathan/',
  },
  {
    name: 'Ashwini Saras',
    slug: 'ashwini-saras',
    role: 'Operations Lead',
    photo: 'ashwini-saras.jpg',
    bio: 'Ashwini leads day-to-day operational delivery, ensuring seamless coordination between clinical, coaching, and administrative teams.',
  },
  {
    name: 'Dr. Indira. MD, DNB',
    slug: 'dr-indira-md-dnb',
    role: 'General Medicine',
    photo: 'dr-indira.jpg',
    bio: 'Dr. Indira provides general medicine oversight across all clinical pathways, reviewing participant health data and co-ordinating medical care.',
  },
]

function bioBlock(text) {
  return [
    {
      _type: 'block',
      _key: 'bio',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: 'bioText', text, marks: [] }],
    },
  ]
}

async function uploadPhoto(filename) {
  const filePath = path.join(root, 'public', 'images', 'team', filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing team image: ${filePath}`)
  }
  return client.assets.upload('image', fs.createReadStream(filePath), { filename })
}

async function main() {
  if (process.argv.includes('--verify')) {
    const seeded = await client.fetch(
      '*[_type == "teamMember"] | order(order asc) {name, role, "hasPhoto": defined(photo.asset), linkedin}',
    )
    console.log(JSON.stringify(seeded, null, 2))
    return
  }

  for (const [index, member] of members.entries()) {
    const asset = await uploadPhoto(member.photo)
    const doc = {
      _id: `teamMember.${member.slug}`,
      _type: 'teamMember',
      name: member.name,
      slug: { _type: 'slug', current: member.slug },
      role: member.role,
      linkedin: member.linkedin,
      bio: bioBlock(member.bio),
      order: index + 1,
      photo: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    }

    await client.createOrReplace(doc)
    console.log(`Seeded ${member.name}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
