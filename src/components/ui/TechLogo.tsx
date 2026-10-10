import { SKILL_GROUPS } from "@/lib/data";
export const BRAND: Record<string, string> = {
  HTML: "/logos/html5.svg",
  CSS: "/logos/css3.svg",
  JavaScript: "/logos/javascript.svg",
  Java: "/logos/java.svg",
  Python: "/logos/python.svg",
  PHP: "/logos/php.svg",
  "Node.js": "/logos/nodejs.svg",
  "C/C++": "/logos/cplusplus.svg",
  MySQL: "/logos/mysql.svg",
  "SQL Server": "/logos/microsoftsqlserver.svg",
  SQLite: "/logos/sqlite.svg",
  Git: "/logos/git.svg",
  GitHub: "/logos/github.svg",
  Electron: "/logos/electron.svg",
  "Scikit-learn": "/logos/scikitlearn.svg",
  Pandas: "/logos/pandas.svg",
  NumPy: "/logos/numpy.svg",
  Streamlit: "/logos/streamlit.svg",
  Arduino: "/logos/arduino.svg",
  "Adobe Photoshop": "/logos/photoshop.svg",
  "Adobe Illustrator": "/logos/illustrator.svg",
  Canva: "/logos/canva.svg",
  "Microsoft Word": "/logos/microsoftword.svg",
  "Microsoft PowerPoint": "/logos/microsoftpowerpoint.svg",
  "Microsoft Excel": "/logos/microsoftexcel.svg",
};
export const CONCEPT: Record<string, string> = Object.fromEntries(
  SKILL_GROUPS.flatMap((g) => g.skills)
    .filter((s) => !BRAND[s])
    .map((s) => [s, s.slice(0, 2)]),
);
export const isBrand = (name: string) => Boolean(BRAND[name]);
export default function TechLogo({
  name,
  size = 28,
}: {
  name: string;
  size?: number;
}) {
  return BRAND[name] ? (
    <img
      src={BRAND[name]}
      width={size}
      height={size}
      alt={`${name} logo`}
      loading="lazy"
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      role="img"
      aria-label={`${name} concept icon`}
    >
      <rect x="12" y="12" width="40" height="40" rx="10" />
      <path d="M24 24 16 32 24 40M40 24 48 32 40 40M35 20 29 44" />
    </svg>
  );
}
