import MediaImage from "@/components/MediaImage";
import type { ResolvedSiteData, ThemeId } from "@/lib/types";

export default function TeamPage({
  data,
  theme,
}: {
  data: ResolvedSiteData;
  theme: ThemeId;
}) {
  const team = data.team;
  const departments = team.departments ?? [];

  return (
    <div className="bg-white">
      <section className="px-4 pt-12 text-center md:px-8 md:pt-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff9a14]">
            {team.pretitle}
          </p>
          <h1 className="mt-3 text-[2.25rem] font-bold tracking-[-0.02em] text-[#141414] md:text-[2.75rem]">
            {team.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#141414]/55 md:text-base">
            {team.desc}
          </p>
          <span className="mx-auto mt-5 block h-[3px] w-10 bg-[#ff9a14]" />
        </div>
      </section>

      {departments.length > 0 && (
        <section className="px-4 py-10 md:px-8 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {departments.map((dept) => (
              <div key={dept.name} className="rounded-2xl bg-[#faf9f7] p-6 text-center">
                <h2 className="text-lg font-bold text-[#141414]">{dept.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#141414]/55">
                  {dept.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 pb-14 pt-4 md:px-8 md:pb-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.teamItems.map((person) => (
            <article key={person.name} className="text-center">
              <div className="relative mx-auto aspect-square max-w-[260px] overflow-hidden rounded-xl bg-[#f3f1ed]">
                <MediaImage
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                  themeId={theme}
                />
              </div>
              <h2 className="mt-4 text-lg font-bold text-[#141414]">
                {person.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#ff9a14]">
                {person.role}
              </p>
              {person.bio && (
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#141414]/50">
                  {person.bio}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
