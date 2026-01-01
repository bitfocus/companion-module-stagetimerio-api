import { describe, test } from 'node:test'
import { deepEqual } from 'node:assert/strict'

import { millisecondsToDhms } from '../src/timeutils/index.js'
import { dhmsToFormatted } from '../src/utils/index.js'

describe('utils.millisecondsToDhms', () => {
  test('conversion', () => {
    deepEqual(millisecondsToDhms(3599989000),   { negative: 0, days: 41, hours: 15, minutes: 59, seconds: 49, decimals: 0 })
    deepEqual(millisecondsToDhms(97323400),     { negative: 0, days: 1,  hours: 3,  minutes: 2,  seconds: 4 , decimals: 4 })
    deepEqual(millisecondsToDhms(3723400),      { negative: 0, days: 0,  hours: 1,  minutes: 2,  seconds: 4 , decimals: 4 })
    deepEqual(millisecondsToDhms(3600000),      { negative: 0, days: 0,  hours: 1,  minutes: 0,  seconds: 0 , decimals: 0 })
    deepEqual(millisecondsToDhms(60000),        { negative: 0, days: 0,  hours: 0,  minutes: 1,  seconds: 0 , decimals: 0 })
    deepEqual(millisecondsToDhms(1500),         { negative: 0, days: 0,  hours: 0,  minutes: 0,  seconds: 2 , decimals: 5 })
    deepEqual(millisecondsToDhms(1000),         { negative: 0, days: 0,  hours: 0,  minutes: 0,  seconds: 1 , decimals: 0 })
    deepEqual(millisecondsToDhms(500),          { negative: 0, days: 0,  hours: 0,  minutes: 0,  seconds: 1 , decimals: 5 })
    deepEqual(millisecondsToDhms(0),            { negative: 0, days: 0,  hours: 0,  minutes: 0,  seconds: 0 , decimals: 0 })
    deepEqual(millisecondsToDhms(/* none */),   { negative: 0, days: 0,  hours: 0,  minutes: 0,  seconds: 0 , decimals: 0 })
    deepEqual(millisecondsToDhms(-500),         { negative: 1, days: 0,  hours: 0,  minutes: 0,  seconds: 0 , decimals: 5 })
    deepEqual(millisecondsToDhms(-1000),        { negative: 1, days: 0,  hours: 0,  minutes: 0,  seconds: 1 , decimals: 0 })
    deepEqual(millisecondsToDhms(-1500),        { negative: 1, days: 0,  hours: 0,  minutes: 0,  seconds: 1 , decimals: 5 })
    deepEqual(millisecondsToDhms(-3723400),     { negative: 1, days: 0,  hours: 1,  minutes: 2,  seconds: 3 , decimals: 4 })
    deepEqual(millisecondsToDhms(-97323400),    { negative: 1, days: 1,  hours: 3,  minutes: 2,  seconds: 3 , decimals: 4 })
    deepEqual(millisecondsToDhms(-3599989000),  { negative: 1, days: 41, hours: 15, minutes: 59, seconds: 49, decimals: 0 })
  })
})
describe('utils.dhmsToFormatted', () => {
  test('formatting', () => {
    deepEqual(dhmsToFormatted(millisecondsToDhms(3599989000)),    { human: '999:59:49',  hhh: '999',  mm: '59', ss: '49' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(97323400)),      { human: '27:02:04',   hhh: '27',   mm: '02', ss: '04' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(3723400)),       { human: '1:02:04',    hhh: '1',    mm: '02', ss: '04' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(3600000)),       { human: '1:00:00',    hhh: '1',    mm: '00', ss: '00' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(60000)),         { human: '0:01:00',    hhh: '0',    mm: '01', ss: '00' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(1500)),          { human: '0:00:02',    hhh: '0',    mm: '00', ss: '02' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(1000)),          { human: '0:00:01',    hhh: '0',    mm: '00', ss: '01' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(500)),           { human: '0:00:01',    hhh: '0',    mm: '00', ss: '01' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(0)),             { human: '0:00:00',    hhh: '0',    mm: '00', ss: '00' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(/* none */)),    { human: '0:00:00',    hhh: '0',    mm: '00', ss: '00' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(-500)),          { human: '+0:00:00',   hhh: '+0',   mm: '00', ss: '00' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(-1000)),         { human: '+0:00:01',   hhh: '+0',   mm: '00', ss: '01' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(-1500)),         { human: '+0:00:01',   hhh: '+0',   mm: '00', ss: '01' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(-3723400)),      { human: '+1:02:03',   hhh: '+1',   mm: '02', ss: '03' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(-97323400)),     { human: '+27:02:03',  hhh: '+27',  mm: '02', ss: '03' })
    deepEqual(dhmsToFormatted(millisecondsToDhms(-3599989000)),   { human: '+999:59:49', hhh: '+999', mm: '59', ss: '49' })
  })
})
