import { NextResponse } from 'next/server'
import { teamQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'

type SanityTeamMember = {
  _id: string
  name?: string
  slug?: string
  role?: string
  linkedin?: string
  bioText?: string
  photo?: { asset?: { _ref?: string } } & Record<string, unknown>
}

export const revalidate = 60

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return NextResponse.json([])
  }

  try {
    const { client } = await import('@/lib/sanity/client')
    const members = await client.fetch<SanityTeamMember[]>(teamQuery)

    return NextResponse.json(
      (Array.isArray(members) ? members : [])
        .filter((member) => member.name && member.role)
        .map((member) => ({
          name: member.name,
          role: member.role,
          photo: member.photo?.asset?._ref
            ? urlFor(member.photo).width(900).height(1117).fit('crop').auto('format').url()
            : '',
          bio: member.bioText ?? '',
          linkedin: member.linkedin,
        }))
        .filter((member) => member.photo && member.bio),
    )
  } catch {
    return NextResponse.json([])
  }
}
