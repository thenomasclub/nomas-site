import homepageMetadata from "./page.metadata";
import Static from "@/src/components/sections/static/Static";

export const metadata = homepageMetadata

export default function Home() {
  
  return (
    <>
      <div className="homepage">
        {/* STATIC PAGE */}
        <Static />
      </div>
    </>
  );
}
