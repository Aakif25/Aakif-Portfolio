import { COPY } from "@/lib/data";
export default function SectionHeading({
  id,
}: {
  id: keyof typeof COPY.headings;
}) {
  const words = COPY.headings[id];
  return (
    <header className="section-header rv">
      <p className="section-tag mono">
        <span>{String(COPY.sections.indexOf(id) + 1).padStart(2, "0")}</span>
        <span>{COPY.sectionLabels[id]}</span>
      </p>
      <h2 className="section-heading">
        {words[0]}
        <br />
        <em>{words[1]}</em>
      </h2>
    </header>
  );
}
