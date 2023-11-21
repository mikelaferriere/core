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

/**
 * Fetches scoring plays based on provided league and ID.
 * @param league The desired league to filter by. Can be one of three options: NFL, MLB or any other custom league.
 * @param id The unique identifier of the game or match.
 * @returns A promise that resolves into an array of `ScoringPlay` objects containing information about each scoring event in the game.
 */
export const fetch = (
  league: Enums.League,
  id: string,
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

/**
 * Fetches scoring plays for a specific team in a game or match.
 * @param league The desired league to filter by. Can be one of three options: NFL, MLB or any other custom league.
 * @param eventId The unique identifier of the game or match.
 * @param teamAbbreviation The abbreviation of the team whose scoring plays you want to retrieve.
 * @returns A promise that resolves into an array of `Types.Play` objects representing the scoring events involving the specified team.
 */
export const scoringPlaysForTeam = async (
  league: Enums.League,
  eventId: string,
  teamAbbreviation: string
): Promise<Types.Play[]> =>
 Summary.fetch(league, eventId)
   .then((summary) => {
    const teamId = summary.boxscore.teams.find(({team}) => team.abbreviation === teamAbbreviation)?.team.id

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

    return {teamId, scoringPlays}
  })
  .then(({teamId, scoringPlays}) => {
    return scoringPlays.filter((play) => play.team?.id === teamId || play.end?.team?.id === teamId)
   })
  .catch((error) => {
    console.error(error)
    return []
  })