import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { buttonStyles } from './ui';
export function ProjectCard({
  project,
  badgeLabel = 'Sport',
  ctaLabel = 'Lees de keuzeuitleg',
  ctaHref,
}: {
  project: { slug: string; title: string; image: string; location: string; raised: string };
  badgeLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white px-[15px] pb-[15px] pt-[280px]">
      <Image
        src={project.image}
        alt=""
        fill
        sizes="(max-width: 679px) 100vw, (max-width: 1199px) 50vw, 400px"
        className="object-cover transition-transform duration-1000 group-hover:scale-104"
      />
      <span className="absolute top-[15px] right-[15px] rounded-[5px] bg-accent p-2.5 text-[14px] leading-[18.2px] text-white">
        <span className="text-white/80">{badgeLabel}</span> {project.raised}
      </span>
      <div className="relative flex flex-1 flex-col gap-5 rounded-xl bg-white p-[15px]">
        <div className="flex-1">
          <h3 className="text-[16px] leading-[1.3] font-semibold tracking-normal text-ink max-sm:text-[14px]">
            {project.title}
          </h3>
          <p className="mt-[5px] text-[14px] leading-[1.3] text-muted">{project.location}</p>
        </div>
        <Link
          href={ctaHref ?? `/${project.slug}/`}
          className={cn(
            buttonStyles.base,
            'w-full px-5 py-[15px] bg-brand text-brand-dark hover:bg-brand-hover',
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
