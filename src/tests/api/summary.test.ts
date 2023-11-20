import { describe, expect, test } from '@jest/globals'

import axios from 'axios'

import * as mlbJson from '../data/mlbSummary.json'
import * as nflJson from '../data/nflSummary.json'
import * as nhlJson from '../data/nhlSummary.json'

import * as Test from '../../api/sports'

import { Enums } from '@mikelaferriere/espn-api'

jest.mock('axios')

beforeEach(() => {
  jest.resetAllMocks()
})

describe('ScoringPlays', () => {
  test('mlb scoring plays happy path', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: mlbJson })

    const actual = await Test.Summary.fetch(Enums.League.MLB, '123')

    expect(actual).toStrictEqual([
      {
        about: {
          id: '123',
          period: 7,
          startDate: '2023-11-02T01:57:51Z',
          time: '2023-11-02T01:57:51Z',
          type: 'Play Result',
        },
        homeTeam: {
          abbr: 'ARI',
          id: '29',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png',
          name: 'Diamondbacks',
          record: '',
        },
        awayTeam: {
          abbr: 'TEX',
          id: '13',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png',
          name: 'Rangers',
          record: '',
        },
        id: '4015810971203990057',
        result: {
          awayScore: 1,
          description:
            'Garver singled to center, Seager scored, Carter to third.',
          homeScore: 0,
          team: {
            id: '13',
          },
        },
        scoringTeam: 'away',
      },
      {
        about: {
          id: '123',
          period: 9,
          startDate: '2023-11-02T02:47:29Z',
          time: '2023-11-02T02:47:29Z',
          type: 'Play Result',
        },
        homeTeam: {
          abbr: 'ARI',
          id: '29',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png',
          name: 'Diamondbacks',
          record: '',
        },
        awayTeam: {
          abbr: 'TEX',
          id: '13',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png',
          name: 'Rangers',
          record: '',
        },
        id: '4015810971603990057',
        result: {
          awayScore: 3,
          description:
            'Heim singled to center, Jung scored. Lowe scored on fielding error by center fielder Thomas, Heim to third.',
          homeScore: 0,
          team: {
            id: '13',
          },
        },
        scoringTeam: 'away',
      },
      {
        about: {
          id: '123',
          period: 9,
          startDate: '2023-11-02T02:50:42Z',
          time: '2023-11-02T02:50:42Z',
          type: 'Play Result',
        },
        homeTeam: {
          abbr: 'ARI',
          id: '29',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png',
          name: 'Diamondbacks',
          record: '',
        },
        awayTeam: {
          abbr: 'TEX',
          id: '13',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png',
          name: 'Rangers',
          record: '',
        },
        id: '4015810971606990057',
        result: {
          awayScore: 5,
          description: 'Semien homered to left center (406 feet), Heim scored.',
          homeScore: 0,
          team: {
            id: '13',
          },
        },
        scoringTeam: 'away',
      },
    ])
  })

  test('nfl scoring plays happy path', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: nflJson })

    const actual = await Test.Summary.fetch(Enums.League.NFL, '123')

    expect(actual).toStrictEqual([
      {
        about: {
          id: '123',
          period: 1,
          startDate: '2023-11-20T01:29:29Z',
          time: '10:28',
          type: 'Field Goal Good',
        },
        homeTeam: {
          abbr: 'DEN',
          id: '7',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
          name: 'Broncos',
          record: '',
        },
        awayTeam: {
          abbr: 'MIN',
          id: '16',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
          name: 'Vikings',
          record: '',
        },
        id: '401547550282',
        result: {
          awayScore: 0,
          description:
            'W.Lutz 31 yard field goal is GOOD, Center-M.Fraboni, Holder-R.Dixon.',
          homeScore: 3,
          team: undefined,
        },
        scoringTeam: 'home',
      },
      {
        about: {
          id: '123',
          period: 2,
          startDate: '2023-11-20T01:55:17Z',
          time: '14:53',
          type: 'Passing Touchdown',
        },
        homeTeam: {
          abbr: 'DEN',
          id: '7',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
          name: 'Broncos',
          record: '',
        },
        awayTeam: {
          abbr: 'MIN',
          id: '16',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
          name: 'Vikings',
          record: '',
        },
        id: '401547550881',
        result: {
          awayScore: 7,
          description:
            'J.Dobbs pass short right to J.Oliver for 3 yards, TOUCHDOWN [Z.Allen]. G.Joseph extra point is GOOD, Center-A.DePaola, Holder-R.Wright.',
          homeScore: 3,
          team: undefined,
        },
        scoringTeam: 'away',
      },
      {
        about: {
          id: '123',
          period: 2,
          startDate: '2023-11-20T02:08:26Z',
          time: '8:09',
          type: 'Field Goal Good',
        },
        homeTeam: {
          abbr: 'DEN',
          id: '7',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
          name: 'Broncos',
          record: '',
        },
        awayTeam: {
          abbr: 'MIN',
          id: '16',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
          name: 'Vikings',
          record: '',
        },
        id: '4015475501224',
        result: {
          awayScore: 10,
          description:
            'G.Joseph 34 yard field goal is GOOD, Center-A.DePaola, Holder-R.Wright.',
          homeScore: 3,
          team: undefined,
        },
        scoringTeam: 'away',
      },
      {
        about: {
          id: '123',
          period: 2,
          startDate: '2023-11-20T02:16:10Z',
          time: '4:08',
          type: 'Field Goal Good',
        },
        homeTeam: {
          abbr: 'DEN',
          id: '7',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png',
          name: 'Broncos',
          record: '',
        },
        awayTeam: {
          abbr: 'MIN',
          id: '16',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png',
          name: 'Vikings',
          record: '',
        },
        id: '4015475501411',
        result: {
          awayScore: 10,
          description:
            'W.Lutz 31 yard field goal is GOOD, Center-M.Fraboni, Holder-R.Dixon.',
          homeScore: 6,
          team: undefined,
        },
        scoringTeam: 'home',
      },
    ])
  })

  test('nhl scoring plays happy path', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: nhlJson })

    const actual = await Test.Summary.fetch(Enums.League.NHL, '123')

    expect(actual).toStrictEqual([
      {
        about: {
          id: '123',
          period: 1,
          startDate: '2023-11-20T04:26:46Z',
          time: '9:25',
          type: 'Goal',
        },
        homeTeam: {
          abbr: 'ANA',
          id: '25',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/ana.png',
          name: 'Ducks',
          record: '',
        },
        awayTeam: {
          abbr: 'STL',
          id: '19',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/stl.png',
          name: 'Blues',
          record: '',
        },
        id: '401559500000002630',
        result: {
          awayScore: 1,
          description:
            'Jake Neighbours Goal (4) Slap Shot, assists: Oskar Sundqvist (6)',
          homeScore: 0,
          team: {
            id: '19',
          },
        },
        scoringTeam: 'away',
      },
      {
        about: {
          id: '123',
          period: 1,
          startDate: '2023-11-20T04:43:37Z',
          time: '16:34',
          type: 'Goal',
        },
        homeTeam: {
          abbr: 'ANA',
          id: '25',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/ana.png',
          name: 'Ducks',
          record: '',
        },
        awayTeam: {
          abbr: 'STL',
          id: '19',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/stl.png',
          name: 'Blues',
          record: '',
        },
        id: '401559500000004050',
        result: {
          awayScore: 2,
          description:
            'Pavel Buchnevich Goal (6) Snap Shot, assists: Jordan Kyrou (6), Scott Perunovich (1)',
          homeScore: 0,
          team: {
            id: '19',
          },
        },
        scoringTeam: 'away',
      },
      {
        about: {
          id: '123',
          period: 2,
          startDate: '2023-11-20T05:15:54Z',
          time: '5:39',
          type: 'Goal',
        },
        homeTeam: {
          abbr: 'ANA',
          id: '25',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/ana.png',
          name: 'Ducks',
          record: '',
        },
        awayTeam: {
          abbr: 'STL',
          id: '19',
          link: undefined,
          logo: 'https://a.espncdn.com/i/teamlogos/nhl/500/stl.png',
          name: 'Blues',
          record: '',
        },
        id: '401559500000006150',
        result: {
          awayScore: 3,
          description:
            'Alexey Toropchenko Goal (3) Snap Shot, assists: Justin Faulk (9), Kevin Hayes (5)',
          homeScore: 0,
          team: {
            id: '19',
          },
        },
        scoringTeam: 'away',
      },
    ])
  })
})
