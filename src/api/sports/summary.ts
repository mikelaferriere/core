import { Enums, Summary, Types } from '@mikelaferriere/espn-api'
import { ScoringPlay, Team } from "../../types/sports";

const createTeam = (team: Types.Team): Team => {
    return {
        abbr: team.abbreviation,
        id: team.id,
        link: team.links[0].href,
        logo: team.logo,
        name: team.name,
        record: "",
    }
}

export const fetch = async (
    league: Enums.League,
    id: string
): Promise<ScoringPlay[]> => {
    const summary = await Summary.fetch(league, id)
    const homeTeam = createTeam(summary.boxscore.teams[0].team)
    const awayTeam = createTeam(summary.boxscore.teams[1].team)    

    const scoringPlays = league === Enums.League.NFL ? (
        summary.drives?.previous
          .filter(({isScore}) => isScore)
          .map(({plays}) => plays)
          .flatMap((plays) => plays.filter(({scoringPlay}) => scoringPlay)) ?? []
    ) : summary.plays.filter(({scoringPlay}) => scoringPlay)

    return scoringPlays
      .map((play): ScoringPlay => {
        return {
            id: play.id,
            awayTeam,
            homeTeam,
            scoringTeam: homeTeam.id === play.team?.id ? "home" : "away",
            result: {
                description: play.text,
                team: play.team,
                homeScore: play.homeScore,
                awayScore: play.awayScore,
            },
            about: {
                id,
                type: play.type.text,
                period: play.period.displayName,
                time: play.clock.displayValue,
                startDate: play.wallclock
            }
        }
    })
}
