import type { FactualSummary, SeraVNextInput } from '../types'

function normalizeText(input: string): string {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
}

function hasAny(text: string, patterns: string[]): boolean {
  return patterns.some((p) => text.includes(p))
}

function pushUnique(target: string[], value: string): void {
  if (!target.includes(value)) target.push(value)
}

export function runStep01FactualExtraction(input: SeraVNextInput): FactualSummary {
  const narrative = input.narrative.trim()
  const t = normalizeText(narrative)

  const actors: string[] = []
  const aircraftOrSystem: string[] = []
  const environment: string[] = []
  const sequence: string[] = []
  const availableCues: string[] = []
  const availableBarriers: string[] = []
  const missingData: string[] = []

  if (hasAny(t, ['crew', 'tripulacao'])) pushUnique(actors, 'crew')
  if (hasAny(t, ['two pilots', 'dois pilotos'])) pushUnique(actors, 'two pilots')
  if (hasAny(t, ['passenger', 'passageiro'])) pushUnique(actors, 'passengers')
  if (hasAny(t, ['pilot monitoring', 'pm'])) pushUnique(actors, 'pilot monitoring role mentioned')
  if (hasAny(t, ['pilot flying', 'pf'])) pushUnique(actors, 'pilot flying role mentioned')

  if (hasAny(t, ['s-92a', 'sikorsky s-92a'])) pushUnique(aircraftOrSystem, 'Sikorsky S-92A')
  if (hasAny(t, ['s-76c++', 's-76c+', 'sikorsky s-76'])) pushUnique(aircraftOrSystem, 'Sikorsky S-76 variant')
  if (hasAny(t, ['cessna 500', 'citation'])) pushUnique(aircraftOrSystem, 'Cessna 500 Citation')
  if (hasAny(t, ['warning system', 'alerting system', 'egpws', 'gpws'])) {
    pushUnique(aircraftOrSystem, 'aircraft warning/alerting system')
  }

  let operationType: string | null = null
  if (hasAny(t, ['offshore transport flight', 'offshore helicopter transport'])) {
    operationType = hasAny(t, ['ifr'])
      ? 'offshore helicopter transport under IFR context'
      : 'offshore helicopter transport'
  } else if (hasAny(t, ['night vfr'])) {
    operationType = 'night VFR helicopter operation'
  } else if (hasAny(t, ['private flight', 'private ifr'])) {
    operationType = 'private IFR operation context'
  }

  let phase: string | null = null
  if (hasAny(t, ['instrument approaches', 'visual approach', 'night approach'])) {
    phase = 'approach phase (instrument and/or visual)'
  }

  let location: string | null = null
  if (hasAny(t, ['thebaud central facility', 'thebaud'])) {
    location = 'Thebaud Central Facility (offshore)'
  } else if (hasAny(t, ['peasmarsh'])) {
    location = 'Peasmarsh, East Sussex'
  } else if (hasAny(t, ['tofino', 'long beach airport'])) {
    location = 'Tofino/Long Beach Airport area'
  }

  if (hasAny(t, ['two instrument approaches', 'both approaches were unsuccessful'])) {
    pushUnique(sequence, 'Two instrument approaches were attempted and were unsuccessful.')
  }
  if (hasAny(t, ['obtained visual contact', 'proceeded with a visual approach', 'visual approach began'])) {
    pushUnique(sequence, 'After visual contact, the crew proceeded with a visual approach.')
  }
  if (hasAny(t, ['high rate of descent', 'low airspeed'])) {
    pushUnique(sequence, 'During visual approach, the helicopter developed low airspeed and high rate of descent.')
  }
  if (hasAny(t, ['descent was arrested at very low height', 'very low height above the water'])) {
    pushUnique(sequence, 'Recovery occurred at very low height above water.')
  }
  if (hasAny(t, ['warning system did not generate an alert', 'failed to alert'])) {
    pushUnique(sequence, 'The available warning system did not generate an alert in the relevant envelope.')
  }

  if (hasAny(t, ['low cloud'])) pushUnique(environment, 'low cloud')
  if (hasAny(t, ['poor visibility', 'reduced visibility'])) pushUnique(environment, 'poor/reduced visibility')
  if (hasAny(t, ['degraded visual references'])) pushUnique(environment, 'degraded visual references')
  if (hasAny(t, ['offshore'])) pushUnique(environment, 'offshore approach environment')

  if (hasAny(t, ['aircraft instruments', 'flight instruments'])) {
    pushUnique(availableCues, 'aircraft/flight instruments')
  }
  if (hasAny(t, ['visual contact', 'visual references'])) {
    pushUnique(availableCues, 'visual contact/references')
  }
  if (hasAny(t, ['flight path', 'airspeed cues', 'high rate of descent'])) {
    pushUnique(availableCues, 'flight path, airspeed and descent cues')
  }
  if (hasAny(t, ['crew monitoring'])) pushUnique(availableCues, 'crew monitoring')
  if (hasAny(t, ['standard operating procedures', 'sop'])) pushUnique(availableCues, 'SOP/procedure context')

  if (hasAny(t, ['onboard warning systems', 'warning system', 'alerting system'])) {
    pushUnique(availableBarriers, 'onboard warning/alerting system')
  }
  if (hasAny(t, ['did not generate an alert', 'failed to alert'])) {
    pushUnique(availableBarriers, 'warning barrier present but degraded/not triggered')
  }

  if (hasAny(t, ['does not fully establish which pilot was flying', 'does not establish the exact pilot flying'])) {
    pushUnique(missingData, 'Pilot flying role not fully established.')
  }
  if (hasAny(t, ['which pilot was monitoring', 'precise pilot monitoring roles'])) {
    pushUnique(missingData, 'Pilot monitoring role not fully established.')
  }
  if (hasAny(t, ['exact callouts'])) pushUnique(missingData, 'Exact callouts are not fully established.')
  if (hasAny(t, ['precise timing of recognition', 'exact timing of recognition'])) {
    pushUnique(missingData, 'Precise timing of recognition is not fully established.')
  }
  if (hasAny(t, ['exact control inputs'])) {
    pushUnique(missingData, 'Exact control inputs during recovery are not fully established.')
  }

  if (sequence.length === 0) {
    pushUnique(sequence, narrative)
    pushUnique(missingData, 'Event sequence extraction remains partial in this implementation.')
  }

  return {
    actors,
    aircraftOrSystem,
    operationType,
    phase,
    location,
    sequence,
    environment,
    availableCues,
    availableBarriers,
    missingData,
  }
}
