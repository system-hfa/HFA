import d3Failures from '@/data/sera/3-Failures.json'
import d3Flow from '@/data/sera/3-Flow.json'
import d4Failures from '@/data/sera/4-Failures.json'
import d4Flow from '@/data/sera/4-Flow.json'
import d5Failures from '@/data/sera/5-Failures.json'
import d5Flow from '@/data/sera/5-Flow.json'
import guidelines from '@/data/sera/Guidelines.json'
import point from '@/data/sera/Point.json'
import preconditions from '@/data/sera/Pre-Conditions.json'
import template from '@/data/sera/Template.json'
import tutorial from '@/data/sera/tutorial.json'

const FILES: Record<string, unknown> = {
  '3-Failures.json': d3Failures,
  '3-Flow.json': d3Flow,
  '4-Failures.json': d4Failures,
  '4-Flow.json': d4Flow,
  '5-Failures.json': d5Failures,
  '5-Flow.json': d5Flow,
  Guidelines: guidelines,
  'Guidelines.json': guidelines,
  'Point.json': point,
  'Pre-Conditions.json': preconditions,
  'Template.json': template,
  'tutorial.json': tutorial,
}

export function loadDocJson(name: string, maxChars = 6000): string {
  let key = name
  if (name === 'Guidelines.json') key = 'Guidelines.json'
  const raw = FILES[key] ?? FILES[name.replace(/\s/g, '-')]
  if (raw == null) return '{}'
  const s = typeof raw === 'string' ? raw : JSON.stringify(raw)
  return s.length > maxChars ? s.slice(0, maxChars) : s
}
