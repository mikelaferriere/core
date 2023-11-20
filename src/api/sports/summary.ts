import { Enums, Summary, Types } from '@mikelaferriere/espn-api'
import { ScoringPlay, Team } from '../../types/sports'

const createTeam = (team: Types.Team): Team => {
  return {
    abbr: team.abbreviation,
    id: team.id,
    link: team.links && team.links[0].href,
    logo: team.logo,
    name: team.name,
    record: '',
  }
}

export const fetch = (
  league: Enums.League,
  id: string
): Promise<ScoringPlay[]> =>
  Summary.fetch(league, id)
    .then((summary) => {
      const homeTeam = createTeam(summary.boxscore.teams[1].team)
      const awayTeam = createTeam(summary.boxscore.teams[0].team)

      const scoringPlays =
        league === Enums.League.NFL
          ? summary.drives?.previous
              .filter(({ isScore }) => isScore)
              .map(({ plays }) => plays)
              .flatMap((plays) =>
                plays.filter(({ scoringPlay }) => scoringPlay)
              ) ?? []
          : league === Enums.League.MLB
          ? summary.plays.filter(
              ({ type, scoringPlay }) =>
                scoringPlay && type.text === 'Play Result'
            )
          : summary.plays.filter(({ scoringPlay }) => scoringPlay)

      return scoringPlays.map((play): ScoringPlay => {
        return {
          id: play.id,
          awayTeam,
          homeTeam,
          scoringTeam: play.team?.id
            ? homeTeam.id === play.team?.id
              ? 'home'
              : 'away'
            : play.end?.team.id === homeTeam.id
            ? 'home'
            : 'away',
          result: {
            description: play.text,
            team: play.team,
            homeScore: play.homeScore,
            awayScore: play.awayScore,
          },
          about: {
            id,
            type: play.type.text,
            period: play.period.number,
            time: play.clock ? play.clock.displayValue : play.wallclock,
            startDate: play.wallclock,
          },
        }
      })
    })
    .catch((error) => {
      console.error(error)
      return []
    })
