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

describe('ScoringPlaysForTeam', () => {
  test('mlb scoring plays happy path', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: mlbJson })

    const actual = await Test.Summary.scoringPlaysForTeam(Enums.League.MLB, '123', "TEX")
    expect(actual).toStrictEqual([
      {
        id: "4015810971203990057",
        sequenceNumber: "4",
        type: {
          id: "57",
          text: "Play Result",
          type: "play-result"
        },
        alternativeType: {
          id: "2",
          text: "single",
          abbreviation: "1B",
          alternativeText: "Single",
          type: "single"
        },
        alternativePlay: "4015810971203030002",
        text: "Garver singled to center, Seager scored, Carter to third.",
        awayScore: 1,
        homeScore: 0,
        period: {
          type: "Top",
          number: 7,
          displayValue: "7th Inning"
        },
        scoringPlay: true,
        scoreValue: 1,
        team: {
          id: "13"
        },
        participants: [
          {
            athlete: {
              id: "39910"
            },
            type: "pitcher"
          },
          {
            athlete: {
              id: "33667"
            },
            type: "batter"
          },
          {
            athlete: {
              id: "33667"
            },
            type: "onFirst"
          },
          {
            athlete: {
              id: "4917921"
            },
            type: "onThird"
          }
        ],
        wallclock: "2023-11-02T01:57:51Z",
        atBatId: "4015810971203",
        batOrder: 4,
        bats: {
          type: "RIGHT",
          abbreviation: "R",
          displayValue: "Right"
        },
        atBatPitchNumber: 2,
        pitchCoordinate: {
          x: 113,
          y: 179
        },
        hitCoordinate: {
          x: 133,
          y: 95
        },
        summaryType: "S",
        pitchCount: {
          balls: 0,
          strikes: 1
        },
        resultCount: {
          balls: 0,
          strikes: 1
        },
        trajectory: "G",
        outs: 0,
        onFirst: {
          athlete: {
            id: "33667"
          }
        },
        onThird: {
          athlete: {
            id: "4917921"
          }
        }
      },
      {
        id: "4015810971603990057",
        sequenceNumber: "3",
        type: {
          id: "57",
          text: "Play Result",
          type: "play-result"
        },
        alternativeType: {
          id: "2",
          text: "single",
          abbreviation: "1B",
          alternativeText: "Single",
          type: "single"
        },
        alternativePlay: "4015810971603020002",
        text: "Heim singled to center, Jung scored. Lowe scored on fielding error by center fielder Thomas, Heim to third.",
        awayScore: 3,
        homeScore: 0,
        period: {
          type: "Top",
          number: 9,
          displayValue: "9th Inning"
        },
        scoringPlay: true,
        scoreValue: 2,
        team: {
          id: "13"
        },
        participants: [
          {
            athlete: {
              id: "35009"
            },
            type: "pitcher"
          },
          {
            athlete: {
              id: "33842"
            },
            type: "batter"
          },
          {
            athlete: {
              id: "33842"
            },
            type: "onFirst"
          }
        ],
        wallclock: "2023-11-02T02:47:29Z",
        atBatId: "4015810971603",
        batOrder: 7,
        bats: {
          type: "LEFT",
          abbreviation: "L",
          displayValue: "Left"
        },
        atBatPitchNumber: 1,
        pitchCoordinate: {
          x: 144,
          y: 168
        },
        hitCoordinate: {
          x: 147,
          y: 90
        },
        summaryType: "S",
        pitchCount: {
          balls: 0,
          strikes: 0
        },
        resultCount: {
          balls: 0,
          strikes: 0
        },
        trajectory: "G",
        outs: 0,
        onFirst: {
          athlete: {
            id: "33842"
          }
        }
      },
      {
        id: "4015810971606990057",
        sequenceNumber: "4",
        type: {
          id: "57",
          text: "Play Result",
          type: "play-result"
        },
        alternativeType: {
          id: "28",
          text: "home run",
          abbreviation: "HR",
          alternativeText: "Home Run",
          type: "home-run"
        },
        alternativePlay: "4015810971606030028",
        text: "Semien homered to left center (406 feet), Heim scored.",
        awayScore: 5,
        homeScore: 0,
        period: {
          type: "Top",
          number: 9,
          displayValue: "9th Inning"
        },
        scoringPlay: true,
        scoreValue: 2,
        team: {
          id: "13"
        },
        participants: [
          {
            athlete: {
              id: "35009"
            },
            type: "pitcher"
          },
          {
            athlete: {
              id: "32146"
            },
            type: "batter"
          }
        ],
        wallclock: "2023-11-02T02:50:42Z",
        atBatId: "4015810971606",
        batOrder: 1,
        bats: {
          type: "RIGHT",
          abbreviation: "R",
          displayValue: "Right"
        },
        atBatPitchNumber: 2,
        pitchCoordinate: {
          x: 102,
          y: 159
        },
        hitCoordinate: {
          x: 65,
          y: 46
        },
        summaryType: "S",
        pitchCount: {
          balls: 0,
          strikes: 1
        },
        resultCount: {
          balls: 0,
          strikes: 1
        },
        trajectory: "F",
        outs: 2
      }
    ])
  })

  test('nfl scoring plays happy path', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: nflJson })
  
    const actual = await Test.Summary.scoringPlaysForTeam(Enums.League.NFL, '123', "DEN")
    expect(actual).toStrictEqual([
      {
        id: "401547550282",
        sequenceNumber: "28200",
        type: {
          id: "59",
          text: "Field Goal Good",
          abbreviation: "FG"
        },
        text: "W.Lutz 31 yard field goal is GOOD, Center-M.Fraboni, Holder-R.Dixon.",
        awayScore: 0,
        homeScore: 3,
        period: {
          number: 1
        },
        clock: {
          displayValue: "10:28"
        },
        scoringPlay: true,
        priority: false,
        modified: "2023-11-20T01:32Z",
        wallclock: "2023-11-20T01:29:29Z",
        start: {
          down: 4,
          distance: 8,
          yardLine: 87,
          yardsToEndzone: 13,
          downDistanceText: "4th & 8 at MIN 13",
          shortDownDistanceText: "4th & 8",
          possessionText: "MIN 13",
          team: {
            id: "7"
          }
        },
        end: {
          down: -1,
          distance: 10,
          yardLine: 100,
          yardsToEndzone: 65,
          team: {
            id: "7"
          }
        },
        statYardage: 31,
        scoringType: {
          name: "field-goal",
          displayName: "Field Goal",
          abbreviation: "FG"
        }
      },
      {
        id: "4015475501411",
        sequenceNumber: "141100",
        type: {
          id: "59",
          text: "Field Goal Good",
          abbreviation: "FG"
        },
        text: "W.Lutz 31 yard field goal is GOOD, Center-M.Fraboni, Holder-R.Dixon.",
        awayScore: 10,
        homeScore: 6,
        period: {
          number: 2
        },
        clock: {
          displayValue: "4:08"
        },
        scoringPlay: true,
        priority: false,
        modified: "2023-11-20T02:16Z",
        wallclock: "2023-11-20T02:16:10Z",
        start: {
          down: 4,
          distance: 2,
          yardLine: 88,
          yardsToEndzone: 12,
          downDistanceText: "4th & 2 at MIN 12",
          shortDownDistanceText: "4th & 2",
          possessionText: "MIN 12",
          team: {
            id: "7"
          }
        },
        end: {
          down: -1,
          distance: 10,
          yardLine: 100,
          yardsToEndzone: 65,
          team: {
            id: "7"
          }
        },
        statYardage: 31,
        scoringType: {
          name: "field-goal",
          displayName: "Field Goal",
          abbreviation: "FG"
        }
      }
    ])
  })

  test('nhl scoring plays happy path', async () => {
    axios.get = jest.fn().mockResolvedValue({ data: nhlJson })
  
    const actual = await Test.Summary.scoringPlaysForTeam(Enums.League.NHL, '123', "STL")
    expect(actual).toStrictEqual([
      {
        id: "401559500000002630",
        sequenceNumber: "40",
        type: {
          id: "505",
          text: "Goal",
          abbreviation: "goal"
        },
        text: "Jake Neighbours Goal (4) Slap Shot, assists: Oskar Sundqvist (6)",
        awayScore: 1,
        homeScore: 0,
        period: {
          number: 1,
          displayValue: "1st"
        },
        clock: {
          displayValue: "9:25"
        },
        scoringPlay: true,
        scoreValue: 1,
        modified: "2023-11-20T05:20Z",
        team: {
          id: "19"
        },
        participants: [
          {
            athlete: {
              id: "4697409",
              displayName: "Jake Neighbours",
              shortName: "J. Neighbours",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/4697409.png",
                alt: "Jake Neighbours"
              }
            },
            ytdGoals: 4
          },
          {
            athlete: {
              id: "3069277",
              displayName: "Oskar Sundqvist",
              shortName: "O. Sundqvist",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/3069277.png",
                alt: "Oskar Sundqvist"
              }
            },
            ytdAssists: 6
          }
        ],
        wallclock: "2023-11-20T04:26:46Z",
        shootingPlay: true,
        coordinate: {
          x: -63,
          y: 9
        },
        strength: {
          id: "701",
          text: "Even Strength",
          abbreviation: "even-strength"
        },
        shotInfo: {
          id: "901",
          text: "None",
          abbreviation: "regular"
        }
      },
      {
        id: "401559500000004050",
        sequenceNumber: "79",
        type: {
          id: "505",
          text: "Goal",
          abbreviation: "goal"
        },
        text: "Pavel Buchnevich Goal (6) Snap Shot, assists: Jordan Kyrou (6), Scott Perunovich (1)",
        awayScore: 2,
        homeScore: 0,
        period: {
          number: 1,
          displayValue: "1st"
        },
        clock: {
          displayValue: "16:34"
        },
        scoringPlay: true,
        scoreValue: 1,
        modified: "2023-11-20T05:20Z",
        team: {
          id: "19"
        },
        participants: [
          {
            athlete: {
              id: "3042081",
              displayName: "Pavel Buchnevich",
              shortName: "P. Buchnevich",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/3042081.png",
                alt: "Pavel Buchnevich"
              }
            },
            ytdGoals: 6
          },
          {
            athlete: {
              id: "4062251",
              displayName: "Jordan Kyrou",
              shortName: "J. Kyrou",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/4062251.png",
                alt: "Jordan Kyrou"
              }
            },
            ytdAssists: 6
          },
          {
            athlete: {
              id: "4320665",
              displayName: "Scott Perunovich",
              shortName: "S. Perunovich",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/4320665.png",
                alt: "Scott Perunovich"
              }
            },
            ytdAssists: 1
          }
        ],
        wallclock: "2023-11-20T04:43:37Z",
        shootingPlay: true,
        coordinate: {
          x: -90,
          y: 2
        },
        strength: {
          id: "702",
          text: "Power Play",
          abbreviation: "power-play"
        },
        shotInfo: {
          id: "901",
          text: "None",
          abbreviation: "regular"
        }
      },
      {
        id: "401559500000006150",
        sequenceNumber: "121",
        type: {
          id: "505",
          text: "Goal",
          abbreviation: "goal"
        },
        text: "Alexey Toropchenko Goal (3) Snap Shot, assists: Justin Faulk (9), Kevin Hayes (5)",
        awayScore: 3,
        homeScore: 0,
        period: {
          number: 2,
          displayValue: "2nd"
        },
        clock: {
          displayValue: "5:39"
        },
        scoringPlay: true,
        scoreValue: 1,
        modified: "2023-11-20T05:20Z",
        team: {
          id: "19"
        },
        participants: [
          {
            athlete: {
              id: "4392454",
              displayName: "Alexey Toropchenko",
              shortName: "A. Toropchenko",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/4392454.png",
                alt: "Alexey Toropchenko"
              }
            },
            ytdGoals: 3
          },
          {
            athlete: {
              id: "5746",
              displayName: "Justin Faulk",
              shortName: "J. Faulk",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/5746.png",
                alt: "Justin Faulk"
              }
            },
            ytdAssists: 9
          },
          {
            athlete: {
              id: "5767",
              displayName: "Kevin Hayes",
              shortName: "K. Hayes",
              headshot: {
                href: "https://a.espncdn.com/i/headshots/nhl/players/full/5767.png",
                alt: "Kevin Hayes"
              }
            },
            ytdAssists: 5
          }
        ],
        wallclock: "2023-11-20T05:15:54Z",
        shootingPlay: true,
        coordinate: {
          x: 81,
          y: 5
        },
        strength: {
          id: "701",
          text: "Even Strength",
          abbreviation: "even-strength"
        },
        shotInfo: {
          id: "901",
          text: "None",
          abbreviation: "regular"
        }
      }
    ])
  })

})