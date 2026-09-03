import { FinalPlay } from "@/components/final-play";
import { Hero } from "@/components/hero";
import { MatchLogs } from "@/components/match-logs";
import { PlaybookOverview } from "@/components/playbook";
import { SelectedPlays } from "@/components/selected-plays";
import { SystemModules } from "@/components/system-modules";

/**
 * MuktafiOS one-page portfolio.
 * Sections follow the UX-Blueprint §3 anchor map.
 */
export default function Home() {
  return (
    <main>
      <h1 className="sr-only">Ahmad Fadly Muktafi - Fullstack Developer</h1>

      {/* #home - Hero Command Center */}
      <Hero />

      {/* #system - Playbook Overview */}
      <PlaybookOverview />

      {/* #work - Selected Plays */}
      <SelectedPlays />

      {/* #stack - System Modules */}
      <SystemModules />

      {/* #logs - Match Logs */}
      <MatchLogs />

      {/* #contact - Final Play */}
      <FinalPlay />
    </main>
  );
}
