import { Enums, Scoreboard, Summary, Types } from '@mikelaferriere/espn-api'
import { BaseScoreboard, Team } from '../../types/sports'

const leagueStringToEnum = (league: string): Enums.League => {
  switch (league.toLocaleLowerCase()) {
    case 'mlb':
      return Enums.League.MLB
    case 'nfl':
      return Enums.League.NFL
    case 'nhl':
      return Enums.League.NHL
    default:
      throw new Error(`${league} is not a valid league`)
  }
}

const createTeam = (
  competitors: Types.Competitor[],
  homeOrAway: 'home' | 'away'
): Team => {
  const competitor = competitors.find(({ homeAway }) => homeAway === homeOrAway)

  if (!competitor) throw new Error(`${homeOrAway} team not found`)

  return {
    id: competitor.id,
    link: competitor.team.links[0].href,
    name: competitor.team.name,
    abbr: competitor.team.abbreviation,
    logo: competitor.team.logo,
    score: parseInt(competitor.score),
    record: '',
  }
}

const mapToScoreboard = (scoreboard: Types.BaseScoreboard) => {
  return scoreboard.events.map((event) => {
    const competitors = event.competitions[0].competitors

    return {
      id: event.id,
      link: '',
      homeTeam: createTeam(competitors, 'home'),
      awayTeam: createTeam(competitors, 'away'),
      status: event.status.type.description,
      startDate: event.date,
      details: event.status.type.shortDetail,
      currentPlay: undefined,
      isPlayoffMatchup: event.competitions[0].conferenceCompetition,
    }
  })
}

const enrichWithMetadata = (league: Enums.League) =>
  async (scoreboards: BaseScoreboard[]): Promise<BaseScoreboard[]> => {

    const createMetadata = (league: Enums.League, summary: Types.BaseGameDetails) => {
        if (league === Enums.League.NFL) {
          const current = summary.drives?.current
          if (!current) return undefined

          const mostRecentPlay = current.plays.reverse()[0]

          return {
            yardLine: mostRecentPlay.end?.yardLine,
            down: mostRecentPlay.end?.down,
            distance: mostRecentPlay.end?.distance,
            downDistanceText: mostRecentPlay.end?.downDistanceText,
            shortDownDistanceText: mostRecentPlay.end?.shortDownDistanceText,
            possessionText: mostRecentPlay.end?.possessionText,
            isRedZone: mostRecentPlay.end?.yardsToEndzone && mostRecentPlay.end?.yardsToEndzone <= 20,
            homeTimeouts: 0,
            awayTimeouts: 0,
            possessionArrow: current.team.abbreviation,
          }
        }

        if (league === Enums.League.MLB) {
            const mostRecentPlay = summary.plays.reverse()[0]

            return {
                balls: mostRecentPlay.resultCount?.balls,
                strikes: mostRecentPlay.resultCount?.strikes,
                outs: mostRecentPlay.outs,
                manOnFirst: false,
                manOnSecond: false,
                manOnThird: false,
                topInning: false,
                inningHalf: "top",
                currentInning: mostRecentPlay.period.number,
                currentInningOrdinal: `${mostRecentPlay.period.type} ${mostRecentPlay.period.displayName}`
            }
        }
    }

    return Promise.all(
      scoreboards.map(async (scoreboard) => {
        if (!scoreboard.id) return Promise.resolve(scoreboard)

        try {
              const summary = await Summary.fetch(league, scoreboard.id)
              return {
                  ...scoreboard,
                  metadata: createMetadata(league, summary),
              }
          } catch (error) {
              console.error(error)
              return scoreboard
          }
      })
    )
  }

export const fetch = (league: string): Promise<BaseScoreboard[]> =>
  Scoreboard.fetch(leagueStringToEnum(league))
    .then(mapToScoreboard)
    .then(enrichWithMetadata(leagueStringToEnum(league)))
    .catch((error) => {
      console.error(error)
      return []
    })
